<template>
  <div v-loading="loading">
    <breadcrumb :pathArr="local"></breadcrumb>
    <el-form label-width="130px">
      <el-row>
        <el-card class="padding_in">
          <el-col :span="24">金属贴片层</el-col>
          <el-col :span="12" class="margin">
            <el-form-item label="贴片材料">
              <el-input
                v-model="form.patchMaterial"
                placeholder="请输入贴片材料"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="margin">
            <el-form-item label="红外发射率">
              <el-input
                v-model="form.patchEmissivity"
                placeholder="请输入红外发射率"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">介质层</el-col>
          <el-col :span="12" class="margin">
            <el-form-item label="介质层材料">
              <el-input
                v-model="form.dielectricMaterial"
                placeholder="请输入介质层材料"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="margin">
            <el-form-item label="红外发射率">
              <el-input
                v-model="form.dielectricEmissivity"
                placeholder="请输入红外发射率"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="margin">
            <el-form-item label="介电常数">
              <el-input
                v-model="form.dielectricConstant"
                placeholder="请输入介电常数"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">基底层</el-col>
          <el-col :span="12" class="margin">
            <el-form-item label="基底层材料">
              <el-input
                v-model="form.baseMaterial"
                placeholder="请输入基底层材料"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="margin">
            <el-form-item label="红外发射率">
              <el-input
                v-model="form.baseEmissivity"
                placeholder="请输入红外发射率"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="margin">
            <el-form-item label="介电常数">
              <el-input
                v-model="form.baseDielectric"
                placeholder="请输入介电常数"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-card>
        <el-card class="padding_in margin">
          <el-col :span="24"> 其他参数</el-col>
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
            <el-form-item label="数据">
              <file-input
                v-model="form.data"
                tips="请选择相应文件"
              ></file-input>
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
          <el-col :span="24" class="margin">
            <el-form-item>
              <el-button type="primary" @click="handleSubmitClick">
                保存
              </el-button>
            </el-form-item>
          </el-col>
        </el-card>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import AntennaTypes from "../../components/config/AntennaTypes";
import FileUpload from "../../../components/form/input/FileUpload.vue";
import FileInput from "../../../components/form/input/FileInput.vue";
import breadcrumb from "../../../components/navigation/PageBreadcrumb";
export default {
  name: "NanoAntennaImportForm",
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
        dataFrom: "", //数据来源
        lightAngle: "", //入射角
        baseDielectric: "", //基底介电常数
        baseEmissivity: "", //基底红外发射率
        baseMaterial: "", //基底材料
        dielectricConstant: "", //介质层介电常数
        dielectricEmissivity: "", //介质层红外发射率
        dielectricMaterial: "", //介质层材料
        patchEmissivity: "", //贴片层红外发射率
        patchMaterial: "", //贴片层材料
        data: [],
        process: [],
        struct: [],
      },
      local: [
        {
          name: "首页",
          url: "/photonm",
        },
        {
          name: "红外兼容-透射层",
          url: "/photonm/InfraredCompatible",
        },
        {
          name: "导入",
          url: "",
        },
      ],
    };
  },
  methods: {
    /**
     * 构建上传数据
     * */

    buildCreateForm() {
      const param = new FormData();
      param.append("dataFrom", this.form.dataFrom);
      param.append("lightAngle", this.form.lightAngle);
      param.append("baseDielectric", this.form.baseDielectric);
      param.append("baseEmissivity", this.form.baseEmissivity);
      param.append("baseMaterial", this.form.baseMaterial);
      param.append("dielectricConstant", this.form.dielectricConstant);
      param.append("dielectricEmissivity", this.form.dielectricEmissivity);
      param.append("dielectricMaterial", this.form.dielectricMaterial);
      param.append("patchEmissivity", this.form.patchEmissivity);
      param.append("patchMaterial", this.form.patchMaterial);
      param.append("data", this.form.data[0].raw);
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
          "/infrared/projection_save",
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
          "/infrared/projection",
          this.buildCreateForm(),
          function (response) {
            if (response.meta.code == "0") {
              this.loading = false;
              this.$alert("上传成功,点击确定返回上一页", "成功", {
                confirmButtonText: "确定",
                callback: (action) => {
                  this.$router.push({
                    path: "InfraredCompatible_transmission",
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