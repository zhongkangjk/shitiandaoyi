### 项目地址
https://news.05320532.xyz/
### 项目仓库
https://github.com/zhongkangjk/banshidawang
（是私有项目）
### 项目部署
项目部署在 我的VPS 上，使用宝塔的python项目管理器部署，
具体能查看的配置有：
包文件：requirements.txt
```
asgiref==3.11.0
attrs==25.4.0
autobahn==25.12.2
Automat==25.4.16
cbor2==5.7.1
cffi==2.0.0
click==8.3.1
constantly==23.10.4
cryptography==46.0.3
daphne==4.2.1
Django==6.0
gunicorn==23.0.0
h11==0.16.0
h2==4.3.0
hpack==4.1.0
Hypercorn==0.18.0
hyperframe==6.1.0
hyperlink==21.0.0
idna==3.11
Incremental==24.11.0
Markdown==3.10
msgpack==1.1.2
packaging==25.0
priority==2.0.0
psycopg2-binary==2.9.11
py-ubjson==0.16.1
pyasn1==0.6.1
pyasn1_modules==0.4.2
pycparser==2.23
Pygments==2.19.2
pyOpenSSL==25.3.0
service-identity==24.2.0
sqlparse==0.5.5
Twisted==25.5.0
txaio==25.12.2
typing_extensions==4.15.0
ujson==5.11.0
uvicorn==0.40.0
uWSGI==2.0.31
wsproto==1.3.2
zope.interface==8.1.1
```
启动方式：gunicorn
应用名称：application
端口号：8099
域名管理：news.05320532.xyz
外网映射：打开
配置文件：
```
server
{
    listen 80;
    listen 443 ssl http2;
    server_name news.05320532.xyz;

    index index.html index.htm default.htm default.html;
    root /www/wwwroot/banshidawang;

    include /www/server/panel/vhost/nginx/extension/banshidawang/*.conf;

    #CERT-APPLY-CHECK--START
    include /www/server/panel/vhost/nginx/well-known/banshidawang.conf;
    #CERT-APPLY-CHECK--END


    # ================= SSL 配置 =================
    ssl_certificate     /www/server/panel/vhost/cert/banshidawang/fullchain.pem;
    ssl_certificate_key /www/server/panel/vhost/cert/banshidawang/privkey.pem;
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    add_header Strict-Transport-Security "max-age=31536000";
    error_page 497 https://$host$request_uri;
    # ============================================


    # ================= 错误页 =================
    #error_page 404 /404.html;
    #error_page 502 /502.html;
    # ==========================================

    location = /favicon.ico {
        alias /www/wwwroot/banshidawang/staticfiles/favicon.ico;
        access_log off;
        log_not_found off;
    }
    # ================= Django 静态文件 =================
    location /static/ {
        alias /www/wwwroot/banshidawang/staticfiles/;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
        access_log off;
    }
    # ==================================================


    # ================= 伪静态 =================
    include /www/server/panel/vhost/rewrite/python_banshidawang.conf;
    # ==========================================


    # ================= 禁止访问敏感文件 =================
    location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md|package.json|package-lock.json|\.env) {
        return 404;
    }
    # ===================================================


    # ================= SSL 验证目录 =================
    location /.well-known/ {
        root /www/wwwroot/java_node_ssl;
    }

    if ($uri ~ "^/\.well-known/.*\.(php|jsp|py|js|css|lua|ts|go|zip|tar\.gz|rar|7z|sql|bak)$") {
        return 403;
    }
    # ===============================================


    # ================= 反向代理 Django =================
    location / {
        proxy_pass http://127.0.0.1:8099;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Scheme $scheme;

        proxy_connect_timeout 30s;
        proxy_read_timeout 86400s;
        proxy_send_timeout 30s;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        add_header X-Cache $upstream_cache_status;
    }
    # ==================================================


    access_log /www/wwwlogs/banshidawang.log;
    error_log  /www/wwwlogs/banshidawang.error.log;
}
```
gunicorn配置：
```
# 项目目录
chdir = '/www/wwwroot/banshidawang'

# 指定进程数
workers = 2

# 指定每个进程开启的线程数
threads = 2

#启动用户
user = 'www'

# 启动模式
worker_class = 'sync'

# 绑定的ip与端口
bind = '0.0.0.0:8099' 

# 设置进程文件目录（用于停止服务和重启服务，请勿删除）
pidfile = '/www/wwwroot/banshidawang/gunicorn.pid'

# 设置访问日志和错误信息日志路径
accesslog = '/www/wwwlogs/python/banshidawang/gunicorn_acess.log'
errorlog = '/www/wwwlogs/python/banshidawang/gunicorn_error.log'

# 日志级别，这个日志级别指的是错误日志的级别，而访问日志的级别无法设置
# debug:调试级别，记录的信息最多；
# info:普通级别；
# warning:警告消息；
# error:错误消息；
# critical:严重错误消息；
loglevel = 'info' 

# 自定义设置项请写到该处
# 最好以上面相同的格式 <注释 + 换行 + key = value> 进行书写， 
# PS: gunicorn 的配置文件是python扩展形式，即".py"文件，需要注意遵从python语法，
# 如：loglevel的等级是字符串作为配置的，需要用引号包裹起来
```
Python版本:Python 3.14.2