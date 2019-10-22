<template>
  <div>
    <h2>修改密码</h2>
    <div id="pass">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-input placeholder="请输入内容" v-model="form.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="原始密码">
          <el-input placeholder="请输入密码" v-model="form.oldpass" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input placeholder="请输入密码" v-model="form.newpass" show-password></el-input>

        </el-form-item>
        <el-form-item label="确认密码">
          <el-input placeholder="请输入密码" v-model="newpass" show-password></el-input>
        </el-form-item>
      </el-form>
      <el-button type="info" @click="updata">修改密码</el-button>
    </div>
  </div>
</template>
<script>
import API from "../common/js/API";
export default {
  data() {
    return {
      form: {
        name: "yjh",
        oldpass: "",
        newpass: ""
      },
      newpass: ""
    };
  },
  methods: {
    updata() {
      this.$axios({
        url: API.changePassManage,
        method: "post",
        data: this.qs.stringify(this.form)
      }).then(res => {
        if (res.data.isok) {
          this.$message({
            type: "success",
            message: res.data.info
          });
        }
      });
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';

#pass {
  width: 90%;
  margin: 15px auto;
}
</style>