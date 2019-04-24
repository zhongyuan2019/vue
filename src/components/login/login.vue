<template >
  <el-form  status-icon  :model="loginForm" ref="loginForm1"  :rules="rules" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input type="password"  v-model="loginForm.pwd" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;"  @click="onLoginClick('loginForm1')" >登录</el-button>
    </el-form-item>
  </el-form>     
</template>

<script>
export default {
   data(){
       return {
           loginForm:{
               username:"",
               pwd:""
           },         
           //登录验证规则  必须跟loginForm里面对应
           rules:{
             username:[{
               required:true,message:'请输入用户名',trigger:'blur'
             }],
             pwd:[{
               required:true,message:'请输入密码',trigger:'blur'
             }]
           }
       }
   },methods:{
        onLoginClick(formObj){
        this.$refs[formObj].validate(valid=>{
          if(valid){
            this.$myHttp.post('/sysuser/loginverify',{ "ADMIN_ID": "A0123","PASSWORD":"a8b980480a3f4d54aabc5288c656d11b"})
                        .then(response=>{               
                        if(response.data.CODE=="1")
                        {
                              window.localStorage.setItem('token','success');
                              this.$message({
                                message: '恭喜你，登陆成功',
                                type: 'success'
                              });
                              this. $router.push({name:"Home"});  //this. $router.push("/");
                        }                        
            })
          }else {
          }          
        })
      }      
   }
}
</script>

<style>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 10px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
 
  }   .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
        text-align: left;
      margin: 0px 0px 0px 0px;
    }
</style>