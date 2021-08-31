<template>
  <div v-loading="loading">
    <breadcrumb :pathArr="local"></breadcrumb>
    <el-form label-width="150px">
      <el-row>
        <el-card class="padding_in">
          <el-col :span="12" class="margin">
            <el-form-item label="基底介电常数">
              <el-input
                v-model="form.baseConstant"
                placeholder="请输入基底介电常数"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="margin">
            <el-form-item label="基底材料">
              <el-input
                v-model="form.baseMaterial"
                placeholder="请输入基底材料"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="margin">
            <el-form-item label="天线材料">
              <el-input
                v-model="form.material"
                placeholder="请输入天线材料"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="margin">
            <el-form-item label="天线介电常数">
              <el-input
                v-model="form.constant"
                placeholder="请输入天线介电常数"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="margin">
            <el-form-item label="基底类型">
              <el-select v-model="form.baseType" placeholder="请选择">
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
            <el-form-item label="入射角(°)">
              <el-input-number
                v-model="form.lightAngle"
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
            <el-form-item label="天线类型">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="item in options.antnnaTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="margin">
            <el-form-item label="工作方式">
              <el-select v-model="form.workingMode" placeholder="请选择">
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
                v-model="form.process"
                tips="请选择相应文件"
              ></file-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="margin">
            <el-form-item label="结构">
              <file-input
                v-model="form.struct"
                tips="请选择相应文件"
              ></file-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="margin">
            <el-form-item v-if="showwhat == 0" label="实部">
              <file-input
                v-model="form.real"
                tips="请选择相应文件"
              ></file-input>
            </el-form-item>
            <el-form-item v-if="showwhat == 1" label="振幅">
              <file-input
                v-model="form.real"
                tips="请选择相应文件"
              ></file-input>
              <!-- <file-upload v-model="form.data" :files="form.data"></file-upload> -->
            </el-form-item>
          </el-col>
          <el-col :span="12" class="margin">
            <el-form-item v-if="showwhat == 0" label="虚部">
              <file-input
                v-model="form.empty"
                tips="请选择相应文件"
              ></file-input>
            </el-form-item>
            <el-form-item v-if="showwhat == 1" label="相位">
              <file-input
                v-model="form.empty"
                tips="请选择相应文件"
              ></file-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="margin">
            <el-form-item>
              <el-button type="primary" @click="handleSubmitClick"
                >保存</el-button
              >
            </el-form-item>
          </el-col>
        </el-card>
      </el-row>
    </el-form>
  </div>
</template>

<script>
/**
 * 红外偏振转换-导入
 * 后台页面
 * @author Chris
 * */
import AntennaTypes from "../../components/config/AntennaTypes";
import FileUpload from "../../../components/form/input/FileUpload.vue";
import FileInput from "../../../components/form/input/FileInput.vue";
import breadcrumb from "../../../components/navigation/PageBreadcrumb";
export default {
  name: "VisibleLightPhaseControlForm",
  components: {
    FileUpload,
    FileInput,
    breadcrumb,
  },
  data() {
    return {
      loading: false,
      options: AntennaTypes,
      form: {
        baseConstant: "", //基底介电常数
        baseMaterial: "", //基底材料
        baseType: "", //基底类型
        constant: "", //天线介电常数
        dataFrom: "", //数据来源
        lightAngle: "", //入射角
        lightType: "", //光源类型
        material: "", //天线材料
        type: "", //天线类型
        workingMode: "", //工作方式
        empty: [],
        real: [],
        process: [],
        struct: [],
        showwhat: "",
      },
      local: [
        {
          name: "首页",
          url: "/photonm",
        },
        {
          name: "红外偏振转换",
          url: "/photonm/InfraredPolarizationConversion",
        },
        {
          name: "导入",
          url: "",
        },
      ],
    };
  },
  mounted() {
    this.showwhat = this.$route.query.data;
  },
  methods: {
    /**
     * 构建上传数据
     * */

    buildCreateForm() {
      const param = new FormData();
      param.append("baseConstant", this.form.baseConstant);
      param.append("baseMaterial", this.form.baseMaterial);
      param.append("baseType", this.form.baseType);
      param.append("constant", this.form.constant);
      param.append("dataFrom", this.form.dataFrom);
      param.append("lightAngle", this.form.lightAngle);
      param.append("lightType", this.form.lightType);
      param.append("type", this.form.type);
      param.append("material", this.form.material);
      param.append("workingMode", this.form.workingMode);
      param.append("empty", this.form.empty[0].raw);
      param.append("real", this.form.real[0].raw);
      param.append("process", this.form.process[0].raw);
      param.append("struct", this.form.struct[0].raw);
      return param;
    },

    /**
     * 发送请求
     * */

    submitForm() {
      this.loading = true;
      if (this.$route.query.data == "0") {
        this.$postserver.postFile(
          "/infrared_amplitude/save",
          this.buildCreateForm(),
          function (response) {
            if (response.meta.code == "0") {
              this.loading = false;
              this.$alert("上传成功,点击确定返回上一页", "成功", {
                confirmButtonText: "确定",
                callback: (action) => {
                  this.$router.push({
                    path: "MicrowaveTransmission",
                  });
                },
              });
            } else {
              this.loading = false;
              this.$alert("上传失败，请点击重试", "上传失败", {
                confirmButtonText: "确定",
                callback: (action) => {},
              });
            }
          }.bind(this)
        );
      } else if (this.$route.query.data == "1") {
        this.$postserver.postFile(
          "/infrared_amplitude/import",
          this.buildCreateForm(),
          function (response) {
            if (response.meta.code == "0") {
              this.loading = false;
              this.$alert("上传成功,点击确定返回上一页", "成功", {
                confirmButtonText: "确定",
                callback: (action) => {
                  this.$router.push({
                    path: "InfraredPolarizationConversion",
                  });
                },
              });
            } else {
              this.loading = false;
              this.$alert("上传失败，请点击重试", "上传失败", {
                confirmButtonText: "确定",
                callback: (action) => {},
              });
            }
          }.bind(this)
        );
      } else {
      }
    },

    /**
     * 点击保存按钮
     * */

    handleSubmitClick() {
      this.submitForm();
    },
  },
};
</script>

<style lang="scss">
</style>