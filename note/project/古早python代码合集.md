
<!-- more -->

### 发送邮件及附件

```python
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication


def 发送邮件(邮件标题,称呼,邮件文字,发件人邮箱,密码,收件人邮箱,附件路径列表,附件命名列表):
    msg = MIMEMultipart()
    msg["Subject"] = 邮件标题
    msg["From"]    = 发件人邮箱  
    msg["To"]      = 称呼
    #这是文字部分
    part = MIMEText(邮件文字)
    msg.attach(part)
    #这是附件部分
    for 附件路径,附件命名 in zip(附件路径列表,附件命名列表):
        part = MIMEApplication(open(附件路径,'rb').read())
        part.add_header('Content-Disposition', 'attachment', filename=附件命名)
        msg.attach(part)

    s = smtplib.SMTP("smtp.qq.com", timeout=60)#SMTP服务的网址
    try:
        s.login(发件人邮箱, 密码)
        s.sendmail(发件人邮箱, 收件人邮箱, msg.as_string())#收件人邮箱可以是列表
        s.close()
        print("发送成功")
    except:
        print("发送失败")
```

### win32操作相关的

```python
import win32gui,win32con,win32api

# 操作win32相关
def 点击(id):
    win32gui.SendMessage(id,win32con.WM_LBUTTONDOWN, 0,0)
    win32gui.PostMessage(id,win32con.WM_LBUTTONUP, 0,0)
def 填信息(id,text):
    win32gui.SendMessage(id,win32con.WM_SETTEXT, 0,text)
def 发送回车(id):
    win32gui.SendMessage(id,win32con.WM_KEYDOWN, win32con.VK_RETURN,0)
    win32gui.PostMessage(id,win32con.WM_KEYUP, win32con.VK_RETURN,0)
def 列出子窗口句柄(id):
    hwndChildList = []
    win32gui.EnumChildWindows(id, lambda hwnd,param: param.append(hwnd),hwndChildList)
    n = 0
    for i in hwndChildList:
        print(i ,"{:#016X}".format(i),win32gui.GetWindowText(i),n)
        n += 1
    return hwndChildList
def 获得窗口标题的句柄(name):
    hwndChildList = []
    win32gui.EnumChildWindows(None, lambda hwnd,param: param.append(hwnd),hwndChildList)
    for i in hwndChildList:
        if name in win32gui.GetWindowText(i):
            return i
def 提取句柄文本(句柄):
    # 获取识别结果中输入框文本
    length = win32gui.SendMessage(句柄, win32con.WM_GETTEXTLENGTH)+1
    buf = win32gui.PyMakeBuffer(length)
    #发送获取文本请求
    win32api.SendMessage(句柄, win32con.WM_GETTEXT, length, buf)
    #下面应该是将内存读取文本
    address, length = win32gui.PyGetBufferAddressAndLen(buf[:-1])
    text = win32gui.PyGetString(address, length)
    return text
#print(提取句柄文本(列出子窗口句柄(获得窗口标题的句柄('来电接听'))[41]))
```

### 连续点击数据的tkinter

```python
from tkinter import *
from tkinter import ttk

def 连续点击tkinter():
    表1 = [1,2,3]
    表2 = [4,5,6]
    表3 = [7,8,9]
    表 = [表1,表2,表3]

    def 选表():
        players["values"] = 表[var.get()-1]
        players.current(0) #默认第一个开始
    def 执行查找(*args):
        #使用players.get()
        #然后自增
        players.set(players["values"][players["values"].index(players.get())+1])
    root = Tk()
    var = IntVar()
    var.set(1)
    name = StringVar()
    root.wm_attributes('-topmost',1)

    单选框1 = Radiobutton(root, text="表1", value=1, variable=var, command = 选表).pack()
    单选框2 = Radiobutton(root, text="表2", value=2, variable=var, command = 选表).pack()
    单选框2 = Radiobutton(root, text="表3", value=3, variable=var, command = 选表).pack()

    players = ttk.Combobox(root, textvariable=name,width=50)
    players["values"] = 表1
    players["state"] = "readonly"

    players.current(0)
    # players.set("演员表")
    # print(players.get())

    players.pack()
    Button(root,text = "点击查询",command = 执行查找,width=50,height=20).pack()

    root.mainloop()
```

### 爬虫获取post接口数据

```python
import json
import requests
def 爬虫获取post数据():
    postUrl = ''
    # 请求头设置
    payloadHeader = {
    'Host': '',
    'Origin': '',
    #'Cookie': '',
    'Referer': '',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
    'Content-Type': 'application/json',
    'Content-Length': '32',
    'Connection': 'keep-alive',
    'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NDE1OTQ4NjAsInN1YiI6ImJ3eWRiZyJ9.t_XDqE2CaCSxg_Mtw5BrgUCTFpjpmU9oyI32oGPO9wY',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Accept-Encoding': 'gzip, deflate',
    'Accept': 'application/json, text/plain, */*',
    }
    # 下载超时
    timeOut = 25
    # payloadData数据
    payloadData = {
    '': ""
        }
    dumpJsonData = json.dumps(payloadData)
    res = requests.post(postUrl, data=dumpJsonData, headers=payloadHeader, timeout=timeOut, allow_redirects=False)
    res_dict = eval(res.text)
    信息列表 = []
	#123123
    return 信息列表
```

### selenium相关操作

```python
from selenium.webdriver.chrome.options import Options

# chrome_options = Options()
# #chrome_options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")
# chrome_driver = "chromedriver.exe"
# driver = webdriver.Chrome(chrome_driver, chrome_options=chrome_options)

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
import time
# driver.find_elements_by_id("cheddar")
# driver.find_element_by_css_selector("#cheese #cheddar")
# driver.find_elements_by_class_name()
# driver.find_element_by_xpath()
# driver..find_element_by_link_text("新闻")
def 例子():
    with webdriver.Chrome() as driver:
        wait = WebDriverWait(driver, 10 , 0.5) #显式等待  until  /  until_not
        driver.implicitly_wait(10) #隐性等待
        driver.get("https://www.baidu.com") #发送请求
        #driver.refresh() #刷新浏览器
        #driver.set_window_size(1400,800) #设置浏览器大小
        driver.maximize_window()   #浏览器窗口最大化
        driver.find_element_by_id("kw").send_keys("selenium",Keys.ENTER)
        #driver.find_element_by_id("su").click()
        time.sleep(10)
        first_result = wait.until(presence_of_element_located((By.CSS_SELECTOR, "h3>div")))
        #print(first_result.get_attribute("textContent"))
def 综合():
    #先快捷方式后加' --remote-debugging-port=9222 --user-data-dir="C:\selenum\AutomationProfile"  https://live.bwjf.com/dashboard'打开浏览器
    chrome_options = Options()
    chrome_options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")
    chrome_driver = r"C:\Program Files (x86)\Google\Chrome\Application\chromedriver.exe"
    driver = webdriver.Chrome(chrome_driver, chrome_options=chrome_options)
    driver.implicitly_wait(10)

    def 点击按钮(按钮位置):
        time.sleep(0.2)
        driver.find_element_by_xpath(按钮位置).click()
    def 填写内容(按钮位置,内容):
        driver.find_element_by_xpath(按钮位置).send_keys(内容)
    def 选择下拉框(按钮位置,选项):
        点击按钮(按钮位置)
        time.sleep(0.1)
        点击选项 = driver.find_element_by_xpath('''//span[text()="'''+选项+'''"]''')
        print(点击选项)
        点击选项.click()
    def 选择下拉框特殊(按钮位置,选项):
        点击按钮(按钮位置)
        time.sleep(0.1)
        点击选项 = driver.find_element_by_css_selector('body > div.el-select-dropdown.el-popper > div.el-scrollbar > div.el-select-dropdown__wrap.el-scrollbar__wrap > ul > li.el-select-dropdown__item:nth-child(2)')
        点击选项.click()
    def 输入后选择下拉框(按钮位置,内容和选项):
        填写内容(按钮位置,内容和选项)
        print('''//span[text()="'''+内容和选项+'''"]''')
        time.sleep(0.1)
        选项出现 = driver.find_element_by_xpath('''//span[text()="'''+内容和选项+'''"]''')
        time.sleep(0.5)
        选项出现.click()
```

