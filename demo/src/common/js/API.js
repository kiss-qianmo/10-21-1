const api = '/api';
// const api = '';
const login = api + '/login'
// 管理员管理接口
const findManage = api + '/findManage'
const addManage = api + '/addManage'
const editManage = api + '/updateManage'
const delManage = api + '/delManage'
// banner图管理接口
const findBanner = api + '/banner'
const addBanner = api + '/addBanner'
const delBanner = api + '/delBanner'
// 家教接口
const addTeacherBanner = api + '/addTeacherBanner'
const teacherBanner = api + '/teacherBanner'
const delTeacherBanner = api + '/delTeacherBanner'
const addTeacherType = api + '/addTeacherType'
const teacherType = api + '/teacherType'
const delTeacherType = api + '/delTeacherType'
const updateTeacherType = api + '/updateTeacherType'
const addTeacherTop = api + '/addTeacherTop'
const teacherTop = api + '/teacherTop'
const delTeacherTop = api + '/delTeacherTop'
const updateTeacherTop = api + '/updateTeacherTop'
// 水站接口
const addWater = api + '/addWater'
const findWater = api + '/findWater'
const delWater = api + '/delWater'
const updateWater = api + '/updateWater'
const findComment = api + '/findComment'
const delComment = api + '/delComment'
// 维修接口
const addRepair = api + '/addRepair'
const findRepair = api + '/findRepair'
const delRepair = api + '/delRepair'
const updateRepair = api + '/updateRepair'
const findRepairComment = api + '/findRepairComment'
const delRepairComment = api + '/delRepairComment'
// 家政管理
const addHomeBanner = api + '/addHomeBanner'
const homeBanner = api + '/homeBanner'
const delHomeBanner = api + '/delHomeBanner'
const addHomeWorker = api + '/addHomeWorker'
const findHomeWorker = api + '/findHomeWorker'
const delHomeWorker = api + '/delHomeWorker'
const updateHomeWorker = api + '/updateHomeWorker'
const getQualification = api + '/getQualification'
const getHomeType = api + '/getHomeType'
// 退出登录
const exit = api + '/exit'
// 更改密码
const changePassManage = api + '/changePassManage'


export default {
    login,
    findManage,
    addManage,
    editManage,
    delManage,
    findBanner,
    addBanner,
    delBanner,
    addTeacherBanner,
    teacherBanner,
    addTeacherType,
    delTeacherBanner,
    teacherType,
    delTeacherType,
    updateTeacherType,
    teacherTop,
    addTeacherTop,
    delTeacherTop,
    updateTeacherTop,
    addWater,
    findWater,
    delWater,
    updateWater,
    findComment,
    delComment,
    addRepair,
    findRepair,
    delRepair,
    updateRepair,
    findRepairComment,
    delRepairComment,
    addHomeBanner,
    homeBanner,
    delHomeBanner,
    addHomeWorker,
    findHomeWorker,
    delHomeWorker,
    updateHomeWorker,
    getQualification,
    getHomeType,
    exit,
    changePassManage
}