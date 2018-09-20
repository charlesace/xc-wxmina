# 微信小程序

## request
- 使用HTTP(S)作为通讯方式，报文格式JSON
- 签名方式app_id,timestamp,version,service,params参数值的字符拼接：app_id+ timestamp+ version+ service+ params + MD5Key 进行MD5签名 
- 协议形式 scheme://hostname/service?parameters
示例
```
https://api.xxxxx.com/service/soa?app_id=10001& timestamp=1450654868& version=1.0& sign=签名& service=member.create&token=ge80346e1aa874d93ada608e9042ab9d1&params={name:value} 
```
- 服务器地址
https://api.xxxxx.com/service/soa

## 登录流程
1. 使用用户名密码登录（appID 传递 0），获取 appID
2. 使用 appID 获取 wx_openid


## 配置
微信后台配置 选择前缀匹配
http(s)://xxxx/cashier/auth

生成二维码地址
http(s)://xxxx/cashier/auth?member_auth_id=111&product_id=222

## 测试账号
账号 shou 密码 123456

## 后台
http://47.97.81.252:8011/cashier
administrator
admin


ceshi3-cyx
772675

## 使用 icon-font
1. iconfont 中添加图标，下载到本地， 拷贝其中 css 中的图标 className 至 app.wxss 中
2. 使用 https://transfonter.org/ 将 ttf 转换，勾选TTF， 开启 Base64 encode， 下载至本地， 复制目录下 css 文件中 的 @font-face 部分至 app.wxss 中
