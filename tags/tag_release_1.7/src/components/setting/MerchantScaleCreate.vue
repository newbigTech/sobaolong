<template>
  <div id="scale" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>平台设置</el-breadcrumb-item>
        <el-breadcrumb-item>扣点模式</el-breadcrumb-item>
        <el-breadcrumb-item>新建模式</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="scale-create" v-loading="loading">
      <el-form ref="scaleForm" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="基础比例" prop="scale">
          <el-input-number v-model.number="form.scale" placeholder="请输入基础比例" :min="0" :max="100" class="input-num"></el-input-number>
        </el-form-item>
        <el-form-item label="商家积分系数" prop="scaleByMerchant">
          <el-input-number v-model.number="form.scaleByMerchant" placeholder="请输入商家积分系数" :min="0" :max="100" class="input-num"></el-input-number>
        </el-form-item>
        <el-form-item label="用户积分系数" prop="scaleByUser">
          <el-input-number v-model.number="form.scaleByUser" placeholder="请输入用户积分系数" :min="0" :max="100" class="input-num"></el-input-number>
        </el-form-item>
        <el-form-item label="模式描述" prop="scaleDescribe">
          <el-input v-model="form.scaleDescribe"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onCancel">取 消</el-button>
          <el-button type="info" icon="circle-check" @click="onSubmit('scaleForm')" style="width: 150px;"> 提 交</el-button>
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
          scale: null,
          scaleByMerchant: null,
          scaleByUser: null,
          scaleDescribe: ''
        },
        loading: false,
        rules: {
          scale: [
            { type: 'number', required: true, message: '基础比例不能为空', trigger: 'blur' }
          ],
          scaleByMerchant: [
            { type: 'number', required: true, message: '商家积分系数不能为空', trigger: 'blur' }
          ],
          scaleByUser: [
            { type: 'number', required: true, message: '用户积分系数不能为空', trigger: 'blur' }
          ],
          scaleDescribe: [
            { required: true, message: '模式描述不能为空', trigger: 'blur' },
            { min: 5, message: '长度至少5个字符', trigger: 'blur' }
          ]
        }
      }
    },
    created: function () {
    },
    methods: {
      onSubmit (formName) {
        // 表单验证
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$axios.post(SITEURL.MERCHANT_SCALE_CREATE, this.form).then(response => {
              this.loading = false
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
                this.$router.push({ path: '/setting/scale/list' })
              } else {
                this.$message.error('操作失败，' + response.data.message)
              }
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
  .scale-create {
    display: block;
    width: 40%;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 24px;
  }
  .input-num {
    width: 100%;
  }
</style>
