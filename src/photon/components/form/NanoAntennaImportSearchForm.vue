<template>
  <el-form label-width="80px">
    <el-collapse v-model="activeNames">
      <el-collapse-item style="marg1n-top: 50px">
        <template slot="title" name="1">
          <el-form-item label="天线结构">
            <el-select
              v-model="form.type"
              @change="handleAntennaTypeChnage"
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
        </template>
        <nano-antenna-materials-form
          v-if="refrashAntennaForm"
          :preForm="form.antennaForm"
          ref="topform"
        ></nano-antenna-materials-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <el-form label-width="80px">
            <el-form-item label="基底结构">
              <el-select
                v-model="form.bottomType"
                @change="handleBottomTypeChange"
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
          </el-form>
        </template>
        <nato-natenna-materials-bottem-form
          :preForm="form.bottemForm"
          ref="bottomForm"
        ></nato-natenna-materials-bottem-form>
      </el-collapse-item>
    </el-collapse>
    <el-form-item label="入射光源" class="marginT">
      <el-select v-model="form.lightFrom" placeholder="请选择">
        <el-option
          v-for="item in options.lightFrom"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="入射角(°)" class="marginT">
      <el-input-number
        v-model="form.angle[0]"
        controls-position="right"
        :min="0"
        :max="180"
        :precision="2"
      ></el-input-number>
      <el-input-number
        v-model="form.angle[1]"
        controls-position="right"
        :min="0"
        :max="180"
        :precision="2"
        class="marginT"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="工作方式" class="marginT">
      <el-select v-model="form.workWay" placeholder="请选择">
        <el-option
          v-for="item in options.workMethod"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="数据来源" class="marginT">
      <el-select v-model="form.dataFrom" placeholder="请选择">
        <el-option
          v-for="item in options.dataFrom"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearchClick">搜索</el-button>
      <el-button @click="handleEmptyClick">置空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import AntennaTypes from "../config/AntennaTypes.js";
import NanoAntennaMaterialsForm from "./NanoAntennaMaterialsForm.vue";
import NatoNatennaMaterialsBottemForm from "./NatoNatennaMaterialsBottemForm.vue";
export default {
  name: "NanoAntennaImportSearchForm",
  components: {
    NanoAntennaMaterialsForm,
    NatoNatennaMaterialsBottemForm,
  },
  data() {
    return {
      options: AntennaTypes,
      activeNames: 1,
      refrashAntennaForm: false,
      refrashBottomForm: false,
      form: {
        antennaForm: {
          type: "",
          staticl: 0,
          r: 0,
          h: 0,
          lx: 0,
          ly: 0,
          angle: 0,
        },
        bottemForm: {
          type: "",
          staticl: 0,
          h: 0,
          p: 0,
        },
        type: "",
        bottomType: "",
        lightFrom: "",
        workWay: "",
        dataFrom: "",
        angle: [],
      },
    };
  },
  methods: {
    /**
     * 点击搜索
     */

    handleSearchClick() {
      this.$emit("search", this.form);
    },
    getSearchForm() {
      return this.form;
    },

    /**
     * 清空form表单
     * */

    emptyForm() {
      this.$refs.topform.emptyForm();
      this.$refs.bottomForm.emptyForm();
      this.form.type = "0";
      this.form.bottomType = "0";
      this.form.lightFrom = "0";
      this.form.workWay = "0";
      this.form.dataFrom = "0";
      this.form.angle = [];
    },

    /**
     * 点击置空按钮
     * */

    handleEmptyClick() {
      this.emptyForm();
      this.$emit("search", this.form);
    },

    /**
     * 改变天线结构选择
     * */

    handleAntennaTypeChnage(value) {
      this.refrashAntennaForm = false;
      if (value < 3) {
        this.form.antennaForm.type = 1;
      } else {
        this.form.antennaForm.type = 2;
      }
      console.log("天线类型改变", value, this.form);
      this.$nextTick(function () {
        console.log("方法执行了。");
        this.refrashAntennaForm = true;
      });
    },

    /**
     * 基底结构改变
     * */

    handleBottomTypeChange(value) {
      this.refrashBottomForm = false;
      this.form.bottemForm.type = value;
      this.refrashBottomForm = true;
    },
  },
};
</script>
<style lang="scss" >
.marginT {
  margin-top: 10px;
}
</style>