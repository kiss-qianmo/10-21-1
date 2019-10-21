<template>
  <div id="login">
    <div class="box">
      <div class="min_box" style="text-align:left">
        <template>
          <el-select v-model="user.type" placeholder="请选择身份" id="admin">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </div>
      <div class="min_box">
        <el-input v-model="user.name" placeholder="请输入管理员账号" clearable></el-input>
      </div>
      <div class="min_box">
        <el-input placeholder="请输入密码" v-model="user.pass" show-password></el-input>
      </div>
      <div class="min_box">
        <template>
          <el-button @click="login" type="primary">登录</el-button>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../common/js/API";
export default {
  data() {
    return {
      user: {
        name: "",
        pass: "",
        type: ""
      },
      options: [
        {
          value: "0",
          label: "超级管理员"
        },
        {
          value: "1",
          label: "普通管理员"
        }
      ]
    };
  },
  methods: {
    open(e) {
      this.$message(e);
    },
    login() {
      this.$axios({
        url: api.login,
        method: "post",
        data: this.user
      })
        .then(res => {
          if (res.data.isok) {
            this.$store.dispatch("adminLogin", res.data.type);
            this.$router.replace("/index");
          } else {
            this.open(res.data.info);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';

#login {
  width: 100vw;
  height: 100vh;
  background: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571658641091&di=deeed8094e58c07fec9d90b02118ff17&imgtype=0&src=http%3A%2F%2Fattachments.gfan.net.cn%2Fforum%2Fattachments2%2Fday_120106%2F120106201160eebd7607c9b016.jpg') no-repeat 0 0;

  .box {
    width: 400px;
    height: 300px;
    background-color: #F2F6FC;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    text-align: center;

    .min_box {
      width: 80%;
      margin: 0 auto;
      margin-top: 25px;
    }
  }
}

#admin {
  width: 100%;
}
</style>