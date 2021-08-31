<template>
  <el-row>
    <!-- 振幅筛选条件 -->
    <el-row class="header_search_card">
      <el-row>
        <el-card>
          <el-form :inline="true">
            <el-form-item label="天线结构">
              <el-select
                v-model="structsSearchForm.antenna.type"
                @change="handleSearchformChange"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options.antnnaTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="基底结构">
              <el-select
                v-model="structsSearchForm.buttom.type"
                @change="handleSearchformChange"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options.bottomTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="光源类型">
              <el-select
                v-model="structsSearchForm.light"
                @change="handleSearchformChange"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options.lightFrom"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作方式">
              <el-select
                v-model="structsSearchForm.workWay"
                @change="handleSearchformChange"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options.workMethod"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-link @click="searchFormVisible = true">更多参数</el-link>
            </el-form-item>
          </el-form>
        </el-card>
      </el-row>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <el-form>
            <el-form-item label="展示曲线">
              <el-radio-group
                v-model="rangeSearchForm.type"
                @change="handleLineTypeChange"
              >
                <el-radio v-model="rangeSearchForm.type" label="1"
                  >振幅</el-radio
                >
                <el-radio v-model="rangeSearchForm.type" label="2"
                  >相位</el-radio
                >
              </el-radio-group>
            </el-form-item>
            <el-form-item label="波段(nm))">
              <number-area-input
                v-model="rangeSearchForm.area"
                :max="300000"
                :min="300"
                :step="1"
                :precision="1"
              ></number-area-input>
            </el-form-item>
            <el-form-item label="相位表现">
              <number-area-input
                v-model="rangeSearchForm.phaseArea"
                :max="180"
                :min="-180"
                :step="1"
                :precision="2"
              ></number-area-input>
            </el-form-item>
            <el-form-item label="振幅表现">
              <number-area-input
                v-model="rangeSearchForm.amplitudeArea"
                :max="1.2"
                :min="0"
                :step="1"
                :precision="2"
              ></number-area-input>
            </el-form-item>
            <el-form-item>
              <el-button>筛选</el-button>
              <el-button>取消</el-button>
              <el-button @click="handleNextPageClick">更多</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <value-line-map
            v-if="reloadLines"
            :config="lineConfig"
            :lines="lineData"
            ref="childValueLineMap"
          ></value-line-map>
        </el-card>
      </el-col>
    </el-row>
    <!-- 相位筛选条件  -->
    <el-row>
      <el-col>
        <el-dialog :visible.sync="searchFormVisible">
          <nano-antenna-import-search-form
            @search="handleMoreVeriableSearch"
          ></nano-antenna-import-search-form>
        </el-dialog>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import AntennaTypes from "../../components/config/AntennaTypes.js";
