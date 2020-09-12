<template>
  <el-card class="box-card">
    <!--  头部导航栏区域 -->
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--  搜索添加区域  -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input  @keyup.enter.native="getUsersList" @clear="getUsersList" placeholder="请输入用户名" clearable
                   prefix-icon="el-icon-search"
                   v-model="queryInfo.query">
          <el-button slot="append" icon="el-icon-search" @click="getUsersList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="centerDialogVisible = true">添加用户</el-button>
      </el-col>
    </el-row>
    <!--  添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="centerDialogVisible" width="50%" center @close="addDialogClosed">
      <el-form :model="addUsersForm" :rules="addUsersFormRules" label-width="100px" ref="addFormRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUsersForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" clearable>
          <el-input v-model="addUsersForm.password" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUsersForm.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addUsersForm.mobile" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!--  修改用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" center>
      <el-form :model="editUsersInfo" label-width="100px" ref="editFormRef" :rules="editFormRules">
        <el-form-item label="用户名">
          <el-input v-model="editUsersInfo.username" clearable disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUsersInfo.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editUsersInfo.mobile" clearable></el-input>
        </el-form-item>
      </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUser">确 定</el-button>
        </span>
    </el-dialog>
    <!--  用户列表区域  -->
    <el-table ref="singleTable" highlight-current-row style="width: 80%" :data="userList" border
              :header-cell-style="{textAlign: 'center'}">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column property="username" label="姓名"></el-table-column>
      <el-table-column property="email" label="邮箱"></el-table-column>
      <el-table-column property="mobile" label="电话"></el-table-column>
      <el-table-column property="role_name" label="角色"></el-table-column>
      <el-table-column property="mg_state" label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change="usersStateChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="operationScope">
          <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-edit" circle size="mini"
                       @click="showEditDialog(operationScope.row.id)"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-setting" circle size="mini"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[1, 2, 3, 4, 5, 10]"
        :page-size="queryInfo.pagesize"
        :page-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Users',
  data () {
    // 自定义添加用户表单的验证手机号规则
    const checkMobile = (rule, value, callback) => {
      const regMobile = /^1[3456789]\d{9}$/
      if (regMobile.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法手机号！'))
    }
    return {
      //  获取用户列表定义的参数对象,以便服务器按照页码和显示条数取数据
      queryInfo: {
        //  查询条件
        query: '',
        //  当前页码
        pagenum: 1,
        //  每页显示条数
        pagesize: 5
      },
      userList: [],
      addUsersForm: {
        username: '',
        email: '',
        mobile: '',
        password: ''
      },
      //  修改表单数据对象
      editUsersInfo: {},
      total: 0,
      value: true,
      centerDialogVisible: false,
      editDialogVisible: false,
      //  添加表单验证规则
      addUsersFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      },
      //  修改用户表单验证规则
      editFormRules: {
        email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUsersList()
  },
  methods: {
    //  定义发送获取数据请求函数
    async getUsersList () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.userList = res.data.users
      this.total = res.data.total
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getUsersList()
    },
    //  监听页码值
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getUsersList()
    },
    //  监听用户状态改变
    async usersStateChange (userInfo) {
      // users/:uid/state/:type
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.state}`)
      if (res.meta.status !== 200) {
        userInfo.state = !userInfo.state
        this.$message.error('用户状态更新失败！')
      } else {
        this.$message.success('成功更新用户状态！')
      }
    },
    //  监听添加用户对话框关闭
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    //  预校验添加用户表单
    addUser () {
      //  隐藏添加用户对话框
      this.centerDialogVisible = false
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        //  预校验通过 发送请求 post users 成功状态码201
        const { data: res } = await this.$http.post('users', this.addUsersForm)
        if (res.meta.status !== 201) {
          return this.$message.error('添加用户失败')
        }
        this.$message.success('成功添加用户')
        this.getUsersList()
      })
    },
    // 显示修改用户对话框
    async showEditDialog (id) {
      // 向服务器获取所需修改的用户数据
      const { data: res } = await this.$http.get(`users/${id}`)
      this.editUsersInfo = res.data
      //  显示对话框
      this.editDialogVisible = true
    },
    //  修改用户表单  校验
    editUser () {
      //  预校验
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error('数据格式不符合规则')
        // 发送请求
        const { data: res } = await this.$http.put(`users/${this.editUsersInfo.id}`, this.editUsersInfo)
        if (res.meta.status !== 200) return this.$message.error('数据修改失败！')
        this.$message.success('数据修改成功！')
        // 关闭对话框
        this.editDialogVisible = false
        // 刷新用户列表显示的数据
        this.getUsersList()
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .el-table {
    margin: 20px auto;
  }

  ::v-deep
  .el-table td,
  .el-table th {
    text-align: center;
  }

  ::v-deep .el-dialog__body {
    width: 80% !important;
  }
</style>
