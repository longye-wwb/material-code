<template>
  <el-row>
    <el-col>
      <div id="main" style="width: 100%; height: 600px"></div>
    </el-col>
  </el-row>
</template>

<script>
import Echarts from "echarts";

export default {
  name: "LineMap",
  data() {
    return {
      chart: null,
      name: this.config.type == 1 ? "振幅" : "相位",
    };
  },
  props: {
    lines: {
      type: Array,
    },
    config: {
      type: Object,
    },
  },
  computed: {
    option: function () {
      var option = {
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            console.log("悬浮窗：", params);
            return (
              params +
              "</br>" +
              "天线结构" +
              params.data +
              "</br>" +
              "基底结构" +
              params.data +
              "</br>" +
              "对比销售：" +
              params.data
            );
          },
        },
        xAxis: {
          type: "category",
          data: this.config.xdata,
        },
        yAxis: {
          type: "value",
        },
        series: this.lines,
      };
      option.title = {
        text: this.name,
      };
      return option;
    },
  },
  watch: {
    lines: function (newVal, oldVal) {
      this.refrashline();
      console.log("曲线内容发生改变", newVal, oldVal);
    },
    config: function (newVal, oldVal) {
      console.log("曲线横坐标发生改变", newVal, oldVal);
    },
  },
  mounted: function () {
    this.chart = Echarts.init(document.getElementById("main"));
    this.chart.setOption(this.option);
    this.$nextTick(() => {
      this.chart.resize();
    });
  },
  methods: {
    refrashline() {
      this.chart.setOption(this.option);
    },
  },
};
</script>