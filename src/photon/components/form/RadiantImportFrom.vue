<template>
  <el-form label-width="100px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="材料结构">
          <el-select v-model="form.lable" placeholder="请选择类型">
            <el-option
              v-for="item in lable"
              :key="item.type"
              :label="item.lable"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <!-- 根据选择的类型进行渲染 -->

      <span v-if="form.lable == '1'">
        <el-col :span="12">
          <el-form-item label="底层材料">
            <el-input class="input_k" v-model="form.BottomMterial"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="margin">
          <el-form-item label="奇数材料">
            <el-input class="input_k" v-model="form.OddMaterial"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="margin">
          <el-form-item label="偶数材料">
            <el-input class="input_k" v-model="form.EvenMaterial"></el-input>
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
          <el-form-item label="入射光源类型">
            <el-select v-model="form.lightSource" placeholder="请选择">
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
          <el-form-item label="工作模式">
            <el-select v-model="form.OperatingMode" placeholder="请选择">
              <el-option
                v-for="item in options.workMethod"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </span>

      <!-- 类型二 -->

      <span v-if="form.lable == '2'">
        <el-col :span="12">
          <el-form-item label="圆柱材料">
            <el-input class="input_k" v-model="form.OddMaterial"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="margin">
          <el-form-item label="基底材料">
            <el-input class="input_k" v-model="form.BottomMterial"></el-input>
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
          <el-form-item label="入射光源类型">
            <el-select v-model="form.lightSource" placeholder="请选择">
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
          <el-form-item label="工作模式">
            <el-select v-model="form.OperatingMode" placeholder="请选择">
              <el-option
                v-for="item in options.workMethod"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </span>

      <!-- 上传文件 -->

      <el-col :span="12" class="margin">
        <el-form-item label="曲线数据">
          <file-input
            v-model="form.data"
            tips="请选择相应曲线数据文件"
          ></file-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="margin">
        <el-form-item label="模拟程序">
          <file-input
            v-model="form.process"
            tips="请选择相应模拟程序文件"
          ></file-input>
        </el-form-item>
      </el-col>
      <el-col :span="12" class="margin">
        <el-form-item label="结构参数">
          <file-input
            v-model="form.struct"
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
</template>

<script>
import AntennaTypes from "../config/AntennaTypes.js";
import FileInput from "../../../components/form/input/FileInput.vue";
export default {
  name: "NanoAntennaImportForm",
  components: {
    FileInput,
  },
  data() {
    return {
      options: AntennaTypes,
      lable: [
        { value: "1", lable: "多层膜" },
        { value: "2", lable: "双层圆柱" },
      ],
      form: {
        lable: "1", //材料结构
        BottomMterial: "", //底层材料（基底材料）
        OddMaterial: "", //奇数材料组成（圆柱材料）

        EvenMaterial: "", //偶数材料
        dataFrom: "0", //数据来源
        lightSource: "0", //入射光源类型
        angle: "", //入射角
        OperatingMode: "0", //工作模式
        data: [], //文件
        process: [], //文件
        struct: [], //文件
      },
    };
  },
  methods: {
    /**
     * 构建上传参数
     * */

    buildCreateForm() {
      const param = new FormData();
      param.append("workMode", this.form.OperatingMode); //工作模式
      param.append("lightType", this.form.lightSource); //入射光源类型
      param.append("secondMaterial", this.form.EvenMaterial); //偶数材料
      param.append("lightAngle", this.form.angle); //入射角
      param.append("firstMaterial", this.form.OddMaterial); //奇数材料组成（圆柱材料）
      param.append("dataFrom", this.form.dataFrom); //数据来源
      param.append("base.material", this.form.BottomMterial); //底层材料（基底材料）
      param.append("type", this.form.lable); //材料结构
      param.append("data", this.form.data[0].raw); //文件
      param.append("process", this.form.process[0].raw); //文件
      param.append("struct", this.form.struct[0].raw); //文件
      return param;
    },

    /**
     * 请求接口
     * */

    submitForm() {
      this.$postserver.postFile(
        "/meta_cooling/import",
        this.buildCreateForm(),
        function (response) {
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
<style lang="scss">
.input_k {
  width: 57%;
}
</style>