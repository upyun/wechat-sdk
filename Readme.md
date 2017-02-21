# 又拍云微信小程序 SDK

## 使用

使用方式可以参考 demo

1. 软链 upyun-wxapp-sdk.js 到微信小程序项目
2. 通过 `require` 引入 `Upyun` 类，并初始化一个实例
3. 调用 `upyun.upload` 方法上传文件


## 运行 Demo

下载微信[小程序开发工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html)

增加 demo 目录为新项目

![add-project](assets/add-project.png)

运行服务器进程

    npm run demo

## 接口

`Upyun`

* bucket: 空间名
* operator: 操作员
* getSignatureUrl: 计算 `signature` 的服务器接口地址

示例

```js
const upyun = new Upyun({
  bucket: 'sdkimg',
  operator: 'tester',
  getSignatureUrl: 'http://localhost:8080',
})
```

`Upyun.prototype.upload`

* remotePath 在又拍云存储的文件路径
* localPath 本地文件路径
* success 接口调用成功的回调函数
* fail 接口调用失败的回调函数
* complete 接口调用结束的回调函数（调用成功、失败都会执行）

```js
upyun.upload({
  localPath: imageSrc,
  remotePath: '/wxapp/demo',
  success: function(res) {
  },
  fail: function({errMsg}) {
  },
})
```

## 其他

计算 `signature` 的服务器接口 `getSignatureUrl` 接受 `GET` 请求，带有 `policy` 参数，返回 `signature`

`signature` 的计算公式是

    md5(policy + '&' + secret)

其中，`secret` 是表单提交密钥
