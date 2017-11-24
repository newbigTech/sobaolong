<template>
  <div id="advertise-create" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>夺宝设置</el-breadcrumb-item>
        <el-breadcrumb-item>夺宝商品</el-breadcrumb-item>
        <el-breadcrumb-item>商品添加</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="adv-edit" v-loading="loading">
      <el-row>
        <el-form ref="advForm" :model="form" :rules="rules" label-width="110px">
          <el-col :span="10" class="goodsinfo">
            <el-form-item label="商品名称" prop="goodsName">
              <el-input v-model="form.goodsName" placeholder="请填写商品名称"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="商品市场价">
                  <el-input-number v-model="form.originalPrice" :controls="false" :min="1" placeholder="请填写商品市场价" class="number-input"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品单价">
                  <el-input-number v-model="form.price" :controls="false" :min="1" placeholder="请填写商品单价" class="number-input"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="预售总额">
                  <el-input-number v-model="form.raiseAmount" :controls="false" :min="1" placeholder="请填写预售总额" class="number-input"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="购买最大数量">
                  <el-input-number v-model="form.maxBuyCount" :controls="false" :min="1" placeholder="请填写购买最大数量" class="number-input"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="商品分类" prop="category">
                  <el-select v-model="form.category" placeholder="请选择" class="number-input">
                    <el-option v-for="item in goodsTypeOptions" :label="item.label" :value="item.value" :key="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="截止时间">
                  <el-date-picker v-model="form.stopTime" align="right" type="date" placeholder="选择截止时间" class="number-input"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="是否发货">
              <el-checkbox v-model="form.isDelivery">发货</el-checkbox>
            </el-form-item>
            <el-form-item label="商品介绍" prop="introduction">
              <el-input type="textarea" :rows="4" placeholder="请填写商家介绍" v-model="form.introduction"></el-input>
            </el-form-item>
            <el-form-item label="商品缩略图" :required="true">
              <el-upload
                class="avatar-uploader"
                ref="uploadCover"
                list-type="picture"
                :headers="headers"
                :data="imageData"
                :action="uploadImageUrl"
                :on-preview="handlePicturePreview"
                :on-success="handleUploadSuccess"
                :on-change="handleChangeCover"
                :on-remove="handleChangeCover"
                :auto-upload="false"
                :before-upload="beforeImgUpload">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M。缩略图只能上传1张。</div>
              </el-upload>
              <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item label="品牌LOGO" :required="true">
              <el-upload
                class="avatar-uploader"
                ref="uploadLogo"
                list-type="picture"
                :headers="headers"
                :data="imageData"
                :action="uploadImageUrl"
                :on-preview="handlePicturePreview"
                :on-success="handleUploadSuccess"
                :on-change="handleChangeLogo"
                :on-remove="handleChangeLogo"
                :auto-upload="false"
                :before-upload="beforeImgUpload">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M。缩略图只能上传1张。</div>
              </el-upload>
              <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-col>
          <el-col :span="14" class="textEditor">
            <div class="quill-editor">
              <!-- quill-editor -->
              <quill-editor ref="myTextEditor" v-model="form.htmlIntroduction" :options="editorOption"></quill-editor>
            </div>
          </el-col>
        </el-form>
      </el-row>
      <div class="submit-btn">
        <el-button @click="onCancel">返回</el-button>
        <el-button type="info" icon="circle-check" @click="onSubmit('advForm')" :disabled="submitBtnDis" style="width: 150px;">提 交</el-button>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  export default {
    name: 'advertisement',
    data () {
      return {
        editorOption: {},
        uploadImageUrl: SITEURL.SNATCH_IMAGE_UPLOAD,
        form: {
          goodsName: '',
          category: '',
          stopTime: '',
          introduction: '',
          htmlIntroduction: '',
          coverImg: '',
          logoImg: '',
          isDelivery: true
        },
        city: '',
        merchant: '',
        adStatus: '',
        submitBtnDis: false,
        tableData: [],
        queryString: '',
        goodsTypeOptions: [],
        dialogFormVisible: false,
        dialogVisible: false,
        dialogImageUrl: '',
        imageData: {},
        loading: false,
        headers: { Authorization: 'Bearer {' + this.$store.state.token + '}' },
        rules: {
          goodsName: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 3, message: '长度在2个字符以上', trigger: 'blur' }
          ],
          category: [
            { type: 'string', required: true, message: '请选择商品分类', trigger: 'change' }
          ],
          introduction: [
            { required: true, message: '请输入商家介绍', trigger: 'blur' },
            { min: 3, message: '长度在3个字符以上', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      editor () {
        return this.$refs.myTextEditor.quillEditor
      }
    },
    created: function () {
      this.getGoodsInfo()
    },
    methods: {
      getGoodsInfo () {
        this.$axios.get(SITEURL.SNATCH_GOODS_INFO + '/0').then(response => {
          this.goodsTypeOptions = response.data.data.category
        }).catch(error => {
          console.log(error)
        })
      },
      onEditorChange (editor) {
        console.log('editor blur!', editor)
      },
      onSubmit (formName) {
        this.submitBtnDis = true
        // 表单验证
        if (this.form.raiseAmount % this.form.price !== 0) {
          this.$message.warning('预售总额应为商品单价的整数倍数！')
          this.submitBtnDis = false
          return
        }
        if (this.$refs.uploadCover.uploadFiles.length === 0 || this.$refs.uploadCover.uploadFiles[0].url === '' || this.$refs.uploadCover.uploadFiles[0].url === null) {
          this.$message.warning('请上传商品缩略图！')
          this.submitBtnDis = false
          return
        }
        if (this.$refs.uploadLogo.uploadFiles.length === 0 || this.$refs.uploadLogo.uploadFiles[0].url === '' || this.$refs.uploadLogo.uploadFiles[0].url === null) {
          this.$message.warning('请上传品牌LOGO！')
          this.submitBtnDis = false
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.stopTime = typeof this.stopTime === 'undefined' ? '' : this.stopTime
            this.loading = true
            this.$axios.post(SITEURL.SNATCH_GOODS_CREATE, this.form).then(response => {
              this.loading = false
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message + '正在上传图片。。。')
                this.imageData.id = response.data.data.id
                this.imageData.type = 'coverImg'
                this.$refs.uploadCover.submit()
                this.imageData.type = 'logoImg'
                this.$refs.uploadLogo.submit()
                this.$router.push({ path: '/snatch/goods' })
              } else {
                this.$message.error('操作失败，' + response.data.message)
                this.submitBtnDis = false
              }
            }).catch(error => {
              this.submitBtnDis = false
              console.log(error)
            })
          } else {
            this.loading = false
            this.submitBtnDis = false
            console.log('error submit!!')
            return false
          }
        })
      },
      onCancel () {
        this.$router.go(-1)
      },
      // 图片上传
      beforeImgUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 1

        if (!isJPG) {
          this.$notify.error({title: '错误', message: '上传图片只能是 JPG 和 PNG格式!'})
        }
        if (!isLt2M) {
          this.$notify.error({title: '错误', message: '上传图片大小不能超过 1MB!'})
        }
        return isJPG && isLt2M
      },
      handlePicturePreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleChangeCover (file, fileList) {
        if (fileList.length > 1) {
          fileList.splice(0, 1)
        }
      },
      handleChangeLogo (file, fileList) {
        if (fileList.length > 1) {
          fileList.splice(0, 1)
        }
      },
      handleUploadSuccess (response, file, fileList) {
        if (response.success) {
          this.$message.success('操作成功，' + response.message)
          fileList = [{url: response.data.image}]
          this.form.id = response.data.id
          this.form.image = response.data.image
        } else {
          this.$message.error('操作失败，' + response.message)
          fileList = []
        }
        this.submitBtnDis = false
      }
    }
  }
</script>

<style scoped>
  .number-input {
    width: 100%;
  }
  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
  }
  .quill-editor {
    height: 730px;
  }
  .adv-edit {
    display: block;
    /*width: 45%;*/
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 24px;
    min-height: 610px;
    height: auto;
  }
  .textEditor {
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
  .adimg .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .inline-input {
    width: 100%;
  }
  .submit-btn {
    margin-top: 20px;
  }
</style>
