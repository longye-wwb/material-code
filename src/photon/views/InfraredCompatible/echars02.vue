<template>
  <div id="main02" style="width: 100%; height: 300px"></div>
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
      let asss = JSON.parse(data.absorbingData);
      for (var i = 0; i < asss.length; i++) {
        a.push(asss[i].wavelength);
        b.push(asss[i].absorbing);
      }
      this.phaseX = a;
      this.phaseY = b;
      this.chart = Echarts.init(document.getElementById("main02"));
      this.chart.setOption(this.option);
      this.$nextTick(() => {
        this.chart.resize();
      });
    },
  },
};
</script>