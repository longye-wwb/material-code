<template>
  <div id="Search" style="width: 100%; height: 180px"></div>
</template>

<script>
import Echarts from "echarts";
import AntennaTypes from "../../components/config/AntennaTypes.js";

export default {
  name: "ValueLineMap",
  data() {
    return {
      chart: null,
      name: this.config.type == 1 ? "振幅" : "相位",
      lineData: [],
      legendData: [],
      selected: {},
      selectLine: {},
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
      // console.log("设置曲线参数", this.legendData, this.selected);
      let that = this;
      var option = {
        title: [
          {
            text: "检索频度",
          },
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "15%",
          //   right: "10%",
          //   bottom: "15%",
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六"],
        },
        series: [
          {
            name: "直接访问",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
          },
          {
            name: "邮件营销",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
          },
          {
            name: "联盟广告",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
          },

          {
            name: "搜索引擎",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [820, 901, 934, 1290, 1330, 1320],
          },
        ],
      };
      return option;
    },
  },
  watch: {
    lines: function () // newVal, oldVal
    {
      this.refrashline();
      // console.log("曲线内容发生改变", newVal, oldVal);
    },
    config: function () // newVal, oldVal
    {
      // console.log("曲线横坐标发生改变", newVal, oldVal);
    },
  },
  mounted: function () {
    this.chart = Echarts.init(document.getElementById("Search"));
    this.chart.setOption(this.option, true);

    this.$nextTick(() => {
      this.chart.resize();
    });
  },
  methods: {
    /**
     * 清空画布函数
     * */
    clearnfunction() {
      this.chart.clear();
    },

    refrashline() {
      this.chart.setOption(this.option);
    },
  },
};
</script>