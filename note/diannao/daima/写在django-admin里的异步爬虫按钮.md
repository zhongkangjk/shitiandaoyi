---
title: 写在django-admin里的异步爬虫按钮和日期计算
date: 2021-08-23 18:58:10
categories:
  - 计算机
  - python
tags: 
  - python
  - django
  - httpx
  - datetime
---

用httpx的异步方法来更新requests的，快了一些

<!-- more -->


### 代码

```python
from django.contrib import admin
from django.http import HttpResponse
from import_export import resources
from import_export.admin import ImportExportModelAdmin, ImportExportActionModelAdmin
from dateutil.relativedelta import relativedelta
import json,requests
from cuifei.models import 催费表类,可收表19年,可收表20年,催费表22年类
from shuju.models import 数据通知表类
from utils.models import Dictionary
import httpx,json,time,math
import asyncio,datetime,calendar
from django.forms import TextInput, Textarea
from django.db import models
from django.db.models import Q
#引入 Workbook
from openpyxl import Workbook
from django.http import HttpResponse
admin.site.site_header = '催费'
admin.site.site_title = '催费'



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
    'Authorization': '**************',
}

url_by_税号 = '************'
查税号URL= '******************'

@admin.register(催费表22年类)
class 催费表22管理(ImportExportActionModelAdmin):
    list_display = ('公司名称***************')
    search_fields = ('公司名称********************')
    list_per_page = 20
    date_hierarchy = '到期日'   #时间导航栏
    list_filter = ('区域','性质','到期日',UpdatedAtFilter,) #筛选器
    list_display_links = ('公司名称',)  #点击修改
    formfield_overrides = {
        models.CharField: {'widget': TextInput(attrs={'size':'20'})},
        models.TextField: {'widget': Textarea(attrs={'rows':1, 'cols':50})},
    }
    actions = ['更新可收年份','更新到期日和时间','export_admin_action']
    def get_actions(self, request):
        actions = super(催费表22管理,self).get_actions(request)
        print(actions)
        if request.user.username != 'admin':
            del actions['更新到期日和时间']
        return actions
    def 更新到期日和时间(modeladmin, request, queryset):


        async def 爬(client,body):
            def 保存结果(结果,body):
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


    def 更新可收年份(modeladmin, request, queryset):
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
                # 新日 = calendar.monthrange(年,月)[1]
                新日 = calendar.monthrange(年,下一个月)[1]
                # print(新日)
                # print(datetime.date(年,月,新日)==i.到期日)
                if datetime.date(年,下一个月,新日)==到期日:
                    差年= 1
                else:
                    差年 = math.ceil((datetime.date(年,下一个月,新日)-到期日)/datetime.timedelta(days=365))
                # print(差年)
                到期日年份 = i.到期日.year
                可收字典 = {2015:1,2016:1,2017:1,2018:1,2019:i.可收19,2020:i.可收20,2021:i.可收21,2022:1}
                # 年份 = sum(listn[:差年])
                j = 0
                for i1 in range(到期日年份,到期日年份+差年):
                    # print(i1)
                    j += 可收字典[i1]
                # print(j)
                i.几年 = j
                i.save(update_fields=['可收19','可收20','可收21','几年'])
```

### TIPS

`asyncio.run()`和`asyncio.create_task()`这之类的函数要python3.7以后才能用
