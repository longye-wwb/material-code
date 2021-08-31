<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-if="tableData[0] == undefined || tableData[0].topType"
        prop="topType"
        label="天线结构类型"
      >
      </el-table-column>
      <el-table-column
        v-if="tableData[0] == undefined || tableData[0].topConstant"
        prop="topConstant"
        label="天线介电常数"
      >
      </el-table-column>
      <el-table-column
        v-if="tableData[0] == undefined || tableData[0].x"
        prop="x"
        label="天线长轴"
      >
      </el-table-column>
      <el-table-column
        v-if="tableData[0] == undefined || tableData[0].y"
        prop="y"
        label="天线短轴"
      >
      </el-table-column>
      <el-table-column
        v-if="tableData[0] == undefined || tableData[0].r"
        prop="r"
        label="天线半径"
      >
      </el-table-column>
      <el-table-column
        v-if="tableData[0] == undefined || tableData[0].minH"
        prop="minH"
        label="天线高度"
      >
      </el-table-column>
      <el-table-column
        v-if="tableData[0] == undefined || tableData[0].angle"
        prop="angle"
        label="面内偏转角度"
      >
      </el-table-column>
      <el-table-column
        v-if="tableData[0] == undefined || tableData[0].downType"
        prop="downType"
        label="基底结构类型"
      >
      </el-table-column>
      <el-table-column
        v-if="tableData[0] == undefined || tableData[0].downConstant"
        prop="downConstant"
        label="基底材料"
      >
      </el-table-column>
      <el-table-column
        v-if="tableData[0] == undefined || tableData[0].end"
        prop="end"
        label="结束波长"
      >
      </el-table-column>
      <el-table-column
        v-if="tableData[0] == undefined || tableData[0].h"
        prop="h"
        label="基底厚度"
      >
      </el-table-column
      ><el-table-column
        v-if="tableData[0] == undefined || tableData[0].p"
        prop="p"
        label="基底边长"
      >
      </el-table-column>
      <el-table-column
        v-if="tableData[0] == undefined || tableData[0].start"
        prop="start"
        label="起始波长"
      >
      </el-table-column>
      <el-table-column
        v-if="tableData[0] == undefined || tableData[0].lightType"
        prop="lightType"
        label="入射光源类型"
      >
      </el-table-column>
      <el-table-column
        v-if="tableData[0] == undefined || tableData[0].lightAngle"
        prop="lightAngle"
        label="入射角"
      >
      </el-table-column>
      <el-table-column
        v-if="tableData[0] == undefined || tableData[0].workType"
        prop="workType"
        label="工作方式"
      >
      </el-table-column>
      <el-table-column
        v-if="tableData[0] == undefined || tableData[0].source"
        prop="source"
        label="数据来源"
      >
      </el-table-column>
    </el-table>
    <div class="bottom_eacrsout">
      antenna_imp
      <el-card class="box-card">
        <ValueLineMap
          :config="lineConfig"
          :lines="lineData"
          ref="childValueLineMap"
        ></ValueLineMap>
      </el-card>
      <el-card class="box-card">
        <ValueLineMapTWO
          :config="lineConfig02"
          :lines="lineData"
          ref="childValueLineMapTwo"
        ></ValueLineMapTWO>
      </el-card>
</div>
<div style="margin-left:120px;color:rgba(0,0,0,0.5);font-weight: 1000;">注：以下图像分别为功能材料的共极化相位和振幅曲线
    </div>
  </div>
</template>

<script>
import AntennaTypes from "../../components/config/AntennaTypes.js";
import ValueLineMap from "../../components/echarts/ValueLineMap.vue";
import ValueLineMapTWO from "../../components/echarts/ValueLineMap02.vue";
export default {
  components: {
    ValueLineMap,
    ValueLineMapTWO,
  },
  data() {
    return {
      lineData: [],
      lineConfig: { max: 200, min: 187, type: 1 },
      lineConfig02: { max: 200, min: 187, type: 0 },
      tableData: [],
      name: "振幅",
    };
  },
  mounted() {
    this.tableData.push(this.$route.query.data);
    this.getLineData(this.tableData[0].id);
    if (this.tableData[0].downType) {
      this.tableData[0].downType = this.getDownType(this.tableData[0].downType);
    }
    if (this.tableData[0].workType) {
      this.tableData[0].workType = this.getworkType(this.tableData[0].workType);
    }
    if (this.tableData[0].lightType) {
      this.tableData[0].lightType = this.getlightType(
        this.tableData[0].lightType
      );
    }
    if (this.tableData[0].source) {
      this.tableData[0].source = this.getsource(this.tableData[0].source);
    }
    if (this.tableData[0].topType) {
      this.tableData[0].topType = this.getTopType(this.tableData[0].topType);
    }
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

    /**
     * 获取数据
     * */

    getLineData(data) {
      this.$postserver.getData(
        "/nano/selectMapNew",
        { end: 0, id: data, start: 0 },
        function (res) {
          let obj = {};
          obj.data = res.data;
          obj.dataid = this.$route.query.data.id;
          obj.structItem = this.$route.query.data;
          this.lineData.push(obj);
        }.bind(this)
      );
    },
  },
};
</script>

<style lang='scss'>
.bottom_eacrsout {
  width: 100%;
  height: 650px;
  display: flex;
  // flex-direction: column;
  justify-content: space-around;
  .box-card {
    width: 48%;
    height: 100%;
    margin-top: 30px;
  }
}
</style>