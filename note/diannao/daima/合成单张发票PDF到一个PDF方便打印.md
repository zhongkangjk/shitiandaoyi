---
title: 合成单张发票PDF到一个PDF方便打印
categories:
  - 计算机
  - python
tags:
  - python
  - pdf
date: 2022-03-25 14:04:01
---
发票pdf都是占一张A4纸，给他合成到一起两张打一页
<!-- more -->

### 转载自不知名

```python
import os
from PyPDF2 import PdfFileReader
from PyPDF2 import PdfFileWriter

print("将需要转换的文件夹拖入命令行 按回车（默认为此文件所在目录）")
workpath = input()
if workpath == '':
    workpath = os.getcwd()
output = os.path.join(workpath,"合并后的.pdf")
filelist = []

files = os.listdir(workpath)

for file in files:
    if file.split('.')[-1] in ['pdf', 'PDF']:
        filelist.append(os.path.join(workpath, file))

filenum = len(filelist)

print("共找到%d个pdf文件" %filenum)
 
writer = PdfFileWriter()  #实例化写类

for i in range(filenum):
    pageobj = PdfFileReader(filelist[i]).getPage(0)
    if i%2 == 0:
        blankpage = writer.addBlankPage(610,810)
        blankpage.mergeTranslatedPage(pageobj,0,410)
    else:
        blankpage.mergeTranslatedPage(pageobj,0,0)
# writer.removeLinks() # 移除交互链接,部分发票pdf文件在位移后会有图章重复的情况,需要移除.
writer.write(open(output,'wb')) # 写入新的文件,完成合并.

print("转换成功 输出文件",output)
#如果是在当前文件夹，最好把结果文件处理到别的地方
#个别发票平台移除交互链接会把签章去掉
```

