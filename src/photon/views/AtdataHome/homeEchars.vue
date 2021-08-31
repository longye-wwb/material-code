<template>
  <div id="main" style="width: 100%; height: 500px"></div>
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
      xAxisData: [],
      seriesData: [],
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
          data: this.xAxisData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.seriesData,
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
    /**
     * 访问热度
     * */

    this.$postserver.getData(
      "/hots/list",
      {},
      function (response) {
        for (let i = 0; i < response.data.length; i++) {
          this.xAxisData.push(response.data[i].name);
          this.seriesData.push(response.data[i].data);

          this.chart = Echarts.init(document.getElementById("main"));
          this.chart.setOption(this.option, true);

          this.$nextTick(() => {
            this.chart.resize();
          });
        }
      }.bind(this)
    );
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