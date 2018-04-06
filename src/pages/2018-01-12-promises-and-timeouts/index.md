---
title: Racing to get a timeout
tags: javascript
author: Edgar Aroutiounian
date: "2018-01-12"
description: simple way to get a timeout
discussionId: "2019-01-12-promises-and-timeouts"
---

_By Edgar Aroutiounian_,
catch me on <a href='https://twitter.com/@edgararout'>twitter</a>

Here is a simple and elegant way to say "Run this shell command within a
maximum of x seconds"

```javascript
'use strict';

const spawnAsync = require('@expo/spawn-async');

const with_timeout = async (cmd, args, limit = 20 * 1000) =>
  Promise.race([
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Took longer than ${limit / 1000} seconds`)))
    ),
    spawnAsync(cmd, args),
  ]);
```

Notice how we don't need a trailing `await` for the Promise and the
usage of `Promise.race`.