### django导入库数据

```python
import os,sys,django,xlrd
# 本文件在manage.py同文件夹下
def django导入库数据():
    文件名 = '表.xls'
    读取的Excel = xlrd.open_workbook(filename = 文件名)
    文件内第一个表= 读取的Excel.sheet_by_index(0)
    # def 获得列序号(表名,查找字段名):
    #     列序号 = None
    #     for i in range(表名.ncols):
    #         if (表名.cell_value(0,i) == 查找字段名):
    #             列序号 = i
    #             break
    #     return 列序号
    #竖向资料 = [文件内第一个表.col_values(i) for i in range(文件内第一个表.ncols)]
    横向资料 = [文件内第一个表.row_values(i) for i in range(1,文件内第一个表.nrows)]

    project_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    sys.path.append(project_path)
    os.environ['DJANGO_SETTINGS_MODULE'] = 'shuai.settings'
    django.setup()
    from APP名称.models import 模型类名
    list = []
    for i in 横向资料:
        list.append(模型类名(字段1 = i[0],字段2 = i[1],字段3 = i[2],字段4 = i[3]))

    模型类名.objects.bulk_create(list)
```

### 返回文件绝对路径

```python
import os,sys

def 返回文件绝对路径(当前路径文件名):
    if hasattr(sys, '_MEIPASS'):
        # PyInstaller会创建临时文件夹temp
        # 并把路径存储在_MEIPASS中
        base_path = sys._MEIPASS
    else:
        base_path = os.path.abspath('.')
    return os.path.join(base_path, 当前路径文件名)

#print(返回文件绝对路径('list1.py'))
```

### 返回当前路径第一个包含名字的文件


```python
import os

def 返回当前路径第一个包含名字的文件(名字):
    namelist = os.listdir(os.getcwd())
    for x in namelist:
        if 名字 in x and '$' not in x:
            路径 = x
            return 路径
            break
#print(返回当前路径第一个包含名字的文件('lis'))
```

### xlrd打开excel文件

```python
import xlrd

class 打开excel文件():
    def __init__(self,文件名,第几个表):
        self.文件 = xlrd.open_workbook(filename = 文件名)
        self.表 = self.文件.sheet_by_index(第几个表-1)


    def 获得横向资料(self):
        self.数据 = [self.表.row_values(i) for i in range(self.表.nrows)]
        return self.数据


    def 获得纵向资料(self):
        self.数据 =  [self.表.col_values(i) for i in range(self.表.ncols)]
        return self.数据

    def 获得名称列数据(self,名称):
        def 获得列序号(表名,查找字段名):
            列序号 = None
            for i in range(表名.ncols):
                if (表名.cell_value(0,i) == 查找字段名):
                    列序号 = i
                    break
            return 列序号
        print(获得列序号(self.表,名称))
        self.数据 = self.表.col_values(获得列序号(self.表,名称),1)
        return self.数据

# 文件 = 打开excel文件('测试.xlsx',1)
# print(文件.获得名称列数据('地址'))
```

### 列表取第一个电话

```python
import re

def 列表取第一个电话(list1):
    list2 = []
    for i in list1:
        for j in i:
            if re.match(r"^1\d{10}$", j):
                list2.append(j)
                break
        else:
            list2.append('mei')
    return list2
#list1 = [['123','13210000000','13210000000'],['159','15988886666'],['123']]
#print(列表取第一个电话(list1))
```

### 求列表元素出现次数字典

```python
def 求列表元素出现次数字典(list):
    结果 = {}
    for i in set(list):
        结果[i] = list.count(i)
    return 结果
```


### openpyxl写新文件

```python
import openpyxl
from openpyxl.styles import Alignment, Font

def openpyxl写新文件():
    填充的数据列表 = []

    结果文件 = openpyxl.Workbook()

    表1 = 结果文件.active

    表1.title = '表1'
    表1.merge_cells(start_row=1, start_column=1, end_row=1, end_column=6)
    表1.cell(1, 1).value = '这里我就写个字'

    标题 = 表1['A1']
    标题.font = Font(name = '黑体',size = 20)
    标题.alignment = Alignment(horizontal='center', vertical='center')

    表1.column_dimensions['B'].width = 33
    表1.column_dimensions['C'].width = 11

    for i in 填充的数据列表:
        表1.append(i)

    表2 = 结果文件.create_sheet('表2')
    表2.append('数据')

    结果文件.save('结果文件.xlsx')
```

### 把pdf文件转换为一张张图片的形式

```python
from pdf2image import convert_from_path
import os

def convert_pdfs_to_images(folder_path):
    for filename in os.listdir(folder_path):
        if filename.endswith('.pdf'):
            pdf_path = os.path.join(folder_path, filename)
            output_folder = os.path.splitext(pdf_path)[0]  # 使用PDF文件名作为输出文件夹名
            os.makedirs(output_folder, exist_ok=True)  # 创建输出文件夹
            images = convert_from_path(pdf_path)

            for i, image in enumerate(images):
                image_path = os.path.join(output_folder, f'page_{i + 1}.png')
                image.save(image_path, 'PNG')

# 使用示例
pdf_folder_path = '.'  # 当前文件夹路径
convert_pdfs_to_images(pdf_folder_path)

```

### 更改django-admin的TextField显示长宽度
#### 代码
```python
#在admin.py中
from django.forms import TextInput, Textarea
from django.db import models

class YourModelAdmin(admin.ModelAdmin):

    formfield_overrides = {
        models.CharField: {'widget': TextInput(attrs={'size':'20'})},
        models.TextField: {'widget': Textarea(attrs={'rows':1, 'cols':50})},
    }

admin.site.register(YourModel, YourModelAdmin)
```
#### 备注
给Textarea改成一行 长度50就差不多了得根据预览情况，多了也没试


### 共享文件到局域网ip
```python
import http.server
import socketserver
import socket

PORT = 80

myname = socket.getfqdn(socket.gethostname())
myaddr = socket.gethostbyname(myname)
print('请在局域网访问以下合适的IP：')
#显示所有IP地址
for addr in socket.gethostbyname_ex(myname)[2]:
    print(addr)
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    #print("serving at port", PORT)
    httpd.serve_forever()
```

### 合成单张发票PDF到一个PDF方便打印

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

### 批量把当前文件夹内的word文档转换为pdf

#### 代码

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

#### 备注

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


### 迁移django项目记录
#### 导出一下之前环境
source myenv/bin/activate  # 激活虚拟环境
pip freeze > requirements.txt  # 导出包到 requirements.txt 文件

#### 发现python项目管理器不能正确安装依赖
只能手动的安装一下

#### 发现安装以后有报错
原来是缺少log文件夹，
之前没有添加到git里，
同样问题的还有收集的静态文件。

#### 静态文件NGINX配置
```
location /static {
      alias /www/wwwroot/shuai4-django/collected_static;
      }
```
#### 登录以后发现403CSRF验证失败被阻拦

```
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Host $host;
```
#### 存一下之前服务器的计划任务
```
cd /www/wwwroot/shuai4-django-env3.7/shuai4-django/&&/www/wwwroot/shuai4-django-env3.7/bin/python /www/wwwroot/shuai4-django-env3.7/shuai4-django/day-update.py

/www/wwwroot/shuai4-django-env3.7/bin/python /www/wwwroot/shuai4-django-env3.7/shuai4-django更新22电话.py

cp /www/wwwroot/shuai4-django-env3.7/shuai4-django/db.sqlite3 /www/beifen/"$(date +%Y%m%d)".sqlite3

```


### 迁移django项目时试水宝塔python管理器中的uwsgi与nginx设置(早期)



#### python管理器里的uwsgi配置文件

```ini
[uwsgi]
chdir   =项目文件夹绝对路径
module  =shuai4.wsgi
home    =项目文件夹绝对路径/**************************_venv
master  =true
processes  =4
socket  =127.0.0.1:9090
chmod-socket = 666
vacuum = true
daemonize =  项目文件夹绝对路径/uwsgi.log
```

