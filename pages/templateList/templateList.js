const templateModel = require('../../models/template.js')

Page({
    data: {
        cateInfo: []
    },

    onShow() {
        this.getTemplateListInfo()
    },

    onPullDownRefresh() {
        console.log('pullDown')
        this.getTemplateListInfo()
    },

    onShareAppMessage() {
        return {
            title: '小冲收银',
            path: '/pages/index/index'
        }
    },

    getTemplateListInfo() {
        templateModel.getTemplateList().then((res) => {
            let cateInfo = res['catalog_list']
            console.log(cateInfo)

            this.setData({
                cateInfo: cateInfo
            })
            wx.stopPullDownRefresh()
        })
    }

})