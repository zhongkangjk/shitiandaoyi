---
title: 更改django-admin的TextField显示长宽度
categories:
  - 计算机
  - python
tags:
  - python
  - django
date: 2021-08-17 18:34:06
---
今天想把django-admin的TextField字段改成快速更改，但发现太大了，格格不入
<!-- more -->
### 代码
```python
#在admin.py中
from django.forms import TextInput, Textarea
from django.db import models

class YourModelAdmin(admin.ModelAdmin):

    formfield_overrides = {
        models.CharField: {'widget': TextInput(attrs={'size':'20'})},
        models.TextField: {'widget': Textarea(attrs={'rows':1, 'cols':50})},
    }

admin.site.register(YourModel, YourModelAdmin)
```
### 备注
给Textarea改成一行 长度50就差不多了得根据预览情况，多了也没试