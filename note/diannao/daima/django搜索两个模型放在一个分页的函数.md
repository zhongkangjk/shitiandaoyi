---
title: django搜索两个模型放在一个分页的函数
categories:
  - 计算机
  - python
tags: 
  - python
  - django
date: 2022-04-27 00:30:30
---
久远~
<!-- more -->

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

