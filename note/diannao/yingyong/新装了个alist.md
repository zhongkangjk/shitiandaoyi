## 1


```
配置文件路径：/网站目录/alist/data/config.json
---------如何获取密码？--------
先cd到alist所在目录:
cd /网站目录/alist
随机设置新密码:
./alist admin random
或者手动设置新密码:
./alist admin set NEW_PASSWORD
----------------------------
启动服务中

查看状态：systemctl status alist
启动服务：systemctl start alist
重启服务：systemctl restart alist
停止服务：systemctl stop alist
```

##  解决Alist上传文件时，提示Request failed with status code 413的问题
上传一个超过50M的文件的时候，
报了Request failed with status code 413。
ALIST面板没找到限制大小的选项。
查了下是因为Nginx的设置问题，
于是我找到alist网站的nginx配置文件里一顿找，
并没有找到。
又百度，
发现需要需要在Nginx总配置里改。
我这宝塔，
所以是在软件商店的Nginx设置里的配置修改里修改。
果然找到了client_max_body_size。
改一下大小就xin。