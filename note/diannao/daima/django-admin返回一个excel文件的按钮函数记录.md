---
title: django-admin返回一个excel文件的按钮函数记录
categories:
  - 计算机
  - python
tags:
  - django
date: 2022-04-23 19:19:30
---
需要返回一个excel文件
<!-- more -->
### 函数本体
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