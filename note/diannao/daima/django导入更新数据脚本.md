---
title: django导入更新数据脚本
categories:
  - 计算机
  - python
tags:
  - python
  - django
date: 2022-03-23 14:35:07
---
把操作django数据库的导入更新操作汇总一下以备参考
<!-- more -->

### 之前利用爬虫更新表内数据和用时间计算表数据的日更操作脚本

```python
import os,sys,django
import asyncio,datetime,calendar
import httpx,json,time,math
from dateutil.relativedelta import relativedelta
from django.db.models import Q
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
project_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_path)
os.environ['DJANGO_SETTINGS_MODULE'] = 'shuai4.settings'
django.setup()
from cuifei.models import 催费表22年类,可收表19年,可收表20年,催费表类
from shuju.models import 数据通知表类

def 取结果(r):
    if r['obj']:
        j = []
        for i in r['obj']:
            j.append(i['fwqx'])
        return max(j),r['obj'][0]['jbrdh']
    else:
        return None,None
headers = {
    'Content-Type': 'application/json',
    'Authorization': '***',
}

url_by_税号 = '***'
查税号URL= '***'

文本 = []
# print(催费表22年类.objects.all()[:5])
queryset = 催费表22年类.objects.all()
def 更新到期日和时间(queryset):
    async def 爬(client,body):
        def 保存结果(结果,body):
            if 结果[0]:
                body.到期日 = 结果[0]
                # body.经办人电话 = 结果[1]
                body.save(update_fields=['到期日'])

        r = await client.post(url_by_税号,headers=headers, data=json.dumps({'khsbh': body.税号,}),timeout=None)
        结果 = 取结果(r.json())
        if 结果[0]:
            保存结果(结果,body)
        else:
            用名称查的data = json.dumps({'count':100,'keyword': body.公司名称,'page':0})
            r = await client.post(查税号URL,headers=headers, data=用名称查的data,timeout=None)
            res_dict = r.json()
            if res_dict['obj']:
                税号1 = res_dict['obj'][-1]['khsbh']
                r1 = await client.post(url_by_税号,headers=headers, data=json.dumps({'khsbh': 税号1,}),timeout=None)
                结果1 = 取结果(r1.json())
                保存结果(结果1,body)
            else:
                return None,None

    async def 跑():
        async with httpx.AsyncClient() as client:
            task_list = []
            for i in queryset:
                req = 爬(client,i)
                task = asyncio.create_task(req)
                task_list.append(task)
            await asyncio.gather(*task_list)
    start = time.time()
    asyncio.run(跑())
    end = time.time()
    print(end-start)
    print('查日期完成于'+time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
    # global b
    # b = '查日期完成于'+time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())+'用时'+str(end-start)+'秒'
    文本.append('查日期完成于'+time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())+'用时'+str(end-start)+'秒')

def 更新可收年份(queryset):
    for i in queryset:
            if i.到期日:
                if type(i.到期日) == type('s'):
                    到期日 = datetime.datetime.strptime(i.到期日,'%Y-%m-%d').date()
                else:
                    到期日 = i.到期日
                # print(i.公司名称,i.税号)
                a = 可收表19年.objects.filter(公司名称__exact = i.公司名称).count()
                if a > 0:
                    i.可收19 = 1
                else:
                    i.可收19 = 0
                b = 可收表20年.objects.filter(Q(公司名称__exact = i.公司名称)|Q(税号__exact = i.税号)).count()
                if b > 0:
                    i.可收20 = 1
                else:
                    i.可收20 = 0
                c = 催费表类.objects.filter(Q(公司名称__exact = i.公司名称)|Q(税号__exact = i.税号)).count()
                if c > 0:
                    i.可收21 = 1
                else:
                    i.可收21 = 0
                # print(i.到期日)
                # print(datetime.date.today())
                年 = datetime.datetime.now().year
                月 = datetime.datetime.now().month
                下一个月 = (datetime.datetime.now()+relativedelta(months=1)).month
                # 日 = datetime.datetime.now().day
                新日 = calendar.monthrange(年,下一个月)[1]
                # print(新日)
                # print(datetime.date(年,月,新日)==i.到期日)
                if datetime.date(年,下一个月,新日)==到期日:
                    差年= 1
                else:
                    差年 = math.ceil((datetime.date(年,下一个月,新日)-到期日)/datetime.timedelta(days=365))
                # print(差年)
                到期日年份 = 到期日.year
                可收字典 = {2015:1,2016:1,2017:1,2018:1,2019:i.可收19,2020:i.可收20,2021:i.可收21,2022:1}
                # 年份 = sum(listn[:差年])
                j = 0
                for i1 in range(到期日年份,到期日年份+差年):
                    # print(i1)
                    j += 可收字典[i1]
                # print(j)
                i.几年 = j
                i.save(update_fields=['可收19','可收20','可收21','几年'])
    print('查可收几年完成于'+time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
    # global d
    # d = ('\n'+'查可收几年完成于'+time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
    文本.append('查可收几年完成于'+time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
更新到期日和时间(queryset)
更新可收年份(queryset)
def 发送邮件(邮件标题,称呼,邮件文字,发件人邮箱,密码,收件人邮箱,附件路径列表,附件命名列表):
    msg = MIMEMultipart()
    msg["Subject"] = 邮件标题
    msg["From"]    = 发件人邮箱  
    msg["To"]      = 称呼
    #这是文字部分
    part = MIMEText(邮件文字)
    msg.attach(part)
    #这是附件部分
    for 附件路径,附件命名 in zip(附件路径列表,附件命名列表):
        part = MIMEApplication(open(附件路径,'rb').read())
        part.add_header('Content-Disposition', 'attachment', filename=附件命名)
        msg.attach(part)

    s = smtplib.SMTP("smtp.qq.com", timeout=60)#SMTP服务的网址
    try:
        s.login(发件人邮箱, 密码)
        s.sendmail(发件人邮箱, 收件人邮箱, msg.as_string())#收件人邮箱可以是列表
        s.close()
        print("发送成功")
    except:
        print("发送失败")

def 拿昨天的老数据(区域):
    # 今天 = datetime.date.today()
    昨天 = datetime.date.today() - datetime.timedelta(days=1)
    # print(昨天)
    # print(type(昨天))
    a = 数据通知表类.objects.filter(Q(日期 = 昨天)&Q(区域=区域)).values()[0]
    # for i in a:
    #     print(i)
    return a


def 获得今天的新数据并存数据库(区域):
    # 崂山
    今天 = datetime.date.today()
    能查到日期的户数 = 催费表22年类.objects.filter(Q(到期日__isnull=False)&Q(区域=区域)).count()
    查不到日期的户数 = 催费表22年类.objects.filter(Q(到期日__isnull=True)&Q(区域=区域)).count()
    年 = datetime.datetime.now().year
    月 = datetime.datetime.now().month
    日 = calendar.monthrange(年,月)[1]
    下一个月 = (datetime.datetime.now()+relativedelta(months=1)).month
    下一个月日 = calendar.monthrange(年,下一个月)[1]
    到期日为当月的户数 = 催费表22年类.objects.filter(Q(到期日__range=(datetime.date(年, 月, 1),datetime.date(年, 月, 日)))&Q(区域=区域)).count()
    到期日为下月的户数 = 催费表22年类.objects.filter(Q(到期日__range=(datetime.date(年, 下一个月, 1),datetime.date(年, 下一个月,下一个月日)))&Q(区域=区域)).count()
    前一个月 = (datetime.datetime.now()-relativedelta(months=1)).month
    新日 = calendar.monthrange(年,前一个月)[1]
    今年已逾期的户数 = 催费表22年类.objects.filter(Q(到期日__range=(datetime.date(年, 1, 1),datetime.date(年, 前一个月, 新日)))&Q(区域=区域)).count()
    下两个月 = (datetime.datetime.now()+relativedelta(months=2)).month
    今年还未到期的户数 = 催费表22年类.objects.filter(Q(到期日__range=(datetime.date(年,下两个月, 1),datetime.date(年, 12, 31)))&Q(区域=区域)).count()
    往年到期户 = 催费表22年类.objects.filter(Q(到期日__lt=datetime.date(年,1,1))&Q(区域=区域)).count()
    # &Q(几年__gte=1)
    更新数据 = {
        '日期':今天,
        '区域':区域,
        '能查到日期的户数':能查到日期的户数,
        '查不到日期的户数':查不到日期的户数,
        '到期日为当月的户数':到期日为当月的户数,
        '到期日为下月的户数':到期日为下月的户数,
        '今年已逾期的户数':今年已逾期的户数,
        '今年还未到期的户数':今年还未到期的户数,
        '往年到期户':往年到期户
    }
    #存数据
    数据通知表类.objects.update_or_create(defaults=更新数据,日期=今天,区域=区域)
    a = 数据通知表类.objects.filter(Q(日期 = 今天)&Q(区域=区域)).values()[0]
    # print(a)
    return a

崂山新数据字典 = 获得今天的新数据并存数据库('崂山')
市南新数据字典 = 获得今天的新数据并存数据库('市南')
市北新数据字典 = 获得今天的新数据并存数据库('市北')
李沧新数据字典 = 获得今天的新数据并存数据库('李沧')

崂山老数据字典 = 拿昨天的老数据('崂山')
市南老数据字典 = 拿昨天的老数据('市南')
市北老数据字典 = 拿昨天的老数据('市北')
李沧老数据字典 = 拿昨天的老数据('李沧')

def 增加数据(区域,新数据字典,老数据字典):
    文本.append(区域)
    文本.append('能查到日期的户数：'+str(新数据字典['能查到日期的户数'])+'户  '+str(新数据字典['能查到日期的户数']-老数据字典['能查到日期的户数']))
    文本.append('查不到日期的户数：'+str(新数据字典['查不到日期的户数'])+'户  '+str(新数据字典['查不到日期的户数']-老数据字典['查不到日期的户数']))
    文本.append('到期日为当月的户数：'+str(新数据字典['到期日为当月的户数'])+'户  '+str(新数据字典['到期日为当月的户数']-老数据字典['到期日为当月的户数']))
    文本.append('到期日为下月的户数：'+str(新数据字典['到期日为下月的户数'])+'户  '+str(新数据字典['到期日为下月的户数']-老数据字典['到期日为下月的户数']))
    文本.append('今年已逾期的户数：'+str(新数据字典['今年已逾期的户数'])+'户  '+str(新数据字典['今年已逾期的户数']-老数据字典['今年已逾期的户数']))
    文本.append('今年还未到期的户数：'+str(新数据字典['今年还未到期的户数'])+'户  '+str(新数据字典['今年还未到期的户数']-老数据字典['今年还未到期的户数']))
    文本.append('往年到期户：'+str(新数据字典['往年到期户'])+'户  '+str(新数据字典['往年到期户']-老数据字典['往年到期户']))
    # 文本.append('往年到期户茫茫多')
增加数据('崂山',崂山新数据字典,崂山老数据字典)
增加数据('市南',市南新数据字典,市南老数据字典)
增加数据('市北',市北新数据字典,市北老数据字典)
增加数据('李沧',李沧新数据字典,李沧老数据字典)

c = ''
for i in 文本:
    print(i)
    c += ('\n'+i)
print(c)
发送邮件('更新通知','崂山',c,'**','**',['**','**'],'','')

```

