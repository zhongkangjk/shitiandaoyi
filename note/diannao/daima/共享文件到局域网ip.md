---
title: 共享文件到局域网ip
categories:
  - 计算机
  - python
tags:
  - python
date: 2022-03-09 11:37:19
---
局域网共享文件到ip
<!-- more -->

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

