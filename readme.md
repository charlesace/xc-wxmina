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
