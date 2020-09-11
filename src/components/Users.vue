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
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="search">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary">添加用户</el-button>
      </el-col>
    </el-row>
    <!--  用户列表区域  -->
    <el-table ref="singleTable" highlight-current-row style="width: 100%" :data="userList" border :header-cell-style="{textAlign: 'center'}">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column property="username" label="姓名"></el-table-column>
      <el-table-column property="email" label="邮箱"></el-table-column>
      <el-table-column property="mobile" label="电话"></el-table-column>
      <el-table-column property="role_name" label="角色"></el-table-column>
      <el-table-column property="mg_state" label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template>
          <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
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
    return {
      //  获取用户列表定义的参数对象,以便服务器按照页码和显示条数取数据
      queryInfo: {
        query: '',
        //  当前页码
        pagenum: 1,
        //  每页显示条数
        pagesize: 5
      },
      userList: [],
      total: 0,
      search: '',
      value: true
    }
  },
  created () {
    this.getUsersList()
  },
  methods: {
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
    }
  }
}
</script>

<style lang="less" scoped>
  .el-table {
    margin-top: 10px;
  }

  ::v-deep
  .el-table td,
  .el-table th {
    text-align: center;
  }
</style>
