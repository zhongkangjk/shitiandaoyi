---
title: 中文化Django自带后台名字
categories:
  - 计算机
  - python
tags:
  - django
date: 2022-04-15 09:36:48
---
自带后台各属性改中文
<!-- more -->

### 网站标题 头

`app/admin.py`

```python
from django.contrib import admin
admin.site.site_header = '催费'
admin.site.site_title = '催费'
```

### 大菜单

`app/__init__.py`

```python

from os import path
from django.apps import AppConfig
 
VERBOSE_APP_NAME = '大菜单名字'
 
def get_current_app_name(file):
    return path.dirname(file).replace('\\', '/').split('/')[-1]
 
class AppVerboseNameConfig(AppConfig):
    name = get_current_app_name(__file__)
    verbose_name = VERBOSE_APP_NAME
 
default_app_config = get_current_app_name(__file__) + '.__init__.AppVerboseNameConfig'

```

### 小菜单

`app/models.py`

```python
from django.db import models

class model类(models.Model):
	pass
    class Meta:
        verbose_name = '小菜单名字'
        verbose_name_plural = "'小菜单名字"
```

### 字段名字

`app/models.py`

```python
from django.db import models

class model类(models.Model):
	age = models.CharField('字段名字',max_length=5,blank=True,null=True)
```

