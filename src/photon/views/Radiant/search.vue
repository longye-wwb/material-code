<template>
  <el-form label-width="80px">
    <!-- 工作方式 -->

    <el-form-item label="工作方式" class="marginT">
      <el-select v-model="form.workingMode" placeholder="请选择">
        <el-option
          v-for="item in options.workMethod"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <!-- 数据来源 -->

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
    <el-collapse v-model="activeName" accordion>
      <!-- lightAngle 入射角 -->

      <el-collapse-item title="入射角" name="1">
        <template slot="title">
          入射角
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.lightAngle.gte || form.lightAngle.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.lightAngle.gte" controls-position="right">
          </el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.lightAngle.lte" controls-position="right">
          </el-input>
        </div>
      </el-collapse-item>

      <!-- constant 介质材料介电常数 -->

      <el-collapse-item title="介质材料介电常数" name="2">
        <template slot="title">
          介质材料介电常数
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.constant.gte || form.constant.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.constant.gte" controls-position="right">
          </el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.constant.lte" controls-position="right">
          </el-input>
        </div>
      </el-collapse-item>

      <!-- gap 电容缝隙宽度 -->

      <el-collapse-item title="电容缝隙宽度" name="3">
        <template slot="title">
          电容缝隙宽度
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.gap.gte || form.gap.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.gap.gte" controls-position="right"></el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.gap.lte" controls-position="right"></el-input>
        </div>
      </el-collapse-item>

      <!-- width 中间电容线宽 -->

      <el-collapse-item title="中间电容线宽" name="4">
        <template slot="title">
          中间电容线宽
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.width.gte || form.width.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.width.gte" controls-position="right">
          </el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.width.lte" controls-position="right">
          </el-input>
        </div>
      </el-collapse-item>

      <!-- thickness 介质材料厚度  -->

      <el-collapse-item title="介质材料厚度" name="5">
        <template slot="title">
          介质材料厚度
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.thickness.gte || form.thickness.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.thickness.gte" controls-position="right">
          </el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.thickness.lte" controls-position="right">
          </el-input>
        </div>
      </el-collapse-item>

      <!-- xpath 介质材料x方向尺寸 -->

      <el-collapse-item title="介质材料x方向尺寸" name="6">
        <template slot="title">
          介质材料x方向尺寸
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.xpath.gte || form.xpath.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.xpath.gte" controls-position="right">
          </el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.xpath.lte" controls-position="right">
          </el-input>
        </div>
      </el-collapse-item>

      <!-- ypath 介质材料y方向材料 -->

      <el-collapse-item title="介质材料y方向材料" name="7">
        <template slot="title">
          介质材料y方向材料
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.ypath.gte || form.ypath.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.ypath.gte" controls-position="right">
          </el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.ypath.lte" controls-position="right">
          </el-input>
        </div>
      </el-collapse-item>
    </el-collapse>

    <el-form-item class="margin">
      <el-button type="primary" @click="handleSearchClick">搜索</el-button>
      <el-button @click="handleEmptyClick">置空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
/**
 * 微波宽带偏振转换搜索组件
 * @author Chris
 * */
import AntennaTypes from "../../../photon/components/config/AntennaTypes";
export default {
  name: "NanoAntennaImportSearchForm",
  components: {},
  data() {
    return {
      activeName: "0",
      options: AntennaTypes,
      refrashAntennaForm: false,
      refrashBottomForm: false,
      form: {
        constant: { gte: "", lte: "" }, //介质材料介电常数
        gap: { gte: "", lte: "" }, //电容缝隙宽度
        lightAngle: { gte: "", lte: "" }, //入射角
        thickness: { gte: "", lte: "" }, //介质材料厚度
        width: { gte: "", lte: "" }, //中间电容线宽
        xpath: { gte: "", lte: "" }, //介质材料x方向尺寸
        ypath: { gte: "", lte: "" }, //介质材料y方向材料
        dataFrom: "", //数据来源
        workingMode: "", //工作方式
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
      // this.$refs.topform.emptyForm();
      // this.$refs.bottomForm.emptyForm();
      this.form.constant = { gte: "", lte: "" };
      this.form.gap = { gte: "", lte: "" };
      this.form.lightAngle = { gte: "", lte: "" };
      this.form.thickness = { gte: "", lte: "" };
      this.form.width = { gte: "", lte: "" };
      this.form.xpath = { gte: "", lte: "" };
      this.form.ypath = { gte: "", lte: "" };
      (this.form.workingMode = ""), (this.form.dataFrom = "");
    },

    /**
     * 点击置空按钮
     * */

    handleEmptyClick() {
      this.emptyForm();
      this.$emit("search", this.form);
    },
  },
};
</script>
<style lang="scss" >
.marginT {
  margin-top: 10px;
}
</style>