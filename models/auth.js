/**
 * 用户授权相关服务
 */

const http = require('../utils/httpRequest.js')

module.exports = {
    authId: '',
    memberId: '',
    isNewMember: true,
    isBindCard: false,
    needBindCard: false,

    // 申请创建会员
    requestCreateMember: function(phone) {
        return new Promise((resolve, reject) => {
            http.request(
                'member.create', {
                    xc_auth_no: this.authId,
                    phone: phone
                }
            ).then((res) => {
                console.log(res)
                this.memberId = res.member_id
                this.isNewMember = res.is_new_create
                this.isBindCard = res.is_bind_card
                resolve()
            }).catch((err) => {
                reject(err)
            })
        })
    },

    // 申请会员验证码认证
    requestVerifyMember: function(code) {
        console.log(this.memberId)
        console.log(code)
        http.request(
            'member.create.verify', {
                member_id: this.memberId,
                verify_code: code
            }
        ).then((res) => {
            console.log(res)

            if (this.needBindCard && !this.isBindCard) {
                wx.navigateTo({
                    url: '../../pages/login/login'
                })
            } else {
                wx.navigateTo({
                    url: '../../pages/order/order'
                })
            }
        })
    }

}