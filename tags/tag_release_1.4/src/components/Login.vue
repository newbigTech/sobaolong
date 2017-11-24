<template>
  <div class="login">
    <el-dialog title="盛龙宝后台登录" v-model="dialogVisible" @close="closeLoginDialog" class="login-dialog" size="tiny">
      <el-form :model="form" ref="loginForm" :rules="rules" class="category-edit">
        <el-form-item label="账 号" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密 码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码" @keyup.native.enter="onSubmit('loginForm')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" icon="circle-check" :loading="loginLoading" @click="onSubmit('loginForm')" style="width: 150px;">登 录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  import { LOGIN_TOKEN, LOGIN_ROLE, LOGIN_MENUS, MENU_OPTIONS } from '@/store/mutation-types'
  export default {
    name: 'login',
    data () {
      return {
        form: {
          name: '',
          password: ''
        },
        dialogVisible: true,
        formLabelWidth: '80px',
        loginLoading: false,
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, message: '长度在2个字符以上', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 2, message: '长度在2个字符以上', trigger: 'blur' }
          ]
        }
      }
    },
    created: function () {
      this.$axios.get(SITEURL.SETTING_MENUS).then(response => {
        this.$store.commit(MENU_OPTIONS, response.data.data)
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loginLoading = true
            this.$axios.post(SITEURL.LOGIN, this.form).then(response => {
              if (response.data.success) {
                this.$store.commit(LOGIN_TOKEN, response.data.data.token)
                this.$store.commit(LOGIN_ROLE, response.data.data.role)
                this.$store.commit(LOGIN_MENUS, response.data.data.menus)
                this.$axios.defaults.headers.common['Authorization'] = 'Bearer {' + response.data.data.token + '}'
                this.$router.push({ path: '/' })
              } else {
                this.loginLoading = false
                this.$message({
                  showClose: true,
                  type: 'error',
                  message: '登录失败，' + response.data.message
                })
              }
            }).catch(error => {
              this.loginLoading = false
              console.log(error)
            })
          } else {
            this.loginLoading = false
            console.log('error submit!!')
            return false
          }
        })
      },
      closeLoginDialog () {
        this.form = {
          username: '',
          password: ''
        }
        this.loginLoading = false
        this.dialogVisible = true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    width: 2400px;
    height: 800px;
    background-color: #1f2d3d;
    margin: 0;
  }
  .login-dialog {
    text-align: center;
  }
</style>
