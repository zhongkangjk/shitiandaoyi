---


title: django-admin只显示用户关联字段的设置
categories:

- 计算机
- python
tags:
- django
date: 2022-06-08 09:23:15

---

需要只让用户查看自己的数据
```python
from django.contrib.auth.models import User
关联User字段 = models.ForeignKey(User,on_delete=models.CASCADE,blank=True,null=True)


@admin.register(类)
class 类管理(ImportExportActionModelAdmin):
    exclude = ('关联User字段',)
    def has_change_permission(self, request, obj=None):
        has_class_permission = super(类管理, self).has_change_permission(request, obj)
        if not has_class_permission:
            return False
        if obj is not None and not request.user.is_superuser and request.user.id != obj.关联User字段.id:
            return False
        return True
    def get_queryset(self, request):
            if request.user.is_superuser:
                return 类.objects.all()
            return 类.objects.filter(关联User字段=request.user)
    def save_model(self, request, obj, form, change):
            if not change:
                obj.关联User字段 = request.user
            obj.save()
```

参考：[http://loonlog.com/2020/11/19/django-user-admin-author/](http://loonlog.com/2020/11/19/django-user-admin-author/)
