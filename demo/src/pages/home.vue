<template>
  <div>
    <h2>家政管理</h2>
    <div id="repair">
      <!-- tab切换 -->
      <template>
        <!-- @tab-click="handleClick" -->
        <el-tabs v-model="activeName">
          <!-- banner -->
          <el-tab-pane label="家政banner" name="first">
            <el-button type="primary" @click="drawer = true">添加</el-button>
            <template>
              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column label="banner">
                  <template slot-scope="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.img"></el-image>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="danger" @click="del(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <!-- 评论 -->
          <el-tab-pane label="人员管理" name="second" style="text-align:center">
            <el-button type="success" @click="open">添加</el-button>
            <template>
              <el-select v-model="value" placeholder="请选择" style="width:80%;">
                <el-option label="全部" value></el-option>
                <el-option v-for="item in sel" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </template>
            <template>
              <el-table :data="tableData1" stripe style="width: 100%">
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="tel" label="电话"></el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="edu" label="学历"></el-table-column>
                <el-table-column prop="type" label="服务类型"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="find(scope.row)">查看</el-button>
                    <br />
                    <el-button type="danger" @click="delComment(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
        </el-tabs>
      </template>
      <!-- 弹出框 -->
      <el-dialog title="添加/修改人员信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item :label-position="labelPosition" label-width="80px">
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="form.age"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="资格认证">
              <el-checkbox-group v-model="form.qualification">
                <el-checkbox :label="item" v-for="item in cer" :key="item"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="服务项目">
              <el-checkbox-group v-model="form.type">
                <el-checkbox :label="val" v-for="val in sel" :key="val"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="学历">
              <template>
                <el-select v-model="form.edu" placeholder="请选择" style="width:80%;">
                  <el-option label="全部" value></el-option>
                  <el-option label="小学" value="小学"></el-option>
                  <el-option label="初中" value="初中"></el-option>
                  <el-option label="高中" value="高中"></el-option>
                  <el-option label="大学" value="大学"></el-option>
                  <el-option label="硕士" value="硕士"></el-option>
                  <el-option label="博士" value="博士"></el-option>
                </el-select>
              </template>
            </el-form-item>
            <el-form-item label="工作年限">
              <el-input v-model="form.year"></el-input>
            </el-form-item>
            <el-form-item label="级别">
              <el-input v-model="form.vNum"></el-input>
            </el-form-item>
            <el-form-item label="价格">
              <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="城市">
              <el-input v-model="form.city"></el-input>
            </el-form-item>
            <el-form-item label="经验">
              <el-input v-model="form.experience"></el-input>
            </el-form-item>
            <el-form-item label="点赞数量">
              <el-input v-model="form.likeNum"></el-input>
            </el-form-item>
            <el-form-item label="关注人数">
              <el-input v-model="form.readNum"></el-input>
            </el-form-item>
            <el-form-item label="距离">
              <el-input v-model="form.len"></el-input>
            </el-form-item>
            <el-form-item label="自我评价">
              <el-input v-model="form.info"></el-input>
            </el-form-item>
            <el-form-item label="照片">
              <el-input v-model="form.img"></el-input>
            </el-form-item>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="commont">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>

      <!-- 左侧框 -->
      <el-drawer
        title="添加banner"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
      >
        <el-form :model="addHome">
          <el-form-item label="图片路径" :label-width="formLabelWidth">
            <el-input v-model="addHome.img" autocomplete="off"></el-input>
          </el-form-item>
          <div style="text-align:center">
            <el-button type="success" @click="add">确定</el-button>
            <el-button type="primary" @click="drawer = false">取消</el-button>
          </div>
        </el-form>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import API from "../common/js/API";
