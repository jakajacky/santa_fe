<script>

import axios from 'axios'
import qs from 'qs'
// import * as _ from '../util/tool'

axios.defaults.timeout = 5000;                        //响应时间
// axios.defaults.headers = {"ACCESS_TOKEN":"a72f763beaa37e2a3dd579b33852624ac48c829481cb926e8c1d121ae9062e3b"};
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';           //配置请求头
axios.defaults.headers.common['ACCESS_TOKEN'] = "a72f763beaa37e2a3dd579b33852624ac48c829481cb926e8c1d121ae9062e3b";
axios.defaults.headers.common['APP_KEY'] = '1441773208629388';
axios.defaults.headers.common['APP_TOKEN'] = 'LMm9-tqSF-2QqE-WK4a';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.method = "post";
axios.responseType = "json";
axios.defaults.baseURL = location.protocol+'//'+location.hostname;   //配置接口地址
//POST传参序列化(添加请求拦截器)
// axios.interceptors.request.use((config) => {
// 	//在发送请求之前做某件事
//     if(config.method  === 'post'){
//         config.data = qs.stringify(config.data);
//     }
//     return config;
// },(error) =>{
//     //  _.toast("错误的传参", 'fail');
//     console.log("错误的传参");
//     return Promise.reject(error);
// });
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
	//对响应数据做些事
    if(!res.data.success){
        // _.toast(res.data.msg);
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    // _.toast("网络异常", 'fail');
    console.log("网络异常");
    return Promise.reject(error);
});

export default {
  fetch:function(url,params) {
    return new Promise((resolve,reject) => {
      axios.post(url, params)
        .then(response => {
          resolve(response.data);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }
}
</script>
