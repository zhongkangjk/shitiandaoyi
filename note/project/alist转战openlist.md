### 备份
管理页面进行
### 安装openlist通过一键脚本
`curl -fsSL https://res.oplist.org/script/v4.sh > install-openlist-v4.sh && sudo bash install-openlist-v4.sh`
### 安装以后登录后台管理
发现备份的页面恢复以后，
不能恢复用户相关，
于是重新设置和之前相同的用户名和密码，
并且启动访客模式，
着重注意设置访客目录。

### 管理命令
`openlist`
### 存放位置
openlist 存放位置在 `/opt/openlist`
文件存放位置在 `/www/alist`
### 利用宝塔反代5244端口
进行反代域名alist.05320532.xyz