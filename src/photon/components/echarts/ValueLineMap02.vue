<template>
  <el-row>
    <el-col>
      <div id="main02" style="width: 100%; height: 600px"></div>
    </el-col>
  </el-row>
</template>

<script>
import Echarts from "echarts";
import AntennaTypes from "../config/AntennaTypes.js";

export default {
  name: "ValueLineMap",
  data() {
    return {
      chart: null,
      name: "相位",
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
          text: this.name,
          textStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
          left: 64,
          top: 10,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: 26,
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 2,
          top: 60,
          bottom: 20,
          data: this.legendData,
          selected: this.selected,
          tooltip: {
            show: true,
            trigger: "item",
            formatter: (params) => {
              let viewData = {};
              for (var i = 0; i < that.lineData.length; i++) {
                if (params.name == that.lineData[i].name) {
                  that.selectLine = that.lineData[i];
                }
              }
              /**
               * 获取基底结构类型
               * */
              viewData.downType = that.getDownType(
                that.selectLine.structItem.downType
              );
              /**
               * 获取工作类型类型
               * */
              viewData.workType = that.getworkType(
                that.selectLine.structItem.workType
              );
              /**
               * 获取数据来源
               * */
              viewData.source = that.getsource(
                that.selectLine.structItem.source
              );
              /**
               * 获取天线类型
               * */
              viewData.topType = that.getTopType(
                that.selectLine.structItem.topType
              );
              /**
               * 获取入射光源类型
               * */
              viewData.lightType = that.getlightType(
                that.selectLine.structItem.lightType
              );
              let text = "";
              if (viewData.topType != null) {
                text += "天线结构类型: " + viewData.topType + "</br>";
              }

              if (that.selectLine.structItem.topConstant != null) {
                text +=
                  "天线介电常数: " +
                  that.selectLine.structItem.topConstant +
                  "</br>";
              }
              if (that.selectLine.structItem.x != null) {
                text +=
                  "天线长轴: " +
                  that.selectLine.structItem.x +
                  "&nbsp(nm)" +
                  "</br>";
              }
              if (that.selectLine.structItem.y != null) {
                text +=
                  "天线短轴: " +
                  that.selectLine.structItem.y +
                  "&nbsp(nm)" +
                  "</br>";
              }
              if (that.selectLine.structItem.r != null) {
                text +=
                  "天线半径: " +
                  that.selectLine.structItem.r +
                  "&nbsp(nm)" +
                  "</br>";
              }
              if (that.selectLine.structItem.minH != null) {
                text +=
                  "天线高度: " + that.selectLine.structItem.minH + "</br>";
              }
              if (that.selectLine.structItem.angle != null) {
                text +=
                  "面内偏转角度: " + that.selectLine.structItem.angle + "</br>";
              }
              if (viewData.downType != null) {
                text += "基底结构类型: " + viewData.downType + "</br>";
              }
              if (that.selectLine.structItem.downConstant != null) {
                "基底材料: " +
                  that.selectLine.structItem.downConstant +
                  "</br>";
              }
              if (that.selectLine.structItem.end != null) {
                text += "结束波长: " + that.selectLine.structItem.end + "</br>";
              }
              // if (that.selectLine.structItem.h != null) {
              //   text += "基底高度: " + that.selectLine.structItem.h + "</br>";
              // }
              if (that.selectLine.structItem.h != null) {
                text +=
                  "基底厚度: " +
                  that.selectLine.structItem.h +
                  "&nbsp(nm)" +
                  "</br>";
              }
              if (that.selectLine.structItem.p != null) {
                text +=
                  "基底边长: " +
                  that.selectLine.structItem.p +
                  "&nbsp(nm)" +
                  "</br>";
              }
              if (that.selectLine.structItem.start != null) {
                text +=
                  "起始波长: " + that.selectLine.structItem.start + "</br>";
              }
              if (viewData.lightType != null) {
                text += "入射光源类型: " + viewData.lightType + "</br>";
              }
              if (that.selectLine.structItem.lightAngle != null) {
                text +=
                  "入射角: " +
                  that.selectLine.structItem.lightAngle +
                  "&nbsp(°)" +
                  "</br>";
              }
              if (viewData.workType != null) {
                text += "工作方式: " + viewData.workType + "</br>";
              }
              if (viewData.source != null) {
                text += "数据来源: " + viewData.source + "</br>";
              }
              return text;
            },
          },
        },
        xAxis: {
          type: "value",
          name: "Frequency(THz)",
          //min: this.config.min,
          min: "dataMin",
          //max: this.config.max,
          max: "dataMax",
          //data: this.config.xdata,
        },
        yAxis: {
          type: "value",
          name: this.config.type == 1 ? "amplitude(%)" : "phase(°)",
        },
        series: this.buildLineData(),
        dataZoom: [
          {
            id: "dataZoomX",
            type: "slider",
            // xAxisIndex: [0],
            filterMode: "none",
            rangeMode: ["value", "percent"],
            //start: 30,
            //end:100,
            startValue: this.config.min,
            //endValue: this.config.max,
            //minValueSpan: 187,
            maxValueSpan: 100,
          },
          {
            id: "dataZoomY",
            type: "inside",
            yAxisIndex: [0],
            filterMode: "none",
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
    this.chart = Echarts.init(document.getElementById("main02"));
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
    /**
     * 获取基底结构类型
     * */
    getDownType(num) {
      let name = "";
      for (var i = 0; i < AntennaTypes.bottomTypes.length; i++) {
        if (num == AntennaTypes.bottomTypes[i].value) {
          name = AntennaTypes.bottomTypes[i].label;
        }
      }
      return name;
    },
    /**
     * 获取工作类型类型
     * */
    getworkType(num) {
      let name = "";
      for (var i = 0; i < AntennaTypes.workMethod.length; i++) {
        if (num == AntennaTypes.workMethod[i].value) {
          name = AntennaTypes.workMethod[i].label;
        }
      }
      return name;
    },
    /**
     * 获取入射光源类型
     * */
    getlightType(num) {
      let name = "";
      for (var i = 0; i < AntennaTypes.lightFrom.length; i++) {
        if (num == AntennaTypes.lightFrom[i].value) {
          name = AntennaTypes.lightFrom[i].label;
        }
      }
      return name;
    },
    /**
     * 获取数据来源
     * */
    getsource(num) {
      let name = "";
      for (var i = 0; i < AntennaTypes.dataFrom.length; i++) {
        if (num == AntennaTypes.dataFrom[i].value) {
          name = AntennaTypes.dataFrom[i].label;
        }
      }
      return name;
    },
    /**
     * 获取天线类型
     * */
    getTopType(num) {
      let name = "";
      for (var i = 0; i < AntennaTypes.antnnaTypes.length; i++) {
        if (num == AntennaTypes.antnnaTypes[i].value) {
          name = AntennaTypes.antnnaTypes[i].label;
        }
      }
      return name;
    },
    refrashline() {
      this.chart.setOption(this.option);
    },
    buildLineData() {
      let series = [];
      this.lineData = series;
      this.legendData = [];
      this.selected = {};
      for (let line in this.lines) {
        let impotData = this.lines[line];
        let item = {
          type: "line",
          smooth: true,
          symbol: "none",
          name: "line" + impotData.structItem.id,
          structItem: impotData.structItem,
          legendHoverLink: true,
          data: [],
        };
        for (let index in impotData.data) {
          let cur = impotData.data[index];
          var newPoint = [];
          newPoint.push(cur.frequency);
          if (this.config.type == "1") {
            newPoint.push(cur.amplitude ? cur.amplitude : null);
          } else {
            newPoint.push(cur.phase ? cur.phase : null);
          }
          item.data.push(newPoint);
        }
        series.push(item);
        this.legendData.push("line" + impotData.structItem.id);
        this.selected["line" + impotData.structItem.id] = true;
      }
      return series;
    },
  },
};
</script>