<template>
  <div id="user" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>管理员信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="useredit" v-loading="loading">
      <el-form ref="managerForm" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="账 号" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="mobile">
          <el-input v-model.number="form.mobile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.menus" multiple placeholder="请选择" style="width: 100%">
            <el-option v-for="item in menuOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="onCancel">取 消</el-button>
          <el-button type="info" icon="circle-check" @click="onSubmit('managerForm')" style="width: 150px;">提 交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  export default {
    name: 'user',
    data () {
      return {
        form: {
          name: '',
          display_name: '',
          description: '',
          mobile: '',
          menus: []
        },
        loading: false,
        menuOptions: this.$store.state.menuOptions,
        rules: {
          name: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
            { min: 3, message: '账号不能低于3个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 6, message: '密码至少6位', trigger: 'blur' }
          ],
          mobile: [
            { type: 'number', required: true, message: '请输入正确的电话号码', trigger: 'blur' },
            { type: 'number', min: 11, message: '电话号码至少11位数字', trigger: 'change' }
          ]
        }
      }
    },
    created: function () {
    },
    methods: {
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$axios.post(SITEURL.SYSTEM_MANAGER_REGISTER, this.form).then(response => {
              this.loading = false
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
              } else {
                this.$message.error('操作失败，' + response.data.message)
              }
              this.$router.push({ path: '/system/manager' })
            }).catch(error => {
              this.loading = false
              console.log(error)
            })
          } else {
            this.loading = false
            console.log('error submit!!')
            return false
          }
        })
      },
      onCancel () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style>
  .breadcrumb {
    margin: 20px 0 20px 0;
  }
  .useredit {
    display: block;
    width: 40%;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 24px;
  }
  .inline-input {
    width: 100%;
  }
</style>
