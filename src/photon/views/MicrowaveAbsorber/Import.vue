<template>
  <div v-loading="loading">
    <breadcrumb :pathArr="local"></breadcrumb>
    <el-form label-width="150px">
      <el-row>
        <el-card class="padding_in">
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

          <el-col :span="12" class="margin">
            <el-form-item label="工作方式">
              <el-select v-model="form.workType" placeholder="请选择">
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
            <el-form-item label="填充材料">
              <el-select v-model="form.filler" placeholder="请选择">
                <el-option
                  v-for="item in options.FillerMaterial"
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
                v-model="form.microwave"
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
import AntennaTypes from "../../components/config/AntennaTypes";
import FileUpload from "../../../components/form/input/FileUpload.vue";
import FileInput from "../../../components/form/input/FileInput.vue";
import breadcrumb from "../../../components/navigation/PageBreadcrumb";
export default {
  name: "MicrowaveAbsorberForm",
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
        filler: "",
        dataFrom: "", //数据来源
        lightAngle: "", //入射角
        lightType: "",
        materialStructure: "",
        workType: "",
        microwave: [],
        process: [],
        structure: [],
      },
      local: [
        {
          name: "首页",
          url: "/photonm",
        },
        {
          name: "微波宽带吸收",
          url: "/photonm/MicrowaveAbsorber",
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
      param.append("filler", this.form.filler);
      param.append("dataFrom", this.form.dataFrom);
      param.append("lightAngle", this.form.lightAngle);
      param.append("lightType", this.form.lightType);
      param.append("materialStructure", this.form.materialStructure);
      param.append("workType", this.form.workType);
      param.append("microwave", this.form.microwave[0].raw);
      //   param.append("data", JSON.stringify(this.form.data));
      param.append("process", this.form.process[0].raw);
      param.append("structure", this.form.structure[0].raw);
      return param;
    },

    /**
     * 发送请求
     * */

    submitForm() {
      this.loading = true;
      if (this.$route.query.data == "0") {
        this.$postserver.postFile(
          "/microwave_absorbing/save",
          this.buildCreateForm(),
          function (response) {
            if (response.meta.code == "0") {
              this.loading = false;
              this.$alert("上传成功,点击确定返回上一页", "成功", {
                confirmButtonText: "确定",
                callback: (action) => {
                  this.$router.push({
                    path: "MicrowaveAbsorber",
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
          "/microwave_absorbing/import",
          this.buildCreateForm(),
          function (response) {
            if (response.meta.code == "0") {
              this.loading = false;
              this.$alert("上传成功,点击确定返回上一页", "成功", {
                confirmButtonText: "确定",
                callback: (action) => {
                  this.$router.push({
                    path: "MicrowaveAbsorber",
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