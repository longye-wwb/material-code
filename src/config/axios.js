import Vue from 'vue'
import QueryString from 'querystring'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'

axios.defaults.withCredentials = true; // 允许携带cookie

Vue.use(VueAxios, axios)

Vue.prototype.$qs = QueryString

const suffix = "/api" //代理设置的替换符号

//设置统一的认证请求头信息
axios.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    // config中就是我们对应的配置选项
    // 获取当前的token
    const loginInfo = sessionStorage.getItem('login')
    if (loginInfo) {
        let login = JSON.parse(loginInfo);
        //获取到用户的登录信息
        // console.log("从session中获取登录信息", login);
        let token = login.token;
        // 获取到token后验证是否有效，如果有效才设置对应的头部
        config.headers.accesstoken = token
    }
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

/**
 * 向后台请求数据
 * @param {请求地址} url 
 * @param {请求数据体} queryObjct 
 * @param {请求成功回调} thenCallback 
 * @param {请求发生错误} errorCallback 
 */
function getData(url, queryObjct, thenCallback) {
    axios.get(suffix + url + '?' + qs.stringify(queryObjct, {
            allowDots: true
        }), {
            withCredentials: true
        })
        .then(function (response) {

            BaseResultCallback(response, thenCallback);
        }).catch(function (error) {
            ErrorDefaultCallbask(error);
        })
}

/**
 * 使用json数据请求后台
 * @param {请求地址} url 
 * @param {请求的json数据} data 
 * @param {请求成功回调} thenCallback 
 * @param {请求发生错误回调} errorCallback 
 */
function postJson(url, data, thenCallback) {
    axios.post(suffix + url, data)
        .then(function (response) {
            BaseResultCallback(response, thenCallback);
        })
        .catch(function (error) {
            ErrorDefaultCallbask(error);
        })
}

/**
 * 使用form数据请求后台
 * @param {请求地址} url 
 * @param {请求的json数据} data 
 * @param {请求成功回调} thenCallback 
 * @param {请求发生错误回调} errorCallback 
 */
function postForm(url, form, thenCallback) {
    const formString = QueryString.encode(form)
    axios.post(suffix + url, formString)
        .then(function (response) {
            BaseResultCallback(response, thenCallback);
        })
        .catch(function (error) {
            ErrorDefaultCallbask(error);
        })
}

function getFile(url, params) {
    axios({
        method: 'get',
        url: suffix + url + '?' + QueryString.encode(params),
        responseType: 'arraybuffer',
        withCredentials: true,
    }).then(function (response) {
        let name = _fileNameInContentDisposition(response);
        // console.log("返回结果", response, response.headers['content-type'], name);
        let blob = new Blob([response.data], {
            type: response.headers['content-type']
        });
        let objectUrl = URL.createObjectURL(blob);
        _saveFile(objectUrl, name);
        window.URL.revokeObjectURL(blob);
    });

}

function postJsonGetFile(url, params) {
    axios({
        method: 'post',
        url: suffix + url,
        data: params,
        responseType: 'arraybuffer'
    }).then(function (response) {
        let name = _fileNameInContentDisposition(response);
        // console.log("返回结果", response, response.headers['content-type'], name);
        let blob = new Blob([response.data], {
            type: response.headers['content-type']
        });
        let objectUrl = URL.createObjectURL(blob);
        _saveFile(objectUrl, name);
        window.URL.revokeObjectURL(blob);
    })
}


/**
 * csv上传下载
 * 
 * */
function downloadFile() {
    axios({
        method: 'post',
        url: suffix + url,
        data: fileForm,
        headers: {
            'Content-Type': 'multipart/form-data', // 关键
        },
    }).then(function (response) {
        let name = _fileNameInContentDisposition(response);
        // console.log("返回结果", response, response.headers['content-type'], name);
        let blob = new Blob([response.data], {
            type: response.headers['content-type']
        });
        let objectUrl = URL.createObjectURL(blob);
        _saveFile(objectUrl, name);
        window.URL.revokeObjectURL(blob);
    })
}



function deleteForm(url, params, thenCallback) {
    const formString = QueryString.encode(params)
    axios.delete(suffix + url + '?' + formString).then(function (response) {
        BaseResultCallback(response, thenCallback);
    }).catch(function (error) {
        ErrorDefaultCallbask(error);
    })
}

function postFile(url, fileForm, thenCallback) {
    axios({
        method: 'post',
        url: suffix + url,
        data: fileForm,
        headers: {
            'Content-Type': 'multipart/form-data', // 关键
        },
    }).then(function (response) {
        BaseResultCallback(response, thenCallback);
    })
}

function _saveFile(objectUrl, name) {
    let a = document.createElement('a');
    a.href = objectUrl
    a.download = name // 文件名 ，
    a.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    }))
}

function _fileNameInContentDisposition(res) {
    let des = res.headers['content-disposition'];
    let last = des.lastIndexOf("filename=");
    let fileName = des.slice(last).replace("filename=", "");
    // console.log("获取到文件名", fileName);
    return fileName;
}

function ascyGetData(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .get(suffix + url + '?' + QueryString.encode(params), {
                withCredentials: true
            })
            .then((res) => {
                // console.log("获取的数据是", res);
                resolve(res.data.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function BaseResultCallback(response, callback) {
    let result = response.data;
    if (result && result.meta) {
        if (result.meta.code == '0') {
            // Vue.prototype.$message({
            //     type: 'success',
            //     message: 'postserver: "' + result.meta.code + ':' + result.meta.message + '"'
            // });
            callback(result);
        } else {
            Vue.prototype.$message({
                type: 'warning',
                message: 'postserver: "' + result.meta.code + ':' + result.meta.message + '"'
            });
            callback(result);
        }
    } else {
        Vue.prototype.$message.error('后台服务器没有正确返回数据');
        callback(response);
    }
    // console.log("后台服务器：", result);
}

function ErrorDefaultCallbask(error) {
    if (error.response && error.response.status) {
        let code = error.response.status;
        if (code >= 500) {
            Vue.prototype.$confirm(error.response.data.meta.message,
                '接口错误', {
                    confirmButtonText: '确定',
                    type: 'error'
                });
        } else if (code >= 400) {
            if (code == 401) {
                Vue.prototype.$cookie.delCookie("JSESSIONID");
                Vue.prototype.$confirm("前往登录页面，重新登录。",
                        '未登录', {
                            confirmButtonText: '确定',
                            type: 'warning'
                        })
                    .then(() => {
                        window.location.assign("/login/password");
                    });
            } else {
                Vue.prototype.$confirm(error.response.data.meta.message, '网页错误', {
                    confirmButtonText: '确定',
                    type: 'warning'
                });
            }
        } else if (code >= 300) {
            if (code == "302") {
                // console.log("发生重定向响应", error);
                Vue.$router.push({
                    path: "/login/cas"
                });
            } else {
                Vue.prototype.$alert(error.response.data.meta.message, '网络错误', {
                    confirmButtonText: '确定',
                });
            }
        } else {
            Vue.prototype.$alert(error.response.data.meta.message, '系统错误', {
                confirmButtonText: '确定',
            });
        }
    } else {
        // console.log("未知错误", error, error.isAxiosError, error.message);
        // Vue.prototype.$alert(error.message, '未知错误', {
        //     confirmButtonText: '确定',
        // });
    }
}

const apiMethod = {
    getData,
    postJson,
    postForm,
    deleteForm,
    ascyGetData,
    getFile,
    postJsonGetFile,
    postFile,
    downloadFile
}

export default apiMethod;