// pages/order/orderDetail.js

const orderModel = require('../../models/order.js')


Page({

  /**
   * 页面的初始数据
   */
    data: {
        orderID: '',    // 订单编号
        order_status: '订单状态',
        employee_id: '员工id',
        employee_name: '员工名称',
        order_amount: '订单金额',
        mobile: '手机号',   //  付款信息，手机号，当空时不显示付款信息
        members: [
        ],
        pay_method: '',
        channel_trade_no: '',
        create_time: '',
        pay_time: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let orderID = options['orderID']
        this.setData({
            orderID: orderID
        }, this.getOrderDetail)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    getOrderDetail: function () {
        let orderID = this.data['orderID']

        orderModel.getOrderDetail(orderID).then((result) => {
            this.orderDetailHandler(result)
        })
    },

    orderDetailHandler: function (result) {
        console.log('result', result)
        let {
            order_amount,
            employee_id,
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
            order_amount: parseFloat(order_amount).toFixed(2),
            employee_name: employee_name,
            members: JSON.parse(members),
            mobile: mobile || '',
            pay_method: pay_method || '',
            channel_trade_no: channel_trade_no || '',
            create_time: create_time || '',
            pay_time: pay_time || ''
        })
    }
})