<!--
 * @Descripttion: 
 * @version: v1.0.2
 * @Author: payne (wenyi)
 * @Date: 2020-11-19 16:39:41
 * @LastEditors: payne (wenyi)
 * @LastEditTime: 2021-06-29 16:35:01
-->
<template>
    <div>
        <el-row>
            <el-col>功能页面：</el-col>
        </el-row>
        <el-row>
            <el-col>{{path}}</el-col>
        </el-row>
        <el-row>
            <el-col>还未开发，或者没有此页面！</el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'NotFoundView',
    data(){
        return {
            path: this.$route.path
        }

    }
}
</script>