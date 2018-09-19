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
        productName: '',
        mobile: '',
        members: [
        ],
        orderConfig: [
        ],
        orderParams: [

        ],  //  创建订单的参数
        orderAmount: '',
        isCreateMember: false,  //  是否需要创建会员
        isAuthPass: false,   //    是否认证完成
        splitRuleID: '6445460536065925120',

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
        console.log('show', orderModel['members'])
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

            let orderParams = orderConfig.map((item) => {
                return {
                    field: item['field']
                }
            })

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
    //  订单金额 input
    bindinputOrderAmount (event) {
        let orderAmount = event.detail.value
        if (orderAmount.split('.').length > 2) {
            return
        }
        orderModel['orderAmount'] = orderAmount
        this.setData({
            orderAmount: orderAmount
        })
    },
    /**
     * 点击角色部分，如果可修改，弹出搜索框选择
     *
     */
    searchMember (event) {

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

    showSearchPage: function () {
        this.setData({
            searchPageHidden: false
        })
    },
    hideSearchPage: function () {
        this.setData({
            searchPageHidden: true
        })
    },
    resetSearchData: function () {
        this.setData({
            searchList: []
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
    inputTyping: function (e) {
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

    chooseMember (event) {
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

    orderConfigChange (event) {
        let value = event.detail.value
        let currentItem  = event['currentTarget']['dataset']['item']
        let orderParams = this.data['orderParams']

        let updatedParams = orderParams.map((item) => {
            if (item.field === currentItem.field) {
                item.value = value
            }

            return item
        })

        orderModel['orderParams'] = updatedParams

        this.setData({
            orderParams: updatedParams
        })

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

            if (member_id && is_bind_card) {
                clearInterval(this.data.interval)
                this.setData({
                    hasAuthPass: true,
                    mobile: mobile
                })
            }

        }).catch((error) => {})
    },

    getAuthStatus() {
        let getMemberAuthStatus = orderModel.getMemberAuthStatus

        let interval = util.interval(this.handleAuthStatusChange, 2000)

        this.setData({
            interval: interval
        })
    },

    orderConfirm () {
        let data = this['data']
        // let members = orderModel.members

        // if (isCreateMember && isAuthPass) {
        // }
        orderModel.createOrder().then((result) => {
            // console.log(result)
        })
        
    }
})