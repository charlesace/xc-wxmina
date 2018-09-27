// pages/order/orderDetail.js

const orderModel = require('../../models/order.js')
const util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderID: '', // 订单编号
        order_status: '',
        status: '',
        employee_name: '',
        order_amount: '',
        mobile: '', //  付款信息，手机号，当空时不显示付款信息
        members: [],
        pay_method: '',
        channel_trade_no: '',
        create_time: '',
        pay_time: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let orderID = orderModel.orderID || options.orderID
        this.setData({
            orderID: orderID
        }, this.getOrderDetail)
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

    getOrderDetail: function() {
        let orderID = this.data['orderID']

        orderModel.getOrderDetail(orderID).then((result) => {
            this.orderDetailHandler(result)
        })

        // templateModel.getTemplateDetail(this.data.productID).then((result) => {
        //     let productName = result['product_name']
        //     let orderConfig = result['order_config']
        //     let members = result['members']
        //     let splitRuleID = result['split_rule_id']
        //     let isCreateMember = result['is_create_member']
        //     if (!isCreateMember) {
        //         this.setData({
        //             isAuthPass: true
        //         })
        //     }

        //     let orderParams = orderConfig.map((item) => {
        //         return {
        //             field: item['field']
        //         }
        //     })

        //     orderModel['orderConfig'] = orderConfig
        //     orderModel['orderParams'] = orderParams

        //     this.setData({
        //         productName: productName,
        //         orderConfig: orderConfig,
        //         orderParams: orderParams,
        //         members: members,
        //         splitRuleID: splitRuleID,
        //         isCreateMember: isCreateMember
        //     })

        // })
    },

    orderDetailHandler: function(result) {
        console.log('result', result)
        let {
            order_amount,
            employee_name,
            mobile,
            members,
            order_status,
            pay_method,
            channel_trade_no,
            create_time,
            pay_time
        } = result

        this.setData({
            order_amount: util.exactNum(order_amount / 100).toFixed(2),
            employee_name: employee_name,
            members: JSON.parse(members),
            mobile: mobile || '',
            pay_method: pay_method || '',
            channel_trade_no: channel_trade_no || '',
            create_time: create_time || '',
            pay_time: pay_time || '',
            status: orderModel.getOrderStatus(order_status)
        })
    }
})