<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="原图">
        <el-upload
          :action="uploadAddress"
          :on-success="handleFileSuccess"
          :show-file-list="false"
          multiple
          :limit="3"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="裁剪头像">
        <img class="img_inin" id="image" :src="globPicture" />
      </el-form-item>
      <el-form-item label="裁剪结果">
        <el-row>
          <el-col :span="4">
            <el-avatar shape="square" :size="50" :src="newPicture"></el-avatar>
          </el-col>
          <el-col :span="4" v-for="size in sizeList" :key="size">
            <el-avatar
              shape="square"
              :size="size"
              :src="newPicture"
            ></el-avatar>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSubmitClick">修改</el-button>
        <el-button @click="cancerclick()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

export default {
  name: "UserProfileUpdateForm",
  inject: ["reload"],
  data() {
    return {
      sizeList: ["large", "medium", "small"],
      cropper: "",
      globPicture:
        "/api/file/download?filePath=image%2F20201030%2F254f3546f4b5c648fb4f862241754096-155057.jpg",
      globPictureShow: true,
      newPicture:
        "/api/file/download?filePath=image%2F20201030%2F254f3546f4b5c648fb4f862241754096-155057.jpg",
      oldBlob: undefined,
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
  mounted: function () {
    console.log("文件上传组件初始化", this.uploadAddress);
    this.initCropper();

    console.log("新建的头像裁剪", this.cropper);
  },
  methods: {
    /**
     * 取消按钮
     * */
    cancerclick() {
      this.$emit("fatherMethod");
    },
    handleFileSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      this.globPicture = URL.createObjectURL(file.raw);
      this.$nextTick(() => {
        this.globPictureShow = true;
        this.resetCropper();
      });
    },
    initCropper() {
      let image = document.getElementById("image");
      let that = this;
      this.cropper = new Cropper(image, {
        aspectRatio: 1 / 1,
        crop(event) {
          console.log(event);
          // console.log(event.detail.x);
          // console.log(event.detail.y);
          // console.log(event.detail.width);
          // console.log(event.detail.height);
          // console.log(event.detail.rotate);
          // console.log(event.detail.scaleX);
          // console.log(event.detail.scaleY);
          that.cropper.getCroppedCanvas().toBlob((blob) => {
            that.newPicture = URL.createObjectURL(blob);
            if (that.oldBlob) {
              URL.revokeObjectURL(that.oldBlob);
            }
            that.oldBlob = blob;
          });
        },
      });
    },
    resetCropper() {
      this.cropper.replace(this.globPicture);
      this.cropper.reset();
      this.cropper.enable();
    },
    handleSubmitClick() {
      const formdata = new FormData();
      formdata.append("file", this.oldBlob, "profile.jpg");
      this.$postserver.postFile(
        "/file/upload",
        formdata,
        function (response) {
          console.log("文件上传结果", response);
          this.$postserver.postForm(
            "/user/editProfile",
            { profile: response.data.path },
            function (res) {
              console.log("头像修改结果：", res);
              sessionStorage.removeItem("user");
              this.reload();
              this.$message({ type: "info", message: "头像修改成功！" });
              this.$emit("submited");
            }.bind(this)
          );
        }.bind(this)
      );
    },
    handleClosedClick() {
      this.$emit("closed");
    },
  },
};
</script>
<style lang="scss">
.img_inin {
  width: 50%;
  height: 50%;
}
</style>