#### 创建应用
`django-admin startproject 项目名字`
#### 创建APP
`python manage.py startapp APP名字`
#### 迁移数据库
`python manage.py makemigrations`
#### 运行数据库
`python manage.py migrate`
#### 收集静态文件
`python manage.py collectstatic`
#### 启动项目
`python manage.py runserver`
#### 创建超级用户
`python manage.py createsuperuser`
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

#### 时间查询
```python
1、gt：大于某个时间
now = datetime.datetime.now()
#前一天
start = now – datetime.timedelta(hours=23, minutes=59, seconds=59)
a=yourobject.objects .filter(youdatetimcolumn__gt=start)

2、gte：大于等于某个时间：
a=yourobject.objects .filter(youdatetimcolumn__gte=start)

3、lt：小于
a=yourobject.objects .filter(youdatetimcolumn__lt=start)

4、lte：小于等于
a=yourobject.objects .filter(youdatetimcolumn__lte=start)

5、range：查询时间段
start_date = datetime.date(2005, 1, 1)
end_date = datetime.date(2005, 3, 31)
Entry.objects.filter(pub_date__range=(start_date, end_date))

6、year：查询某年
Entry.objects.filter(pub_date__year=2005)

7、month：查询某月
Entry.objects.filter(pub_date__month=12)

8、day：某天
Entry.objects.filter(pub_date__day=3)

9、week_day：星期几
Entry.objects.filter(pub_date__week_day=2)

10、获取今天的日期，日期格式为yyyy-MM-dd

from django.utils.timezone import now, timedelta
date = now().date() + timedelta(days=-1) #昨天
date = now().date() + timedelta(days=0) #今天
date = now().date() + timedelta(days=1) #明天
```