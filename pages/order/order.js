const templateModel = require('../../models/template.js')
const orderModel = require('../../models/order.js')
const qrcode = require('../../lib/qrcode.js')
const util = require('../../utils/util.js')

// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hiddenQrcode: true,
        xcAuthNO: '',
        productID: '',
        productName: '',
        mobile: '',
        members: [],
        orderConfig: [],
        orderParams: [

        ], //  创建订单的参数
        orderAmount: '0',
        orderAmountPoint: '',
        isCreateMember: false, //  是否需要创建会员
        isAuthPass: false, //    是否认证完成
        buyerMemberNO: '',
        splitRuleID: '',

        // search
        currentSearch: {},
        searchList: [],
        inputShowed: false,
        inputVal: "",
        searchPageHidden: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        orderModel.reset()

        let productID = options['productID']
        orderModel['productID'] = productID
        this.setData({
            productID: productID
        }, this.getTemplateDetail)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        // this.updateMember()
        this.setData({
            members: orderModel['members']
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        clearInterval(this.data.interval)
        this.data.interval = null
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    getTemplateDetail() {
        templateModel.getTemplateDetail(this.data.productID).then((result) => {
            let productName = result['product_name']
            let orderConfig = result['order_config']
            let members = result['members']
            let splitRuleID = result['split_rule_id']
            let isCreateMember = result['is_create_member']
            if (!isCreateMember) {
                this.setData({
                    isAuthPass: true
                })
            }

            let orderParams = orderConfig.map((item) => {
                return {
                    field: item['field']
                }
            })

            orderModel['orderConfig'] = orderConfig
            orderModel['orderParams'] = orderParams

            this.setData({
                productName: productName,
                orderConfig: orderConfig,
                orderParams: orderParams,
                members: members,
                splitRuleID: splitRuleID,
                isCreateMember: isCreateMember
            })

        })
    },
    //  订单金额 input , 初始 0, 初次点击清空
    focusOrderAmount(event) {
        let focusValue = event.detail.value

        if (focusValue === '0') {
            this.setData({
                orderAmount: ''
            })
        }

    },

    bindinputOrderAmount(event) {
        let orderAmount = event.detail.value


        if (/^\d*(\.)?(\d){0,2}$/.test(orderAmount)) {
            let orderAmountPoint = util.exactNum(orderAmount * 100)
            orderModel['orderAmountPoint'] = orderAmountPoint

            this.setData({
                orderAmount: orderAmount
            })

            return orderAmount
        } else {
            return this.data.orderAmount
        }
    },
    /**
     * 点击角色部分，如果可修改，弹出搜索框选择
     *
     */
    searchMember(event) {

        let dataset = event['currentTarget']['dataset']
        let search = dataset.search
        let {
            role_code,
            role_name,
            assigned_member_id,
            assigned_member_name
        } = search

        this.setData({
            currentSearch: search
        })

        orderModel['selectItemID'] = assigned_member_id
        orderModel['selectItemName'] = assigned_member_name

        orderModel.searchParams['roleID'] = role_code
        orderModel.searchParams['roleName'] = role_name

        wx.navigateTo({
            url: './searchPage'
        })

    },

    showSearchPage: function() {
        this.setData({
            searchPageHidden: false
        })
    },
    hideSearchPage: function() {
        this.setData({
            searchPageHidden: true
        })
    },
    resetSearchData: function() {
        this.setData({
            searchList: []
        })
    },

    showInput: function() {
        this.setData({
            inputShowed: true
        })
    },
    hideInput: function() {
        this.setData({
            inputVal: "",
            inputShowed: false
        })
    },
    clearInput: function() {
        this.setData({
            inputVal: ""
        })
        let searchData = this.data.currentSearch
        let {
            role_code
        } = searchData

        orderModel.getAllMemberList(role_code).then((result) => {
            let searchList = result['members'] || []

            this.setData({
                searchList: searchList
            })
        })
    },
    inputTyping: function(e) {
        let searchData = this.data.currentSearch
        let inputVal = e.detail.value
        this.setData({
            inputVal: inputVal
        })

        let {
            role_code
        } = searchData

        // let startIndex = 0
        // let pageSize = 20

        orderModel.getMemberSearchList(role_code, inputVal).then((result) => {
            let searchList = result['members'] || []

            this.setData({
                searchList: searchList
            })
        })
    },

    chooseMember(event) {
        let dataset = event['currentTarget']['dataset']
        let currentSearch = this.data['currentSearch']
        let chooseItem = dataset.item
        // 根据 当前搜索项与点击的项， 设置
        let members = this.data['members']

        let updatedMembers = members.map((item) => {
            if (item['role_code'] === currentSearch['role_code']) {
                item['assigned_member_id'] = chooseItem['id']
                item['assigned_member_name'] = chooseItem['name']
            }

            return item
        })

        this.setData({
            members: updatedMembers
        })

        this.hideSearchPage()
        this.resetSearchData()
    },
    // search page end

    // order_config start

    orderConfigChange(event) {
        let value = event.detail.value
        let currentItem = event['currentTarget']['dataset']['item']
        let controlType = currentItem['control']
        let orderParams = this.data['orderParams']

        //  设置请求参数
        let updatedParams = orderParams.map((item) => {
            if (item.field === currentItem.field) {
                switch (controlType) {
                    case 'MoneyInput':
                        if (/^\d*(\.)?(\d){0,2}$/.test(value)) {
                            item.value = util.exactNum(value * 100)
                            return item
                        } else {
                            return item
                        }
                    case 'TextInput':
                        item.value = value
                        break
                    case 'NumberInput':
                        item.value = util.exactNum(value)
                        break
                }
            }

            return item
        })

        orderModel['orderParams'] = updatedParams

        this.setData({
            orderParams: updatedParams
        })

        //  input 事件返回，设置 input 值
        switch (controlType) {
            case 'MoneyInput':
                if (/^\d*(\.)?(\d){0,2}$/.test(value)) {
                    return value
                } else {
                    return value.substring(0, value.length - 1)
                }
            case 'TextInput':
                return value
            case 'NumberInput':
                return value
        }

    },

    // order_config end

    showQrcodeModal() {
        clearInterval(this.data.interval)

        orderModel.getMemberAuthNo().then((result) => {
            let xcAuthNO = result['xc_auth_no']
            let productID = this.data.productID

            orderModel['xcAuthNO'] = xcAuthNO
            this.setData({
                xcAuthNO: xcAuthNO
            })
            let qrcodeUrl = `https://cloud.xc-fintech.com/static/mp/auth?i=${xcAuthNO}&p=${productID}`
            qrcode.drawQrcode({
                width: 200,
                height: 200,
                canvasId: 'canvas',
                text: qrcodeUrl
            })

            this.getAuthStatus()
        })
        this.setData({
            hiddenQrcode: false
        })
    },

    closeQrcodeModal() {
        this.setData({
            hiddenQrcode: true
        })

        // clearInterval(this.data.interval)
        // this.data.interval = null
    },

    //  获取客户扫码认证状态
    handleAuthStatusChange() {
        return orderModel.getMemberAuthStatus(
            this.data.xcAuthNO
        ).then((result) => {
            let {
                member_id,
                is_bind_card,
                mobile
            } = result

            if (member_id && is_bind_card && mobile) {
                clearInterval(this.data.interval)
                this.setData({
                    isAuthPass: true,
                    buyerMemberNO: member_id,
                    mobile: mobile
                })

                orderModel['buyerMemberNO'] = member_id

                this.closeQrcodeModal()
            }

            // //  test poll for authStatus
            // setTimeout(() => {
            //     clearInterval(this.data.interval)
            //     this.setData({
            //         isAuthPass: true,
            //         buyerMemberNO: '6447003565755080704',
            //         mobile: '13344443333'
            //     })

            //     orderModel['buyerMemberNO'] = '6447003565755080704'

            //     this.closeQrcodeModal()
            // }, 5000)

        }).catch((error) => {})
    },

    //  二维码 modal 展示时禁止滚动
    stopPageScroll() {
        return
    },

    getAuthStatus() {
        let getMemberAuthStatus = orderModel.getMemberAuthStatus

        let interval = util.interval(this.handleAuthStatusChange, 2000)

        this.setData({
            interval: interval
        })
    },

    orderConfirm() {
        let data = this['data']
        // let members = orderModel.members

        // if (isCreateMember && isAuthPass) {
        // }

        let orderParams = orderModel['orderParams']
        let orderConfig = orderModel['orderConfig']

        //  检验必填项
        for (let i = orderConfig.length - 1; i >= 0; i--) {
            let configItem = orderConfig[i]
            let paramsItem = orderParams[i]
            let require = configItem['is_required']
            let label = configItem['label']
            let value = paramsItem['value']

            if (require && !value) {
                wx.showToast({
                    title: `请完善${label}`,
                    icon: 'none'
                })

                return
            }

        }

        orderModel.createOrder().then((result) => {

            wx.navigateTo({
                url: './waitingForPayment'
            })
        })

    }
})