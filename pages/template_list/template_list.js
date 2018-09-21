const templateModel = require('../../models/template.js')

Page({
    data: {
        cateInfo: [
        ]
    },

    onShow() {
        this.getTemplateListInfo()
    },

    onPullDownRefresh() {
        console.log('pullDown')
        this.getTemplateListInfo()
    },

    getTemplateListInfo() {
        templateModel.getTemplateList().then((res) => {
            let cateInfo = res['catalog_list']
            console.log(cateInfo)

            this.setData({
                cateInfo: cateInfo
            })
        })
    }

})