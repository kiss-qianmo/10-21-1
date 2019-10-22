<template>
<div id="header">
    <h3>
        欢迎登录XXXX后台管理系统
    </h3>
    <el-button type="primary" icon="el-icon-s-fold" style="float:right;margin:25px;" @click="end">退出</el-button>
</div>
</template>
<script>
import API from '../common/js/API'
export default {
    methods: {
        end(){
            this.$axios({
                url:API.exit
            }).then(res=>{
                if(res.data.isok){
                    sessionStorage.setItem('admin','')
                    this.$router.replace('/login');
                }
            })
        }
    },
}
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';
#header{
    height 100px
    line-height 100px
    background-color #409EFF
    h3{
        float left
        color #fff
        margin-left 25px
    }
}
</style>