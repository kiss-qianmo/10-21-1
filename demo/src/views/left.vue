<template>
  <div id="left">
    <el-menu :span="24">
      <el-menu default-active="0" class="el-menu-vertical-demo">
        <el-menu-item index="1" v-if="isAdmin === 0">
          <i class="el-icon-s-custom"></i>
          <span slot="title" is="router-link" to="/index/manage/adminManage" active-class="select">管理员管理</span>
        </el-menu-item>
        <el-menu-item index="2" v-if="isAdmin == 1">
          <i class="el-icon-picture-outline"></i>
          <span slot="title" is="router-link" to="/index/admin/banner" active-class="select">banner管理</span>
        </el-menu-item>
        <el-menu-item index="3" v-if="isAdmin == 1">
          <i class="el-icon-user"></i>
          <span slot="title" is="router-link" to="/index/admin/teacher" active-class="select">家教管理</span>
        </el-menu-item>
        <el-menu-item index="4" v-if="isAdmin == 1">
          <i class="el-icon-ship"></i>
          <span slot="title" is="router-link" to="/index/manage" active-class="select">banner管理</span>
        </el-menu-item>
        <el-menu-item index="5" v-if="isAdmin == 1">
          <i class="el-icon-setting"></i>
          <span slot="title" is="router-link" to="/index/manage" active-class="select">banner管理</span>
        </el-menu-item>
        <el-menu-item index="6" v-if="isAdmin == 1">
          <i class="el-icon-office-building"></i>
          <span slot="title" is="router-link" to="/index/manage" active-class="select">banner管理</span>
        </el-menu-item>
        <el-menu-item index="7" v-if="isAdmin == 1">
          <i class="el-icon-key"></i>
          <span slot="title" is="router-link" to="/index/manage" active-class="select">banner管理</span>
        </el-menu-item>
      </el-menu>
    </el-menu>
  </div>
</template>
<script>
import API from "../common/js/API";
export default {
  data(){
    return {
      isAdmin:''
    }
  },
  mounted(){
    this.isAdmin = this.$store.state.isAdmin
    console.log(this.isAdmin);
    
  }
};
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';

#left {
  width: 200px;

  ul {
    height: 100%;
  }
}

a {
  display: inline-block;
  width 90%
  text-decoration none;
  color #606266
}
.select{
    color #409EFF
}
</style>