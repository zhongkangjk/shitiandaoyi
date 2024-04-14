---
title: Django伪监控小脚本
categories:
  - 计算机
  - python
tags:
  - python
  - django
  - 前端
date: 2022-03-09 15:10:51
---
在django加个小模块来监控别的电脑情况以及执行指令
<!-- more -->

### 服务端

```python
#主url
path('utils/', include('utils.urls')),
#分url
path('xinxiview/',views.XinxiView.as_view()),
path('zhilingview/',views.ZhilingView.as_view()),
#model
from django.db import models
class Dictionary(models.Model):
    # 字典名称 不可重复
    name = models.CharField(max_length=50, unique=True)
    # 字典内容
    data = models.TextField(blank=True,null=True)

    def __str__(self):
        return self.name
#view
class XinxiView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        #获得model Dictionary里名称为税控盘信息的内容
        税控盘信息 = Dictionary.objects.get(name='税控盘信息').data
        UK信息 = Dictionary.objects.get(name='UK信息').data
        税控盘信息 = 税控盘信息.split('\n')
        UK信息 = UK信息.split('\n')
        信息列表 = [税控盘信息,UK信息]
        return Response(信息列表)
    def post(self, request, format=None):
        name = request.data.get('name')
        xinxi = request.data.get('xinxi')
        # 更改Directory里name为name的body为xinxi
        Dictionary.objects.filter(name=name).update(data=xinxi)
        return Response('更新成功')
class ZhilingView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        name = request.query_params.get('name')
        # 获得model Dictionary里名称为name的body
        zhiling = Dictionary.objects.get(name=name).data
        Dictionary.objects.filter(name=name).update(data='')
        return Response(zhiling)
    def post(self, request, format=None):
        zhiling1 = request.data.get('税控盘指令')
        zhiling2 = request.data.get('UK指令')
        # 更改Directory里name为name的body为xinxi
        Dictionary.objects.filter(name='税控盘指令').update(data=zhiling1)
        Dictionary.objects.filter(name='UK指令').update(data=zhiling2)
        return Response('更新指令成功')


```

### 被监控端更新数据&执行命令

```python
import requests,os,time,json
import psutil
xinxiurl = 'http://###/utils/xinxiview/'
zhilingurl = 'http://###/utils/zhilingview/'
# 检测进程是否存在的函数 
def check_process(process_name):
    for proc in psutil.process_iter():
        try:
            # 检查进程名称返回进程对象
            if process_name in proc.name():
                return proc.pid
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass
    return None
def 工作():
    a = ''
    if check_process('skp_usb_moniter.exe'):
        a+= '税控接口服务运行中,'
    else:
        a+= '税控接口服务未运行,'
    if check_process('SunloginClient.exe'):
        a+= '向日葵运行中,'
    else:
        a+= '向日葵未运行,'
    print(a)
    r = requests.post(xinxiurl, data={'name': '税控盘信息', 'xinxi':  a})
    print(r.text)

    # 发送get请求
    r = requests.get(zhilingurl,params={'name': '税控盘指令'})
    指令 = r.text
    if 指令 == '"重启程序"':
        os.system('D:\Desktop\s.bat')
    else:
        print(指令)


while True:
    工作()
    time.sleep(60)
```

### 前端获取数据&发送指令

```js
//获取盘柜信息
	vm.$u.api.getPanguiInfo = () => vm.$u.get('/utils/xinxiview/');
	//发送指令
	vm.$u.api.sendOrder = (params) => vm.$u.post('/utils/zhilingview/', params);


async reloadShuikongpan() {
				const res = await this.$u.api.sendOrder({
					税控盘指令: '重启程序'
				})
				this.$u.toast(res)
			},
const res = await this.$u.api.getPanguiInfo()
```

