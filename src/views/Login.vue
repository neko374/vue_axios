<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="8">
        <h1 class="u-title">登录</h1>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="uname">
            <el-input
              type="text"
              v-model="ruleForm.uname"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ht from "../utils/myhttp";
export default {
  data() {
    var validateUname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名！"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码！"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        uname: "",
        pass: "",
      },
      rules: {
        uname: [{ validator: validateUname, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await ht.post("users/login", this.ruleForm);
          // console.log(result.datas.token);
          if (result.errorNo === 0) {
            sessionStorage.setItem("mytoken", result.datas.token);
            this.$message.success(result.message);
            this.$router.push("/index");
          } else {
            this.$message.error(result.message);
          }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.u-title {
  text-align: center;
}
h1 {
  margin-top: 100px;
}
</style>