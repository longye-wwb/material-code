/*
 * @Descripttion: 
 * @version: v1.0.1
 * @Author: payne (wenyi)
 * @Date: 2020-11-19 16:39:41
 * @LastEditors: payne (wenyi)
 * @LastEditTime: 2021-06-29 14:01:30
 */
/*
 * @Author: Chris 
 * @Date: 2021-05-17 09:50:00 
 * @Last Modified by:   Chris 
 * @Last Modified time: 2021-05-17 09:50:00 
 */
module.exports = {
  devServer: {
    port: 8080, // 端口
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://localhost:19888/", // 目标代理接口地址
        //target: "http://192.168.31.9:19888",
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
           //"^/api": "/api"
          "^/api": ""
        }
      }
    }
  }
}