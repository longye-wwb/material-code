<template>
  <div id="main" style="width: 100%; height: 400px"></div>
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
        title: {
          text: "数据查询热度",
        },
        color: ["#409EFF"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        xAxis: {
          type: "category",
          data: [
            "吸波材料",
            "纳米天线",
            "辐射制冷",
            "红外兼容",
            "偏振转换",
            "超宽带",
            "红外微波一体化",
            "红外偏振转换",
            "红外相位调控",
            "红外传感",
            "可见光相位调控",
            "微波吸收器",
            "微波窄带吸收",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [
              120,
              200,
              150,
              80,
              70,
              110,
              130,
              120,
              50,
              158,
              152,
              130,
              100,
            ],
            type: "bar",
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
    this.chart = Echarts.init(document.getElementById("main"));
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