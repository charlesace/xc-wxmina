const templateModel = require('../../models/template.js')

Page({
    data: {
        cateInfo: [
            //   {
            //     catalog_id: '1',
            //     catalog_name: '万科',
            //     product_list: [
            //       {
            //         product_name: '万科aaa',
            //         product_id: '1',
            //         is_create_member: true,
            //         is_confirm_split: false,
            //         split_rule_id: '111'
            //       },
            //       {
            //         product_name: '万科bbb',
            //         is_create_member: true,
            //         is_confirm_split: false,
            //         split_rule_id: '222'
            //       },
            //       {
            //         product_name: '万科ccc',
            //         is_create_member: true,
            //         is_confirm_split: false,
            //         split_rule_id: '333'
            //       }
            //     ]
            //   },
            //   {
            //     catalog_id: '1',
            //     catalog_name: '美的项目',
            //     product_list: [
            //       {
            //         product_name: '美团aaa',
            //         is_create_member: true,
            //         is_confirm_split: false,
            //         split_rule_id: '111'
            //       },
            //       {
            //         product_name: '美团bbb',
            //         is_create_member: true,
            //         is_confirm_split: false,
            //         split_rule_id: '222'
            //       },
            //       {
            //         product_name: '美团ccc',
            //         is_create_member: true,
            //         is_confirm_split: false,
            //         split_rule_id: '333'
            //       }
            //     ]
            //   },

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