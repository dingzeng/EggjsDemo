# Tripod.AdminApi

## API格式规范
假设资源名为'user',格式为：
```JSON
{
  "id": 1,
  "username": "admin",
}
```

**整体格式**
```JSON
{
  "code": 20000,
  "message": "success",
  "data": {}
}
```

状态码：
|code|description|
|---|---|
|20000|成功|
|50000|操作失败|
|50001|参数验证失败|
> 具体见：/app/codes.ts文件

**分页列表**

请求：
GET ~/users/?pageIndex=1&pageSize=20&...&_sort=id,desc

|key|required|description|
|---|---|---|
|pageIndex|true|页码|
|pageSize|true|页大小|
|_sort|false|排序。多个排序列使用分号分割，可以指定排序列的排序方式是生序还是降序"|


响应：
```JSON
{
  "code": 20000,
  "message": "success",
  "data": {
    "list": [
      {
        "id": 1,
        "username": "admin"
      }
    ],
    "totalCount": 100
  }
}
```

**不分页列表**

请求：
GET ~/users/?xxx=xxx&_sort=id,desc

响应：
```JSON
{
  "code": 20000,
  "message": "success",
  "data": [
    {
      "id": 1,
      "username": "admin"
    }
  ]
}
```

**列表页面数据**

(_page接口，用来获取“页面相关”的数据，如列表查询条件初始值、系统设置项的值等)

请求：
GET ~/user/_page

响应：
```JSON
{
  "code": 20000,
  "message": "success",
  "data": {
    "beginDate": "2019-01-01",
    "endDate": "2019-01-30"
  }
}
```

**获取单条数据**

请求：
GET ~/user/1

响应：
```JSON
{
  "code": 20000,
  "message": "success",
  "data": {
    "id": 1,
    "username": "admin"
  }
}
```

**新增**

请求：
POST ~/user/user
```JSON
{
  "username": "admin"
}
```

响应：
```JSON
{
  "code": 20000,
  "message": "success",
  "data": true
}
```

**修改**

请求：
PUT ~/user/1
```JSON
{
  "username": "admin"
}
```

响应：
```JSON
{
  "code": 20000,
  "message": "success",
  "data": true
}
```

**删除**

请求：
DELETE  ~/user/1

响应：
```JSON
{
  "code": 20000,
  "message": "success",
  "data": true
}
```

****
