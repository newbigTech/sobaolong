<template>
  <div id="advertise-create" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>APP设置</el-breadcrumb-item>
        <el-breadcrumb-item>新建商家分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="category-create" v-loading="loading">
      <el-row>
        <el-form ref="newsForm" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="分类名称" prop="categoryName">
            <el-input v-model="form.categoryName" placeholder="请填写分类名称"></el-input>
          </el-form-item>
          <el-form-item label="分类介绍">
            <el-input v-model="form.introduction" placeholder="请填写分类介绍"></el-input>
          </el-form-item>
          <el-form-item label="排序号">
            <el-input-number v-model="form.sortShow" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="是否显示">
            <el-switch on-color="#13ce66" off-color="#f7ba2a" on-text="是" off-text="否" v-model="isShow"></el-switch>
          </el-form-item>
          <el-form-item label="分类图" :required="true">
            <el-upload
              class="avatar-uploader"
              ref="upload"
              list-type="picture"
              :headers="headers"
              :data="imageData"
              :file-list="fileList"
              :action="coverImageUrl"
              :on-preview="handlePicturePreview"
              :on-success="handleUploadSuccess"
              :on-remove="handleRemoveCover"
              :auto-upload="false"
              :before-upload="beforeImageUpload">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M。封面图只能上传1张。</div>
            </el-upload>
            <el-dialog v-model="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
    <div class="submit-btn">
      <el-button @click="onCancel">返回</el-button>
      <el-button type="info" icon="circle-check" @click="onSubmit('newsForm')" style="width: 150px;">提 交</el-button>
    </div>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  export default {
    name: 'inform-news',
    data () {
      return {
        editorOption: {},
        coverImageUrl: SITEURL.MERCHANT_CATEGORY_IMAGE_UPLOAD_URL,
        form: {sortShow: 0},
        isShow: true,
        city: '',
        tableData: [],
        fileList: [],
        imageData: {},
        queryString: '',
        dialogFormVisible: false,
        dialogVisible: false,
        dialogImageUrl: '',
        loading: false,
        headers: { Authorization: 'Bearer {' + this.$store.state.token + '}' },
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
          categoryName: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { min: 2, message: '长度在2个字符以上', trigger: 'blur' }
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
        if (!this.$refs.upload.uploadFiles.length) {
          this.$message({
            showClose: true,
            type: 'warning',
            message: '请上传分类图！'
          })
          return
        }
        this.$refs[formName].validate((valid) => {
          const that = this
          if (valid) {
            that.form.isShow = that.isShow ? 1 : 0
            that.loading = true
            that.$axios.post(SITEURL.MERCHANT_CATEGORY_CREATE_URL, that.form).then(response => {
              that.loading = false
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
                that.imageData.id = response.data.data.id
                if (that.$refs.upload.uploadFiles.length > 1) {
                  that.$refs.upload.uploadFiles.splice(0, that.$refs.upload.uploadFiles.length - 1)
                }
                that.$refs.upload.submit()
              } else {
                this.$message.error('操作失败，' + response.data.message)
              }
            }).catch(error => {
              that.loading = false
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
      // 图片上传
      beforeImageUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 1

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 和 PNG格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 1MB!')
        }
        return isJPG && isLt2M
      },
      handlePicturePreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleRemoveCover (file, fileList) {
        this.$axios.post(SITEURL.MERCHANT_CATEGORY_IMAGE_DELETE_URL, {id: this.form.id}).then(response => {
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
          } else {
            this.$message.error('操作失败，' + response.data.message)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      handleUploadSuccess (response, file, fileList) {
        if (response.success) {
          this.$message.success('操作成功，' + response.message)
          this.$router.push({ path: '/setting/merchant/category/list' })
        } else {
          this.$message.error('操作失败，' + response.message)
        }
      }
    }
  }
</script>

<style scoped>
  .breadcrumb {
    margin: 20px 0 20px 0;
  }
  .ql-container .ql-editor {
    min-height: 20em;
    padding-bottom: 1em;
    max-height: 25em;
  }
  .category-create {
    display: block;
    width: 45%;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 24px;
    min-height: 455px;
    height: auto;
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
