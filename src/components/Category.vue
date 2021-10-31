<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary" icon="el-icon-plus" @click="openadd"
          >添加类别</el-button
        >
      </div>
      <div class="text item">
        <tree-table
          :data="cateData"
          :columns="cateColumns"
          :expand-type="false"
          :selection-type="false"
          :show-index="true"
        >
          <template slot="c_level" slot-scope="scope">
            <el-tag v-if="scope.row.clevel === 1">一级</el-tag>
            <el-tag v-else-if="scope.row.clevel === 2" type="danger"
              >二级</el-tag
            >
          </template>
          <template slot="cate_operator">
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini"
              >删除</el-button
            >
          </template>
        </tree-table>
      </div>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="20%">
        <el-form-item label="分类名称">
          <el-input
            type="text"
            v-model="ruleForm.cname"
            autocomplete="off"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类级别">
          <el-cascader
            v-model="checkid"
            :options="cateData"
            :props="selectprops"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "../utils/myhttp";
export default {
  data() {
    return {
      cateData: [],
      dialogVisible: false,
      ruleForm: {
        cname: "",
      },
      cateColumns: [
        {
          label: "分类名称",
          prop: "cname",
        },
        {
          label: "分类级别",
          prop: "clevel",
          type: "template",
          template: "c_level",
        },
        {
          label: "操作",
          type: "template",
          template: "cate_operator",
        },
      ],
      checkid: "",
      selectprops: {
        label: "cname",
        children: "children",
        value: "cid",
        checkStrictly: true,
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const result = await axios.get("cate/list");
      this.cateData = result.datas;
    },
    openadd() {
      this.dialogVisible = true;
    },
    handleChange(value) {
      this.checkid = value;
      console.log("val:", this.checkid[1]);
      console.log("val:", this.checkid[0]);
    },
    //级联
    async addCate() {
      let cate = { cname: this.ruleForm.cname, pid: this.checkid[0] };
      const result = await axios.post("cate/add", cate);
      if (result.errorNo === 0) {
        this.$message.success(result.message);
        this.getData();
        this.dialogVisible = false;
        this.ruleForm.cname = "";
        this.checkid = 0;
      } else {
        this.$message.error(result.message);
      }
    },
  },
};
</script>

<style>
</style>