### 删除数据的脚本

```python
import pandas as pd
import os,sys,django
import xlrd

class 打开excel文件():
    def __init__(self,文件名,第几个表):
        self.文件 = xlrd.open_workbook(filename = 文件名)
        self.表 = self.文件.sheet_by_index(第几个表-1)


    def 获得横向资料(self):
        self.数据 = [self.表.row_values(i) for i in range(self.表.nrows)]
        return self.数据


    def 获得纵向资料(self):
        self.数据 =  [self.表.col_values(i) for i in range(self.表.ncols)]
        return self.数据

    def 获得名称列数据(self,名称):
        def 获得列序号(表名,查找字段名):
            列序号 = None
            for i in range(表名.ncols):
                if (表名.cell_value(0,i) == 查找字段名):
                    列序号 = i
                    break
            return 列序号
        print(获得列序号(self.表,名称))
        self.数据 = self.表.col_values(获得列序号(self.表,名称),1)
        return self.数据
文件 = 打开excel文件('市南可收费注销.xls',1)
list1 = 文件.获得名称列数据('单位名称')

project_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_path)
os.environ['DJANGO_SETTINGS_MODULE'] = 'shuai4.settings'
django.setup()
from cuifei.models import 催费表类

催费表类.objects.filter(公司名称__in=list1).delete()
```

