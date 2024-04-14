---
title: 批量把当前文件夹内的word文档转换为pdf
date: 2021-08-13 21:51:00
categories:
  - 计算机
  - python
tags: 
  - python
  - word
  - pdf
---

批量把当前文件夹内的word文档转换为pdf

<!-- more -->

### 代码

```python
from win32com.client import Dispatch
from os import walk,getcwd


def doc2pdf(input_file):
    word = Dispatch('Word.Application')
    doc = word.Documents.Open(input_file)
    doc.SaveAs(input_file.replace(".doc", ".pdf"), FileFormat=17)
    doc.Close()
    word.Quit()


if __name__ == "__main__":
    doc_files = []
    directory = getcwd()
    for root, dirs, filenames in walk(directory):
        for file in filenames:
            if file.endswith(".doc") or file.endswith(".docx"):
                print(file)
                doc2pdf(str(root + "\\" + file))
```

### 备注

其中SaveAs中第二个参数FileFormat=17是指定保存文档时使用的格式，17是PDF

以下是参考

```
WdSaveFormat 枚举   
指定要在保存文档时使用的格式。 
版本信息 已添加版本：  
      名称                  值           说明   
wdFormatDocument            0   Microsoft Word 格式。   
wdFormatDOSText             4   Microsoft DOS 文本格式。   
wdFormatDOSTextLineBreaks   5   Microsoft DOS 文本格式，并且保留换行符。   
wdFormatEncodedText         7   编码文本格式。   
wdFormatFilteredHTML       10   筛选的 HTML 格式。   
wdFormatHTML                8   标准 HTML 格式。   
wdFormatRTF                 6   RTF 格式。   
wdFormatTemplate            1   Word 模板格式。   
wdFormatText                2   Microsoft Windows 文本格式。   
wdFormatTextLineBreaks      3   Windows 文本格式，并且保留换行符。   
wdFormatUnicodeText         7   Unicode 文本格式。   
wdFormatWebArchive          9   Web 档案格式。   
wdFormatXML                11   可扩展标记语言 (XML) 格式。   
wdFormatDocument97          0   Microsoft Word 97 文档格式。   
wdFormatDocumentDefault    16   Word 默认文档文件格式。对于 Word 2010，这是 DOCX 格式。   
wdFormatPDF                17   PDF 格式。   
wdFormatTemplate97          1   Word 97 模板格式。   
wdFormatXMLDocument        12   XML 文档格式。   
wdFormatXMLDocumentMacroEnabled   13   启用了宏的 XML 文档格式。   
wdFormatXMLTemplate        14   XML 模板格式。   
wdFormatXMLTemplateMacroEnabled   15   启用了宏的 XML 模板格式。   
wdFormatXPS            18   XPS 格式。
```



文档网址

https://docs.microsoft.com/zh-cn/office/vba/api/word.wdsaveformat