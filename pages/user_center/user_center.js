// pages/user_center/user_center.js
let login = require('../../models/login.js')
let config = require('../../config/config.js')

Page({
    /**
     * 页面的初始数据
     */
    data: {
        userName: '',
        servicePhone: '',
        version: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            userName: login.xcUserInfo.name || '',
            servicePhone: config.servicePhone,
            version: config.clientVersion
        })
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

    logout() {
        login.logoutServer()
    },

    makePhoneCall (event) {
        let servicePhone = this.data.servicePhone

        wx.makePhoneCall({
            phoneNumber: servicePhone
        })
    }
})