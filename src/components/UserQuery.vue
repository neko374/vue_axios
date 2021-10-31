<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="NO."> </el-table-column>
      <el-table-column prop="uname" label="姓名"> </el-table-column>
      <el-table-column prop="email" label="✉️"> </el-table-column>
      <el-table-column prop="phone" label="☎️"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="updateState(scope.row)"
          >
          </el-switch></template
      ></el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button
            @click="del(scope.row.id)"
            type="danger"
            size="small"
            icon="el-icon-delete"
            >删除</el-button
          >
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="openupd(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <button type="button" :class="{ active: idx === 1 }" @click="one">
      首页</button
    ><button type="button" :class="{ active: idx === 2 }" @click="two">
      上一页</button
    ><button type="button" :class="{ active: idx === 3 }" @click="three">
      下一页</button
    ><button type="button" :class="{ active: idx === 4 }" @click="four">
      尾页
    </button>
  </div>
</template>

<script>
import http from "../utils/myhttp";
export default {
  data() {
    return {
      tableData: [],
      pagenum: 1,
      pagesize: 4,
      totalNum: 0,
      idx: 1,
      menuData: ["首页", "上一页", "下一页", "尾页"],
      value: true,
    };
  },
  created() {
    this.getData();
    this.getNum();
  },
  methods: {
    updateState(row) {
      this.$confirm("确认更改？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (getuser().id == row.id) {
            this.$message.error("当前用户不能更改");
            this.getData();
          } else {
            const result = await http.put("users/update", {
              id: row.id,
              status: row.status,
            });
            if (result.errorNo == 0) {
              this.$message(result.message);
            } else {
              this.$message.error(result.message);
            }
          }
        })
        .catch((err) => {
          this.getData();
        });
    },
    async getData() {
      const result = await http.get(
        `users/list?pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      result.datas.forEach((item) => {
        if (item.status == 1) {
          item.status = false;
        } else {
          item.status = true;
        }
      });
      this.tableData = result.datas;
    },
    async getNum() {
      const result = await http.get(`users/allrecord`);
      const num = result.datas.allnum;
      this.totalNum = Math.ceil(num / this.pagesize);
    },
    one() {
      this.pagenum = 1;
      this.getData();
      this.idx = 1;
    },
    two() {
      this.pagenum = -1;
      this.pagenum = this.pagenum < 1 ? 1 : this.pagenum;
      this.getData();
      this.idx = 2;
    },
    three() {
      this.pagenum = +1;
      this.pagenum = this.pagenum > 1 ? this.pagenum : this.totalNum;
      this.getData();
      this.idx = 3;
    },
    four() {
      this.pagenum = this.totalNum;
      this.getData();
      this.idx = 4;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentpage = val;
    },
  },
};
</script>

<style lang="less" scoped>
button {
  width: 60px;
  height: 30px;
  line-height: 30px;
  //   background: white;
  text-align: center;
  border: gray 1px solid;
  margin-right: 10px;
  margin-top: 10px;
}
.active {
  background: blue;
  color: white;
}
</style>