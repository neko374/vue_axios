<template>
  <div>
    <el-table
      :data="
        tableData.slice((currentpage - 1) * pagesize, currentpage * pagesize)
      "
      style="width: 100%"
    >
      <el-table-column prop="id" label="编号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="oldprice" label="原价"> </el-table-column>
      <el-table-column prop="newprice" label="现价"> </el-table-column>
      <el-table-column prop="pic" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.pic" class="u-icon" />
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input size="mini" placeholder="输入关键字搜索" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentpage"
      :page-sizes="[3, 4, 5]"
      :page-size="pagesize"
      background
      layout="prev, pager, next, total, sizes, jumper"
      :total="tableData.length"
    >
    </el-pagination>
  </div>
</template>

<script>
import http from "../utils/myhttp";
export default {
  data() {
    return {
      tableData: [],
      searchname: "",
      filterData: [],
      currentpage: 1,
      pagesize: 4,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const result = await http.get("goods/list");
      this.tableData = result.datas;
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
img {
  height: 30px;
}
</style>