import ValueLineMap from "../../components/echarts/ValueLineMap.vue";
import ArrayQueue from "../../../components/basic/structs/arrayQueue.js";
import NanoAntennaImportSearchForm from "../../components/form/NanoAntennaImportSearchForm.vue";
import NumberAreaInput from "../../components/input/NumberAreaInput.vue";
export default {
  name: "NanoAntennaLineListView",
  components: {
    ValueLineMap,
    NanoAntennaImportSearchForm,
    NumberAreaInput,
  },
  data() {
    return {
      options: AntennaTypes,
      searchFormVisible: false,
      reloadLines: true,
      structsSearchForm: {
        pageNum: 0,
        pageSize: 10,
        antenna: {
          type: null,
          stac: null,
          r: null,
          h: null,
          lx: null,
          ly: null,
          angle: null,
        },
        buttom: {
          type: null,
          stac: null,
          p: null,
          h: null,
        },
        light: null,
        angle: null,
        workWay: null,
        dataFrom: null,
      },
      structsData: new ArrayQueue(),
      lineData: [],
      lineAllData: [],
      lineConfig: {
        type: 1,
        min: 187,
        max: 200,
      },
      total: 0,
      rangeSearchForm: {
        type: "1",
        area: [300, 300000],
        phaseArea: [-180, 180],
        amplitudeArea: [0, 1.2],
      },
    };
  },
  mounted: function () {
    this.patchLineVerible();
  },
  methods: {
    /**
     * 搜索data
     * */
    patchTenStruct() {
      this.$postserver.getData(
        "/nano/selectStructure",
        this.buildStructSearchParams(),
        function (response) {
          if (response.data) {
            var structs = response.data.rows;
            for (var index in structs) {
              this.structsData.push(structs[index]);
            }
            this.total = response.data.total;
            this.patchLineVerible();
          } else {
            this.total = 0;
          }
        }.bind(this)
      );
    },

    /**
     * 构建搜索的参数
     * */

    buildStructSearchParams() {
      let params = {
        pageNum: this.structsSearchForm.pageNum,
        pageSize: this.structsSearchForm.pageSize,
      };

      /**
       * 处理天线检索参数
       */

      if (this.structsSearchForm.antenna) {
        var antennaForm = this.structsSearchForm.antenna;
        if (antennaForm.type != 0) {
          params.topType = antennaForm.type;
        }
        if (antennaForm.stac) {
          params.topConstant = antennaForm.stac;
        }
        if (antennaForm.r && antennaForm.r.length == 2) {
          params.rEnd = antennaForm.r[1];
          params.rStart = antennaForm.r[0];
        }
        if (antennaForm.h && antennaForm.h.length == 2) {
          params.minHEnd = antennaForm.h[1];
          params.minHStart = antennaForm.h[0];
        }
        if (antennaForm.lx && antennaForm.lx.length == 2) {
          params.xEnd = antennaForm.lx[1];
          params.xStart = antennaForm.lx[0];
        }
        if (antennaForm.ly && antennaForm.ly.length == 2) {
          params.yEnd = antennaForm.ly[1];
          params.yStart = antennaForm.ly[0];
        }
        if (antennaForm.angle && antennaForm.angle.length == 2) {
          params.pEnd = antennaForm.angle[1];
          params.pStart = antennaForm.angle[0];
        }
      }

      /**
       * 处理基底检索参数
       */

      if (this.structsSearchForm.buttom) {
        var bottemForm = this.structsSearchForm.buttom;
        if (bottemForm.type != 0) {
          params.downType = bottemForm.type;
        }
        if (bottemForm.stac) {
          params.downConstant = bottemForm.stac;
        }
        if (antennaForm.h && bottemForm.h.length == 2) {
          params.hEnd = bottemForm.h[1];
          params.hStart = bottemForm.h[0];
        }
        if (antennaForm.p && bottemForm.p.length == 2) {
          params.rEnd = bottemForm.p[1];
          params.rStart = bottemForm.p[0];
        }
      }

      /**
       * 处理入射光源
       */

      if (this.structsSearchForm.light != 0) {
        params.lightType = this.structsSearchForm.light;
      }

      /**
       * 处理入射角参数
       */

      if (this.structsSearchForm.angle) {
        var angle = this.structsSearchForm.angle;
        if (angle[0]) {
          params.lightAngleStart = angle[0];
        }
        if (angle[1]) {
          params.lightAngleEnd = angle[1];
        }
      }

      /**
       * 工作方式
       */

      if (this.structsSearchForm.workWay != 0) {
        params.workType = this.structsSearchForm.workWay;
      }

      /**
       * 数据来源
       */

      if (this.structsSearchForm.dataFrom != 0) {
        params.source = this.structsSearchForm.dataFrom;
      }
      return params;
    },

    /**
     *
     * */

    patchLineVerible() {
      if (this.structsData.size() > 0) {
        if (this.lineData.length < 10) {
          var current = this.structsData.pop();
          // console.log("异步加载曲线数据", current, this.lineData);
          this.getLineData(current);
          //获取数据到曲线组
        } else {
          //曲线满编，停止操作。
        }
      } else {
        // console.log(
        //   "结构的分页参数：",
        //   this.structsData.size(),
        //   this.structsSearchForm.pageNum,
        //   this.structsSearchForm.pageSize,
        //   this.structsSearchForm.pageNum * this.structsSearchForm.pageSize,
        //   this.total,
        //   "999"
        // );
        if (
          this.structsSearchForm.pageNum * this.structsSearchForm.pageSize <=
          this.total
        ) {
          this.structsSearchForm.pageNum++;
          this.patchTenStruct();
        } else {
          this.$message({ type: "info", message: "已经是最后一页！" });
        }
      }
    },
    getTooltipFormatter(structs) {
      return [
        "<div>纳米天线</div>",
        "<div>结构:" + structs.id + "</div>",
        "<div>纳米天线</div>",
      ];
    },
    getLineData(structs) {
      this.$postserver.postJson(
        "/nano/selectMap",
        this.buildLineSearchParam(structs.id),
        function (response) {
          if (response.data) {
            var item = {
              dataid: structs.id,
              structItem: structs,
              data: [],
            };
            //var needXdata = this.lineConfig.xdata.length == 0;
            for (var index in response.data) {
              var cur = response.data[index];
              // if (needXdata) {
              //   this.lineConfig.xdata.push(cur.frequency);
              // }
              item.data.push(cur);
            }
            this.lineData.push(item);
          }
          // console.log("获取到曲线数据", response);
          this.patchLineVerible();
        }.bind(this)
      );
    },
    buildLineSearchParam(id) {
      var params = {
        id: id,
        startWave: this.rangeSearchForm.area[0],
        endWave: this.rangeSearchForm.area[1],
        startPhase: this.rangeSearchForm.phaseArea[0],
        endPhase: this.rangeSearchForm.phaseArea[1],
        startAmplitude: this.rangeSearchForm.amplitudeArea[0],
        endAmplitude: this.rangeSearchForm.amplitudeArea[1],
      };
      return params;
    },
    handleNextPageClick() {
      this.structsData = new ArrayQueue();
      this.lineData = [];
      this.patchLineVerible();
    },
    handleLineTypeChange() {
      this.lineConfig.type = this.rangeSearchForm.type;
      this.structsSearchForm.pageNum = 0;
      this.structsSearchForm.pageSize = 10;
      this.structsData = new ArrayQueue();
      this.lineData = [];
      this.patchLineVerible();
    },
    handleSearchformChange() {
      this.$refs.childValueLineMap.clearnfunction();
      this.structsSearchForm.pageNum = 0;
      this.structsSearchForm.pageSize = 10;
      this.structsData = new ArrayQueue();
      this.lineData = [];
      this.patchLineVerible();
    },
    handleMoreVeriableSearch(form) {
      this.$refs.childValueLineMap.clearnfunction();
      // console.log("收到更多参数", form);
      this.structsSearchForm.pageNum = 0;
      this.structsSearchForm.pageSize = 10;
      this.structsSearchForm.antenna.type = form.type;
      this.structsSearchForm.antenna.stac = form.antennaForm.staticl;
      this.structsSearchForm.antenna.r = form.antennaForm.r;
      this.structsSearchForm.antenna.h = form.antennaForm.h;
      this.structsSearchForm.antenna.lx = form.antennaForm.lx;
      this.structsSearchForm.antenna.ly = form.antennaForm.ly;
      this.structsSearchForm.antenna.angle = form.antennaForm.angle;
      this.structsSearchForm.buttom.type = form.bottomType;
      this.structsSearchForm.buttom.stac = form.bottemForm.staticl;
      this.structsSearchForm.buttom.p = form.bottemForm.p;
      this.structsSearchForm.buttom.h = form.bottemForm.h;
      this.structsSearchForm.light = form.lightFrom;
      this.structsSearchForm.angle = form.angle;
      this.structsSearchForm.workWay = form.workWay;
      this.structsSearchForm.dataFrom = form.dataFrom;
      this.structsData = new ArrayQueue();
      this.lineData = [];
      this.patchLineVerible();
      this.searchFormVisible = false;
    },
  },
};
</script>
<style lang="scss">
.header_search_card {
  margin-bottom: 20px;
}
</style>