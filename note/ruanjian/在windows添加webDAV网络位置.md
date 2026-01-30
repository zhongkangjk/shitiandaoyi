---
title: 在windows添加webDAV网络位置
categories:
  - 计算机
tags:
  - webDAV
date: 2021-08-18 19:43:54
---
为了方便同步数据，特给Cloudreve所提供的webDAV加到我的windows上
<!-- more -->
### 修改注册表
修改注册表`计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WebClient\Parameters`的`BasicAuthLevel`值为2，此意为同时支持同时支持http和https，默认只支持https
### 重启服务
服务名称为webclient
### 添加
在Windows资源管理器空白处右键，选添加一个网络位置，
填写地址，用户名和密码即可