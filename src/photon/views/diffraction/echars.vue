<template>
  <div id="main" style="width: 100%; height: 700px"></div>
</template>
<script src="https://cdn.jsdelivr.net/npm/echarts-gl/dist/echarts-gl.min.js"></script>
<script>
/*
 * @Author: Chris
 * @Date: 2021-05-19 15:17:46
 * @Last Modified by:   Chris
 * @Last Modified time: 2021-05-19 15:17:46
 */
import Echarts from "echarts";
import "echarts-gl";
export default {
  name: "LineMap",
  data() {
    return {
      chart: null,
      name: "振幅",
      echarsData: {},
      phaseX: [],
      phaseY: [],
      datatest: [],
    };
  },
  props: ["data"],
  computed: {
    option: function() {
      let _this = this;
      var hours = [];
      var days = [];
      var option = {
        tooltip: {},
        visualMap: {
          max: 0.03,
          inRange: {
            color: [
              "#313695",
              "#4575b4",
              "#74add1",
              "#abd9e9",
              "#e0f3f8",
              "#ffffbf",
              "#fee090",
              "#fdae61",
              "#f46d43",
              "#d73027",
              "#a50026",
            ],
          },
        },
        xAxis3D: {
          type: "category",
          data: hours,
        },
        yAxis3D: {
          type: "category",
          data: days,
        },
        zAxis3D: {
          type: "value",
        },
        grid3D: {
          boxWidth: 80,
          boxDepth: 80,
          viewControl: {
            // projection: 'orthographic'
          },
          light: {
            main: {
              intensity: 1.2,
              shadow: true,
            },
            ambient: {
              intensity: 0.3,
            },
          },
        },
        series: [
          {
            type: "bar3D",
            data: _this.datatest.map(function(item) {
              return {
                value: [item[1], item[0], item[2]],
              };
            }),
            shading: "lambert",
            label: {
              fontSize: 16,
              borderWidth: 1,
            },
            emphasis: {
              label: {
                fontSize: 1,
                color: "#900",
              },
              itemStyle: {
                color: "#900",
              },
            },
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
      let _this = this;
      for (let i in data.diffraction) {
        for (let z in data.diffraction[i]) {
          _this.datatest.push([Number(i), Number(z), data.diffraction[i][z]]);
        }
      }
      this.chart = Echarts.init(document.getElementById("main"));
      this.option && this.chart.setOption(this.option);
      this.$nextTick(() => {
        this.chart.resize();
      });
    },
  },
};
</script>
