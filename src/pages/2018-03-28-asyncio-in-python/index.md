---
title: async finally first class in Python
tags: python
author: Edgar Aroutiounian
date: "2018-03-28"
description: python goes async
discussionId: "2018-03-28-asyncio-in-python"
---

Python 3 now follows the path of many of languages and introduces `async`/`await` as a first class
citizen

Here is a short code sample, tested on Python 3.6

```python
import asyncio
from socket import socket, SOCK_STREAM, AF_INET, SO_REUSEADDR, SOL_SOCKET

loop = asyncio.get_event_loop()

# connect with
# $ socat - TCP:localhost:25000

async def echo_handler(client):
    with client:
        while True:
            data = await loop.sock_recv(client, 1000)
            if not data:
                break
            await loop.sock_sendall(client, b'Got: ' + data)
    print('Connection closed')

async def echo_server(address):
    sock = socket(AF_INET, SOCK_STREAM)
    sock.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
    sock.bind(address)
    sock.listen(5)
    sock.setblocking(False)
    while True:
        (client, addr) = await loop.sock_accept(sock)
        print('Connection from', address)
        loop.create_task(echo_handler(client))

loop.create_task(echo_server(('', 25000)))
loop.run_forever()
```

This simple code sample can handle thousands of requests on a single CPU.