### 填充数据的脚本

```python
import pandas as pd
import os,sys,django


class 提取类():
    def __init__(self,文件名,第几个表):
        self.文件 = pd.read_excel(文件名, 第几个表)

    def 拿取数据(self,从第几行开始,*列名):
        self.数据 = self.文件.loc[从第几行开始-2:,[*列名,]]
        #print(self.数据)
        return self.数据

销售表 = 提取类('不可收名单.xls',0)
销售数据 = 销售表.拿取数据(2,'纳税人识别号','纳税人名称')
销售数据 = 销售数据.values.tolist()


project_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_path)
os.environ['DJANGO_SETTINGS_MODULE'] = 'shuai4.settings'
django.setup()
from cuifei.models import 催费表22年类
# 催费表22年类.objects.all().update(是否可收='可收')
for i in 销售数据:
    if 催费表22年类.objects.filter(税号=i[0]):
        催费表22年类.objects.filter(税号=i[0]).update(是否可收='不可收')
        print(i[1]+',通过税号确定不可收')
    else:
        if 催费表22年类.objects.filter(公司名称=i[1]):
            催费表22年类.objects.filter(公司名称=i[1]).update(是否可收='不可收')
            print(i[1]+'通过名称确定不可收')
        else:
            print(i[1]+'发行表没有的不可收企业')

```

