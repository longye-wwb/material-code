<template>
    <div>
        <el-form>
            <el-form-item label="姓名">
                <el-input v-model="form.userName" placeholder="请输入用户姓名"></el-input>
            </el-form-item>
            <el-form-item label="账号">
                <el-input v-model="form.account" placeholder="请输入用户账号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" placeholder="请输入用户密码"></el-input>
            </el-form-item>
            <el-form-item label="再次输入">
                <el-input v-model="repassword" placeholder="请再次输入用户密码"></el-input>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="form.telephone" placeholder="请输入用户手机号"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email" placeholder="请输入用户邮箱"></el-input>
            </el-form-item>
            <el-form-item label="家庭住址">
                <el-input v-model="form.addr" placeholder="请输入用户家庭住址"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmitClick">保存</el-button>
                <el-button @click="onClosedClick">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'UserCreateForm',
    data(){
        return {
            form: {
                id: this.preform.id,
                account: this.preform.account,
                userName: this.preform.userName,
                password: this.preform.password,
                telephone: this.preform.telephone,
                email: this.preform.email,
                addr: this.preform.addr,
                org: this.preform.org,
            },
            repassword: '',
        }
    },
    props:{
        preform:{
            type: Object,
            required: true,
        },
        url: {
            type: String,
            required: true,

        }
    },
    model: {
        prop: "preform",
        event: "submit",
    },
    methods: {
        onSubmitClick(){
            const formdata = this.buildForm();
            this.submit(formdata);

        },
        onClosedClick(){
            this.$emit("closed");

        },
        buildForm(){
            const formData = {
                account: this.form.account,
                userName: this.form.userName,
                password: this.form.password,
                telephone: this.form.telephone,
                email: this.form.email,
                addr: this.form.addr,
                org: this.form.org
            }
            return formData;
        },
        submit(data){
            const that = this;
            this.$postserver.postJson(this.url,data,function(response){
                if(response.meta&&response.meta.code == '0'){
                    that.$emit("submit",data);
                }else{
                    that.$message.error(response.meta.message);
                }
            })

        }
    }
}
</script>