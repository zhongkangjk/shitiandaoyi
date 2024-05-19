## 导出一下之前环境
source myenv/bin/activate  # 激活虚拟环境
pip freeze > requirements.txt  # 导出包到 requirements.txt 文件

## 发现python项目管理器不能正确安装依赖
只能手动的安装一下

## 发现安装以后有报错
原来是缺少log文件夹，
之前没有添加到git里，
同样问题的还有收集的静态文件。

## 静态文件NGINX配置
```
location /static {
      alias /www/wwwroot/shuai4-django/collected_static;
      }
```
## 登录以后发现403CSRF验证失败被阻拦

```
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Host $host;
```
## 存一下之前服务器的计划任务
```
cd /www/wwwroot/shuai4-django-env3.7/shuai4-django/&&/www/wwwroot/shuai4-django-env3.7/bin/python /www/wwwroot/shuai4-django-env3.7/shuai4-django/day-update.py

/www/wwwroot/shuai4-django-env3.7/bin/python /www/wwwroot/shuai4-django-env3.7/shuai4-django更新22电话.py

cp /www/wwwroot/shuai4-django-env3.7/shuai4-django/db.sqlite3 /www/beifen/"$(date +%Y%m%d)".sqlite3

```