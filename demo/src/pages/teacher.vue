<template>
  <div>
    <h2>家教管理</h2>
    <div id="jiajiao">
      <el-button type="primary" @click="dialog = true">添加</el-button>
      <!-- tab切换 -->
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="家教banner" name="teacherBanner">家教banner</el-tab-pane>
          <el-tab-pane label="家教类型" name="teacherType">家教类型</el-tab-pane>
          <el-tab-pane label="家教排行" name="teacherTop">家教排行</el-tab-pane>
        </el-tabs>
      </template>
      <!-- 表格渲染 -->
      <template>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column label="图片">
            <template slot-scope="scope">
              <el-image style="width: 100px; height: 100px" :src="scope.row.img"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="des" label="描述" v-if="des"></el-table-column>
          <el-table-column prop="type" label="类型" v-if="type"></el-table-column>
          <el-table-column prop="num" label="报名人数" v-if="num"></el-table-column>
          <el-table-column label="授课机构" v-if="teacherImg">
            <template slot-scope="scope">
              <el-image style="width: 100px; height: 100px" :src="scope.row.teacherImg"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" @click="deltan(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <!-- 添加图片弹窗 -->
      <el-drawer
        title="添加"
        :visible.sync="dialog"
        direction="ltr"
        custom-class="demo-drawer"
        ref="drawer"
      >
        <div class="demo-drawer__content">
          <el-form :model="form">
            <el-form-item label="图片路径" :label-width="formLabelWidth">
              <el-input v-model="form.img" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片描述" :label-width="formLabelWidth" v-if="des">
              <el-input v-model="form.des" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片类型" :label-width="formLabelWidth" v-if="type">
              <el-input v-model="form.type" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="报名人数" :label-width="formLabelWidth" v-if="num">
              <el-input v-model="form.num" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="机构图片" :label-width="formLabelWidth" v-if="teacherImg">
              <el-input v-model="form.teacherImg" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button type="primary" @click="handleClose">添加</el-button>
            <el-button @click="dialog = false">取 消</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import API from "../common/js/API";
export default {
  data() {
    return {
      activeName: "teacherBanner",
      tableData: [],
      dialog: false,
      loading: false,
      form: {
        img: "",
        des: "",
        num: "",
        teacherImg: "",
        type: ""
      },
      des: true,
      type: false,
      num: false,
      teacherImg: false,
      // type:this.tableData[0]['type'],
      formLabelWidth: "80px"
    };
  },
  methods: {
    handleClick(tab) {
      switch (this.activeName) {
        case "teacherBanner":
          this.des = true;
          this.type = false;
          this.num = false;
          this.teacherImg = false;
          break;
        case "teacherType":
          this.des = false;
          this.type = true;
          this.num = false;
          this.teacherImg = false;
          break;
        case "teacherTop":
          this.des = false;
          this.type = false;
          this.num = true;
          this.teacherImg = true;
          break;

        default:
          break;
      }
      // console.log(tab);
      this.$axios({
        url: API[this.activeName]
      }).then(res => {
        console.log(res);

        if (res.data.isok) {
          this.tableData = res.data.data;
        }
      });
    },
    open(val, code) {
      this.handleClick();
      this.$message({
        message: val,
        type: code
      });
    },
    deltan(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url:
              API[
                "delT" + this.activeName.substring(1, this.activeName.length)
              ],
            params: {
              id: row.id
            }
          }).then(res => {
            console.log(res);
            if (res.data.isok) {
              this.open(res.data.info, "warning");
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
    handleClose(done) {
      this.$confirm("确定要提交表单吗？")
        .then(() => {
          var obj = {};
          obj.img = this.form.img;
          switch (true) {
            case this.des:
              obj.des = this.form.des;
              break;
            case this.num:
              obj.num = this.form.num;
              obj.teacherImg = this.form.teacherImg;
              break;
            case this.type:
              obj.type = this.form.type;
              break;

            default:
              break;
          }
          this.$axios({
            url:
              API[
                "addT" + this.activeName.substring(1, this.activeName.length)
              ],
            params: obj
          }).then(res => {
            console.log(res);
            if (res.data.isok) {
              this.form = {
                img: "",
                des: "",
                num: "",
                teacherImg: "",
                type: ""
              };
              this.open(res.data.info, "success");
              this.dialog = false;
            }
          });
        })
        .catch(_ => {});
    }
  },
  mounted() {
    this.handleClick();
  }
};
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';

#jiajiao {
  width: 90%;
  margin: 15px auto;
}
</style>