<template>
  <div v-loading="loading">
    <breadcrumb :pathArr="local"></breadcrumb>
    <el-form label-width="150px">
      <el-row :gutter="20" type="flex" justify="center">
        <el-card class="padding_in">
          <el-col :span="11" class="margin">
            <el-form-item label="衍射角(°)">
              <el-input-number
                v-model="form.angle"
                :min="0"
                :max="180"
                :precision="2"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="11" class="margin">
            <el-form-item label="基底折射率">
              <el-input
                v-model="form.baseRefractive"
                placeholder="请输入baseRefractive"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" class="margin">
            <el-form-item label="入射波长">
              <el-input
                v-model="form.inLine"
                placeholder="请输入入射波长"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" class="margin">
            <el-form-item label="衍射阶数">
              <el-input
                v-model="form.order"
                placeholder="请输入衍射阶数"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" class="margin">
            <el-form-item label="材料周期">
              <el-input
                v-model="form.period"
                placeholder="请输入材料周期"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" class="margin">
            <el-form-item label="材料折射率">
              <el-input
                v-model="form.refractive"
                placeholder="请输入材料折射率"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11" class="margin">
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
          <el-col :span="11" class="margin">
            <el-form-item label="数据">
              <file-input
                v-model="form.data"
                tips="请选择相应文件"
              ></file-input>
              <!-- <file-upload v-model="form.data" :files="form.data"></file-upload> -->
            </el-form-item>
          </el-col>
          <el-col :span="11" class="margin">
            <el-form-item label="程序">
              <file-input
                v-model="form.process"
                tips="请选择相应文件"
              ></file-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" class="margin">
            <el-form-item label="结构">
              <file-input
                v-model="form.mat"
                tips="请选择相应以.mat为后缀文件"
              ></file-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" class="margin">
            <el-form-item label="其他参数">
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
/*
 * @Author: Chris
 * @Date: 2021-05-18 15:04:37
 * @Last Modified by: Chris
 * @Last Modified time: 2021-05-26 10:10:55
 */

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
        baseRefractive: "", //基底介电常数
        inLine: "", //基底红外发射率
        order: "", //衍射阶数
        baseThickness: "", //基底厚度
        dataFrom: "", //数据来源
        angle: "", //入射角
        period: "", //材料周期
        refractive: "", //材料折射率
        data: [],
        process: [],
        struct: [],
        mat:[],
      },
      local: [
        {
          name: "首页",
          url: "/photonm",
        },
        {
          name: "衍射组件",
          url: "/photonm/diffraction",
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
      param.append("baseRefractive", this.form.baseRefractive);
      param.append("inLine", this.form.inLine);
      param.append("order", this.form.order);
      param.append("dataFrom", this.form.dataFrom);
      param.append("angle", this.form.angle);
      param.append("period", this.form.period);
      param.append("refractive", this.form.refractive);
      param.append("result", this.form.data[0].raw);
      param.append("process", this.form.process[0].raw);
      param.append("structure", this.form.struct[0].raw);
      param.append("mat", this.form.mat[0].raw);
      return param;
    },

    /**
     * 发送请求
     * */

    submitForm() {
      this.loading = true;

      if (this.$route.query.data == "0") {
        this.$postserver.postFile(
          "/diffraction/import",
          this.buildCreateForm(),
          function(response) {
            if (response.meta.code == "0") {
              this.loading = false;
              this.$alert("上传成功,点击确定返回上一页", "成功", {
                confirmButtonText: "确定",
                callback: (action) => {
                  this.$router.push({
                    path: "diffraction",
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
          "/diffraction/import",
          this.buildCreateForm(),
          function(response) {
            if (response.meta.code == "0") {
              this.loading = false;
              this.$alert("上传成功,点击确定返回上一页", "成功", {
                confirmButtonText: "确定",
                callback: (action) => {
                  this.$router.push({
                    path: "diffraction",
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

<style lang="scss"></style>
