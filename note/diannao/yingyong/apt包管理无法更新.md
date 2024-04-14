之前的服务器坏了以后重装需要更新apt
结果如下
```
root@SardonicMilky-VM:~# apt-get update
Get:1 http://security.debian.org/debian-security buster/updates InRelease [34.8                                                                                                                                                                                                                                              kB]
Get:2 http://deb.debian.org/debian buster InRelease [122 kB]
Get:3 http://deb.debian.org/debian buster-updates InRelease [56.6 kB]
Reading package lists... Done
E: Repository 'http://security.debian.org/debian-security buster/updates InRelea                                                                                                                                                                                                                                             se' changed its 'Suite' value from 'stable' to 'oldoldstable'
N: This must be accepted explicitly before updates for this repository can be ap                                                                                                                                                                                                                                             plied. See apt-secure(8) manpage for details.
N: Repository 'http://deb.debian.org/debian buster InRelease' changed its 'Versi                                                                                                                                                                                                                                             on' value from '10.1' to '10.13'
E: Repository 'http://deb.debian.org/debian buster InRelease' changed its 'Suite                                                                                                                                                                                                                                             ' value from 'stable' to 'oldoldstable'
N: This must be accepted explicitly before updates for this repository can be ap                                                                                                                                                                                                                                             plied. See apt-secure(8) manpage for details.
E: Repository 'http://deb.debian.org/debian buster-updates InRelease' changed it                                                                                                                                                                                                                                             s 'Suite' value from 'stable-updates' to 'oldoldstable-updates'
N: This must be accepted explicitly before updates for this repository can be ap                                                                                                                                                                                                                                             plied. See apt-secure(8) manpage for details.
```
查了一下这种情况需要使用
```
apt-get --allow-releaseinfo-change update
apt-get --allow-releaseinfo-change update 是一个用于更新包管理系统中可用软件包信息的命令。让我解释一下每个部分的含义：

apt-get: 这是一个用于在 Debian 及其衍生发行版中进行包管理操作的命令行工具。它用于安装、升级和删除软件包。

update: 这个子命令告诉 apt-get 更新本地软件包数据库。本地数据库包含了可用软件包的信息，如版本号、依赖关系等。

--allow-releaseinfo-change: 这是一个选项，它允许在软件包库中有关发行版信息的变化时继续执行更新操作。有时候，发行版信息的变化可能导致更新操作被拒绝，这个选项允许忽略这些变化，继续更新软件包数据库。

因此，这个命令的目的是强制执行软件包数据库的更新，即使发行版信息发生了变化，并且通过 --allow-releaseinfo-change 选项允许忽略与发行版信息相关的问题。这在一些特定情况下可能是必要的，但在一般情况下，不建议随意使用这个选项。
```