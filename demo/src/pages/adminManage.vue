<template>
  <div id="manage">
    <h2>管理员管理</h2>
    <el-button type="success" @click="handAdd">添加管理员</el-button>
    <template>
      <el-table :data="tableData" stripe style="width: 90%;margin:0 auto;">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="管理员账户"></el-table-column>
        <el-table-column prop="pass" label="管理员密码"></el-table-column>
        <el-table-column prop="des" label="管理员描述"></el-table-column>
        <el-table-column prop="time" label="添加时间"></el-table-column>
        <el-table-column label="操作管理员" width="130px">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEdit(scope.row)">修改管理员</el-button>
            <br />
            <el-button type="danger" @click="open(scope.row)">删除管理员</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 弹窗 -->
    <el-drawer
      :title="title"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      style="text-align:center"
    >
      <el-input
        placeholder="请输入管理员账号"
        v-model="admin.name"
        clearable
        class="min_input"
        :disabled="title == '修改管理员'"
      ></el-input>
      <el-input
        placeholder="请输入管理员密码"
        v-model="admin.pass"
        show-password
        class="min_input"
        :disabled="title == '修改管理员'"
      ></el-input>
      <el-input
        placeholder="请确认管理员密码"
        v-model="adminPass"
        v-if="title == '添加管理员'"
        show-password
        class="min_input"
      ></el-input>
      <el-input placeholder="管理员描述" v-model="admin.des" clearable class="min_input"></el-input>
      <el-date-picker v-model="admin.time" type="date" placeholder="选择日期" class="min_input"></el-date-picker>
      <div style="margin-top:20px">
        <el-button type="success" plain @click="fn">确定</el-button>
        <el-button type="warning" plain>取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import API from "../common/js/API";
export default {
  data() {
    return {
      tableData: [],
      drawer: false,
      direction: "rtl",
      title: "",
      admin: {
        name: "",
        pass: "",
        des: "",
        time: ""
      },
      adminPass: ""
    };
  },
  methods: {
    handAdd() {
      this.admin = {
        name: "",
        pass: "",
        des: "",
        time: ""
        // id:''
      };
      // 添加
      this.title = "添加管理员";
      this.drawer = true;
    },
    handleEdit(row) {
      // 修改
      this.drawer = true;
      this.title = "修改管理员";
      this.$axios({
        url: API.findManage,
        method: "post",
        data: {
          id: row.id
        }
      }).then(res => {
        this.admin = res.data.data[0];
      });
    },
    handleClose(done) {
      // 弹窗
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    fn() {
      if (this.title == "添加管理员") {
        this.$axios({
          url: API.addManage,
          method: "post",
          data: this.admin
        }).then(res => {
          if (res.data.isok) {
            this.open2(res.data.info);
            this.drawer = false;
          } else {
            this.open2(res.data.info);
          }
        });
      } else if (this.title == "修改管理员") {
        this.$axios({
          url: API.editManage,
          method: "post",
          data: {
            id: this.admin.id,
            des: this.admin.des,
            time: this.admin.time
          }
        }).then(res => {
          if (res.data.isok) {
            this.open2(res.data.info);
            this.drawer = false;
          } else {
            this.open2(res.data.info);
          }
        });
      }
    },
    open2(tips) {
      this.$message({
        message: tips,
        type: "success"
      });
    },
    open(row) {
      this.$confirm("此操作将永久删除该管理信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: API.delManage,
            method: "post",
            data: {
              id: row.id
            }
          }).then(res => {
            console.log(res);

            if (res.data.isok) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    find() {
      this.$axios({
        url: API.findManage,
        method: "post"
      })
        .then(res => {
          this.tableData = res.data.data;
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.find();
  }
};
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';

.min_input {
  width: 80%;
  margin-top: 20px;
}
</style>