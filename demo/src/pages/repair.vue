<template>
  <div>
    <h2>维修管理</h2>
    <div id="repair">
      <!-- tab切换 -->
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- 水站 -->
          <el-tab-pane label="维修" name="first">
            <el-button type="primary" @click="open">添加</el-button>
            <template>
              <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="id" label="ID" width="180"></el-table-column>
                <el-table-column prop="name" label="维修名称" width="180"></el-table-column>
                <el-table-column prop="tel" label="电话"></el-table-column>
                <el-table-column prop="type" label="类型"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="find(scope.row)">查看</el-button>
                    <el-button type="danger" @click="del(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <!-- 评论 -->
          <el-tab-pane label="维修评论" name="second" style="text-align:center">
            <template>
              <el-select v-model="value" placeholder="请选择" style="width:80%;">
                <el-option label="全部" value></el-option>
                <el-option
                  v-for="item in tableData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
            <template>
              <el-table :data="tableData1" stripe style="width: 100%">
                <el-table-column prop="id" label="ID" width="180"></el-table-column>
                <el-table-column prop="name" label="用户名称" width="180"></el-table-column>
                <el-table-column prop="content" label="评论内容"></el-table-column>
                <el-table-column prop="time" label="时间"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="danger" @click="delComment(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
        </el-tabs>
      </template>
      <el-drawer
        title="添加/更改维修"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
      >
        <el-form :label-position="labelPosition" label-width="80px" :model="addrepair">
          <el-form-item label="名称">
            <el-input v-model="addrepair.name"></el-input>
          </el-form-item>
          <el-form-item label="评分">
            <el-input v-model="addrepair.score"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="addrepair.type"></el-input>
          </el-form-item>
          <el-form-item label="点赞数量">
            <el-input v-model="addrepair.likeNum"></el-input>
          </el-form-item>
          <el-form-item label="关注人数">
            <el-input v-model="addrepair.readNum"></el-input>
          </el-form-item>
          <el-form-item label="商家地址">
            <el-input v-model="addrepair.address"></el-input>
          </el-form-item>
          <el-form-item label="距离">
            <el-input v-model="addrepair.len"></el-input>
          </el-form-item>
          <el-form-item label="商家信息">
            <el-input v-model="addrepair.info"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="addrepair.tel"></el-input>
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
      addrepair: {
        name: "",
        score: "",
        likeNum: "",
        readNum: "",
        address: "",
        len: "",
        info: "",
        tel: "",
        type: ""
      },
      req: "addRepair"
    };
  },
  methods: {
    axio1() {
      this.$axios({
        url: API.findRepair
      }).then(res => {
        // console.log(res);

        this.tableData = res.data.data;
      });
    },
    axio2() {
      this.$axios({
        url: API.findRepairComment,
        params: {
          repairId: this.value
        }
      }).then(res => {
        console.log(res);

        this.tableData1 = res.data.data;
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    open() {
      this.drawer = true;
      this.addrepair = {
        name: "",
        score: "",
        likeNum: "",
        readNum: "",
        address: "",
        len: "",
        info: "",
        tel: "",
        type: ""
      };
      this.req = "addRepair";
    },
    add() {
      this.$axios({
        url: API[this.req],
        params: this.addrepair
      }).then(res => {
        if (res.data.isok) {
          this.addrepair = {
            name: "",
            score: "",
            likeNum: "",
            readNum: "",
            address: "",
            len: "",
            info: "",
            tel: "",
            type: ""
          };
          this.drawer = false;
          this.axio1();
          this.$message({
            message: this.req == "addRepair" ? "添加成功" : "修改成功",
            type: "success"
          });
        }
      });
    },
    find(row) {
      this.$axios({
        url: API.findRepair,
        params: {
          id: row.id
        }
      }).then(res => {
        this.drawer = true;
        this.addrepair = res.data.data[0];
        this.req = "updateRepair";
      });
    },
    open1(row, val) {
      this.$confirm("此操作将永久删除该水站, 是否继续?", "提示", {
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
              val == "delRepair" ? this.axio1() : this.axio2();
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
    del(row) {
      this.open1(row, "delRepair");
    },
    delComment(row) {
      this.open1(row, "delRepairComment");
    }
  },
  watch: {
    value() {
      this.axio2();
    }
  },
  mounted() {
    this.axio1();
    this.axio2();
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