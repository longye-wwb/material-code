<template>
  <el-upload
    ref="upload"
    action="/uplode"
    :file-list="fileList"
    :auto-upload="true"
    :limit="limit"
    :on-change="handlevalueChange"
    :http-request="handleUpload"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <div slot="tip" class="el-upload__tip">{{ tips }}</div>
  </el-upload>
</template>

<script>
export default {
  name: "FileInput",
  data() {
    return {
      fileList: this.files,
      content: "",
    };
  },
  model: {
    prop: "files",
    event: "change",
  },
  props: {
    tips: {
      type: String,
    },
    files: {
      type: Array,
    },
    limit: {
      type: Number,
    },
  },
  methods: {
    getRandomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    handlevalueChange(file, fileList) {
      console.log("选中的文件为：", file);
      this.$emit("change", fileList);
    },
    getFileContent() {
      return this.content;
    },
    handleUpload(param) {
      param.onProgress({ percent: this.getRandomNum(19, 99) });
      this.content = param.file;
      param.onProgress({ percent: 100 });
      param.onSuccess();
    },
  },
};
</script>
