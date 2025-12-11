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


## alist云盘Webdav该访问哪个地址
```
默认格式
WebDAV 的访问地址通常是：

http://<你的AList域名或IP>:<端口>/dav


例如：

如果你在本地运行 AList，地址可能是：

http://127.0.0.1:5244/dav


如果你配置了外部域名，比如 alist.example.com，则访问地址为：

http://alist.example.com/dav


确认 AList 配置

登录到你的 AList 管理页面。

进入设置 > 服务 > WebDAV，确认 WebDAV 是否已启用，并查看具体的地址和端口。

用户凭证
WebDAV 通常需要用户名和密码认证：

默认用户名密码与你的 AList 登录账户一致。

如果需要专属 WebDAV 账户，你可以在 AList 的设置 > 账户中创建或修改。
```