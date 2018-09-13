const templateModel = require('../../models/template.js')

// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      templateID: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      let templateID = options['templateID']
      this.setData({
          templateID: templateID
      }, this.getTemplateDetail)
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

  getTemplateDetail () {
      let templateID = this.data.templateID
      let params = {
          product_id: templateID
      }

      console.log(params)

      templateModel.getTemplateDetail({
          product_id: templateID
      }).then((result) => {

      })
  }
})