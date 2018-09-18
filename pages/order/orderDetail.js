// pages/order/orderDetail.js

const orderModel = require('../../models/order.js')


Page({

  /**
   * 页面的初始数据
   */
    data: {
        order_status: '订单状态',
        employee_id: '员工id',
        employee_name: '员工名称',
        order_amount: '订单金额',
        mobile: '手机号',
        member: [
            {
                "role_name": "开发商",
                "role_code": "R0001",
                "assigned_member_id": "指定会员id",
                "assigned_member_name": "指定会员名称",
                "is_member_show": "是否展示",
                "is_seller_member": "false"
            },
            {
                "role_name": "平台",
                "role_code": "R000",
                "assigned_member_id": "指定会员id",
                "assigned_member_name": "指定会员名称",
                "is_member_show": "是否展示",
                "is_seller_member": "false"
            },
            {
                "role_name": "中介商",
                "role_code": "R0002",
                "assigned_member_id": "指定会员id",
                "assigned_member_name": "指定会员名称",
                "is_member_show": "是否展示",
                "is_seller_member": "false"
            }
        ],
        "channel_trade_no": "通道交易号",
        "pay_method": "支付方式",
        "create_time": "创建时间",
        "pay_time": "支付时间",
        "order_id": "订单号" 
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        orderModel.getOrderDetail('6445900970131070976').then((result) => {
            console.log(result)
        })
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

    }
})