<template>
  <el-container class="h">
    <el-header>
      <el-row>
        <el-col :span="2">
          <div >
            <img src="/static/image/logo.png" class="logo">
          </div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">
            <h2>Ris后台管理系统</h2>
          </div>
        </el-col>
        <!-- <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-button type="warning" class="btnExit" @click="onLoginOutClick">退出</el-button>
          </div>
        </el-col> -->

        <el-col :span="4">
          <el-dropdown>
            <span class="el-dropdown-link">
            <img src="/static/image/resources/doctor_man.jpg" class="round_icon">
            <span style="float:left"> 欢迎{{msg}}</span>
              <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的消息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <!-- .native - 监听组件根元素的原生事件。 -->
              <el-dropdown-item divided @click.native="onLoginOutClick">退出登录</el-dropdown-item> 
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
     
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-col :span="12">
           <!-- 设置router   index 作为 path 进行路由跳转 -->
          <el-menu :router="true" default-active="2" class="el-menu-vertical-demo menuLeft">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="user">用户列表</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">用户列表</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <router-view></router-view>    <!--  嵌套子路由 -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      msg: "zhy"
    };
  },
  mounted(){
    var token=window.localStorage.getItem("token");
    if(!token){
        this.$message({
          message: '请登录',
          type: 'warning'
        });
       this.$router.push({name:"Login"});
    }
  },
  methods:{
    onLoginOutClick(){
        window.localStorage.clear("token");
        this.$router.push({name:"Login"});
    }
  }
};
</script>

<style>

.logo{
 margin-bottom: 5px
}
.round_icon{
  width: 34px;
  height: 34px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.menuLeft {
  width: 199px;
}
.btnExit {
  margin-top: 10px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #ffffff;
  font-size: 12px;
 
}
/* .el-icon-arrow-down {
  font-size: 12px;
} */

.h {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #20a0ff;
  color: #fff;
  text-align: center;
  line-height: 1px;
  margin-left: 0px;
  padding: 0px;
}

.el-aside {
  background-color: #eef1f6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

/* .el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
} */
</style>