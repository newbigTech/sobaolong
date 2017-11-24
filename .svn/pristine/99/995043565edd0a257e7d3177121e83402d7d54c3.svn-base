<template>
  <div id="user" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
        <el-breadcrumb-item>商家信息修改</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="merchantedit" v-loading="loading">
      <el-row>
        <el-form ref="merchantForm" :model="form" :rules="rules" label-width="130px">
          <el-col :span="12" class="merchantinfo">
            <el-form-item label="用户昵称">
              <el-input v-model="form.username" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
              <el-input v-model="form.realName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="注册账号">
              <el-input v-model="form.UserPhoneNumber" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="公司名称" prop="companyName">
              <el-input v-model="form.companyName" placeholder="请填写公司或店铺名称"></el-input>
            </el-form-item>
            <el-form-item label="公司地址" prop="addr">
              <el-input class="inline-input" v-model="form.addr" placeholder="请填写公司地址"></el-input>
            </el-form-item>
            <el-form-item label="法人代表" prop="corporateName">
              <el-input v-model="form.corporateName"></el-input>
            </el-form-item>
            <el-form-item label="营业执照注册号" prop="businessLicenseCode">
              <el-input v-model="form.businessLicenseCode"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="商家分类">
                  <el-select v-model="form.category" placeholder="请选择" @change="changeCategory">
                    <el-option v-for="item in categoryOptions" :label="item.label" :value="item.value" :key="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="扣点模式">
                  <el-select v-model="form.merchantScale" placeholder="请选择" @change="changeScale" disabled>
                    <el-option v-for="item in scaleOptions" :label="item.label" :value="item.value" :key="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人" prop="contacts">
                  <el-input v-model="form.contacts"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话" prop="phoneNumber">
                  <el-input v-model="form.phoneNumber"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="商家介绍" prop="introduction">
              <el-input type="textarea" :rows="4" placeholder="请填写商家介绍" v-model="form.introduction"></el-input>
            </el-form-item>
            <el-form-item label="审核状态">
              <el-radio v-model="radio" label="1">通过</el-radio>
              <el-radio v-model="radio" label="2">驳回</el-radio>          
            </el-form-item>
             <el-form-item label="驳回原因" v-if="radio==='2'" prop="auditRemark">
              <el-input  :rows="2" placeholder="请填写驳回原因" v-model="form.auditRemark"></el-input>
            </el-form-item>
            <!-- <el-form-item label="通过审核">
              <el-switch on-color="#13ce66" off-color="#f7ba2a" on-text="是" off-text="否" on-value="2" off-value="3" v-model="form.auditStatus"></el-switch>
            </el-form-item> -->
            <el-form-item style="margin-top: 20px">
              <el-button @click="onCancel">返回</el-button>
              <el-button type="info" icon="circle-check" @click="onSubmit('merchantForm')" :disabled="submitBtnDis" style="width: 150px;">提 交</el-button>
            </el-form-item>
          </el-col>

          <el-col :span="12" class="merchantimg">
            <el-row>
              <el-tabs v-model="activeName">
                <el-tab-pane label="商家资质" name="index1">
                  <div class="upload-title">营业执照</div>
                  <img class="apply-image" :src="form.businessLicense" @click="handlePicturePreview(form.businessLicense)"/>
                  <div class="upload-title">申请书</div>
                  <img class="apply-image" :src="form.applicationForm" @click="handlePicturePreview(form.applicationForm)"/>
                </el-tab-pane>

                <el-tab-pane label="法人资质" name="index2">
                  <div class="upload-title">法人委托书</div>
                  <img class="apply-image" :src="form.corporateMandate" @click="handlePicturePreview(form.corporateMandate)"/>
                  <div class="upload-title">法人手持身份证</div>
                  <img class="apply-image" :src="form.corporateIdCard" @click="handlePicturePreview(form.corporateIdCard)"/>
                </el-tab-pane>

                <el-tab-pane label="申请人身份证" name="index3">
                  <div class="upload-title">身份证正面</div>
                  <img class="apply-image" :src="form.corporateIdCardA" @click="handlePicturePreview(form.corporateIdCardA)"/>
                  <div class="upload-title">身份证反面</div>
                  <img class="apply-image" :src="form.corporateIdCardB" @click="handlePicturePreview(form.corporateIdCardB)"/>
                </el-tab-pane>

                <el-tab-pane label="受托人资料" name="index4">
                  <div class="upload-title">身份证正面</div>
                  <img class="apply-image" :src="form.consignorIdCardA" @click="handlePicturePreview(form.consignorIdCardA)"/>
                  <div class="upload-title">身份证反面</div>
                  <img class="apply-image" :src="form.consignorIdCardB" @click="handlePicturePreview(form.consignorIdCardB)"/>
                  <div class="upload-title">受托人手持委托书</div>
                  <img class="apply-image" :src="form.consignorMandate" @click="handlePicturePreview(form.consignorMandate)"/>
                </el-tab-pane>

                <el-tab-pane label="商家图片" name="index5">
                  <div class="upload-title">商家封面图</div>
                  <img class="apply-image" :src="form.logoImg" @click="handlePicturePreview(form.logoImg)"/>
                </el-tab-pane>

                <el-tab-pane label="其他图片" name="index6">
                  <div class="upload-title">办公室</div>
                    <el-row type="flex" class="row-img">
                      <div v-for="officeImg in form.officeImgs">
                        <img class="multi-image" :src="officeImg" @click="handlePicturePreview(officeImg)"/>
                      </div>
                    </el-row>
                  <div class="upload-title">营业场所</div>
                    <el-row type="flex" class="row-img">
                      <div v-for="placeImg in form.placeImgs">
                        <img class="multi-image" :src="placeImg" @click="handlePicturePreview(placeImg)"/>
                      </div>
                    </el-row>
                  <div class="upload-title">其他图片</div>
                    <el-row type="flex" class="row-img">
                      <div v-for="otherImg in form.otherImgs">
                        <img class="multi-image" :src="otherImg" @click="handlePicturePreview(otherImg)"/>
                      </div>
                    </el-row>
                </el-tab-pane>
              </el-tabs>
            </el-row>

            <el-dialog v-model="dialogVisible" size="tiny">
              <img width="100%" height="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-col>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  import { MERCHANT_APPLY_INFO } from '@/store/mutation-types'
  export default {
    name: 'user',
    data () {
      return {
        editorOption: {},
        form: {},
        radio: '1',
        uploadUrl: '',
        submitBtnDis: false,
        searchRecommends: [],
        sliderPic: [],
        categoryOptions: [],
        scaleOptions: [],
        dialogImageUrl: '',
        dialogVisible: false,
        activeName: 'index1',
        uploadData: {},
        isDelImg: true,
        loading: false,
        headers: { Authorization: 'Bearer {' + this.$store.state.token + '}' },
        rules: {
          companyName: [
            { required: true, message: '请输入公司或店铺名称', trigger: 'blur' },
            { min: 3, message: '长度在3个字符以上', trigger: 'blur' }
          ],
          addr: [
            { required: true, message: '请输入公司地址', trigger: 'blur' }
          ],
          corporateName: [
            { required: true, message: '请输入法人代表', trigger: 'blur' }
          ],
          contacts: [
            { required: true, message: '请输入联系人', trigger: 'blur' }
          ],
          businessLicenseCode: [
            { required: true, message: '请输入营业执照注册号', trigger: 'blur' }
          ],
          phoneNumber: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { min: 11, message: '长度至少11个字符', trigger: 'blur' }
          ],
          introduction: [
            { required: true, message: '请输入商家介绍', trigger: 'blur' },
            { min: 3, message: '长度在3个字符以上', trigger: 'blur' }
          ],
          auditRemark: [
            { required: true, message: '请输入驳回原因', trigger: 'blur' },
            { min: 1, message: '长度在1个字符以上', trigger: 'blur' }
          ]
        }
      }
    },
    created: function () {
      // 获取存储在vuex里的商家数据
      this.form = this.$store.state.merchantApply
      this.uploadData = { id: this.form.id }
      this.getMerchantInfo()
    },
    methods: {
      getMerchantInfo () {
        this.$axios.get(SITEURL.MERCHANT_APPLY_AUDIT_INFO + '/' + this.form.id).then(response => {
          this.categoryOptions = response.data.data.category
          this.scaleOptions = response.data.data.scale
          this.form.introduction = response.data.data.merchant.introduction
          this.form.businessLicense = response.data.data.merchant.businessLicense
          this.form.applicationForm = response.data.data.merchant.applicationForm
          this.form.corporateMandate = response.data.data.merchant.corporateMandate
          this.form.corporateIdCard = response.data.data.merchant.corporateIdCard
          this.form.corporateIdCardA = response.data.data.merchant.corporateIdCardA
          this.form.corporateIdCardB = response.data.data.merchant.corporateIdCardB
          this.form.logoImg = response.data.data.merchant.logoImg
          this.form.consignorIdCardA = response.data.data.merchant.consignorIdCardA
          this.form.consignorIdCardB = response.data.data.merchant.consignorIdCardB
          this.form.consignorMandate = response.data.data.merchant.consignorMandate
          this.form.officeImgs = response.data.data.officeImgs
          this.form.placeImgs = response.data.data.placeImgs
          this.form.otherImgs = response.data.data.otherImgs
        }).catch(error => {
          console.log(error)
        })
      },
      onSubmit (formName) {
        this.submitBtnDis = true
        if (this.radio === '1') {
          this.form.auditRemark = ''
          this.form.auditStatus = '2'
        } else {
          this.form.auditStatus = '3'
        }
        // 表单验证
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$store.commit(MERCHANT_APPLY_INFO, this.form)
            this.$axios.post(SITEURL.MERCHANT_AUDIT_EDIT, this.form).then(response => {
              this.loading = false
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
                this.$router.go(-1)
              } else {
                this.$message.error('操作失败，' + response.data.message)
                this.$router.go(-1)
              }
              this.submitBtnDis = false
            }).catch(error => {
              this.loading = false
              this.submitBtnDis = false
              this.$message.error('服务器出错，' + error)
              this.$router.go(-1)
            })
          } else {
            this.loading = false
            this.submitBtnDis = false
            return false
          }
        })
      },
      onCancel () {
        this.$router.go(-1)
      },
      changeCategory (item) {
        this.form.category = item
      },
      changeScale (item) {
        this.form.merchantScale = item
      },

      // 图片相关
      handlePicturePreview (url) {
        this.dialogImageUrl = url
        this.dialogVisible = true
      },

      // 分页相关
      handleCurrentChange (val) {
        this.currentPage = val
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>

<style scoped>
  .merchantedit {
    display: block;
    /*width: 45%;*/
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 24px;
    height: 786px;
  }
  .merchantimg {
    padding-left: 50px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .merchantimg .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .upload-title {
    margin-top: 15px;
    margin-bottom: 20px;
  }
  .inline-input {
    width: 100%;
  }
  .bm-view {
    width: 100%;
    height: 400px;
  }
  .dialog-map-footer {
    text-align: center;
  }
  .input-num {
    width: 82px;
  }
  .apply-image {
    width: 300px;
    height: 150px;
  }
  .multi-image {
    width: 150px;
    height: 150px;
    margin: 5px;
  }
  .row-img {
    flex-wrap: wrap;
    width: 600px;
  }
</style>
