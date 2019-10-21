<template>
  <div id="index">
      <v-header></v-header>
      <div class="main">
          <v-left></v-left>
          <v-right></v-right>
      </div>
  </div>

  <!-- <el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container> -->
</template>
<script>
import API from "../common/js/API";
import vLeft from '@/views/left'
import vRight from '@/views/right'
import vHeader from '@/views/header'
export default {
    components:{
        vLeft,
        vRight,
        vHeader
    }
};
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';
#index{
    width 100vw
    height 100vh
    display flex
    flex-direction column
    .main{
        flex 1
        display flex
    }
}
</style>