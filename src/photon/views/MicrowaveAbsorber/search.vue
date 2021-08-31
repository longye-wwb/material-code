<template>
  <el-form label-width="90px">
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

    <!-- 光源偏振态搜索 -->

    <el-form-item label="光源偏振态" class="marginT">
      <el-select v-model="form.lightType" placeholder="请选择">
        <el-option
          v-for="item in options.Polarization"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-collapse v-model="activeName" accordion>
      <!-- lightAngle  入射角 -->

      <el-collapse-item title="入射角" name="1">
        <template slot="title">
          入射角
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.lightAngle.gte || form.lightAngle.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.lightAngle.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.lightAngle.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>

      <!-- bandwidth 相对带宽 -->

      <el-collapse-item title="相对带宽" name="2">
        <template slot="title">
          相对带宽
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.bandwidth.gte || form.bandwidth.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input
            v-model="form.bandwidth.gte"
            controls-position="right"
          ></el-input>
          <div class="paddingLR">——</div>
          <el-input
            v-model="form.bandwidth.lte"
            controls-position="right"
          ></el-input>
        </div>
      </el-collapse-item>

      <!-- layer  材料层数 -->
      <!-- <el-collapse-item name="3">
        <template slot="title">
          材料层数
          <i class="header-icon el-icon-info marginL" v-if="form.layer"></i>
        </template>
        <div class="flex">
          <el-input v-model="form.layer" controls-position="right"></el-input>
        </div>
      </el-collapse-item> -->

      <!-- p  周期-->

      <!-- <el-collapse-item title="p" name="4">
        <template slot="title">
          周期
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.p.gte || form.p.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.p.gte" controls-position="right"></el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.p.lte" controls-position="right"></el-input>
        </div>
      </el-collapse-item> -->

      <!-- g 间隙 -->
      <!-- <el-collapse-item name="5">
        <template slot="title">
          间隙
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.g.gte || form.g.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.g.gte" controls-position="right"></el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.g.lte" controls-position="right"></el-input>
        </div>
      </el-collapse-item> -->

      <!-- filler  填充材料 -->
      <el-collapse-item name="6">
        <template slot="title">
          填充材料
          <i class="header-icon el-icon-info marginL" v-if="form.filler"></i>
        </template>
        <div class="flex">
          <!-- <el-input v-model="form.filler" controls-position="right"></el-input> -->
          <el-select v-model="form.filler" placeholder="请选择">
                <el-option
                  v-for="item in options.FillerMaterial"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
        </div>
      </el-collapse-item>

      <!-- rs1  第一层方阻-->

      <!-- <el-collapse-item name="7">
        <template slot="title">
          第一层方阻
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.rs1.gte || form.rs1.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.rs1.gte" controls-position="right"></el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.rs1.lte" controls-position="right"></el-input>
        </div>
      </el-collapse-item> -->

      <!-- rs2 第二层方阻 -->
      <!-- <el-collapse-item title="第二层方阻" name="8">
        <template slot="title">
          第二层方阻
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.rs2.gte || form.rs2.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.rs2.gte" controls-position="right"></el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.rs2.lte" controls-position="right"></el-input>
        </div>
      </el-collapse-item> -->

      <!-- rs3  第三层方阻-->

      <!-- <el-collapse-item title="rs3" name="9">
        <template slot="title">
          第三层方阻
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.rs3.gte || form.rs3.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.rs3.gte" controls-position="right"></el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.rs3.lte" controls-position="right"></el-input>
        </div>
      </el-collapse-item> -->

      <!-- h1 第一层高度 -->

      <!-- <el-collapse-item title="h1" name="10">
        <template slot="title">
          第一层高度
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.h1.gte || form.h1.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.h1.gte" controls-position="right"></el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.h1.lte" controls-position="right"></el-input>
        </div>
      </el-collapse-item> -->

      <!-- h2 -->

      <!-- <el-collapse-item title="h2" name="11">
        <template slot="title">
          第二层高度
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.h2.gte || form.h2.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.h2.gte" controls-position="right"></el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.h2.lte" controls-position="right"></el-input>
        </div>
      </el-collapse-item> -->

      <!-- h3 第三层高度 -->

      <!-- <el-collapse-item title="第三层高度" name="12">
        <template slot="title">
          第三层高度
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.h3.gte || form.h3.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.h3.gte" controls-position="right"></el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.h3.lte" controls-position="right"></el-input>
        </div>
      </el-collapse-item> -->

      <!-- s1 第一层线宽 -->

      <!-- <el-collapse-item title="第一层线宽" name="13">
        <template slot="title">
          第一层线宽
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.s1.gte || form.s1.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.s1.gte" controls-position="right"></el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.s1.lte" controls-position="right"></el-input>
        </div>
      </el-collapse-item> -->

      <!-- s2 第二层线宽 -->

      <!-- <el-collapse-item title="第二层线宽" name="14">
        <template slot="title">
          第二层线宽
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.s2.gte || form.s2.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.s2.gte" controls-position="right"></el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.s2.lte" controls-position="right"></el-input>
        </div>
      </el-collapse-item> -->

      <!-- s3 第三层线宽 -->

      <!-- <el-collapse-item title="第三层线宽" name="15">
        <template slot="title">
          第三层线宽
          <i
            class="header-icon el-icon-info marginL"
            v-if="form.s3.gte || form.s3.lte"
          ></i>
        </template>
        <div class="flex">
          <el-input v-model="form.s3.gte" controls-position="right"></el-input>
          <div class="paddingLR">——</div>
          <el-input v-model="form.s3.lte" controls-position="right"></el-input>
        </div>
      </el-collapse-item> -->
    </el-collapse>

    <el-form-item class="margin">
      <el-button type="primary" @click="handleSearchClick">搜索</el-button>
      <el-button @click="handleEmptyClick">置空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
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
        dataFrom: "", //数据来源
        workingMode: "", //工作方式
        lightType: "", //光源偏振态搜索
        lightAngle: { gte: "", lte: "" }, //入射角
        layer: "", //材料层数
        filler: "", //填充材料
        g: { gte: "", lte: "" }, //间隙
        p: { gte: "", lte: "" }, //p
        bandwidth: { gte: "", lte: "" },
        rs1: { gte: "", lte: "" }, //第一层方阻
        rs2: { gte: "", lte: "" }, //第二层方阻
        rs3: { gte: "", lte: "" }, //第三层方阻
        h1: { gte: "", lte: "" }, //第一层高度
        h2: { gte: "", lte: "" }, //第二层高度
        h3: { gte: "", lte: "" }, //第三层高度
        s1: { gte: "", lte: "" }, //第一层线宽
        s2: { gte: "", lte: "" }, //第二层线宽
        s3: { gte: "", lte: "" }, //第三层线宽
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
      (this.form.workingMode = ""), (this.form.dataFrom = "");
      this.form.lightType = "";
      this.form.lightAngle = { gte: "", lte: "" };
      this.form.bandwidth = { gte: "", lte: "" };
      this.form.layer = { gte: "", lte: "" };
      this.form.g = { gte: "", lte: "" };
      this.form.rs1 = { gte: "", lte: "" };
      this.form.p = { gte: "", lte: "" };
      this.form.rs3 = { gte: "", lte: "" };
      this.form.h1 = { gte: "", lte: "" };
      this.form.h2 = { gte: "", lte: "" };
      this.form.h3 = { gte: "", lte: "" };
      this.form.s1 = { gte: "", lte: "" };
      this.form.s2 = { gte: "", lte: "" };
      this.form.s3 = { gte: "", lte: "" };
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