import axios from 'axios';
var myaxios={};
myaxios.install=function(Vue){
   var axios_obj=  axios.create({
        baseURL:'http://192.168.1.101:9000'
        //请求头
    })
    Vue.prototype.$myHttp=axios_obj;
}

export default myaxios