#### nginx配置

```nginx
server
{
    listen 暴露给外面的端口;
    server_name ip或者域名;
    location /static {
      alias 项目文件夹绝对路径/collected_static;
      }
    location / {
      include uwsgi_params;
      uwsgi_pass 127.0.0.1:9090; #须与uwsgi一致
      client_max_body_size 20m;
      }

    access_log  /www/wwwlogs/ip或者域名.log;
    error_log  /www/wwwlogs/ip或者域名.error.log;
}
```

### 写在django-admin里的异步爬虫按钮



#### 代码

```python
from django.contrib import admin
from django.http import HttpResponse
from import_export import resources
from import_export.admin import ImportExportModelAdmin, ImportExportActionModelAdmin
from dateutil.relativedelta import relativedelta
import json,requests
from cuifei.models import 催费表类,可收表19年,可收表20年,催费表22年类
from shuju.models import 数据通知表类
from utils.models import Dictionary
import httpx,json,time,math
import asyncio,datetime,calendar
from django.forms import TextInput, Textarea
from django.db import models
from django.db.models import Q
#引入 Workbook
from openpyxl import Workbook
from django.http import HttpResponse
admin.site.site_header = '催费'
admin.site.site_title = '催费'



def 取结果(r):
    if r['obj']:
        j = []
        for i in r['obj']:
            j.append(i['fwqx'])
        return max(j),r['obj'][0]['jbrdh']
    else:
        return None,None
headers = {
    'Content-Type': 'application/json',
    'Authorization': '**************',
}

url_by_税号 = '************'
查税号URL= '******************'

@admin.register(催费表22年类)
class 催费表22管理(ImportExportActionModelAdmin):
    list_display = ('公司名称***************')
    search_fields = ('公司名称********************')
    list_per_page = 20
    date_hierarchy = '到期日'   #时间导航栏
    list_filter = ('区域','性质','到期日',UpdatedAtFilter,) #筛选器
    list_display_links = ('公司名称',)  #点击修改
    formfield_overrides = {
        models.CharField: {'widget': TextInput(attrs={'size':'20'})},
        models.TextField: {'widget': Textarea(attrs={'rows':1, 'cols':50})},
    }
    actions = ['更新可收年份','更新到期日和时间','export_admin_action']
    def get_actions(self, request):
        actions = super(催费表22管理,self).get_actions(request)
        print(actions)
        if request.user.username != 'admin':
            del actions['更新到期日和时间']
        return actions
    def 更新到期日和时间(modeladmin, request, queryset):


        async def 爬(client,body):
            def 保存结果(结果,body):
                body.到期日 = 结果[0]
                # body.经办人电话 = 结果[1]
                body.save(update_fields=['到期日'])

            r = await client.post(url_by_税号,headers=headers, data=json.dumps({'khsbh': body.税号,}),timeout=None)
            结果 = 取结果(r.json())
            if 结果[0]:
                保存结果(结果,body)
            else:
                用名称查的data = json.dumps({'count':100,'keyword': body.公司名称,'page':0})
                r = await client.post(查税号URL,headers=headers, data=用名称查的data,timeout=None)
                res_dict = r.json()
                if res_dict['obj']:
                    税号1 = res_dict['obj'][-1]['khsbh']
                    r1 = await client.post(url_by_税号,headers=headers, data=json.dumps({'khsbh': 税号1,}),timeout=None)
                    结果1 = 取结果(r1.json())
                    保存结果(结果1,body)
                else:
                    return None,None

        async def 跑():
            async with httpx.AsyncClient() as client:
                task_list = []
                for i in queryset:
                    req = 爬(client,i)
                    task = asyncio.create_task(req)
                    task_list.append(task)
                await asyncio.gather(*task_list)
        start = time.time()
        asyncio.run(跑())
        end = time.time()
        print(end-start)
        print('查日期完成于'+time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))


    def 更新可收年份(modeladmin, request, queryset):
        for i in queryset:
            if i.到期日:
                if type(i.到期日) == type('s'):
                    到期日 = datetime.datetime.strptime(i.到期日,'%Y-%m-%d').date()
                else:
                    到期日 = i.到期日
                # print(i.公司名称,i.税号)
                a = 可收表19年.objects.filter(公司名称__exact = i.公司名称).count()
                if a > 0:
                    i.可收19 = 1
                else:
                    i.可收19 = 0
                b = 可收表20年.objects.filter(Q(公司名称__exact = i.公司名称)|Q(税号__exact = i.税号)).count()
                if b > 0:
                    i.可收20 = 1
                else:
                    i.可收20 = 0
                c = 催费表类.objects.filter(Q(公司名称__exact = i.公司名称)|Q(税号__exact = i.税号)).count()
                if c > 0:
                    i.可收21 = 1
                else:
                    i.可收21 = 0
                # print(i.到期日)
                # print(datetime.date.today())
                年 = datetime.datetime.now().year
                月 = datetime.datetime.now().month
                下一个月 = (datetime.datetime.now()+relativedelta(months=1)).month
                # 日 = datetime.datetime.now().day
                # 新日 = calendar.monthrange(年,月)[1]
                新日 = calendar.monthrange(年,下一个月)[1]
                # print(新日)
                # print(datetime.date(年,月,新日)==i.到期日)
                if datetime.date(年,下一个月,新日)==到期日:
                    差年= 1
                else:
                    差年 = math.ceil((datetime.date(年,下一个月,新日)-到期日)/datetime.timedelta(days=365))
                # print(差年)
                到期日年份 = i.到期日.year
                可收字典 = {2015:1,2016:1,2017:1,2018:1,2019:i.可收19,2020:i.可收20,2021:i.可收21,2022:1}
                # 年份 = sum(listn[:差年])
                j = 0
                for i1 in range(到期日年份,到期日年份+差年):
                    # print(i1)
                    j += 可收字典[i1]
                # print(j)
                i.几年 = j
                i.save(update_fields=['可收19','可收20','可收21','几年'])
```

#### TIPS

`asyncio.run()`和`asyncio.create_task()`这之类的函数要python3.7以后才能用

### 中文化Django自带后台名字



#### 网站标题 头

`app/admin.py`

```python
from django.contrib import admin
admin.site.site_header = '催费'
admin.site.site_title = '催费'
```

#### 大菜单

`app/__init__.py`

```python

from os import path
from django.apps import AppConfig
 
VERBOSE_APP_NAME = '大菜单名字'
 
def get_current_app_name(file):
    return path.dirname(file).replace('\\', '/').split('/')[-1]
 
class AppVerboseNameConfig(AppConfig):
    name = get_current_app_name(__file__)
    verbose_name = VERBOSE_APP_NAME
 
default_app_config = get_current_app_name(__file__) + '.__init__.AppVerboseNameConfig'

```

#### 小菜单

`app/models.py`

```python
from django.db import models

class model类(models.Model):
	pass
    class Meta:
        verbose_name = '小菜单名字'
        verbose_name_plural = "'小菜单名字"
```

#### 字段名字

`app/models.py`

```python
from django.db import models

class model类(models.Model):
	age = models.CharField('字段名字',max_length=5,blank=True,null=True)
```

### 自己备份django数据库的每天发邮件设置

```python
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
import os,datetime
_user = "---"
_pwd  = "---"
_to   = "---"
today = datetime.date.today().strftime('%y%m%d')
msg = MIMEMultipart()
msg["Subject"] = today+'数据库备份'
msg["From"]    = _user
msg["To"]      = _to
part = MIMEText('这是'+ today + '份的数据文件')
msg.attach(part)
#---这是附件部分---
for name in os.listdir():
    if "db.sqlite3" in name :
        part = MIMEApplication(open(name,'rb').read())
        part.add_header('Content-Disposition', 'attachment', filename=today+'.sqlite3')
        msg.attach(part)
        break
s = smtplib.SMTP("smtp.qq.com", timeout=60)
try:
    s.login(_user, _pwd)
    s.sendmail(_user, _to, msg.as_string())
    s.close()
    print("发送成功")
except:
    print("发送失败")


# 同文件夹下发送邮件.sh内容
'''
#!/bin/bash
cd /home/sites/173.82.120.157/MasterYi_Django_blog&&python3 发送邮件.py


crontab -e
19 1 * * * sh /home/sites/173.82.120.157/MasterYi_Django_blog/发送邮件.sh
'''
```

