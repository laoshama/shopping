<template>
  <div class="login_box">
    <div class="login_form">
      <div class="logo">
        <img src="../assets/logo.png" alt="logo">
      </div>
      <div class="login_form_inputMSG">
        <!--登入表单-->
        <el-form label-width="80px" :model="loginForm" :rules="loginRules" ref="loginFormRef">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" prefix-icon="el-icon-goods"  placeholder="请输入密码"
                      type="password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <!--按钮区域-->
        <el-row class="btns">
          <el-button type="primary" @click="login_up">登入</el-button>
          <el-button type="info" @click="login_reset">重置</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      //  登入表单绑定数据对象
      loginForm: {
        username: '',
        password: ''
      },
      //  表单验证规则
      loginRules: {
        username: [
          { required: true, message: '请输入用户名！', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码！', trigger: 'blur' },
          { min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //  登入功能按钮
    login_up () {
      //  验证到数据是否符合规则
      this.$refs.loginFormRef.validate((flag) => {
        if (flag) {
          // 发送请求
        } else {
          // 显示错误信息
          alert('错误!  请重新输入!')
        }
      })
    },
    //  重置表单
    login_reset () {
      //  $refs可以拿到所有绑定在ref对象上的属性
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
  .login_box {
    height: 100%;
    background-color: #2b4b6b;

    .login_form {
      width: 450px;
      height: 300px;
      background-color: #fff;
      border-radius: 4px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .logo {
        position: absolute;
        left: 50%;
        top: 3%;
        transform: translateX(-50%);
        width: 100px;
        height: 100px;
        border-radius: 50%;
        box-shadow: 0 0 10px #dddddd;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .login_form_inputMSG{
        position: absolute;
        bottom: 0;
        width: 80%;

        .btns{
          margin-left: 22%;
          margin-bottom: 2%;
          display: flex;
          justify-content: space-around;
        }
      }
    }
  }
</style>
