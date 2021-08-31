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
      echartsdata: {},
      phaseX: [],
      phaseY: [],
    };
  },
  props: ["datain"],
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
          name: "Frequency (THz)", //坐标名字
          nameLocation: "middle", //坐标位置，支持start,end，middle
          nameTextStyle: {
            //字体样式
            fontSize: 16, //字体大小
            padding: 20, //距离坐标位置的距离
          },
        },
        yAxis: {
          type: "value",
          name: "Amplitude (%)", //坐标名字
          nameLocation: "middle", //坐标位置，支持start,end，middle
          nameTextStyle: {
            //字体样式
            fontSize: 16, //字体大小
            padding: 40, //距离坐标位置的距离
          },
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
      for (var i = 0; i < this.echartsdata.dataArray.length; i++) {
        a.push(this.echartsdata.dataArray[i].waveLength);
        b.push(this.echartsdata.dataArray[i].phase);
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