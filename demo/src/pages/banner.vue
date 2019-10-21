<template>
  <div>
    <h2>banner管理</h2>
    <el-button type="success" @click="dialogFormVisible = true">添加banner</el-button>
    <!-- 表格渲染 -->
    <template>
      <el-table :data="tableData" stripe style="width: 90%;margin:0 auto;">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column label="管理员账户">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 100px" :src="scope.row.img"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="des" label="管理员描述"></el-table-column>
        <el-table-column label="操作banner" width="130px">
          <template slot-scope="scope">
            <el-button type="danger" @click="del(scope.row)">删除banner</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 添加弹窗 -->

    <el-dialog title="添加图片" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="图片路径" :label-width="formLabelWidth">
          <el-input v-model="form.img" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片描述" :label-width="formLabelWidth">
          <el-input v-model="form.des" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import API from "../common/js/API";
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        img: "",
        des: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    add() {
      this.$axios({
        url: API.addBanner,
        params: this.form
      }).then(res => {
        if (res.data.isok) {
          this.dialogFormVisible = false;
          this.form = {
            img: "",
            des: ""
          };
          this.open1(res.data.info, "success");
        } else {
          this.open1(res.data.info, "warning");
        }
      });
    },
    open(row) {
      this.$axios({
        url: API.delBanner,
        params: {
          id: row.id
        }
      }).then(res => {
        if (res.data.isok) {
          this.open1(res.data.info, "success");
        } else {
          this.open1(res.data.info, "warning");
        }
      });
    },
    open1(val, code) {
      this.$message({
        message: val,
        type: code
      });
    },
    del(row) {
      this.$confirm("此操作将永久删除该图片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
        url: API.delBanner,
        params: {
          id: row.id
        }
      }).then(res => {
        if (res.data.isok) {
          this.open1(res.data.info, "success");
        } else {
          this.open1(res.data.info, "warning");
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
  },
  mounted() {
    this.$axios({
      url: API.findBanner
    }).then(res => {
      this.tableData = res.data.data;
    });
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