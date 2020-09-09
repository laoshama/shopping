<template>
  <div class="login_box">
    <div class="login_form">
      <div class="logo">
        <img src="../assets/logo.png" alt="logo">
      </div>
      <div class="login_form_inputMSG">
        <!--登入表单-->
        <el-form label-width="80px">
          <el-form-item>
            <el-input class="el-icon-user" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input class="el-icon-goods"  placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
        <!--按钮区域-->
        <el-row class="btns">
          <el-button type="primary" plain>登入</el-button>
          <el-button type="info" plain>重置</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/css/my-input.css'
export default {
  name: 'Login',
  data () {
    return {

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

        .el-icon-goods::before,
        .el-icon-user::before{
          position: absolute;
          top: 14px;
          left: 12px;
          opacity: .6;
        }
      }
    }
  }
</style>
