<template>
  <div id="home">
    <el-container>
      <el-header class="m-header">
        <h1>好看的后台管理系统</h1>
        <div class="u-info">
          <span>管理员:{{ crrentuser }} </span>
          <time> 时间:{{ systime | dateformat }} 都几点了！！！ </time>
          <span @click="logout"> 退出</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="auto"><left></left></el-aside>
        <el-main>
          <collapse></collapse>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Collapse from '../components/Collapse.vue';
import Left from "../components/Left.vue";
import { getuser } from "../utils/myinfo";
export default {
  name: "Home",
  components: { Left, Collapse },

  data() {
    return {
      crrentuser: "",
      //解决时间bug
      systime: new Date(),
    };
  },
  created() {
    const user = getuser();
    this.crrentuser = user.uname;
    this.getTime();
  },
  //销毁
  destroyed() {
    clearInterval(this.timeID);
  },
  methods: {
    ...mapActions,
    getTime() {
      this.timeID = setInterval(() => {
        this.systime = new Date();
      }, 1000);
    },
    logout() {
      this.$confirm("确认退出, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sessionStorage.removeItem("mytoken");
          this.$router.push("/login");
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="less" scoped>
.el-header,
.el-footer {
  background-color: skyblue;
  color: #333;
  text-align: center;
  line-height: 30px;
}

.el-aside {
  // background-color: skyblue;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  // background-color: skyblue;
  color: #333;
  text-align: center;
  // line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>