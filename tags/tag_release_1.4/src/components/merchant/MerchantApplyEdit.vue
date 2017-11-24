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
                  <el-select v-model="form.merchantScale" placeholder="请选择" @change="changeScale">
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
                  <el-upload class="avatar-uploader"
                    ref="businessLicense"
                    list-type="picture-card"
                    :headers="headers"
                    :action="coverImageUrl"
                    :data="{id: form.id, type: 'businessLicense'}"
                    :file-list="[{url: form.businessLicense}]"
                    :on-preview="handlePicturePreview"
                    :on-success="handleUploadSuccess"
                    :on-remove="businessLicenseRemove"
                    :before-upload="beforePictureUpload">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <div class="upload-title">申请书</div>
                  <el-upload class="avatar-uploader"
                    ref="applicationForm"
                    list-type="picture-card"
                    :headers="headers"
                    :action="coverImageUrl"
                    :data="{id: form.id, type: 'applicationForm'}"
                    :file-list="[{url: form.applicationForm}]"
                    :on-preview="handlePicturePreview"
                    :on-success="handleUploadSuccess"
                    :on-remove="applicationFormRemove"
                    :before-upload="beforePictureUpload">
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
                  </el-upload>
                </el-tab-pane>

                <el-tab-pane label="法人资质" name="index2">
                  <div class="upload-title">法人委托书</div>
                  <el-upload class="avatar-uploader"
                             ref="corporateMandate"
                             list-type="picture-card"
                             :headers="headers"
                             :action="coverImageUrl"
                             :data="{id: form.id, type: 'corporateMandate'}"
                             :file-list="[{url: form.corporateMandate}]"
                             :on-preview="handlePicturePreview"
                             :on-success="handleUploadSuccess"
                             :on-remove="corporateMandateRemove"
                             :before-upload="beforePictureUpload">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <div class="upload-title">法人手持身份证</div>
                  <el-upload class="avatar-uploader"
                             ref="corporateIdCard"
                             list-type="picture-card"
                             :headers="headers"
                             :action="coverImageUrl"
                             :data="{id: form.id, type: 'corporateIdCard'}"
                             :file-list="[{url: form.corporateIdCard}]"
                             :on-preview="handlePicturePreview"
                             :on-success="handleUploadSuccess"
                             :on-remove="corporateIdCardRemove"
                             :before-upload="beforePictureUpload">
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
                  </el-upload>
                </el-tab-pane>

                <el-tab-pane label="申请人身份证" name="index3">
                  <div class="upload-title">身份证正面</div>
                  <el-upload class="avatar-uploader"
                    ref="corporateIdCardA"
                    list-type="picture-card"
                    :headers="headers"
                    :action="coverImageUrl"
                    :data="{id: form.id, type: 'corporateIdCardA'}"
                    :file-list="[{url: form.corporateIdCardA}]"
                    :on-preview="handlePicturePreview"
                    :on-success="handleUploadSuccess"
                    :on-remove="corporateIdCardARemove"
                    :before-upload="beforePictureUpload">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <div class="upload-title">身份证反面</div>
                  <el-upload class="avatar-uploader"
                    ref="corporateIdCardB"
                    list-type="picture-card"
                    :headers="headers"
                    :action="coverImageUrl"
                    :data="{id: form.id, type: 'corporateIdCardB'}"
                    :file-list="[{url: form.corporateIdCardB}]"
                    :on-preview="handlePicturePreview"
                    :on-success="handleUploadSuccess"
                    :on-remove="corporateIdCardBRemove"
                    :before-upload="beforePictureUpload">
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
                  </el-upload>
                </el-tab-pane>

                <el-tab-pane label="受托人资料" name="index4">
                  <div class="upload-title">身份证正面</div>
                  <el-upload class="avatar-uploader"
                             ref="consignorIdCardA"
                             list-type="picture-card"
                             :headers="headers"
                             :action="coverImageUrl"
                             :data="{id: form.id, type: 'consignorIdCardA'}"
                             :file-list="[{url: form.consignorIdCardA}]"
                             :on-preview="handlePicturePreview"
                             :on-success="handleUploadSuccess"
                             :on-remove="consignorIdCardARemove"
                             :before-upload="beforePictureUpload">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <div class="upload-title">身份证反面</div>
                  <el-upload class="avatar-uploader"
                             ref="consignorIdCardB"
                             list-type="picture-card"
                             :headers="headers"
                             :action="coverImageUrl"
                             :data="{id: form.id, type: 'consignorIdCardB'}"
                             :file-list="[{url: form.consignorIdCardB}]"
                             :on-preview="handlePicturePreview"
                             :on-success="handleUploadSuccess"
                             :on-remove="consignorIdCardBRemove"
                             :before-upload="beforePictureUpload">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <div class="upload-title">受托人手持委托书</div>
                  <el-upload class="avatar-uploader"
                             ref="consignorMandate"
                             list-type="picture-card"
                             :headers="headers"
                             :action="coverImageUrl"
                             :data="{id: form.id, type: 'consignorMandate'}"
                             :file-list="[{url: form.consignorMandate}]"
                             :on-preview="handlePicturePreview"
                             :on-success="handleUploadSuccess"
                             :on-remove="consignorMandateRemove"
                             :before-upload="beforePictureUpload">
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
                  </el-upload>
                </el-tab-pane>

                <el-tab-pane label="商家图片" name="index5">
                  <div class="upload-title">商家封面图</div>
                  <el-upload class="avatar-uploader"
                    ref="logoImg"
                    list-type="picture-card"
                    :headers="headers"
                    :action="coverImageUrl"
                    :data="{id: form.id, type: 'logoImg'}"
                    :file-list="[{url: form.logoImg}]"
                    :on-preview="handlePicturePreview"
                    :on-success="handleUploadSuccess"
                    :on-remove="logoImgRemove"
                    :before-upload="beforePictureUpload">
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
                  </el-upload>
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
              <img width="100%" :src="dialogImageUrl" alt="">
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
        uploadUrl: '',
        submitBtnDis: false,
        coverImageUrl: SITEURL.MERCHANT_APPLY_IMAGE_UPLOAD,
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
        this.$axios.get(SITEURL.MERCHANT_APPLY_INFO + '/' + this.form.id).then(response => {
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
        // 表单验证
        if (this.$refs.businessLicense.uploadFiles[0].url === '') {
          this.$message.error('请上传营业执照！')
          this.submitBtnDis = false
          return
        }
        if (this.$refs.corporateIdCardA.uploadFiles[0].url === '') {
          this.$message.error('请上传身份证正面！')
          this.submitBtnDis = false
          return
        }
        if (this.$refs.corporateIdCardB.uploadFiles[0].url === '') {
          this.$message.error('请上传身份证反面！')
          this.submitBtnDis = false
          return
        }
        if (this.$refs.logoImg.uploadFiles[0].url === '') {
          this.$message.error('请上传商家封面图！')
          this.submitBtnDis = false
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$store.commit(MERCHANT_APPLY_INFO, this.form)
            this.$axios.post(SITEURL.MERCHANT_APPLY_EDIT, this.form).then(response => {
              this.loading = false
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
              } else {
                this.$message.error('操作失败，' + response.data.message)
              }
              this.submitBtnDis = false
            }).catch(error => {
              this.loading = false
              this.submitBtnDis = false
              this.$message({
                showClose: true,
                type: 'error',
                message: '服务器出错，' + error
              })
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

      // 上传图片相关
      beforePictureUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 1

        if (!isJPG) {
          this.$notify.error({title: '错误', message: '上传图片只能是 JPG 和 PNG格式!'})
        }
        if (!isLt2M) {
          this.$notify.error({title: '错误', message: '上传图片大小不能超过 1MB!'})
        }
        if (isJPG && isLt2M) {
          this.isDelImg = true
        } else {
          this.isDelImg = false
        }
        return isJPG && isLt2M
      },

      handleUploadSuccess (response, file, fileList) {
        if (response.success) {
          if (response.data.key === 'businessLicense') {
            this.form.businessLicense = response.data.value
          } else if (response.data.key === 'applicationForm') {
            this.form.applicationForm = response.data.value
          } else if (response.data.key === 'corporateMandate') {
            this.form.corporateMandate = response.data.value
          } else if (response.data.key === 'corporateIdCard') {
            this.form.corporateIdCard = response.data.value
          } else if (response.data.key === 'corporateIdCardA') {
            this.form.corporateIdCardA = response.data.value
          } else if (response.data.key === 'corporateIdCardB') {
            this.form.corporateIdCardB = response.data.value
          } else if (response.data.key === 'logoImg') {
            this.form.logoImg = response.data.value
          } else if (response.data.key === 'consignorIdCardA') {
            this.form.consignorIdCardA = response.data.value
          } else if (response.data.key === 'consignorIdCardB') {
            this.form.consignorIdCardB = response.data.value
          } else if (response.data.key === 'consignorMandate') {
            this.form.consignorMandate = response.data.value
          }
          this.$message.success('操作成功，' + response.message)
        } else {
          this.$message.error('操作失败，' + response.message)
          fileList = []
        }
        if (fileList.length > 1) {
          fileList.splice(0, 1)
        }
      },

      businessLicenseRemove (file, fileList) {
        this.handlePictureRemove(file, fileList, 'businessLicense')
      },
      applicationFormRemove (file, fileList) {
        this.handlePictureRemove(file, fileList, 'applicationForm')
      },
      corporateMandateRemove (file, fileList) {
        this.handlePictureRemove(file, fileList, 'corporateMandate')
      },
      corporateIdCardRemove (file, fileList) {
        this.handlePictureRemove(file, fileList, 'corporateIdCard')
      },
      corporateIdCardARemove (file, fileList) {
        this.handlePictureRemove(file, fileList, 'corporateIdCardA')
      },
      corporateIdCardBRemove (file, fileList) {
        this.handlePictureRemove(file, fileList, 'corporateIdCardB')
      },
      consignorIdCardARemove (file, fileList) {
        this.handlePictureRemove(file, fileList, 'consignorIdCardA')
      },
      consignorIdCardBRemove (file, fileList) {
        this.handlePictureRemove(file, fileList, 'consignorIdCardB')
      },
      consignorMandateRemove (file, fileList) {
        this.handlePictureRemove(file, fileList, 'consignorMandate')
      },
      logoImgRemove (file, fileList) {
        this.handlePictureRemove(file, fileList, 'logoImg')
      },

      handlePictureRemove (file, fileList, type) {
        if (this.isDelImg) {
          this.$axios.post(SITEURL.MERCHANT_APPLY_IMAGE_DEL, {id: this.form.id, type: type}).then(response => {
            if (response.data.success) {
              this.$message.success('操作成功，' + response.data.message)
            } else {
              this.$message.error('操作失败，' + response.data.message)
            }
          }).catch(error => {
            console.log(error)
          })
        }
      },

      handlePicturePreview (file) {
        this.dialogImageUrl = file.url
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
    height: 730px;
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
  .quill-editor {
    height: 650px;
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
