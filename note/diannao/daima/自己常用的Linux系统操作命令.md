---
title: 自己常用的Linux系统操作命令
date: 2021-07-25 22:30:54
categories:
  - 计算机
  - linux
tags:
  - linux
  - uwsgi
  - django部署
  - nginx
---

记录一下，方便使用

<!-- more -->

### 开关uwsgi-django网站

#### 关闭uwsgi服务

``` bash
ps ax | grep uwsgi
得到类似
15005 pts/4    S      0:00 /ve/path/bin/uwsgi --ini config.ini
15006 pts/4    S      0:00 /ve/path/bin/uwsgi --ini config.ini
15007 pts/4    S      0:00 /ve/path/bin/uwsgi --ini config.ini
地址是/ve/path/bin/uwsgi
杀死
killall -s INT /ve/path/bin/uwsgi
```
#### 到对应目录开启虚拟环境
```bash
cd /www/wwwroot/shuai4-django-env&&source bin/activate
```
#### 用配置文件启动

```bash
uwsgi -d --ini shuai4-django.ini
```

#### 更新以后的开启重载关闭uwsgi方式

```bash
#开启
/www/wwwroot/shuai4-django-env3.7/bin/uwsgi -d --ini /www/wwwroot/shuai4-django-env3.7/shuai4-django.ini  --log-reopen
#重载
/www/wwwroot/shuai4-django-env3.7/bin/uwsgi --reload /www/wwwroot/shuai4-django-env3.7/uwsgi.pid
#关闭
/www/wwwroot/shuai4-django-env3.7/bin/uwsgi --stop /www/wwwroot/shuai4-django-env3.7/uwsgi.pid
```

<u></u>

### 部署uwsgi-django网站时用到的
#### 导出导入包

```bash
#导出
pip freeze > requirements.txt
#导入
pip install -r requirements.txt
```

#### debian安装pip

```bash
sudo apt-get install python3-pip
```

#### 安装虚拟环境包

```bash
pip3 install virtualenv
```

#### 创建文件夹

```bash
mkdir /var/www
```

#### 移动到该文件夹

```bash
cd /var/www
```

#### 创建虚拟环境

```bash
virtualenv studyapi
```

#### 进入虚拟环境

```bash
source studyapi/bin/activate
```

#### 安装7z

```bash
apt install p7zip-full
```

#### 解压项目到当前文件夹

```bash
7z x dwebsite.zip
```

#### 解压项目到当前文件夹

```bash
7z x dwebsite.zip
```

#### uwsgi配置文件

```ini
[uwsgi]
chdir   =/www/wwwroot/shuai4-django-env/shuai4-django
module  =shuai4.wsgi
home    =/www/wwwroot/shuai4-django-env/
master  =true
processes  =4
socket  =127.0.0.1:9090
chmod-socket = 666
vacuum = true
pidfile=uwsgi.pid
```
#### nginx配置文件
```nginx
server
{
    listen 8097;
    server_name 49.232.5.6;
    location /static {
      alias /www/wwwroot/shuai4-django-env/shuai4-django/collected_static;
      }
    location / {
      uwsgi_pass 127.0.0.1:9090;
      include /www/server/panel/vhost/nginx/uwsgi_params;
      client_max_body_size 20m;
      }

    access_log  /www/wwwlogs/49.232.5.6.log;
    error_log  /www/wwwlogs/49.232.5.6.error.log;
}
```

