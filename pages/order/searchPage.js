// pages/order/searchPage.js
const template = require('../../models/template.js')
const orderModel = require('../../models/order.js')
const util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchList: [],
        currentIndex: 0,
        inputVal: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            searchList: orderModel.searchList
        })

        orderModel.getMemberSearchList().then(() => {
            this.updateSearchList()
        })
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
        wx.setNavigationBarTitle({
            title: orderModel.searchParams['roleName']
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
        orderModel.resetSearchData()
        this.resetData()
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
        console.log('more info')
        orderModel.getMemberSearchList(true).then(() => {
            this.updateSearchList()
        })
        
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },


    searchMember (event) {

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

        if (!is_member_updatable) {
            return
        }

        this.showSearchPage()
        wx.setNavigationBarTitle({title: role_name})

        orderModel.getAllMemberList(role_code).then((result) => {
            let searchList = result['members'] || []

            this.setData({
                searchList: searchList
            })
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
            searchList: [],
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

        // orderModel.getMemberSearchList().then((result) => {
        //     // let searchList = result['members'] || []

        //     this.setData({
        //         searchList: searchList
        //     })
        // })
    },
    inputTyping: function (e) {
        // let searchData = this.data.currentSearch
        let inputVal = e.detail.value
        orderModel.searchParams['member_name'] = inputVal
        this.setData({
            inputVal: inputVal
        })

        // orderModel.getMemberSearchList(inputVal).then(() => {
        //     this.updateSearchList()
        // })

        orderModel.getMemberSearchList().then(() => {
            this.updateSearchList()
        })

    },

    chooseMember (event) {
        let dataset = event['currentTarget']['dataset']
        let currentSearch = this.data['currentSearch']
        let chooseItem = dataset.item
        // 根据 当前搜索项与点击的项， 设置
        let members = this.data['members']

        console.log(chooseItem)

        orderModel.setSelectItem(chooseItem)
        this.updateSearchList()

    },

    updateSearchList () {
        this.setData({
            searchList: orderModel.searchList
        })
    },
    resetData () {
        this.setData({
            searchList: [],
        })
    }
})