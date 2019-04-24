<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 查询输入框 -->
    <div style="margin-top: 10px; background-color: #eef1f6">
      <el-input
        placeholder="请输入姓名"
        class="input-with-select"
        v-model="searchVal"
        @keyup.enter.native="onSearchClick"
      >
        <el-button slot="append" icon="el-icon-search" type="primary" @click.stop="onSearchClick"></el-button>
      </el-input>
      <el-button type="primary" @click="onAddClick">新增</el-button>
    </div>
     
    <!-- 表格区域 -->
    <el-table
      style="width: 100%;margin-top: 10px;"
      :data="tableData"
      highlight-current-row
      v-loading="loading"
      :header-cell-style="{
        'height':'40px',
        'border-bottom': '1px rgb(103, 194, 58) solid'
      }"
      :row-style="{
        'height':'36px'
      }">
    
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="id" label="id" width="120" height="40px" sortable></el-table-column>
      <el-table-column prop="username" label="姓名" width="120" height="40px" sortable></el-table-column>
      <el-table-column prop="sex" label="姓名" width="120" height="40px" sortable></el-table-column>
      <el-table-column prop="age" label="地址" height="40px" sortable show-overflow-tooltip></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPageIndex"
      :page-sizes="[10, 15, 20]"
      :page-size="pageSize"  
      layout="total, sizes, prev, pager, next, jumper"
      :total="totals">
    </el-pagination>

    <!-- 新增弹窗 -->
    <el-dialog title="新增用户" :visible.sync="dialogIsVisible">
      <el-form :model="addForm">
        <el-form-item label="姓名" label-width="200px">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" label-width="200px">
          <el-input v-model="addForm.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="200px">
          <el-input v-model="addForm.sex" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogIsVisible = false">取 消</el-button>
        <el-button type="primary" @click="onAddSaveClick">确 定</el-button>
      </div>
    </el-dialog>
    
    <!-- 修改弹窗 -->
    <el-dialog title="编辑用户" :visible.sync="dialogEditIsVisible">
      <el-form :model="editForm">
        <el-form-item label="姓名" label-width="200px">
          <el-input v-model="editForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" label-width="200px">
          <el-input v-model="editForm.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="200px">
          <el-input v-model="editForm.sex" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditIsVisible = false">取 消</el-button>
        <el-button type="primary" @click="onEditSaveClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchVal: "",
      tableData: [],
      loading: false,
      dialogIsVisible: false, //设置添加弹出框是否显示
      addForm: { username: "", sex: "", age: "" },
      dialogEditIsVisible:false,//设置修改弹出框是否显示
      editForm:{ username: "", sex: "", age: "" },

      pageSize:10,//每页记录数
      currentPageIndex:1, //当前显示的页
      totals:0  //总共记录数
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    handleEdit(index ,row) {
      //编辑事件 --- 弹窗
      this.dialogEditIsVisible=true;
      this.editForm=row;
    },
    handleDelete(index, row) {
      //删除事件
      this.$confirm("确定要删除该用户吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteUser(row);//执行删除
        })
        .catch(() => {
          this.$message({ type: "info",message: "已取消删除" });
        });
    },
    onSearchClick() {
      //查询按钮事件
      this.getUserList(this.searchVal);
    },
    onAddClick() {
      //添加按钮事件     
      this.addForm={};//添加时清除数据
      this.dialogIsVisible = true;
 
    },
    onAddSaveClick() {
      //添加保存
      var url = "http://localhost:3000/users";
      this.$myHttp({
        url: url,
        method: "post",
        data: this.addForm
      }).then(response => {
        let { status, data } = response;
        if (status == "201") {
          this.$message({type:"success",message:"添加成功"});
          this.getUserList();
        }
      });
      this.dialogIsVisible = false;
    },
    onEditSaveClick(){
      //修改保存
      var id=this.editForm.id;
      var url = 'http://localhost:3000/users/'+id;
      console.log(url)
      this.$myHttp({
        url: url,
        method: "put",
        data: this.editForm
      }).then(response => {
        let { status, data } = response;
        if (status == "200") {
          this.$message({type:"success",message:"修改成功"});
          this.getUserList();
        }
      });
      this.dialogEditIsVisible = false;
    },
    handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize=val;
        this.getUserList();
    },
    handleCurrentChange(val) {
        this.currentPageIndex=val;
        this.getUserList();
    },
    getUserListCount(){
       var url = "http://localhost:3000/users";
        this.$myHttp({
        url,
        method: "get"
      }).then(response => {
        let { status, data } = response;
        if (status == "200") {
         this.totals=data.length;
         console.log(this.totals);
        }
      });
    },
    getUserList(query = "") {
      this.getUserListCount();
      //加载数据
      if (query == "") {
        var url = "http://localhost:3000/users?_page="+this.currentPageIndex+"&_limit="+this.pageSize;
      } 
      else {
        var url = "http://localhost:3000/users?_page="+this.currentPageIndex+"&_limit="+this.pageSize+"&username_like=" +query;                   
      }
      this.$myHttp({
        url,
        method: "get"
      }).then(response => {
        let { status, data } = response;
        if (status == "200") {
          this.tableData = data;
        }
      });
    },
    deleteUser(row) {
      var url = "http://localhost:3000/users/" + row.id;
      this.$myHttp({
        url: url,
        method: "delete"
      }).then(response => {
        let { status, data } = response;
        if (status == "200") {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getUserList();
        }
      });
    }
  }
};
</script>

<style>
.input-with-select {
  height: 36px;
  text-align: center;
}

.el-input-group {
  width: 350px;
}
.el-main {
  line-height: 30px;
  text-align: left;
  width: 30%;
}

.el-row {
  padding-top: 10px;
  padding-bottom: 10px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #eef1f6;
}
.bg-purple {
  background: #d3dce6;
}

.grid-content {
  border-radius: 4px;
  height: 46px;
}
</style>
