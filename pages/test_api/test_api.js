// pages/test_api/test_api.js
let util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        response: ''
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
        // util.request(
        //   'http://47.97.81.252:8012/service/soa',
        //   {
        //     login_account: 'shou',
        //     password: '123456',
        //     wx_openid: 'o_bXM4jYesiOeSKK-Jeb3rgX6DSw'
        //   },
        //   'GET'
        // ).then((res) => {
        //   console.log(res)
        // })
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

    sendRequest () {
        // this.setData('response', )
        
        util.request(
            'http://47.97.81.252:8012/service/soa',
            {
                login_account: '你好',
                password: '123456',
                app_id: '0'
            },
            'POST',
            'employee.login'
        ).then((res) => {
            console.log(this, res)
            this.setData({
                'response': res
            })
        }).catch((error) => {
            console.log(this, error)
            this.setData({
                'response': JSON.stringify(error)
            })
            // wx.showToast({
            //     title: error.message + error.error_code,
            //     icon: 'none'
            // })

        })
    }
})