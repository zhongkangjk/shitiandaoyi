---
title: python小功能操作合集
date: 2021-07-26 21:07:31
categories:
  - 计算机
  - python
tags: 
  - python
  - 邮件
  - win32
  - tkinter
  - selenium
  - 爬虫
  - django
  - excel
---

记录一些python常用的小功能模块使用

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

