<template>
  <el-form label-width="80px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="天线结构">
          <el-select v-model="form.topType" placeholder="请选择">
            <el-option
              v-for="item in options.antnnaTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="介电常数">
          <el-input-number
            v-model="form.topMaterails"
            :precision="2"
            :step="0.1"
            :max="100"
          ></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="基底结构">
          <el-select v-model="form.bottomType" placeholder="请选择">
            <el-option
              v-for="item in options.bottomTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="介电常数">
          <el-input-number
            v-model="form.bottomMaterails"
            :precision="2"
            :step="0.1"
            :max="10"
          ></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="入射角(°)">
          <el-input-number
            v-model="form.angle"
            :precision="2"
            :step="0.1"
            :min="0"
            :max="180"
          ></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="光源类型">
          <el-select v-model="form.lightType" placeholder="请选择">
            <el-option
              v-for="item in options.lightFrom"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="工作方式">
          <el-select v-model="form.workWay" placeholder="请选择">
            <el-option
              v-for="item in options.workMethod"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="数据来源">
          <el-select v-model="form.dataFrom" placeholder="请选择">
            <el-option
              v-for="item in options.dataFrom"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="程序">
          <file-upload
            v-model="form.codeAddress"
            :files="form.codeAddress"
          ></file-upload>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="结构">
          <file-input
            v-model="form.struct"
            tips="请选择相应结构参数文件"
          ></file-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="实部">
          <file-input
            v-model="form.real"
            tips="请选择相应结构参数文件"
          ></file-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="虚部">
          <file-input
            v-model="form.fake"
            tips="请选择相应结构参数文件"
          ></file-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item>
          <el-button type="primary" @click="handleSubmitClick">保存</el-button
          ><el-button @click="handleClosedClick">取消</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import AntennaTypes from "../config/AntennaTypes.js";
import FileUpload from "../../../components/form/input/FileUpload.vue";
import FileInput from "../../../components/form/input/FileInput.vue";
export default {
  name: "NamoAntennaCreateForm",
  components: {
    FileUpload,
    FileInput,
  },
  data() {
    return {
      options: AntennaTypes,
      form: {
        topType: "1",
        topMaterails: 3.14,
        bottomType: "1",
        bottomMaterails: 3.14,
        angle: 30,
        workWay: "1",
        lightType: "1",
        dataFrom: "1",
        codeAddress: [],
        struct: [],
        real: [],
        fake: [],
      },
    };
  },
  methods: {
    /**
     * 构建参数
     * */

    buildCreateForm() {
      const param = new FormData();
      param.append("topType", this.form.topType);
      param.append("topConstant", this.form.topMaterails);
      param.append("downType", this.form.bottomType);
      param.append("downConstant", this.form.bottomMaterails);
      param.append("lightAngle", this.form.angle);
      param.append("workType", this.form.workWay);
      param.append("lightType", this.form.lightType);
      param.append("source", this.form.dataFrom);
      param.append("file", JSON.stringify(this.form.codeAddress));
      param.append("structure", this.form.struct[0].raw);
      param.append("real", this.form.real[0].raw);
      param.append("fake", this.form.fake[0].raw);
      return param;
    },

    /**
     * 发送请求
     * */

    submitForm() {
      this.$postserver.postFile(
        "/nano/structure",
        this.buildCreateForm(),
        function (response) {
          console.log("上传结果", response);
          this.$emit("success");
        }.bind(this)
      );
    },

    /**
     * 点击保存按钮
     * */

    handleSubmitClick() {
      this.submitForm();
    },

    /**
     * 点击取消按钮
     * */

    handleClosedClick() {
      this.$emit("closed");
    },
  },
};
</script>