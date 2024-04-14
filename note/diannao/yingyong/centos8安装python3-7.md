---
title: centos8安装python3.7
date: 2021-08-10 21:42:18
categories:
  - 计算机
  - linux
tags:
  - linux
  - python
---

因为得在破腾讯的轻量上安装python3.7，不太好弄找了个攻略

<!-- more -->

1、执行以下命令，更新yum源

```bash
yum update
```

2、安装依赖包

```bash
yum install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel libffi-devel gcc make
```

3、下载安装包

```bash
wget https://www.python.org/ftp/python/3.7.6/Python-3.7.6.tar.xz
```

4、解压

```bash
tar -xf  Python-3.7.6.tar.xz
```

5、编译安装

```bash
#创建安装目录
mkdir /usr/local/python-3.7.6
#进入安装目录
cd Python-3.7.6
#配置编译的路径
./configure --prefix=/usr/local/python3.7.6 --with-ssl
#按提示继续命令
./configure --enable-optimizations
#开始编译
make && make install
```

6、验证是否成功

```bash
python3 -V
pip3 -V
```







### 原文链接：

https://blog.csdn.net/ispeasant/article/details/107791316
