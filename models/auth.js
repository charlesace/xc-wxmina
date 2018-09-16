/**
 * 用户授权相关服务
 */

const http = require('../utils/httpRequest.js')
const util = require('../utils/util.js')

module.exports = {
    authId: '',
    productId: '',
    productName: '',
    memberId: '',
    bankCardId: '',
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
                    url: '../../pages/auth/authBind'
                })
            } else {
                wx.navigateTo({
                    url: '../../pages/auth/authResult'
                })
            }
        })
    },

    // 申请绑卡
    requestBindCard: function(name, card, idNo, phone) {
        return new Promise((resolve, reject) => {
            http.request(
                'member.person.apply.bindcard', {
                    member_id: this.memberId,
                    name: name,
                    id_card_no: card,
                    account_no: idNo,
                    phone: phone
                }
            ).then((res) => {
                console.log(res)
                this.bankCardId = res.bank_card_id
                resolve()
            }).catch((err) => {
                reject(err)
            })
        })
    },

    // 确认绑卡
    requestConfirmBind: function(code) {
        http.request(
            'member.person.confrim.bindcard', {
                member_id: this.memberId,
                card_id: this.bankCardId,
                verify_code: code
            }
        ).then((res) => {
            wx.navigateTo({
                url: '../../pages/auth/authResult'
            })
        })
    },

    testPhone(phone) {
        if (!util.isPhoneNumber(phone)) {
            wx.showToast({
                title: '请输入正确的手机号',
                icon: 'none'
            })
            return false
        }
        return true
    },

    isIdNumber(id) {
        if (!util.isIdNumber(id)) {
            wx.showToast({
                title: '请输入正确的身份证号',
                icon: 'none'
            })
            return false
        }
        return true
    }
}