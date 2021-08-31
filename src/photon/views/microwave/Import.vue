<template>
  <div v-loading="loading">
    <breadcrumb :pathArr="local"></breadcrumb>
    <el-form label-width="150px">
      <el-row :gutter="20" type="flex" justify="center">
        <el-card class="padding_in">
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
            <el-form-item label="入射光源偏振态">
              <el-select v-model="form.lightType" placeholder="请选择">
                <el-option
                  v-for="item in options.Polarization"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12" class="margin">
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
          </el-col> -->
          <el-col :span="12" class="margin">
            <el-form-item label="基底材料">
              <el-input
                v-model="form.baseMaterial"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="margin">
            <el-form-item label="基底厚度">
              <el-input
                v-model="form.baseThickness"
                placeholder="请输入基底厚度"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="margin">
            <el-form-item label="介质介电常数">
              <el-input
                v-model="form.dielectric"
                placeholder="请输入介质介电常数"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="margin">
            <el-form-item label="入射角">
              <el-input
                v-model="form.lightAngle"
                placeholder="请输入入射角"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12" class="margin">
            <el-form-item label="损耗正切">
              <el-input
                v-model="form.loss"
                placeholder="请输入损耗正切"
              ></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="12" class="margin">
            <el-form-item label="介质材料">
              <el-input
                v-model="form.mediumMaterial"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="margin">
            <el-form-item label="结构材料">
              <el-input
                v-model="form.structureMaterial"
                placeholder="请输入结构材料"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="margin">
            <el-form-item label="结构材料厚度">
              <el-input
                v-model="form.structureThickness"
                placeholder="请输入结构材料厚度"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12" class="margin">
            <el-form-item label="结构材料类型">
              <el-input
                v-model="form.type"
                placeholder="请输入结构材料类型"
              ></el-input>
            </el-form-item>
          </el-col> -->

          <el-col :span="12" class="margin">
            <el-form-item label="数据">
              <file-input
                v-model="form.cruve"
                tips="请选择相应文件"
              ></file-input>
              <!-- <file-upload v-model="form.data" :files="form.data"></file-upload> -->
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
                v-model="form.structure"
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
/**
 * 微波窄带吸收导入组件
 * @author Chris
 * */
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
        lightType: "",
        workingMode: "",
        baseMaterial: "", //
        baseThickness: "", //基底厚度
        dataFrom: "", //数据来源
        dielectric: "", //介质介电常数
        lightAngle: "", //入射角
        mediumMaterial: "", //
        structureMaterial: "", //结构材料
        structureThickness: "", //结构材料厚度
        type: "", //结构材料类型
        cruve: [],
        process: [],
        structure: [],
      },
      local: [
        {
          name: "首页",
          url: "/photonm",
        },
        {
          name: "微波窄带吸收",
          url: "/photonm/MicrowaveTransmission",
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
      param.append("lightType", this.form.lightType);
      param.append("workingMode", this.form.workingMode);
      param.append("baseMaterial", this.form.baseMaterial);
      param.append("baseThickness", this.form.baseThickness);
      param.append("dataFrom", this.form.dataFrom);
      param.append("dielectric", this.form.dielectric);
      param.append("lightAngle", this.form.lightAngle);
      param.append("mediumMaterial", this.form.mediumMaterial);
      param.append("structureMaterial", this.form.structureMaterial);
      param.append("structureThickness", this.form.structureThickness);
      // param.append("type", this.form.type);
      param.append("cruve", this.form.cruve[0].raw);
      param.append("process", this.form.process[0].raw);
      param.append("structure", this.form.structure[0].raw);
      return param;
    },

    /**
     * 发送请求
     * data:1:导入数据
     * data:0:导入样本
     * */

    submitForm() {
      this.loading = true;
      if (this.$route.query.data == "0") {
        this.$postserver.postFile(
          "/breadth/save",
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
          "/breadth/import",
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