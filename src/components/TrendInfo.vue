<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>趋势图表</span>
      </div>
      <div class="text item mybox">
        <div :style="mystyle">
          <div @click="setShow">
            <span>{{ mytitle }}</span>
            <i class="el-icon-arrow-down"></i>
          </div>
          <div class="u-down" v-show="isShow">
            <div v-for="item in selectType" :key="item.key">
              <span @click="handleSelect(item.key)" :style="mystyle">{{
                item.text
              }}</span>
            </div>
          </div>
        </div>
        <div class="com-chart" ref="trend_ref"></div>
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
      isShow: false,
      idx: "map",
      baseFontSize: 0,
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    window.addEventListener("resize", this.adapterWin);
    this.adapterWin();
  },
  destroyed() {
    window.removeEventListener("resize", this.adapterWin);
  },
  computed: {
    mytitle() {
      if (!this.allData[this.idx]) {
        return "";
      } else {
        return this.allData[this.idx].title;
      }
    },
    mystyle() {
      return { fontSize: this.baseFontSize / 1.5 + "px" };
    },
    selectType() {
      if (!this.allData.type) {
        return [];
      } else {
        return this.allData.type.filter((item) => item.key != this.idx);
      }
    },
  },
  methods: {
    handleSelect(val) {
      this.idx = val; //更改key
      this.updateData(); //数据更新
      this.setShow(); //关闭下拉项
    },
    setShow() {
      this.isShow = !this.isShow;
    },
    initChart() {
      this.mychart = this.$echarts.init(this.$refs.trend_ref);
      const initOption = {
        grid: {
          top: "10%",
          left: "8%",
          right: "6%",
          bottom: "5%",
          containLable: true, //包含标签
        },
        xAxis: {
          type: "category",
          boundaryGap: false, //x轴没有间距
        },
        legend: {
          left: 300,
          top: "8%",
          icon: "circle",
        },
        yAxis: {
          type: "value",
        },
      };
      this.mychart.setOption(initOption);
    },
    async getData() {
      const result = await axios.get("/chart/trend");
      this.allData = result.datas;
      this.updateData();
    },
    updateData() {
      const colorArr1 = [
        "rgba(11,168,44,0.5)",
        "rgba(44,110,255,0.5)",
        "rgba(22,242,217,0.5)",
        "rgba(250,105,0,0.5)",
      ];
      const colorArr2 = [
        "rgba(11,168,44,0)",
        "rgba(44,110,255,0)",
        "rgba(22,242,217,0)",
        "rgba(250,105,0,0)",
      ];
      // x轴的数据
      const xData = this.allData.common.month;
      // y轴的数据
      const yData = this.allData[this.idx].data;
      // 序列值
      const seriesArr = yData.map((item, index) => {
        return {
          name: item.name,
          type: "line",
          data: item.data,
          stack: "all",
          smooth: true,
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: colorArr1[index] },
              { offset: 1, color: colorArr2[index] },
            ]),
          },
        };
      });
      const legendArr = yData.map((item) => item.name);
      const updOption = {
        xAxis: {
          data: xData,
        },
        legend: {
          data: legendArr,
        },
        series: seriesArr,
      };
      this.mychart.setOption(updOption);
    },
    adapterWin() {
      this.baseFontSize = (this.$refs.trend_ref.offsetWidth / 100) * 3.5;
      const adpOption = {
        legend: {
          left: this.baseFontSize * 8,
          itemWidth: this.baseFontSize,
          itemHeight: this.baseFontSize,
          itemGap: this.baseFontSize,
          textStyle: {
            fontSize: this.baseFontSize / 1.5,
          },
        },
      };
      this.mychart.setOption(adpOption);
      this.mychart.resize();
    },
  },
};
</script>

<style scoped>
.com-chart {
  width: 100%;
  height: 75vh;
}
.mybox {
  position: relative;
  cursor: pointer;
}
.u-down {
  position: absolute;
  top: 20px;
  left: 0;
  z-index: 10;
}
</style>