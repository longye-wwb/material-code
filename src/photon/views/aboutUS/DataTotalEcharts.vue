<!--
 * @Descripttion: 数据类型统计柱状图
 * @version: v1.0.2
 * @Author: payne (wenyi)
 * @Date: 2021-06-30 10:46:48
 * @LastEditors: payne (wenyi)
 * @LastEditTime: 2021-06-30 11:01:09
-->
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
      name: "条数",
      xdata:[],
      ydata:[],
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
          text: "数据导入条数统计",
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
          data: this.xdata,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.ydata,
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
  created: function(){
      this.fatchData();
  },
  mounted: function () {
    this.chart = Echarts.init(document.getElementById("main"));
    this.chart.setOption(this.option, true);

    this.$nextTick(() => {
      this.chart.resize();
    });
  },
  methods: {
      fatchData(){
          this.$postserver.getData("/history/type_total",{},function(data){
              data = data.data;
              this.xdata = [];
              this.ydata = [];
              console.log("获取到的曲线数据。",data);
              for(let i in data){
                  for(let j in AntennaTypes.DataDownload){
                      if(data[i].type == AntennaTypes.DataDownload[j].value){
                          this.xdata.push(AntennaTypes.DataDownload[j].label);
                          this.ydata.push(data[i].total);
                      }
                  }
              }
              this.refrashline();
          }.bind(this));
      },
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