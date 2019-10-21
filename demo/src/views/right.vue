<template>
<div id="right">
    <router-view></router-view>
</div>
</template>
<script>
import API from '../common/js/API'
export default {
}
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';
#right{
    flex 1
}
</style>