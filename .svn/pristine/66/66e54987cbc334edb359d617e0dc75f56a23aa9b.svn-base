<template>
  <el-row type="flex" class="">
    <el-col :span="24">
      <div id="menubar">
        <el-row type="flex">
          <el-col :span="4">
            <div class="menu-logo"><img src="../assets/logo.png" class="logo"/></div>
          </el-col>
          <el-col :span="19">
            <el-menu theme="dark" :default-active="activeIndex" class="menus" mode="horizontal" @select="handleSelect" :router="true">
                <el-menu-item index="/dashboard/welcome" v-if="roleCheck('dashboard')">仪表盘</el-menu-item>
                <el-menu-item index="/member/welcome" v-if="roleCheck('member')">会员管理</el-menu-item>
                <el-menu-item index="/merchant/welcome" v-if="roleCheck('merchant')">商家管理</el-menu-item>
                <el-menu-item index="/agent/welcome" v-if="roleCheck('agent')">代理商管理</el-menu-item>
                <!--<el-menu-item index="/business/recharge/list" v-if="roleCheck('business')">商务中心</el-menu-item>-->
                <el-menu-item index="/inform/welcome" v-if="roleCheck('inform')">资讯公告</el-menu-item>
                <el-menu-item index="/finance/welcome" v-if="roleCheck('finance')">财务管理</el-menu-item>
                <el-menu-item index="/infosearch/welcome" v-if="roleCheck('infosearch')">信息查询</el-menu-item>
                <el-menu-item index="/setting/welcome" v-if="roleCheck('setting')">平台设置</el-menu-item>
                <el-menu-item index="/system/welcome" v-if="roleCheck('system')">系统</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="1">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <img :src="avatar" class="avatar"/>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">登出</el-dropdown-item>
                <el-dropdown-item command="password">修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-dialog title="密码修改" v-model="dialogFormVisible" @close="closeEditDialog" size="tiny">
      <el-form :model="form" ref="managerForm" :rules="rules" class="manager-edit">
        <el-form-item label="新密码" prop="password" label-width="70px" @keyup.native.enter="onSubmit('managerForm')">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="info" icon="circle-check" @click="onSubmit('managerForm')" :disabled="submitBtnDis" style="width: 150px;">提 交</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  import { LOGIN_TOKEN, LOGIN_ROLE } from '@/store/mutation-types'
  export default {
    name: 'menubar',
    data () {
      return {
        activeIndex: '/',
        avatar: SITEURL.APP_URL + '/images/admin/avatar.png',
        form: { password: '' },
        dialogFormVisible: false,
        submitBtnDis: false,
        rules: {
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码至少6位', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      handleCommand (command) {
        if (command === 'logout') {
          this.$store.commit(LOGIN_TOKEN, null)
          this.$store.commit(LOGIN_ROLE, null)
          this.$router.push('/login')
        }
        if (command === 'password') {
          this.dialogFormVisible = true
        }
      },
      roleCheck (menu) {
        menu = ',' + menu + ','
        if (this.$store.state.role.indexOf('superadmin') > 0) {
          return true
        }
        if (this.$store.state.menus.indexOf(menu) > 0) {
          return true
        }
        return false
      },
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitBtnDis = true
            this.$axios.post(SITEURL.SYSTEM_MANAGER_PERSONAL, this.form).then(response => {
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
                this.$store.commit(LOGIN_TOKEN, null)
                this.$store.commit(LOGIN_ROLE, null)
                this.$router.push('/login')
              } else {
                this.$message.error('操作失败，' + response.data.message)
              }
              this.dialogFormVisible = false
              this.submitBtnDis = false
            }).catch(error => {
              this.submitBtnDis = false
              console.log(error)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      closeEditDialog () {
        this.form = {
          id: '',
          password: ''
        }
        this.submitBtnDis = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .menu-logo {
    padding: 6px 5px 5px 10px;
  }
  .menu-logo .logo {
    width: 218px;
    height: 43px;
  }
  .menu-logo h2{
    color: whitesmoke;
    margin: 0;
  }
  .menus {
    background-color: #1f2d3d;
  }
  .avatar {
    width: 40px;
    height: 40px;
    margin-top: 8px;
  }
</style>
