---
title: uniapp部署的网页端非主页刷新404问题的解决方案
categories:
  - 计算机
  - 前端
tags:
  - uniapp
date: 2022-04-08 23:16:08
---
在nginx增加一行
<!-- more -->

```nginx
location / {
	try_files $uri $uri/ /index.html;
}
```

实测么的问题，但其实我不知道为啥，无它，百度尔