### 自己常用的Linux系统操作命令


#### 开关uwsgi-django网站

##### 关闭uwsgi服务

``` bash
ps ax | grep uwsgi
得到类似
15005 pts/4    S      0:00 /ve/path/bin/uwsgi --ini config.ini
15006 pts/4    S      0:00 /ve/path/bin/uwsgi --ini config.ini
15007 pts/4    S      0:00 /ve/path/bin/uwsgi --ini config.ini
地址是/ve/path/bin/uwsgi
杀死
killall -s INT /ve/path/bin/uwsgi
```
##### 到对应目录开启虚拟环境
```bash
cd /www/wwwroot/shuai4-django-env&&source bin/activate
```
##### 用配置文件启动

```bash
uwsgi -d --ini shuai4-django.ini
```

##### 更新以后的开启重载关闭uwsgi方式

```bash
#开启
/www/wwwroot/shuai4-django-env3.7/bin/uwsgi -d --ini /www/wwwroot/shuai4-django-env3.7/shuai4-django.ini  --log-reopen
#重载
/www/wwwroot/shuai4-django-env3.7/bin/uwsgi --reload /www/wwwroot/shuai4-django-env3.7/uwsgi.pid
#关闭
/www/wwwroot/shuai4-django-env3.7/bin/uwsgi --stop /www/wwwroot/shuai4-django-env3.7/uwsgi.pid
```

<u></u>

#### 部署uwsgi-django网站时用到的
##### 导出导入包

```bash
#导出
pip freeze > requirements.txt
#导入
pip install -r requirements.txt
```

##### debian安装pip

```bash
sudo apt-get install python3-pip
```

##### 安装虚拟环境包

```bash
pip3 install virtualenv
```

##### 创建文件夹

```bash
mkdir /var/www
```

##### 移动到该文件夹

```bash
cd /var/www
```

##### 创建虚拟环境

```bash
virtualenv studyapi
```

##### 进入虚拟环境

```bash
source studyapi/bin/activate
```

##### 安装7z

```bash
apt install p7zip-full
```

##### 解压项目到当前文件夹

```bash
7z x dwebsite.zip
```

##### 解压项目到当前文件夹

```bash
7z x dwebsite.zip
```

##### uwsgi配置文件

```ini
[uwsgi]
chdir   =/www/wwwroot/shuai4-django-env/shuai4-django
module  =shuai4.wsgi
home    =/www/wwwroot/shuai4-django-env/
master  =true
processes  =4
socket  =127.0.0.1:9090
chmod-socket = 666
vacuum = true
pidfile=uwsgi.pid
```
##### nginx配置文件
```nginx
server
{
    listen 8097;
    server_name 49.232.5.6;
    location /static {
      alias /www/wwwroot/shuai4-django-env/shuai4-django/collected_static;
      }
    location / {
      uwsgi_pass 127.0.0.1:9090;
      include /www/server/panel/vhost/nginx/uwsgi_params;
      client_max_body_size 20m;
      }

    access_log  /www/wwwlogs/49.232.5.6.log;
    error_log  /www/wwwlogs/49.232.5.6.error.log;
}
```

### DJango-admin-增加自定义筛选器

#### 增加一个只选取月份的筛选器

`app/admin.py`

```python
from django.contrib import admin
class UpdatedAtFilter(admin.SimpleListFilter):
    title = '选择月份'
    parameter_name = '月份'

    # 菜单列表
    def lookups(self, request, model_admin):
        """
        List of values to allow admin to select
        """
        months = (
            (1, '一月'),
            (2, '二月'),
            (3, '三月'),
            (4, '四月'),
            (5, '五月'),
            (6, '六月'),
            (7, '七月'),
            (8, '八月'),
            (9, '九月'),
            (10, '十月'),
            (11, '十一月'),
            (12, '十二月')
        )
        return months

    def queryset(self, request, queryset):
        """
        Return the filtered queryset
        """
        if self.value():
            # DateTime Field can use __month to get its month value
            return queryset.filter(到期日__month=self.value())
        else:
            return queryset
@admin.register(催费表22年类)
class ********(******):
    list_filter = ('***','***','***',UpdatedAtFilter,) #筛选器
```

### django-admin返回一个excel文件的按钮函数记录


```python
def 统计到excel(self, request, queryset):
        ### 统计数量和
        def 返回姓名的合计(姓名):
            字典 = queryset.filter(姓名=姓名).aggregate(Sum('******'),Sum('****'))
            return list(字典.values())
        姓名集合 = set(queryset.all().values_list('姓名',flat=True)) #主题去重
        数据列表 = [[姓名,*返回姓名的合计(姓名)] for 姓名 in 姓名集合] #制造数据列表

        rd_book = xlrd.open_workbook('******',formatting_info=True)
        wb = copy(rd_book)  #复制一下表
        wb_sheet = wb.get_sheet(0)
        # 设置单元格格式边框
        borders = xlwt.Borders()
        borders.left = 1
        borders.right = 1
        borders.top = 1
        borders.bottom = 1
        style = xlwt.XFStyle()
        style.borders = borders
        # 设置单元格背景色为黄色
        style1 = xlwt.XFStyle()
        pattern = xlwt.Pattern()
        pattern.pattern = xlwt.Pattern.SOLID_PATTERN
        pattern.pattern_fore_colour = 5  #5是黄色
        style1.pattern = pattern
        style1.borders = borders
        # 设置单元格字体
        font = xlwt.Font()
        font.name = '微软雅黑'
        font.bold = True
        style.font = font

        ## 一行一行往上套公式啊
        for i in range(len(数据列表)):
            for j in range(len(数据列表[i])):
                wb_sheet.write(i+3,j,数据列表[i][j],style)
            当前行 = str(i+4)
            wb_sheet.write(i+3,len(数据列表[i]),xlwt.Formula('B3*B'+当前行+'+C3*C'+当前行+'+D3*D'+当前行+'+E3*E'+当前行+'+F3*F'+当前行+'+G3*G'+当前行+'+H3*H'+当前行+'+I3*I'+当前行+'+J3*J'+当前行+'+K3*K'+当前行+'+L3*L'+当前行+'+M3*M'+当前行+'+N3*N'+当前行+'+O3*O'+当前行+'+P3*P'+当前行),style1)

        wb_sheet.write(len(数据列表)+3,0,'数量合计',style)
        for i in range(len(数据列表[0])-1):
            wb_sheet.write(len(数据列表)+3,i+1,xlwt.Formula('SUM('+chr(66+i)+'4:'+chr(66+i)+str(len(数据列表)+3)+')'),style1)

        wb_sheet.write(len(数据列表)+4,0,'金额合计',style1)
        for i in range(len(数据列表[0])-1):
            wb_sheet.write(len(数据列表)+4,i+1,xlwt.Formula(chr(66+i)+'3*'+chr(66+i)+str(len(数据列表)+4)),style1)
        wb_sheet.write(len(数据列表)+3,len(数据列表[0]),'',style1)
        wb_sheet.write(len(数据列表)+4,len(数据列表[0]),xlwt.Formula('SUM(B'+str(len(数据列表)+4+1)+':P'+str(len(数据列表)+4+1)+')'),style1)
        filename = '提成汇总表'  #中文不行 我也不知道为什么
        response = HttpResponse(content_type='application/vnd.ms-excel')
        response['Content-Disposition'] = 'attachment;filename=%s.xls' % filename
        wb.save(response)
        return response
```


### django-admin只显示用户关联字段的设置


