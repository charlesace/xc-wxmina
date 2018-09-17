const templateModel = require('../../models/template.js')
const orderModel = require('../../models/order.js')
const QRCode = require('../../lib/qrcode.js')
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
        productName: '21312',
        members: [{
                "assigned_member_id": "6445191069863911424",
                "is_seller_member": true,
                "role_code": "R003",
                "assigned_member_name": "刘子巧11",
                "role_name": "卖家"
            },
            {
                "assigned_member_id": "6445228747670036480",
                "is_member_show": true,
                "role_code": "R002",
                "assigned_member_name": "刘子巧",
                "role_name": "买家"
            },
            {
                "assigned_member_id": "6445212271437291520",
                "is_member_show": true,
                "role_code": "R001",
                "assigned_member_name": "金奥",
                "role_name": "开发商"
            },
            {
                "assigned_member_id": "6445447698853273600",
                "is_member_updatable": false,
                "is_member_show": true,
                "role_code": "R000",
                "assigned_member_name": "崔博",
                "role_name": "平台角色"
            }
        ],
        orderConfig: [{
                "field": "DF",
                "label": "FSAF"
            },
            {
                "field": "C",
                "control": "TextInput",
                "is_required": true,
                "label": "商品总数"
            },
            {
                "field": "B",
                "control": "TextInput",
                "is_required": true,
                "label": "商品进价"
            },
            {
                "field": "A",
                "control": "TextInput",
                "is_required": true,
                "label": "订单总额"    
            }
        ],
        isCreateMember: false,  //  是否需要创建会员
        splitRuleID: '6445460536065925120',

        // search
        currentSearch: {},
        searchList: [{
            name: 'hehe',
            id: '0'
        }, {
            name: 'haha',
            id: '1',
            selected: true
        }],
        inputShowed: false,
        inputVal: "",
        SearchPageHidden: true 
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        let productID = options['productID']
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
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    getTemplateDetail() {
        templateModel.getTemplateDetail(this.data.productID).then((result) => {
            let productName = result['product_name']
            let orderConfig = result['order_config']
            let members = result['members']
            let splitRuleID = result['split_rule_id']
            let isCreateMember = result['is_create_member']

            console.log(productName, orderConfig, members, splitRuleID)
            this.setData({
                productName: productName,
                orderConfig: orderConfig,
                members: members,
                splitRuleID: splitRuleID,
                isCreateMember: isCreateMember
            })

        })
    },
    /**
     * 点击角色部分，如果可修改，弹出搜索框选择
     *
     */
    searchMember (event) {
        console.log(event.currentTarget.dataset)
        console.log('click member')

        let dataset = event['currentTarget']['dataset']
        let search = dataset.search
        let {
            role_code,
            role_name,
            is_member_updatable
        } = search

        this.setData({
            currentSearch: search
        })

        let memberName = this.data.searchName || ''

        let startIndex = 0
        let pageSize = 20

        if (!is_member_updatable) {
            return
        }

        this.showSearchPage()
        wx.setNavigationBarTitle({title: role_name})

        orderModel.getMemberSearchList(role_code, memberName, startIndex, pageSize)

    },

    showSearchPage: function () {
        this.setData({
            SearchPageHidden: false
        })
    },

    showInput: function () {
        this.setData({
            inputShowed: true
        })
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        })
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        })
    },
    inputTyping: function (e) {
        let searchData = this.data.currentSearch
        let inputVal = e.detail.value
        this.setData({
            inputVal: inputVal
        })

        console.log(searchData, inputVal)


    },

    showQrcodeModal() {
        orderModel.getMemberAuthNo().then((result) => {
            let xcAuthNO = result['xc_auth_no']
            let productID = this.data.productID

            this.setData({
                xcAuthNO: xcAuthNO
            })

            let qrcodeUrl = `http(s)://xxxx/cashier/auth?member_auth_id=${xcAuthNO}&product_id=${productID}`

            let qrcode = new QRCode('canvas', {
                text: qrcodeUrl,
                width: 150,
                height: 150
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

        clearInterval(this.data.interval)
        this.data.interval = null
    },

    //  获取客户扫码认证状态
    handleAuthStatusChange() {
        return orderModel.getMemberAuthStatus(
            this.data.xcAuthNO
        ).then((result) => {
            console.log(result)
            let {
                member_id,
                is_bind_card
            } = result

            if (member_id && is_bind_card) {
                clearInterval(this.data.interval)
            }

        }).catch((error) => {})
    },

    getAuthStatus() {
        let getMemberAuthStatus = orderModel.getMemberAuthStatus

        let interval = util.interval(this.handleAuthStatusChange, 2000)

        this.setData({
            interval: interval
        })
    }
})