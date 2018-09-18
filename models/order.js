/**
 * 订单模块
 */

const http = require('../utils/httpRequest.js')
const login = require('./login.js')

module.exports = {
    searchList: [],
    selectItemID: '',
    searchParams: {
        roleID: '',
        member_name: '',
        startIndex: 0,
        pageSize: 20
    },
    members: [],    //  用于创建订单


    //  请求获取搜索列表数据 （输入名称改变时）
    getMemberSearchList: function (loadMore) {

        return new Promise((resolve, reject) => {
            http.request(
                'employee.member.query', {
                    app_id: login.appId,
                    member_role: this.roleID,
                    member_name: this.searchParams['member_name'],
                    start_index: loadMore ? this.searchParams['startIndex'] : 0,
                    page_size: this.searchParams['pageSize']
                }
            ).then((res) => {
                if (loadMore) {
                    this.searchParams['startIndex'] += this.searchParams['pageSize']
                    this.searchList.push(...res['members'])
                    this.updateSelectSearchList()
                } else {
                    this.searchParams['startIndex'] = this.searchParams['pageSize'] - 1
                    this.searchList = res['members']
                    this.updateSelectSearchList()
                }
                // console.log(this.searchList)
                resolve()
            }).catch((err) => {
                reject(err)
            })
        })

        // return http.request(
        //     'employee.member.query', {
        //         app_id: login.appId,
        //         member_role: this.roleID,
        //         member_name: this.memberName,
        //         start_index: startIndex,
        //         page_size: this.searchParams.pageSize
        //     }
        // )
    },

    //  选择一项时，清空其他的
    setSelectItem: function (id) {
        this.selectItemID = id

        this.updateSelectSearchList()
    },
    updateSelectSearchList: function () {
        this.searchList = this.searchList.map((item) => {
            if (item.id === this.selectItemID) {
                item.selected = true
                return item
            } else {
                item.selected = false
                return item
            }
        })
    },

    // 获取买家临时唯一编码
    getMemberAuthNo: function() {
        return http.request('member.authno.get')
    },

    // 获取买家认证状态
    getMemberAuthStatus: function(authNo) {
        return http.request(
            'member.authno.query', {
                xc_auth_no: authNo
            },
            true
        )
    },

    //  创建订单
    createOrder: function (orderAmount, productID, xcAuthNO, orderConfig, members) {

        return http.request(
            'employee.order.crate',
            {
                pay_info: {
                    order_amount: orderAmount,
                    xc_auth_no: xcAuthNO,
                    product_id: productID,
                    employee_id: login['xcUserInfo']['employeeId'],
                    employee_name: login['xcUserInfo']['name'],
                    order_config: orderConfig,
                    members: members
                }
            }
        )
    },

    getOrderDetail: function (orderID) {
        return http.request(
            'employee.order.detail.query',
            {
                order_id: orderID
            }
        )
    }
}