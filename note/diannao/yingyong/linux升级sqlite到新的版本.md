---
title: linux升级sqlite到新的版本
categories:
  - 计算机
  - linux
tags:
  - linux
date: 2022-05-27 22:27:48
---
在迁移django项目过程中遇到不明问题，定睛一瞧竟是sqlite不到3.8
<!-- more -->
辣鸡yum安装就说最新是3.7  不大行

### 先看看现在的版本

`sqlite3 --version`

### 打开sqlite官网下载页面
`https://www.sqlite.org/download.html`

### 选择这个，复制他的链接

![image-20220527223417531](https://q1.masteryi.top/PicGo/image-20220527223417531.png)

### 编译安装

```shell
wget 他的链接
tar -zxvf 那个文件.tar.gz
cd 那个文件
./configure --prefix=/usr/local/sqlite
make && make install
```

### 更改旧的sqlite3

```shell
mv /usr/bin/sqlite3 /usr/bin/sqlite3_old
```

### 设置新的sqlite3

```shell
mv /usr/local/sqlite/bin/sqlite3 /usr/bin/sqlite3
#也许可能只要这样
ldconfig
```

### 最后再看看版本

`sqlite3 --version`