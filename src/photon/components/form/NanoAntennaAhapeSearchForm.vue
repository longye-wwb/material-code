<template>
  <el-form label-width="80px">
    <el-collapse v-model="activeNames">
      <el-collapse-item style="marg1n-top: 50px">
        <template slot="title" name="1">
          <el-form-item label="ssss" style="padding-top: 20px">
            <el-select v-model="form.type" placeholder="请选择">
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
          :preForm="form.antennaForm"
          ref="topform"
        ></nano-antenna-materials-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <el-form label-width="80px">
            <el-form-item label="基底结构" style="padding-top: 20px">
              <el-select v-model="form.bottomType" placeholder="请选择">
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
    <el-form-item label="入射光源">
      <el-select v-model="form.lightFrom" placeholder="请选择">
        <el-option
          v-for="item in options.lightFrom"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="入射角(°)">
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
      ></el-input-number>
    </el-form-item>
    <el-form-item label="波段（10^2nm)">
      <el-input-number
        v-model="form.wave[0]"
        controls-position="right"
        :min="3"
        :max="3000"
        :precision="2"
      ></el-input-number>
      <el-input-number
        v-model="form.wave[1]"
        controls-position="right"
        :min="3"
        :max="3000"
        :precision="2"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="工作方式">
      <el-select v-model="form.type" placeholder="请选择">
        <el-option
          v-for="item in options.workMethod"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="数据来源">
      <el-select v-model="form.type" placeholder="请选择">
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
  name: "NanoAntennaAhapeSearchForm",
  components: {
    NanoAntennaMaterialsForm,
    NatoNatennaMaterialsBottemForm,
  },
  data() {
    return {
      options: AntennaTypes,
      activeNames: 1,
      form: {
        antennaForm: {
          staticl: 0,
          r: 0,
          h: 0,
          lx: 0,
          ly: 0,
          angle: 0,
        },
        bottemForm: {
          staticl: 0,
          h: 0,
          p: 0,
        },
        type: "0",
        bottomType: "0",
        lightFrom: "0",
        workWay: "0",
        dataFrom: "0",
        angle: [],
        wave: [],
      },
    };
  },
  methods: {
    /**
     * 点击搜索按钮
     * */

    handleSearchClick() {
      this.$emit("search", this.form);
    },

    getSearchForm() {
      return this.form;
    },

    /**
     * 清空form表单
     */

    emptyForm() {
      this.$refs.topform.emptyForm();
      this.$refs.bottomForm.emptyForm();
      this.form.type = "0";
      this.form.bottomType = "0";
      this.form.lightFrom = "0";
      this.form.workWay = "0";
      this.form.dataFrom = "0";
      this.form.angle = [];
      this.form.wave = [];
    },

    /**
     * 点击清空按钮
     * */

    handleEmptyClick() {
      this.emptyForm();
      this.$emit("search", this.form);
    },
  },
};
</script>