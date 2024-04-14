### pandas提取excel

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

### 处理日期和数字空值
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

### 转为列表
```python
销售数据 = 销售数据.values.tolist()
```

### 合并相同数据

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