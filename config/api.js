const ApiRootUrl = 'http://47.97.81.252:8012/'
const wxAppId = 'wx868e9fcca4d78287'

module.exports = {
    wxAppId: wxAppId,
    soa: ApiRootUrl + 'service/soa',
    AuthLoginByWeixin: ApiRootUrl + 'auth/loginByWeixin',
    XCLogin: ApiRootUrl + 'login',
    XCLogout: ApiRootUrl + 'logout',
}