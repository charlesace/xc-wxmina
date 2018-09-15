const ApiRootUrl = 'http://47.97.81.252:8012/'

module.exports = {
    soa: ApiRootUrl + 'service/soa',
    AuthLoginByWeixin: ApiRootUrl + 'auth/loginByWeixin',
    XCLogin: ApiRootUrl + 'login',
    XCLogout: ApiRootUrl + 'logout',
    getTemplateList: ApiRootUrl + 'getTemplateList'
}