需要只让用户查看自己的数据
```python
from django.contrib.auth.models import User
关联User字段 = models.ForeignKey(User,on_delete=models.CASCADE,blank=True,null=True)


@admin.register(类)
class 类管理(ImportExportActionModelAdmin):
    exclude = ('关联User字段',)
    def has_change_permission(self, request, obj=None):
        has_class_permission = super(类管理, self).has_change_permission(request, obj)
        if not has_class_permission:
            return False
        if obj is not None and not request.user.is_superuser and request.user.id != obj.关联User字段.id:
            return False
        return True
    def get_queryset(self, request):
            if request.user.is_superuser:
                return 类.objects.all()
            return 类.objects.filter(关联User字段=request.user)
    def save_model(self, request, obj, form, change):
            if not change:
                obj.关联User字段 = request.user
            obj.save()
```

参考：[http://loonlog.com/2020/11/19/django-user-admin-author/](http://loonlog.com/2020/11/19/django-user-admin-author/)


### django导入更新数据脚本

把操作django数据库的导入更新操作汇总一下以备参考


#### 之前利用爬虫更新表内数据和用时间计算表数据的日更操作脚本

```python
import os,sys,django
import asyncio,datetime,calendar
import httpx,json,time,math
from dateutil.relativedelta import relativedelta
from django.db.models import Q
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
project_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_path)
os.environ['DJANGO_SETTINGS_MODULE'] = 'shuai4.settings'
django.setup()
from cuifei.models import 催费表22年类,可收表19年,可收表20年,催费表类
from shuju.models import 数据通知表类

def 取结果(r):
    if r['obj']:
        j = []
        for i in r['obj']:
            j.append(i['fwqx'])
        return max(j),r['obj'][0]['jbrdh']
    else:
        return None,None
headers = {
    'Content-Type': 'application/json',
    'Authorization': '***',
}

url_by_税号 = '***'
查税号URL= '***'

文本 = []
# print(催费表22年类.objects.all()[:5])
queryset = 催费表22年类.objects.all()
def 更新到期日和时间(queryset):
    async def 爬(client,body):
        def 保存结果(结果,body):
            if 结果[0]:
                body.到期日 = 结果[0]
                # body.经办人电话 = 结果[1]
                body.save(update_fields=['到期日'])

        r = await client.post(url_by_税号,headers=headers, data=json.dumps({'khsbh': body.税号,}),timeout=None)
        结果 = 取结果(r.json())
        if 结果[0]:
            保存结果(结果,body)
        else:
            用名称查的data = json.dumps({'count':100,'keyword': body.公司名称,'page':0})
            r = await client.post(查税号URL,headers=headers, data=用名称查的data,timeout=None)
            res_dict = r.json()
            if res_dict['obj']:
                税号1 = res_dict['obj'][-1]['khsbh']
                r1 = await client.post(url_by_税号,headers=headers, data=json.dumps({'khsbh': 税号1,}),timeout=None)
                结果1 = 取结果(r1.json())
                保存结果(结果1,body)
            else:
                return None,None

    async def 跑():
        async with httpx.AsyncClient() as client:
            task_list = []
            for i in queryset:
                req = 爬(client,i)
                task = asyncio.create_task(req)
                task_list.append(task)
            await asyncio.gather(*task_list)
    start = time.time()
    asyncio.run(跑())
    end = time.time()
    print(end-start)
    print('查日期完成于'+time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
    # global b
    # b = '查日期完成于'+time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())+'用时'+str(end-start)+'秒'
    文本.append('查日期完成于'+time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())+'用时'+str(end-start)+'秒')

def 更新可收年份(queryset):
    for i in queryset:
            if i.到期日:
                if type(i.到期日) == type('s'):
                    到期日 = datetime.datetime.strptime(i.到期日,'%Y-%m-%d').date()
                else:
                    到期日 = i.到期日
                # print(i.公司名称,i.税号)
                a = 可收表19年.objects.filter(公司名称__exact = i.公司名称).count()
                if a > 0:
                    i.可收19 = 1
                else:
                    i.可收19 = 0
                b = 可收表20年.objects.filter(Q(公司名称__exact = i.公司名称)|Q(税号__exact = i.税号)).count()
                if b > 0:
                    i.可收20 = 1
                else:
                    i.可收20 = 0
                c = 催费表类.objects.filter(Q(公司名称__exact = i.公司名称)|Q(税号__exact = i.税号)).count()
                if c > 0:
                    i.可收21 = 1
                else:
                    i.可收21 = 0
                # print(i.到期日)
                # print(datetime.date.today())
                年 = datetime.datetime.now().year
                月 = datetime.datetime.now().month
                下一个月 = (datetime.datetime.now()+relativedelta(months=1)).month
                # 日 = datetime.datetime.now().day
                新日 = calendar.monthrange(年,下一个月)[1]
                # print(新日)
                # print(datetime.date(年,月,新日)==i.到期日)
                if datetime.date(年,下一个月,新日)==到期日:
                    差年= 1
                else:
                    差年 = math.ceil((datetime.date(年,下一个月,新日)-到期日)/datetime.timedelta(days=365))
                # print(差年)
                到期日年份 = 到期日.year
                可收字典 = {2015:1,2016:1,2017:1,2018:1,2019:i.可收19,2020:i.可收20,2021:i.可收21,2022:1}
                # 年份 = sum(listn[:差年])
                j = 0
                for i1 in range(到期日年份,到期日年份+差年):
                    # print(i1)
                    j += 可收字典[i1]
                # print(j)
                i.几年 = j
                i.save(update_fields=['可收19','可收20','可收21','几年'])
    print('查可收几年完成于'+time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
    # global d
    # d = ('\n'+'查可收几年完成于'+time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
    文本.append('查可收几年完成于'+time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
更新到期日和时间(queryset)
更新可收年份(queryset)
def 发送邮件(邮件标题,称呼,邮件文字,发件人邮箱,密码,收件人邮箱,附件路径列表,附件命名列表):
    msg = MIMEMultipart()
    msg["Subject"] = 邮件标题
    msg["From"]    = 发件人邮箱  
    msg["To"]      = 称呼
    #这是文字部分
    part = MIMEText(邮件文字)
    msg.attach(part)
    #这是附件部分
    for 附件路径,附件命名 in zip(附件路径列表,附件命名列表):
        part = MIMEApplication(open(附件路径,'rb').read())
        part.add_header('Content-Disposition', 'attachment', filename=附件命名)
        msg.attach(part)

    s = smtplib.SMTP("smtp.qq.com", timeout=60)#SMTP服务的网址
    try:
        s.login(发件人邮箱, 密码)
        s.sendmail(发件人邮箱, 收件人邮箱, msg.as_string())#收件人邮箱可以是列表
        s.close()
        print("发送成功")
    except:
        print("发送失败")

def 拿昨天的老数据(区域):
    # 今天 = datetime.date.today()
    昨天 = datetime.date.today() - datetime.timedelta(days=1)
    # print(昨天)
    # print(type(昨天))
    a = 数据通知表类.objects.filter(Q(日期 = 昨天)&Q(区域=区域)).values()[0]
    # for i in a:
    #     print(i)
    return a


def 获得今天的新数据并存数据库(区域):
    # 崂山
    今天 = datetime.date.today()
    能查到日期的户数 = 催费表22年类.objects.filter(Q(到期日__isnull=False)&Q(区域=区域)).count()
    查不到日期的户数 = 催费表22年类.objects.filter(Q(到期日__isnull=True)&Q(区域=区域)).count()
    年 = datetime.datetime.now().year
    月 = datetime.datetime.now().month
    日 = calendar.monthrange(年,月)[1]
    下一个月 = (datetime.datetime.now()+relativedelta(months=1)).month
    下一个月日 = calendar.monthrange(年,下一个月)[1]
    到期日为当月的户数 = 催费表22年类.objects.filter(Q(到期日__range=(datetime.date(年, 月, 1),datetime.date(年, 月, 日)))&Q(区域=区域)).count()
    到期日为下月的户数 = 催费表22年类.objects.filter(Q(到期日__range=(datetime.date(年, 下一个月, 1),datetime.date(年, 下一个月,下一个月日)))&Q(区域=区域)).count()
    前一个月 = (datetime.datetime.now()-relativedelta(months=1)).month
    新日 = calendar.monthrange(年,前一个月)[1]
    今年已逾期的户数 = 催费表22年类.objects.filter(Q(到期日__range=(datetime.date(年, 1, 1),datetime.date(年, 前一个月, 新日)))&Q(区域=区域)).count()
    下两个月 = (datetime.datetime.now()+relativedelta(months=2)).month
    今年还未到期的户数 = 催费表22年类.objects.filter(Q(到期日__range=(datetime.date(年,下两个月, 1),datetime.date(年, 12, 31)))&Q(区域=区域)).count()
    往年到期户 = 催费表22年类.objects.filter(Q(到期日__lt=datetime.date(年,1,1))&Q(区域=区域)).count()
    # &Q(几年__gte=1)
    更新数据 = {
        '日期':今天,
        '区域':区域,
        '能查到日期的户数':能查到日期的户数,
        '查不到日期的户数':查不到日期的户数,
        '到期日为当月的户数':到期日为当月的户数,
        '到期日为下月的户数':到期日为下月的户数,
        '今年已逾期的户数':今年已逾期的户数,
        '今年还未到期的户数':今年还未到期的户数,
        '往年到期户':往年到期户
    }
    #存数据
    数据通知表类.objects.update_or_create(defaults=更新数据,日期=今天,区域=区域)
    a = 数据通知表类.objects.filter(Q(日期 = 今天)&Q(区域=区域)).values()[0]
    # print(a)
    return a

崂山新数据字典 = 获得今天的新数据并存数据库('崂山')
市南新数据字典 = 获得今天的新数据并存数据库('市南')
市北新数据字典 = 获得今天的新数据并存数据库('市北')
李沧新数据字典 = 获得今天的新数据并存数据库('李沧')

崂山老数据字典 = 拿昨天的老数据('崂山')
市南老数据字典 = 拿昨天的老数据('市南')
市北老数据字典 = 拿昨天的老数据('市北')
李沧老数据字典 = 拿昨天的老数据('李沧')

def 增加数据(区域,新数据字典,老数据字典):
    文本.append(区域)
    文本.append('能查到日期的户数：'+str(新数据字典['能查到日期的户数'])+'户  '+str(新数据字典['能查到日期的户数']-老数据字典['能查到日期的户数']))
    文本.append('查不到日期的户数：'+str(新数据字典['查不到日期的户数'])+'户  '+str(新数据字典['查不到日期的户数']-老数据字典['查不到日期的户数']))
    文本.append('到期日为当月的户数：'+str(新数据字典['到期日为当月的户数'])+'户  '+str(新数据字典['到期日为当月的户数']-老数据字典['到期日为当月的户数']))
    文本.append('到期日为下月的户数：'+str(新数据字典['到期日为下月的户数'])+'户  '+str(新数据字典['到期日为下月的户数']-老数据字典['到期日为下月的户数']))
    文本.append('今年已逾期的户数：'+str(新数据字典['今年已逾期的户数'])+'户  '+str(新数据字典['今年已逾期的户数']-老数据字典['今年已逾期的户数']))
    文本.append('今年还未到期的户数：'+str(新数据字典['今年还未到期的户数'])+'户  '+str(新数据字典['今年还未到期的户数']-老数据字典['今年还未到期的户数']))
    文本.append('往年到期户：'+str(新数据字典['往年到期户'])+'户  '+str(新数据字典['往年到期户']-老数据字典['往年到期户']))
    # 文本.append('往年到期户茫茫多')
增加数据('崂山',崂山新数据字典,崂山老数据字典)
增加数据('市南',市南新数据字典,市南老数据字典)
增加数据('市北',市北新数据字典,市北老数据字典)
增加数据('李沧',李沧新数据字典,李沧老数据字典)

c = ''
for i in 文本:
    print(i)
    c += ('\n'+i)
print(c)
发送邮件('更新通知','崂山',c,'**','**',['**','**'],'','')

```

#### 删除数据的脚本

```python
import pandas as pd
import os,sys,django
import xlrd

class 打开excel文件():
    def __init__(self,文件名,第几个表):
        self.文件 = xlrd.open_workbook(filename = 文件名)
        self.表 = self.文件.sheet_by_index(第几个表-1)


    def 获得横向资料(self):
        self.数据 = [self.表.row_values(i) for i in range(self.表.nrows)]
        return self.数据


    def 获得纵向资料(self):
        self.数据 =  [self.表.col_values(i) for i in range(self.表.ncols)]
        return self.数据

    def 获得名称列数据(self,名称):
        def 获得列序号(表名,查找字段名):
            列序号 = None
            for i in range(表名.ncols):
                if (表名.cell_value(0,i) == 查找字段名):
                    列序号 = i
                    break
            return 列序号
        print(获得列序号(self.表,名称))
        self.数据 = self.表.col_values(获得列序号(self.表,名称),1)
        return self.数据
文件 = 打开excel文件('市南可收费注销.xls',1)
list1 = 文件.获得名称列数据('单位名称')

project_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_path)
os.environ['DJANGO_SETTINGS_MODULE'] = 'shuai4.settings'
django.setup()
from cuifei.models import 催费表类

催费表类.objects.filter(公司名称__in=list1).delete()
```

#### 填充数据的脚本

```python
import pandas as pd
import os,sys,django


class 提取类():
    def __init__(self,文件名,第几个表):
        self.文件 = pd.read_excel(文件名, 第几个表)

    def 拿取数据(self,从第几行开始,*列名):
        self.数据 = self.文件.loc[从第几行开始-2:,[*列名,]]
        #print(self.数据)
        return self.数据

销售表 = 提取类('不可收名单.xls',0)
销售数据 = 销售表.拿取数据(2,'纳税人识别号','纳税人名称')
销售数据 = 销售数据.values.tolist()


project_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_path)
os.environ['DJANGO_SETTINGS_MODULE'] = 'shuai4.settings'
django.setup()
from cuifei.models import 催费表22年类
# 催费表22年类.objects.all().update(是否可收='可收')
for i in 销售数据:
    if 催费表22年类.objects.filter(税号=i[0]):
        催费表22年类.objects.filter(税号=i[0]).update(是否可收='不可收')
        print(i[1]+',通过税号确定不可收')
    else:
        if 催费表22年类.objects.filter(公司名称=i[1]):
            催费表22年类.objects.filter(公司名称=i[1]).update(是否可收='不可收')
            print(i[1]+'通过名称确定不可收')
        else:
            print(i[1]+'发行表没有的不可收企业')

```

#### 批量导入数据脚本

```python
import pandas as pd
import os,sys,django

class 提取类():
    def __init__(self,文件名,第几个表):
        self.文件 = pd.read_excel(文件名, 第几个表)

    def 拿取数据(self,从第几行开始,*列名):
        self.数据 = self.文件.loc[从第几行开始-2:,[*列名,]]
        #print(self.数据)
        return self.数据

销售表 = 提取类('导入模板.xlsx',0)
销售数据 = 销售表.拿取数据(2,'公司名称','区域','税号','性质')
销售数据 = 销售数据.values.tolist()


project_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_path)
os.environ['DJANGO_SETTINGS_MODULE'] = 'shuai4.settings'
django.setup()
from cuifei.models import 催费表类

list = []
for i in 销售数据:
    # print(i[4])
    list.append(催费表类(公司名称 = i[0],区域 = i[1],税号 = i[2],性质 = i[3]))


催费表类.objects.bulk_create(list)
```

#### 更新某一列数据脚本

```python
import pandas as pd
import os,sys,django


class 提取类():
    def __init__(self,文件名,第几个表):
        self.文件 = pd.read_excel(文件名, 第几个表)

    def 拿取数据(self,从第几行开始,*列名):
        self.数据 = self.文件.loc[从第几行开始-2:,[*列名,]]
        #print(self.数据)
        return self.数据

销售表 = 提取类('/www/wwwroot/shuai4-django-env3.7/shuai4-django/时间.xls',0)
销售数据 = 销售表.拿取数据(2,'税号','名称','服务期限')
销售数据 = 销售数据.values.tolist()


project_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_path)
os.environ['DJANGO_SETTINGS_MODULE'] = 'shuai4.settings'
django.setup()
from cuifei.models import 催费表22年类

for i in 销售数据:
    if 催费表22年类.objects.filter(税号=i[0]):
        催费表22年类.objects.filter(税号=i[0]).update(到期日=i[2])
        print(i[0]+'成功')
    else:
        if 催费表22年类.objects.filter(公司名称=i[1]):
            催费表22年类.objects.filter(公司名称=i[1]).update(到期日=i[2])
            print(i[0]+'成功')
        else:
            print(i[0]+'失败')
```



### Django日常操作

#### 创建应用
`django-admin startproject 项目名字`
#### 创建APP
`python manage.py startapp APP名字`
#### 迁移数据库
`python manage.py makemigrations`
#### 运行数据库
`python manage.py migrate`
#### 收集静态文件
`python manage.py collectstatic`
#### 启动项目
`python manage.py runserver`
#### 创建超级用户
`python manage.py createsuperuser`
#### 创建APP以后
settings中增加INSTALLED_APPS,
APP内增加分url
```python
# 引入path
from django.urls import path

# 正在部署的应用的名称
app_name = 'APP名称'

urlpatterns = [
    # 目前还没有urls
]
```
总url引入分url
```python
from django.urls import path, include
urlpatterns = [
    # 新增代码，配置app的url
    path('定义url/', include('APP名称.urls', namespace='APP名称')),
]
```
#### 写API函数
分url
```python
from django.urls import path
from APP名称 import views

app_name = 'APP名称'

urlpatterns = [
    path('list/',views.hellolist),
]
```
views
```python
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def hellolist(request):
    list = [1,2,3,4,5]
    return Response(list)
```

#### 时间查询
```python
1、gt：大于某个时间
now = datetime.datetime.now()
#前一天
start = now – datetime.timedelta(hours=23, minutes=59, seconds=59)
a=yourobject.objects .filter(youdatetimcolumn__gt=start)

2、gte：大于等于某个时间：
a=yourobject.objects .filter(youdatetimcolumn__gte=start)

3、lt：小于
a=yourobject.objects .filter(youdatetimcolumn__lt=start)

4、lte：小于等于
a=yourobject.objects .filter(youdatetimcolumn__lte=start)

5、range：查询时间段
start_date = datetime.date(2005, 1, 1)
end_date = datetime.date(2005, 3, 31)
Entry.objects.filter(pub_date__range=(start_date, end_date))

6、year：查询某年
Entry.objects.filter(pub_date__year=2005)

7、month：查询某月
Entry.objects.filter(pub_date__month=12)

8、day：某天
Entry.objects.filter(pub_date__day=3)

9、week_day：星期几
Entry.objects.filter(pub_date__week_day=2)

10、获取今天的日期，日期格式为yyyy-MM-dd

from django.utils.timezone import now, timedelta
date = now().date() + timedelta(days=-1) #昨天
date = now().date() + timedelta(days=0) #今天
date = now().date() + timedelta(days=1) #明天
```

#### 部署以后登录后台显示403CSRF
```python
# 修改settings.py文件

CSRF_TRUSTED_ORIGINS = [
    'https://具体网址',
    # 其他可信任的来源
]

```


### django搜索两个模型放在一个分页的函数



```python
def company_list(request):

    search = request.GET.get('search')
    # 用户搜索逻辑
    if search:
        公司列表2019 = 公司表2019.objects.filter(
            Q(名称__icontains=search.strip())
            # |
            #Q(note__icontains=search.strip())
        )
        公司列表2020 = 公司表2020.objects.filter(
            Q(名称__icontains=search.strip())
            # |
            #Q(note__icontains=search.strip())
        )


        company_list = itertools.chain(公司列表2019,公司列表2020)
        company_list = [i for i in company_list]



        # querysets = itertools.chain(one_queryset,two_queryset)
    else:
        # 将 search 参数重置为空
        search = ''
        company_list = []

    # 每页显示  篇文章
    paginator = Paginator(company_list, 9)

    page = request.GET.get('page')

    # 将导航对象相应的页码内容返回给 articles
    companies = paginator.get_page(page)

    context = { 'companies':companies,'search': search}

    return render(request, 'search/list.html',context)
```



### Django伪监控小脚本


在django加个小模块来监控别的电脑情况以及执行指令


#### 服务端

```python
#主url
path('utils/', include('utils.urls')),
#分url
path('xinxiview/',views.XinxiView.as_view()),
path('zhilingview/',views.ZhilingView.as_view()),
#model
from django.db import models
class Dictionary(models.Model):
    # 字典名称 不可重复
    name = models.CharField(max_length=50, unique=True)
    # 字典内容
    data = models.TextField(blank=True,null=True)

    def __str__(self):
        return self.name
#view
class XinxiView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        #获得model Dictionary里名称为税控盘信息的内容
        税控盘信息 = Dictionary.objects.get(name='税控盘信息').data
        UK信息 = Dictionary.objects.get(name='UK信息').data
        税控盘信息 = 税控盘信息.split('\n')
        UK信息 = UK信息.split('\n')
        信息列表 = [税控盘信息,UK信息]
        return Response(信息列表)
    def post(self, request, format=None):
        name = request.data.get('name')
        xinxi = request.data.get('xinxi')
        # 更改Directory里name为name的body为xinxi
        Dictionary.objects.filter(name=name).update(data=xinxi)
        return Response('更新成功')
class ZhilingView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        name = request.query_params.get('name')
        # 获得model Dictionary里名称为name的body
        zhiling = Dictionary.objects.get(name=name).data
        Dictionary.objects.filter(name=name).update(data='')
        return Response(zhiling)
    def post(self, request, format=None):
        zhiling1 = request.data.get('税控盘指令')
        zhiling2 = request.data.get('UK指令')
        # 更改Directory里name为name的body为xinxi
        Dictionary.objects.filter(name='税控盘指令').update(data=zhiling1)
        Dictionary.objects.filter(name='UK指令').update(data=zhiling2)
        return Response('更新指令成功')


```

#### 被监控端更新数据&执行命令

```python
import requests,os,time,json
import psutil
xinxiurl = 'http://###/utils/xinxiview/'
zhilingurl = 'http://###/utils/zhilingview/'
# 检测进程是否存在的函数 
def check_process(process_name):
    for proc in psutil.process_iter():
        try:
            # 检查进程名称返回进程对象
            if process_name in proc.name():
                return proc.pid
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass
    return None
def 工作():
    a = ''
    if check_process('skp_usb_moniter.exe'):
        a+= '税控接口服务运行中,'
    else:
        a+= '税控接口服务未运行,'
    if check_process('SunloginClient.exe'):
        a+= '向日葵运行中,'
    else:
        a+= '向日葵未运行,'
    print(a)
    r = requests.post(xinxiurl, data={'name': '税控盘信息', 'xinxi':  a})
    print(r.text)

    # 发送get请求
    r = requests.get(zhilingurl,params={'name': '税控盘指令'})
    指令 = r.text
    if 指令 == '"重启程序"':
        os.system('D:\Desktop\s.bat')
    else:
        print(指令)


while True:
    工作()
    time.sleep(60)
```

#### 前端获取数据&发送指令

```js
//获取盘柜信息
	vm.$u.api.getPanguiInfo = () => vm.$u.get('/utils/xinxiview/');
	//发送指令
	vm.$u.api.sendOrder = (params) => vm.$u.post('/utils/zhilingview/', params);


async reloadShuikongpan() {
				const res = await this.$u.api.sendOrder({
					税控盘指令: '重启程序'
				})
				this.$u.toast(res)
			},
const res = await this.$u.api.getPanguiInfo()
```



### django项目的网站图标处理



本质是一句话：

> **favicon 是“站点根路径资源”，但 Django 的 static 默认是“带前缀的资源”**
>  所以你现在卡在 `/favicon.ico` 和 `/static/` 之间了。

下面我直接给你 **2 种靠谱方案**，按「推荐程度 + 你现在的部署方式」来讲，你照着选一个就行。

------

#### ✅ 方案一（**最推荐 / 正统做法**）：

##### **favicon 仍然走 static，但通过 `<link>` 显式声明**

👉 **不用强行让 `/favicon.ico` 存在**

##### 1️⃣ 文件放哪里？

放在你已经能正常访问的 static 体系里，比如：

```
app/
  static/
    img/
      favicon.ico
```

或

```
static/
  favicon.ico
```

然后 `collectstatic`，最终会到：

```
/www/wwwroot/banshidawang/staticfiles/favicon.ico
```

------

##### 2️⃣ 模板里明确告诉浏览器 favicon 在哪

在 **base.html 的 `<head>` 里**加：

```
{% load static %}
<link rel="icon" href="{% static 'favicon.ico' %}">
```

或者你放在子目录：

```
<link rel="icon" href="{% static 'img/favicon.ico' %}">
```

------

##### 3️⃣ 结果是？

- 浏览器会**优先使用你声明的**
- 就算 `/favicon.ico` 404，也**不影响**
- 不和 Django / Nginx 静态规则打架

✅ **这是 Django 官方 & 实战中最干净的方式**

> 现在 90% 的站点都这么干

------

#### ✅ 方案二（**想要 `/favicon.ico` 真存在**）：

##### **Nginx 单独给它开“直通规则”**

适合你这种 **工程文件不能乱丢**、static 有前缀的部署。

------

##### 1️⃣ favicon 仍然放 staticfiles 里

比如最终位置：

```
/www/wwwroot/banshidawang/staticfiles/favicon.ico
```

------

##### 2️⃣ Nginx 增加一个精确匹配规则

在 `server {}` 里，加在最前面：

```
location = /favicon.ico {
    alias /www/wwwroot/banshidawang/staticfiles/favicon.ico;
    access_log off;
    log_not_found off;
}
```

⚠️ 注意是：

- `location = /favicon.ico`
- 用 `alias`，不是 `root`

------

##### 3️⃣ 效果

- 访问 `https://news.05320532.xyz/favicon.ico` ✅
- Django 完全不用管
- 不影响 `/static/` 体系

✔ **这是“服务器级”解决方案，很稳**

### HEIC格式的图片转换为jpg
换了手机以后默认图片格式改成了heic，
挺好，
但叼毛爱普生的打印软件并不支持，
只能想办法转了，
用格式工厂转换直接闪退，
可能是我的软件有点问题，
写个python文件来处理


一开始是这样的：
```python
import os
import pyheif
from PIL import Image

def convert_heic_to_jpg(heic_file, jpg_file):
    heif_file = pyheif.read(heic_file)
    image = Image.frombytes(
        heif_file.mode, 
        heif_file.size, 
        heif_file.data,
        "raw",
        heif_file.mode,
        heif_file.stride,
    )
    image.save(jpg_file, "JPEG")

# 获取当前目录下所有HEIC文件
heic_files = [f for f in os.listdir('.') if f.lower().endswith('.heic')]

# 逐个转换文件
for heic_file in heic_files:
    jpg_file = f"{os.path.splitext(heic_file)[0]}.jpg"
    convert_heic_to_jpg(heic_file, jpg_file)
    print(f"Converted {heic_file} to {jpg_file}")
```
后来在安装包的过程中发现pyheif这个包很难装上，
就查了一下，
pyheif 目前只支持 Linux 和 Mac，而在 Windows 上无法安装也无法使用，
如果非要在 Windows 上使用 pyheif，可能需要手动安装 libheif 库，并确保其头文件和库文件的路径被添加到系统的 PATH 环境变量中。这通常涉及到下载 libheif 的源代码，编译并安装，然后在安装 pyheif 时指定正确的包含和库路径。

我显然没有这个实力，
只能使用适用于 Windows 的替换包 pillow_heif，
于是变成了这样：
```python
import os
from PIL import Image
import pillow_heif

# 注册HEIF插件
pillow_heif.register_heif_opener()

def convert_heic_to_jpg(heic_file, jpg_file):
    with Image.open(heic_file) as im:
        im.save(jpg_file, "JPEG")

# 获取当前目录下所有HEIC文件
heic_files = [f for f in os.listdir('.') if f.lower().endswith('.heic')]

# 逐个转换文件
for heic_file in heic_files:
    jpg_file = f"{os.path.splitext(heic_file)[0]}.jpg"
    convert_heic_to_jpg(heic_file, jpg_file)
    print(f"Converted {heic_file} to {jpg_file}")

```
后来转换完了发现比源文件小一半，这显然不科学，
找到两个保存质量的参数来更改代码，
`im.save(jpg_file, "JPEG", quality='keep')`
`im.save(jpg_file, "JPEG", quality=95)`

用了一下第一个，发现并不好使，
在使用pillow_heif时，quality='keep'选项只适用于原始图像已经是JPEG格式的情况。由于HEIC格式与JPEG不同，并不能使用'keep'作为质量参数，
于是就使用了第二个。
但和源文件也差不多，
估计损失了不少东西，
但就这样吧

### mp4批量转mp3

#### 代码
```python
from moviepy.editor import *
import os

# 获取当前文件夹中的所有mp4文件
mp4_files = [f for f in os.listdir('.') if f.endswith('.mp4')]

# 遍历所有文件并提取音频
for mp4_file in mp4_files:
    video = VideoFileClip(mp4_file)
    audio = video.audio
    audio_file = mp4_file.replace('.mp4', '.mp3')
    audio.write_audiofile(audio_file)
    audio.close()
    video.close()

print("音频提取完成。")
```

#### 质量
在使用moviepy库从MP4文件中提取音频时，默认情况下，它会尽量保持原始音频的质量。但是，由于MP4到MP3的转换涉及不同的编码过程，可能会有一些质量损失，尤其是如果MP3编码使用了较低的比特率。

如果对输出的MP3文件的质量有特定的要求，可以在write_audiofile函数中指定比特率，例如：
```python
audio.write_audiofile(audio_file, bitrate='320k')
```

#### 为什么命令行执行会自动显示进度条和详细信息

这些信息是由moviepy内部的函数生成的，它们在处理媒体文件时提供实时反馈，以便用户可以了解当前操作的状态。

这个功能是moviepy的一部分，不需要在代码中显式添加任何额外的命令来实现。当调用write_audiofile方法时，moviepy会处理所有的显示逻辑。如果希望关闭这些显示信息，可以在调用write_audiofile时添加verbose=False参数，如下所示：
```python
audio.write_audiofile(audio_file, verbose=False)
```


### pandas相关

#### pandas提取excel

```python
import pandas as pd

class 提取类():
    def __init__(self,文件名,第几个表):
        self.文件 = pd.read_excel(文件名, 第几个表)

    def 拿取数据(self,从第几行开始,*列名):
        self.数据 = self.文件.loc[从第几行开始-2:,[*列名,]]
        #print(self.数据)
        return self.数据

#     
```

#### 处理日期和数字空值
```python
数据文件名 = "名称.xlsx"
def 销售表提取():
    销售表 = 提取类(数据文件名,0)
    销售数据 = 销售表.拿取数据(8234,'企业名称','日期','服务费发票','金额','支付方式')
    销售数据['发票类型'] = '纸票'
    #空着的日期按照前一个来
    销售数据['日期'].fillna(method="ffill",inplace=True)
    #格式化日期，标记空日期
    销售数据['日期'] = 销售数据['日期'].apply(lambda x:x.strftime('%Y-%m-%d') if x == x and type(x) != type('sd') else '日期为空')
    销售数据['金额'] = 销售数据['金额'].apply(lambda x:str(int(x)) if x == x else x)
```

#### 转为列表
```python
销售数据 = 销售数据.values.tolist()
```

#### 合并相同数据

将A栏重复值所对应的B栏数据合并

销售数据

| A     | B    | C    |
| ----- | ---- | ---- |
| 数据A | 1    | 5    |
| 数据A | 2    | 5    |
| 数据B | 1    | 5    |

```python
# 将A栏重复值所对应的B栏数据合并
销售数据['B'] = 销售数据.groupby('A')['B'].transform(','.join)
```

销售数据-新
| A     | B    | C    |
| ----- | ---- | ---- |
| 数据A | 1,2  | 5    |
| 数据A | 1,2  | 5    |
| 数据B | 1    | 5    |

之后可以去重