### 批量导入数据脚本

```python
import pandas as pd
import os,sys,django

class 提取类():
    def __init__(self,文件名,第几个表):
        self.文件 = pd.read_excel(文件名, 第几个表)

    def 拿取数据(self,从第几行开始,*列名):
        self.数据 = self.文件.loc[从第几行开始-2:,[*列名,]]
        #print(self.数据)
        return self.数据

销售表 = 提取类('导入模板.xlsx',0)
销售数据 = 销售表.拿取数据(2,'公司名称','区域','税号','性质')
销售数据 = 销售数据.values.tolist()


project_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_path)
os.environ['DJANGO_SETTINGS_MODULE'] = 'shuai4.settings'
django.setup()
from cuifei.models import 催费表类

list = []
for i in 销售数据:
    # print(i[4])
    list.append(催费表类(公司名称 = i[0],区域 = i[1],税号 = i[2],性质 = i[3]))


催费表类.objects.bulk_create(list)
```

### 更新某一列数据脚本

```python
import pandas as pd
import os,sys,django


class 提取类():
    def __init__(self,文件名,第几个表):
        self.文件 = pd.read_excel(文件名, 第几个表)

    def 拿取数据(self,从第几行开始,*列名):
        self.数据 = self.文件.loc[从第几行开始-2:,[*列名,]]
        #print(self.数据)
        return self.数据

销售表 = 提取类('/www/wwwroot/shuai4-django-env3.7/shuai4-django/时间.xls',0)
销售数据 = 销售表.拿取数据(2,'税号','名称','服务期限')
销售数据 = 销售数据.values.tolist()


project_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_path)
os.environ['DJANGO_SETTINGS_MODULE'] = 'shuai4.settings'
django.setup()
from cuifei.models import 催费表22年类

for i in 销售数据:
    if 催费表22年类.objects.filter(税号=i[0]):
        催费表22年类.objects.filter(税号=i[0]).update(到期日=i[2])
        print(i[0]+'成功')
    else:
        if 催费表22年类.objects.filter(公司名称=i[1]):
            催费表22年类.objects.filter(公司名称=i[1]).update(到期日=i[2])
            print(i[0]+'成功')
        else:
            print(i[0]+'失败')
```

