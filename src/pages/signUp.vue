<template>
  <div class="container">
    <h1>注册</h1>
    <el-form :model="user" :rules="rules" ref="singupForm" label-width="100px">
        <el-form-item label="用户名" prop="name">
            <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="邮件" prop="email">
            <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="user.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="user.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('singupForm')">提交</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.user.checkPass !== '') {
          this.$refs.singupForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.user.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      user: {
        name: '',
        email: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 7, message: '长度在 3 到 7 个字符之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填入邮箱', trigger: 'blur' },
          { type: 'email', message: '必须是合法的邮箱格式', trigger: 'blur' }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { min: 6, message: '密码长度最少6位', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
        if (valid) {
          let user = new this.$api.SDK.User();
          user.setUsername(this.user.name);
          user.setPassword(this.user.pass);
          user.setEmail(this.user.email);

          user.signUp().then((loginUser) => {
            this.$store.dispatch('login', loginUser); // 保存到 Vuex 中
            this.$router.go(-1) // 回到上一页
            this.$message.success("注册成功！")
          }).catch(error => {
            console.error(error)
            this.$message.error(error.message)
          })

        } else {
          console.log('error submit!!');
           this.$message.error('错了哦，您填写的信息有错误，请按照提示修改。');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="css">
    .container {
        width: 500px;
        margin: 0 auto;
    }
</style>
