<template>
  <div id="advertise-create" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>后台充值</el-breadcrumb-item>
        <el-breadcrumb-item>充值申请</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="transfer-apply" v-loading="loading">
      <el-row>
        <el-form ref="transferForm" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="消费者手机：" prop="userPhone">
            <el-autocomplete class="inline-input" v-model="form.userPhone" :fetch-suggestions="queryUser"
                             placeholder="请填写消费者账号" :trigger-on-focus="false" @select="handleUserSelect">
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="消费者姓名：">
            <el-input v-model="form.realName" placeholder="消费者姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input v-model="form.idcardNumber" placeholder="身份证号"></el-input>
          </el-form-item>
          <el-form-item label="充值说明：">
            <el-select v-model="form.rechargeExplain" placeholder="请选择" class="inline-input">
              <el-option v-for="item in rechargeExplainOptions" :label="item.label" :value="item.value" :key="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="充值类型：">
            <el-select v-model="form.rechargeType" placeholder="请选择" class="inline-input">
              <el-option v-for="item in rechargeTypeOptions" :label="item.label" :value="item.value" :key="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="充值数额：" prop="amount">
            <el-input v-model.number="form.amount" placeholder="请填写转账金额" @change="changeAmount"><template slot="append">{{chineseAmount}}</template></el-input>
          </el-form-item>
          <el-form-item label="操作员密码：" prop="password">
            <el-input v-model="form.password" placeholder="请填写操作员密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="充值备注：" prop="remark">
            <el-input type="textarea" :rows="4" placeholder="请填写充值备注" v-model="form.remark"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
    <div class="submit-btn">
      <el-button @click="onCancel">返回</el-button>
      <el-button type="info" icon="circle-check" @click="onSubmit('transferForm')" style="width: 150px;">提 交</el-button>
    </div>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  import {smallToBig} from '../../../static/js/currency'
  export default {
    name: 'inform-news',
    data () {
      return {
        form: {
          rechargeExplain: 0,
          rechargeType: 0,
          user: null,
          userPhone: '',
          realName: '',
          remark: ''
        },
        loading: false,
        chineseAmount: '',
        rechargeExplainOptions: this.$store.state.rechargeExplain,
        rechargeTypeOptions: this.$store.state.rechargeType,
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        rules: {
          userPhone: [
            { required: true, message: '请输入消费者账号', trigger: 'blur' }
          ],
          amount: [
            { type: 'number', required: true, message: '请输入充值数额', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入操作员密码', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '请输入充值备注', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      editor () {
        return this.$refs.myTextEditor.quillEditor
      }
    },
    methods: {
      onEditorChange (editor) {
        console.log('editor blur!', editor)
      },
      onSubmit (formName) {
        // 表单验证
        if (!this.form.user) {
          this.$message.warning('请选择消费者账号！')
          return
        }
        if (this.form.amount <= 0) {
          this.$message.warning('您输入的转账金额不正确！')
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$axios.post(SITEURL.OFFLINE_RECHARGE_APPLY, this.form).then(response => {
              this.loading = false
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
                this.$router.go(-1)
              } else {
                this.$message.error('操作失败，' + response.data.message)
              }
            }).catch(error => {
              this.loading = false
              console.log(error)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      onCancel () {
        this.$router.go(-1)
      },
      queryUser (queryString, cb) {
        var results = []
        if (queryString.length >= 2) {
          this.$axios.get(SITEURL.AUTOCOMPLETE_USER_PHONE + '?text=' + queryString).then(response => {
            results = response.data.data
            // 调用 callback 返回建议列表的数据
            cb(results)
          }).catch(error => {
            console.log(error)
          })
        } else {
          cb(results)
        }
      },
      handleUserSelect (item) {
        this.form.userPhone = item.value
        this.form.user = item.id
        this.$axios.get(SITEURL.MEMBER_RECHARGE_USERINFO + '?id=' + item.id).then(response => {
          this.form.realName = response.data.data.realName
          this.form.idcardNumber = response.data.data.idcardNumber
        }).catch(error => {
          console.log(error)
        })
      },
      changeAmount (value) {
        this.chineseAmount = smallToBig(value)
      }
    }
  }
</script>

<style scoped>
  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
  }
  .transfer-apply {
    display: block;
    width: 40%;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 24px;
    min-height: 455px;
    height: auto;
  }
  .inline-input {
    width: 100%;
  }
  .submit-btn {
    margin-top: 20px;
  }
</style>
