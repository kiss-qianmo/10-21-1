const api = '/api';
// const api = '';
const login = api+'/login'
// 管理员管理接口
const findManage = api+'/findManage'
const addManage = api+'/addManage'
const editManage = api+'/updateManage'
const delManage = api+'/delManage'
// banner图管理接口
const findBanner = api+'/banner'
const addBanner = api+'/addBanner'
const delBanner = api+'/delBanner'
// 家教接口
const addTeacherBanner = api+'/addTeacherBanner'
const teacherBanner = api+'/teacherBanner'
const delTeacherBanner = api+'/delTeacherBanner'
const addTeacherType = api+'/addTeacherType'
const teacherType = api+'/teacherType'
const delTeacherType = api+'/delTeacherType'
const updateTeacherType = api+'/updateTeacherType'
const addTeacherTop = api+'/addTeacherTop'
const teacherTop = api+'/teacherTop'
const delTeacherTop = api+'/delTeacherTop'
const updateTeacherTop = api+'/updateTeacherTop'


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
    updateTeacherTop
}