export default {
  data() {
    return {
      activeName: "first",
      tableData: [],
      tableData1: [],
      value: "",
      drawer: false,
      direction: "ltr",
      labelPosition: "right",
      addHome: {
        img: ""
      },
      sel: [],
      cer: [],
      dialogFormVisible: false,
      form: {
        name: "",
        age: "",
        edu: "",
        year: "",
        type: [],
        qualification: [],
        vNum: "",
        price: "",
        city: "",
        experience: "",
        readNum: "",
        likeNum: "",
        len: "",
        tel: "",
        info: "",
        img: "",
        id: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    axio1() {
      this.$axios({
        url: API.homeBanner
      }).then(res => {
        this.tableData = res.data.data;
      });
    },
    axio2(obj) {
      this.$axios({
        url: API.findHomeWorker,
        params: obj
      }).then(res => {
        this.tableData1 = res.data.data;
      });
    },
    open1(row, val) {
      this.$confirm("此操作将永久删除该人员信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: API[val],
            params: {
              id: row.id
            }
          }).then(res => {
            if (res.data.isok) {
              val == "delHomeBanner" ? this.axio1() : this.axio2();
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
    // handleClick(tab, event) {
    //   console.log(tab, event);
    // },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    open() {
      this.dialogFormVisible = true;
      this.form = {
        name: "",
        age: "",
        edu: "",
        year: "",
        type: [],
        qualification: [],
        vNum: "",
        price: "",
        city: "",
        experience: "",
        readNum: "",
        likeNum: "",
        len: "",
        tel: "",
        info: "",
        img: "",
        id: ""
      };
    },
    add() {
      this.$axios({
        url: API.addHomeBanner,
        params: this.addHome
      }).then(res => {
        if (res.data.isok) {
          this.addHome = {
            img: ""
          };
          this.drawer = false;
          this.axio1();
          this.$message({
            message: "添加成功",
            type: "success"
          });
        }
      });
    },
    del(row) {
      this.open1(row, "delHomeBanner");
    },
    commont() {
      var login = "";
      if (this.form.id == "") {
        login = "addHomeWorker";
      } else {
        login = "updateHomeWorker";
      }
      // 添加
      this.$axios({
        url: API[login],
        params: this.form
      }).then(res => {
        if (res.data.isok) {
          this.dialogFormVisible = false;
          this.axio2();
          this.$message({
            type: "success",
            message: res.data.info
          });
        }
      });
    },
    find(row) {
      this.$axios({
        url: API.findHomeWorker,
        params: {
          id: row.id
        }
      }).then(res => {
        this.dialogFormVisible = true;
        // var str = JSON.stringify(res.data.data[0]);
        //  this.form = JSON.parse(str);
        this.form = res.data.data[0];
        // if (JSON.parse(this.form.type) != ) {
        //   this.form.type = JSON.parse(this.form.type);
        // } else {
        //     this.form.type = this.form.type.split(",");
        //     console.log(this.form.type);
        // }
        // if (JSON.parse(this.form.qualification)) {
        //   this.form.qualification = JSON.parse(this.form.qualification);
        // } else {
        //   this.form.qualification = this.form.qualification.split(",");
        // console.log(this.form.qualification);
        // }
        try {
          this.form.type = JSON.parse(this.form.type);
        } catch (error) {
          this.form.type = this.form.type.split(",");
        }
        try {
          this.form.qualification = JSON.parse(this.form.qualification);
        } catch (error) {
          this.form.qualification = this.form.qualification.split(",");
        }
        // this.req = "updateRepair";
        // console.log(JSON.parse(this.form.qualification));
      });
    },

    delComment(row) {
      this.open1(row, "delHomeWorker");
    }
  },
  watch: {
    value() {
      this.axio2({ type: this.value });
    }
  },
  mounted() {
    this.axio1();
    this.axio2();
    this.$axios({
      url: API.getHomeType
    }).then(res => {
      this.sel = res.data.type;
    });
    this.$axios({
      url: API.getQualification
    }).then(res => {
      this.cer = res.data.qualification;
    });
  }
};
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';

#repair {
  width: 90%;
  margin: 15px auto;
}
</style>