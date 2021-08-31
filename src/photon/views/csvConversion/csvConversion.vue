<template>
  <div>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :span="20">
        <div class="CSVchange">
          <el-card class="box-card">
            <el-row :gutter="20" type="flex" justify="center">
              <el-col :span="13">
                <div class="test_csv">将转出的 TXT 文件转换为 CSV 文件</div>
              </el-col>
            </el-row>
            <el-row :gutter="20" type="flex" justify="center">
              <el-col :span="13">
                <FileUpload
                  v-model="codeAddress"
                  :files="codeAddress"
                ></FileUpload>
              </el-col>
            </el-row>
            <el-row :gutter="20" type="flex" justify="center">
              <el-col :span="13">
                <el-button
                  v-if="codeAddress.length != '0'"
                  type="success"
                  class="button_CSV"
                  @click="submitForm"
                >
                  一键下载
                </el-button>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FileUpload from "../../../components/form/input/CSVFileUpload.vue";
export default {
  components: {
    FileUpload,
  },
  data() {
    return {
      codeAddress: [],
    };
  },
  methods: {
    submitForm() {
      console.log("点击下载按钮");
      //   this.$postserver.postFile(
      //     "/conversion/to_csv",
      //     this.buildCreateForm(),
      //     function (response) {
      //       console.log("上传结果", response);
      //       this.$emit("success");
      //     }.bind(this)
      //   );
    },
    buildCreateForm() {
      const param = new FormData();
      param.append("file", JSON.stringify(this.codeAddress));
    },
  },
};
</script>

<style lang='scss'>
.CSVchange {
  .button_CSV {
    margin-top: 20px;
  }
  .test_csv {
    margin-top: 20px;
    color: #303133;
    margin-bottom: 20px;
    font-size: 15px;
  }
  .csv_row {
    flex-direction: column;
  }
}
</style>