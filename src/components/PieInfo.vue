<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>饼图销售分布图</span>
      </div>
      <div class="text item mybox">
        <div class="com-chart" ref="pie_ref"></div>
        <div>
          <span class="arrow-left" @click="toLeft" :style="myStyle">＜</span>
          <span class="arrow-right" @click="toPight" :style="myStyle">＞</span>
          <span class="u-title" :style="myStyle">{{ cname }}</span>
        </div>
      </div>
    </el-card>
  </div> 
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      allData: [],
      mychart: null,
      currentIdx: 0,
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
    cname() {
      if (!this.allData[this.currentIdx]) {
        return "";
      } else {
        return this.allData[this.currentIdx].name;
      }
    },
    myStyle() {
      return {
        fontSize: this.baseFontSize + "px",
      };
    },
  },
  methods: {
    toLeft() {
      this.currentIdx--;
      if (this.currentIdx < 0) {
        this.currentIdx = this.allData.length - 1;
      }
      this.updateData();
    },
    toPight() {
      this.currentIdx++;
      if (this.currentIdx > this.allData.length - 1) {
        this.currentIdx = 0;
      }
      this.updateData();
    },
    initChart() {
      this.mychart = this.$echarts.init(this.$refs.pie_ref);
      const option = {
        title: {
          text: "商品分布图",
          left: 20,
          top: 20,
        },
        series: {
          type: "pie",
        },
        emphasis: {
          lable: {
            show: true,
            color: "red",
          },
          itemStyle: {
            color: "#39c5bb",
          },
        },
        legend: {
          top: "5%",
          icon: "circle",
        },
        tooltip: {
          show: true,
          formatter: (args) => {
            const levelData = args.data.children;
            let str = "";
            let total = 0;
            levelData.forEach((item) => {
              total += item.value;
            });
            levelData.forEach((item) => {
              let prcent = parseInt((item.value / total) * 100);
              str += `${item.name}->->${item.value}->${prcent}%<br/>`;
            });
            return str;
          },
        },
      };
      this.mychart.setOption(option);
    },
    async getData() {
      const result = await axios.get("http://192.168.69.195:4000/chart/hot");
      this.allData = result.data.datas;
      console.log("allData:", this.allData);
      this.updateData();
    },
    updateData() {
      const lengendData = this.allData[this.currentIdx].children.map(
        (item) => item.name
      );
      const seriesData = this.allData[this.currentIdx].children.map((item) => {
        return {
          name: item.name,
          value: item.value,
          children: item.children,
        };
      });
      const option = {
        legend: {
          data: lengendData,
        },
        series: {
          data: seriesData,
        },
      };
      this.mychart.setOption(option);
    },
    adapterWin() {
      this.baseFontSize = (this.$refs.pie_ref.offsetWidth / 100) * 3.5;
      const adaOption = {
        title: {
          textStyle: {
            fontSize: this.baseFontSize,
          },
        },
        legend: {
          itemWidth: this.baseFontSize / 2,
          itemHeight: this.baseFontSize / 2,
          itemGap: this.baseFontSize / 2,
          textStyle: {
            fontSize: this.baseFontSize / 2,
          },
        },
        series: [
          {
            radius: this.baseFontSize * 4,
            center: ["50%", "50%"],
          },
        ],
      };
      this.mychart.setOption(adaOption);
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
}
.arrow-left,
.arrow-right {
  font-size: 50px;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  cursor: pointer;
}
.arrow-left {
  left: 10%;
}
.arrow-right {
  right: 10%;
}
.u-title {
  position: absolute;
  left: 50%;
  transform: translateY(-50%);
  bottom: -1%;
  font-size: 28px;
  z-index: 10;
}
</style>