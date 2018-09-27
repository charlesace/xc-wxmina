/**
 * 订单模块
 */

const http = require('../utils/httpRequest.js')
const login = require('./login.js')

module.exports = {
    searchList: [],
    selectItemID: '',
    selectItemName: '',
    searchParams: {
        roleID: '',
        roleName: '',
        member_name: '',
        startIndex: 0,
        pageSize: 20
    },
    orderAmount: '',
    orderAmountPoint: '',
    xcAuthNO: '',
    members: [],    //  用于创建订单
    orderParams: [],    //
    orderID: '',    //  创建成功后返回的订单 ID
    payCode: '',
    yunOrderNO: '',
    buyerMemberNO: '',


    //  请求获取搜索列表数据 （输入名称改变时）
    getMemberSearchList: function (loadMore) {

        return new Promise((resolve, reject) => {
            http.request(
                'employee.member.query', {
                    app_id: login.appId,
                    member_role: this.searchParams['roleID'],
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
    },

    //  选择一项时，清空其他的
    setSelectItem: function (item) {
        
        this.selectItemID = item.id
        this.selectItemName = item.name

        this.updateMembers()
        this.updateSelectSearchList()
    },
    updateMembers: function () {
        console.log('111', this.members, this.searchParams['roleID'])
        
        this.members = this.members.map((item) => {
            if (item['role_code'] == this.searchParams['roleID']) {
                item['assigned_member_id'] = this.selectItemID
                item['assigned_member_name'] = this.selectItemName

                return item
            } else {
                return item
            }
        })
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

    reset () {
        this.resetSearchData()
        this.resetOrderInfo()
    },

    //  清空订单信息
    resetOrderInfo () {
        this.orderAmount = ''
        this.orderAmountPoint = ''
        this.xcAuthNO = ''
        this.members = []
        this.orderParams = []
        this.orderID = ''
        this.payCode = ''
        this.yunOrderNO = ''
        this.buyerMemberNO = '' 
    },

    //  离开搜索页面，清空搜索列表
    resetSearchData: function () {
        this.searchList = []
        this.selectItemID = ''
        this.selectItemName = ''
        this.searchParams = {
            roleID: '',
            member_name: '',
            startIndex: 0,
            pageSize: 20
        }
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
    createOrder: function (orderAmount, xcAuthNO) {

        return new Promise((resolve, reject) => {
            let payInfo = {
                order_amount: this.orderAmountPoint,
                product_id: this.productID,
                buyer_member_no: this.buyerMemberNO,
                employee_id: login['xcUserInfo']['employeeId'],
                employee_name: login['xcUserInfo']['name'],
                order_config: this.orderParams,
                members: this.members
            }

            http.request(
                'employee.order.crate',
                {
                    pay_info: payInfo
                }
            ).then((result) => {
                let  {
                    order_id,
                    pay_code,
                    yun_order_no
                } = result

                this.orderID = order_id
                this.payCode = pay_code
                this.yunOrderNO = yun_order_no

                resolve()
            }).catch((error) => {
                reject(error)
            })


        })
    },

    getOrderDetail: function (orderID) {
        return http.request(
            'employee.order.detail.query',
            {
                order_id: orderID
            }
        )
    },

    pollingOrderDetail: function (orderID) {
        return http.request(
            'employee.order.detail.query',
            {
                order_id: orderID
            },
            true
        )
    }
}