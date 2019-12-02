# Tripod.AdminApi

## API格式规范

**0.整体格式**
```JSON
{
  "code": 20000,
  "message": "success",
  "data": {}
}
```

**1.分页列表**
请求：
GET .../?pageIndex=1&pageSize=20&...&_sort=id,desc
响应：
```JSON
{
  "code": 20000,
  "message": "success",
  "data": {
    "list": [],
    "totalCount": 100
  }
}
```

**2.不分页列表**
请求：
GET .../?xxx=xxx&_sort=id,desc
```JSON
{
  "code": 20000,
  "message": "success",
  "data": []
}
```

**3.获取单条数据**
```JSON
{
  "code": 20000,
  "message": "success",
  "data": {
    "id": 1,
    ...
  }
}
```

**4.新增提交 POST**
```JSON
{
  "name": ""
}
```

**5.修改提交 PUT**
```JSON
{
  "name": ""
}
```

**6.删除 DELETE**
.../{id}



