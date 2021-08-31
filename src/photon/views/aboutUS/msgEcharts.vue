<template>
  <div id="aboutus" style="width: 100%; height: 180px"></div>
</template>

<script>
/**
 * 关于我们页面信息图标
 * @author Chris
 * */

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
            text: "信息获取类型",
          },
        ],
        series: [
          {
            type: "pie",
            radius: "100%",
            center: ["100%", "50%"],
            data: [
              {
                name: "Apples",
                value: 70,
              },
              {
                name: "Strawberries",
                value: 68,
              },
              {
                name: "Bananas",
                value: 48,
              },
              {
                name: "Oranges",
                value: 40,
              },
              {
                name: "Pears",
                value: 32,
              },
            ],
            left: 0,
            right: "50%",
            top: 0,
            bottom: 0,
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
    this.chart = Echarts.init(document.getElementById("aboutus"));
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