---
title: DJango admin 增加自定义筛选器
categories:
  - 计算机
  - python
tags:
  - django
date: 2022-04-20 09:09:17
---
增加自定义的筛选器
<!-- more -->

`app/admin.py`

### 增加一个只选取月份的筛选器

```python
from django.contrib import admin
class UpdatedAtFilter(admin.SimpleListFilter):
    title = '选择月份'
    parameter_name = '月份'

    # 菜单列表
    def lookups(self, request, model_admin):
        """
        List of values to allow admin to select
        """
        months = (
            (1, '一月'),
            (2, '二月'),
            (3, '三月'),
            (4, '四月'),
            (5, '五月'),
            (6, '六月'),
            (7, '七月'),
            (8, '八月'),
            (9, '九月'),
            (10, '十月'),
            (11, '十一月'),
            (12, '十二月')
        )
        return months

    def queryset(self, request, queryset):
        """
        Return the filtered queryset
        """
        if self.value():
            # DateTime Field can use __month to get its month value
            return queryset.filter(到期日__month=self.value())
        else:
            return queryset
@admin.register(催费表22年类)
class ********(******):
    list_filter = ('***','***','***',UpdatedAtFilter,) #筛选器
```

