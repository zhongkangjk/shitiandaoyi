---
title: 迁移django项目时试水宝塔python管理器中的uwsgi与nginx设置
categories:
  - 计算机
  - django
tags:
  - django
  - uwsgi
  - nginx
date: 2022-05-27 22:43:51
---
直接上非常刺毛，后来只能复刻一下之前的uwsgi配置
<!-- more -->

### python管理器里的uwsgi配置文件

```ini
[uwsgi]
chdir   =项目文件夹绝对路径
module  =shuai4.wsgi
home    =项目文件夹绝对路径/**************************_venv
master  =true
processes  =4
socket  =127.0.0.1:9090
chmod-socket = 666
vacuum = true
daemonize =  项目文件夹绝对路径/uwsgi.log
```

### nginx配置

```nginx
server
{
    listen 暴露给外面的端口;
    server_name ip或者域名;
    location /static {
      alias 项目文件夹绝对路径/collected_static;
      }
    location / {
      include uwsgi_params;
      uwsgi_pass 127.0.0.1:9090; #须与uwsgi一致
      client_max_body_size 20m;
      }

    access_log  /www/wwwlogs/ip或者域名.log;
    error_log  /www/wwwlogs/ip或者域名.error.log;
}
```

