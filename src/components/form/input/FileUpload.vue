<template>
  <div>
    <el-upload
      :action="uploadAddress"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="limit"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :file-list="value"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <!-- <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div> -->
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "FileUpload",
  data() {
    return {
      value: this.files,
      // header: {
      //   accesstoken: login.token,
      // }
    };
  },
  computed: {
    uploadAddress: function () {
      return (
        window.location.protocol +
        "//" +
        window.location.hostname +
        ":" +
        window.location.port +
        "/api/file/upload"
      );
    },
  },
  props: {
    files: {
      type: Array,
    },
    limit: {
      type: Number,
      default: 3,
    },
  },
  model: {
    prop: "files",
    event: "change",
  },
  watch: {
    files: function (val) {
      console.log("文件上传组件接收上级传入文件数组", val);
      this.value = val;
    },
  },
  methods: {
    handleRemove(file, fileList) {
      console.log("文件列表移除文件时的钩子", file, fileList);
    },
    handlePreview(file) {
      console.log("点击文件列表中已上传的文件时的钩子", file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    handleSuccess(response, file, fileList) {
      if (response.meta && response.meta.code == "0") {
        //文件上传成功
        const fileInfo = {
          index: response.data.fileIndex,
          name: response.data.fileName,
          url: response.data.path,
        };
        file = Object.assign(file, fileInfo);
      } else {
        fileList.pop();
      }
      this.value = fileList;
      console.log("文件上传成功时的钩子", this.value);

      this.$emit("change", this.value);
    },
    beforeRemove(file, fileList) {
      console.log(file, fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>