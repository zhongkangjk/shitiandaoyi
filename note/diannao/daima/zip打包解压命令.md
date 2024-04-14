---
title: zip打包解压命令
categories:
  - 计算机
  - linux
tags:
  - linux
date: 2022-04-27 00:21:09
---
zip命令
<!-- more -->

zip 命令为打包压缩命令，一般为了跟 windows 交互才会用的，不涉及 windows 推荐使用tar配合 gzip,bzip2,xz

```shell
#常用命令选项
-d       从压缩文件内删除指定的文件。
-m       把文件移到压缩文件中。
-0-9     压缩比
-r       递归处理，所有文件和子目录一并处理。
-x<范本样式>       压缩时排除符合条件的文件。
-c       交互为每一个文件设置注释
-z       交互多行注释,英文句话.来表示结束
-e       交互设置密码
-P       直接设置密码
zip test.zip test.txt       #添加压缩文件
zip test.zip test1.txt      #移动文件到压缩包
zip -d test.zip test.txt    #删除test.txt

zip -r test.zip ./*         #压缩当前全部文件到test.zip
zip test2.zip test2/*       #打包目录
zip test3.zip tests/* -x tests/ln.log      #压缩目录,除了tests/ln.log

zip -r test.zip ./* -P 123      #设置密码(明文设置密码不太安全)
zip -r test.zip ./* -e           #交互设置密码(安全)

#设置压缩比
#-0不压缩，-9最高压缩，默认为-6
zip test.zip test.txt -6
```

unzip

```shell
-d     指定目录
-n     解压时不覆盖
-o     不询问直接覆盖
-l     显示压缩文件内所包含的文件。
-v     显示压缩文件内所包含的文件。
-x     指定不要处理哪些文件。

-P      解压缩密码
#解压到当前目录并直接覆盖
unzip -o test1.zip

#指定解压目录
unzip test1.zip -d /tmp/

#解压特定文件
unzip test1.zip inc abc

#查看zip包里所有文件
unzip -l test.zip

#只查看zip包里第1级文件或目录
unzip -l test.zip -x '*/*/*'
```