<template>
  <div id="main" style="width: 100%; height: 300px"></div>
</template>

<script>
import Echarts from "echarts";
export default {
  name: "LineMap",
  data() {
    return {
      chart: null,
      name: "振幅",
      echarsData: {},
      phaseX: [],
      phaseY: [],
    };
  },
  props: ["data"],
  computed: {
    option: function () {
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        xAxis: {
          type: "category",
          data: this.phaseX,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.phaseY,
            type: "line",
          },
        ],
      };
      return option;
    },
  },
  mounted() {},
  methods: {
    /**
     * 处理数据
     * */

    getData(data) {
      let a = [];
      let b = [];
      this.echartsdata = data;

      let nesss = JSON.parse(data.projectionData);
      for (var i = 0; i < nesss.length; i++) {
        a.push(nesss[i].wavelength);
        b.push(nesss[i].projection);
      }
      this.phaseX = a;
      this.phaseY = b;
      this.chart = Echarts.init(document.getElementById("main"));
      this.chart.setOption(this.option);
      this.$nextTick(() => {
        this.chart.resize();
      });
    },
  },
};
</script>