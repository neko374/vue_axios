<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1>产品销售表</h1>
      </div>
      <div class="text item">
        <div class="com-chart" ref="seller_ref"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "../utils/myhttp";
export default {
  data() {
    return {
      mychart: null,
      allData: [],
      totalPage: 0, //总共
      pagesize: 5, //每页多少
      currertPage: 1, //当前页
      timeId: null, //定时
    };
  },
  mounted() {
    this.initChart();
    this.getData();
  },
  distroyed() {
    clearInterval(this.timeId);
    this.mychart.off("mouseover");
    this.mychart.off("mouseout");
  },
  methods: {
    initChart() {
      this.mychart = this.$echarts.init(this.$refs.seller_ref);
      const option = {
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "bar",
            barWidth: 30,
            label: {
              show: true,
              position: "right",
            },
            itemStyle: {
              borderRadius: [0, 10, 10, 0], //左上右上右下左下
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "orangered" },
                { offset: 0.4, color: "gray" },
                { offset: 1, color: "skyblue" }, //渐变色
              ]),
            },
          },
        ],
        grid: {
          top: "6%",
          left: "4%",
          right: "6%",
          bottom: "3%",
          containLabel: true, //宽高不包含文字
        },
      };
      this.mychart.setOption(option);
      this.mychart.on("mouseover", () => {
        clearInterval(this.timeId);
      });
      this.mychart.on("mouseout", () => {
        this.myTime;
      });
    },
    async getData() {
      const sellData = await axios.get("chart/bar");
      this.allData = sellData.datas;
      //排序
      this.allData.sort((a, b) => a.value - b.value);
      //获取页数
      this.totalPage = Math.ceil(this.allData.length / this.pagesize);
      this.updateData(); //太多了就分页
      this.myTime();
    },
    updateData() {
      const start = (this.currertPage - 1) * this.pagesize;
      const stop = this.currertPage * this.pagesize;
      const showData = this.allData.slice(start, stop);
      const sellName = showData.map((item) => item.name);
      const sellVal = showData.map((item) => item.value);
      const option = {
        yAxis: {
          data: sellName,
        },
        series: [{ data: sellVal }],
      };
      this.mychart.setOption(option);
    },
    myTime() {
      if (this.timeId) {
        clearInterval(this.timeId);
      }
      this.timeId = setInterval(() => {
        this.currertPage++;
        if (this.currertPage > this.totalPage) {
          this.currertPage = 1;
        }
        this.updateData();
      }, 8000);
    },
  },
};
</script>

<style scoped>
.com-chart {
  width: 90%;
  height: 60vh;
}
</style>