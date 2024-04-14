---
title: 使用易即今日API定时更新每日新闻图片
categories:
  - 计算机
  - python
tags:
  - python
  - 爬虫
date: 2022-03-09 16:05:24
---
更新脚本和定时任务
<!-- more -->

news-updated.py

```python
import requests
url = "http://api.soyiji.com//news_jpg"
response = requests.request("GET", url)
res = eval(response.text)
图片地址 = res['url']
headers = {  'Referer': 'safe.soyiji.com'}
response = requests.request("GET", 图片地址, headers=headers)
# 图片文件保存
with open('/www/wwwroot/shuai4-django-env3.7/shuai4-django/collected_static/1.jpg', 'wb') as f:
    f.write(response.content)
```

由于文件夹已经受nginx管理，不需要其他操作

绝对路径执行

```bash
/www/wwwroot/shuai4-django-env3.7/bin/python /www/wwwroot/shuai4-django-env3.7/shuai4-django/news-updated.py
```

