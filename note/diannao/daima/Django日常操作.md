---
title: Django日常操作
categories:
  - 计算机
  - python
tags:
  - django
date: 2022-03-09 15:52:21
---
日常复制
<!-- more -->
#### 创建应用
`django-admin startproject 项目名字`
#### 创建APP
`python manage.py startapp APP名字`
#### 创建APP以后
settings中增加INSTALLED_APPS,
APP内增加分url
```python
# 引入path
from django.urls import path

# 正在部署的应用的名称
app_name = 'APP名称'

urlpatterns = [
    # 目前还没有urls
]
```
总url引入分url
```python
from django.urls import path, include
urlpatterns = [
    # 新增代码，配置app的url
    path('定义url/', include('APP名称.urls', namespace='APP名称')),
]
```
#### 写API函数
分url
```python
from django.urls import path
from APP名称 import views

app_name = 'APP名称'

urlpatterns = [
    path('list/',views.hellolist),
]
```
views
```python
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def hellolist(request):
    list = [1,2,3,4,5]
    return Response(list)
```
