<template>
  <div v-loading="loading">
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
        <el-col :span="12" class="margin">
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
        <el-col :span="12" class="margin">
          <el-form-item label="介电常数">
            <el-input-number
              v-model="form.bottomMaterails"
              :precision="2"
              :step="0.1"
              :max="100"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="margin">
          <el-form-item label="入射角(°)">
            <el-input-number
              v-model="form.angle"
              :min="0"
              :max="180"
              :precision="2"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="margin">
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
        <el-col :span="12" class="margin">
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
        <el-col :span="12" class="margin">
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
        <el-col :span="12" class="margin">
          <el-form-item label="程序">
            <file-input
              v-model="form.codeAddress"
              tips="请选择相应结构参数文件"
            ></file-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="margin">
          <el-form-item label="结构">
            <file-input
              v-model="form.struct"
              tips="请选择相应结构参数文件"
            ></file-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="margin">
          <el-form-item label="实部">
            <file-input
              v-model="form.real"
              tips="请选择相应结构参数文件"
            ></file-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="margin">
          <el-form-item label="虚部">
            <file-input
              v-model="form.fake"
              tips="请选择相应结构参数文件"
            ></file-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="margin">
          <el-form-item>
            <el-button type="primary" @click="handleSubmitClick">保存</el-button
            ><el-button @click="handleClosedClick">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import AntennaTypes from "../config/AntennaTypes.js";
import FileUpload from "../../../components/form/input/FileUpload.vue";
import FileInput from "../../../components/form/input/FileInput.vue";
export default {
  name: "NanoAntennaImportForm",
  components: {
    FileUpload,
    FileInput,
  },
  data() {
    return {
      loading: false,
      options: AntennaTypes,
      form: {
        topType: "1", //天线结构
        topMaterails: 3.14, //介电常数
        bottomType: "1", //基底结构
        bottomMaterails: 3.14, //介电常数
        angle: 30, //入射角
        workWay: "1", //工作方式
        lightType: "1", //光源类型
        dataFrom: "1", //数据来源
        codeAddress: [], //程序
        struct: [], //结构
        real: [], //实部
        fake: [], //虚部
      },
    };
  },
  methods: {
    /**
     * 构建上传数据
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
      param.append("process", this.form.codeAddress[0].raw);

      param.append("structure", this.form.struct[0].raw);
      param.append("real", this.form.real[0].raw);
      param.append("fake", this.form.fake[0].raw);
      return param;
    },

    /**
     * 发送请求
     * */

    submitForm() {
      this.loading = true;
      this.$postserver.postFile(
        "/nano/NanoAntenna",
        this.buildCreateForm(),
        function (response) {
          this.loading = false;
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