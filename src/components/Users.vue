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
          <!--  编辑当前行的数据  -->
          <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="showEditDialog(operationScope.row.id)"></el-button>
          </el-tooltip>
          <!--  为当前行分配角色  -->
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-setting" circle size="mini"
                       @click="roleDialogVisible = true"></el-button>
          </el-tooltip>
          <!--  删除当前行的数据  -->
          <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="removeUsersById(operationScope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
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
    <!--  分配用户角色对话框 -->
    <el-dialog title="角色分配" :visible.sync="roleDialogVisible">
      <el-form :model="roleUserForm">
        <el-form-item label="活动区域" label-width="120px">
          <el-select v-model="roleUserForm.region" placeholder="请选择活动区域">
            <el-option label="炒鸡管理员" value="shanghai"></el-option>
            <el-option label="java程序员" value="beijing"></el-option>
            <el-option label="web程序员" value="beijing"></el-option>
            <el-option label="架构师" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="roleDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--  分页区域  -->
    <el-pagination
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :page-sizes="[1, 2, 3, 4, 5, 10]"
       :page-size="queryInfo.pagesize"
       :page-count="5"
       layout="total, sizes, prev, pager, next, jumper"
       :total="total">
    </el-pagination>
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
      centerDialogVisible: false,
      editDialogVisible: false,
      roleDialogVisible: false,
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
      },
      roleUserForm: {}
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
    //  监听当前页面显示数据条数
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
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
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
    //  显示修改用户对话框
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
        if (!valid) return this.$message.error('数据格式不符合规则！')
        // 发送请求
        const { data: res } = await this.$http.put(`users/${this.editUsersInfo.id}`, {
          email: this.editUsersInfo.email,
          mobile: this.editUsersInfo.mobile
        })
        if (res.meta.status !== 200) return this.$message.error('数据修改失败！')
        this.$message.success('数据修改成功！')
        // 关闭对话框
        this.editDialogVisible = false
        // 刷新用户列表显示的数据
        this.getUsersList()
      })
    },
    //  删除当前行数据
    removeUsersById (id) {
      this.$confirm('此操作将永久删除该数据！是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '放弃删除',
        type: 'warning',
        center: true
      }).then(async () => {
        //  执行删除操作
        const { data: res } = await this.$http.delete(`users/${id}`)
        if (res.meta.status !== 200) {
          return this.$message({
            type: 'error',
            message: '删除失败！'
          })
        } else {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          /*
          注意：this.total还是未删除该条数据前的数据总数，因为this.$http.delete()请求
          只是向服务器发送删除数据请求，对服务器返回的数据，我们并没有将服务器返回的数据中
          的total值重新赋值给我们的页面。所以当前页面的total值还是未删除数据前的total值
          */
          //  处理删除最后一页全部数据后 刷新的页面的页码  该页显示的数据混乱 的问题
          //  判断条件1：(每页显示2条以上)当前页面是最后一页  且  最后一页只有一条数据
          //  判断条件2：(每页只显示1条)
          //          (this.total) % this.queryInfo.pagesize === 1 || this.queryInfo.pagesize === 1
          //  满足该条件时：执行请求参数页码减1。
          //  因为满足以上两个条件，说明当前是数据的最后一页，且最后一页的只有一条数据
          //  将当前页码修改为上一页的页码
          //  否则不作为（照常显示）
          console.log(this.total)
          console.log(this.queryInfo.pagesize)
          if ((this.total) % this.queryInfo.pagesize === 1 || this.queryInfo.pagesize === 1) {
            this.queryInfo.pagenum--
            console.log('我执行了')
          }
          //  刷新用户数据列表
          this.getUsersList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
