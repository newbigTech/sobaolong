<template>
  <div id="merchantaudit" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>夺宝设置</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" @click="addCategory" icon="caret-right">新增分类</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="contentlist">
      <template>
        <el-table :data="tableData" stripe border style="width: 100%" height="830" type="selection" v-loading="loading">
          <el-table-column prop="sortShow" label="排序号" width="80"></el-table-column>
          <el-table-column prop="categoryName" label="分类名称"></el-table-column>
          <el-table-column prop="introduction" label="分类介绍"></el-table-column>
          <el-table-column prop="image" label="分类图" width="260">
            <template scope="scope">
              <img :src="scope.row.image" class="cover-img" @click="handlePictureCardPreview" />
            </template>
          </el-table-column>
          <el-table-column prop="isShow" label="是否展示" width="120">
            <template scope="scope">
              <el-switch on-color="#13ce66" off-color="#f7ba2a" on-text="是" off-text="否" v-model="scope.row.isShow" @change="handleShow(scope.$index, scope.row)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" height="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <el-dialog title="商家分类修改" v-model="dialogFormVisible" @close="closeEditDialog">
      <el-form :model="form" ref="mcategoryForm" :rules="rules" class="category-edit" v-loading="editLoading">
        <el-form-item label="分类名称" :label-width="formLabelWidth" prop="categoryName">
          <el-input v-model="form.categoryName" placeholder="请填写分类名称"></el-input>
        </el-form-item>
        <el-form-item label="分类介绍" :label-width="formLabelWidth">
          <el-input v-model="form.introduction" placeholder="请填写分类介绍"></el-input>
        </el-form-item>
        <el-form-item label="排序号" :label-width="formLabelWidth">
          <el-input-number v-model="form.sortShow" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="分类图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            ref="upload"
            list-type="picture-card"
            :headers="headers"
            :action="iconImageUrl"
            :data="{id: form.id}"
            :file-list="[{url: form.image}]"
            :on-success="handleUploadSuccess"
            :on-remove="handleRemoveCover"
            :before-upload="beforeImageUpload">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" icon="circle-check" @click="onSubmit('mcategoryForm')" style="width: 150px;">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  export default {
    name: 'user',
    data () {
      return {
        form: {
          id: 0,
          categoryName: '',
          introduction: '',
          sortShow: 0,
          image: ''
        },
        tableData: [],
        tableDataIndex: 0,
        loading: true,
        editLoading: false,
        iconImageUrl: SITEURL.SNATCH_CATEGORY_IMAGE_UPLOAD,
        dialogImageUrl: '',
        dialogVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '100px',
        headers: { Authorization: 'Bearer {' + this.$store.state.token + '}' },
        rules: {
          categoryName: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { min: 2, message: '长度在2个字符以上', trigger: 'blur' }
          ]
        }

      }
    },
    created: function () {
      // GET /someUrl
      this.$axios.get(SITEURL.SNATCH_CATEGORY_LIST).then(response => {
        // get body data
        this.loading = false
        this.tableData = response.data.data
      }, response => {
        // error callback
      })
    },
    methods: {
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
          that.editLoading = true
          if (valid) {
            that.$axios.post(SITEURL.SNATCH_CATEGORY_EDIT, that.form).then(response => {
              that.editLoading = false
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
                that.tableData[that.tableDataIndex].id = response.data.data.id
                that.tableData[that.tableDataIndex].categoryName = response.data.data.categoryName
                that.tableData[that.tableDataIndex].introduction = response.data.data.introduction
                that.tableData[that.tableDataIndex].sortShow = response.data.data.sortShow
                that.tableData[that.tableDataIndex].image = response.data.data.image
              } else {
                this.$message.error('操作失败，' + response.data.message)
              }
              that.dialogFormVisible = false
            }, response => {
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      addCategory () {
        this.$router.push({ path: '/snatch/category/create' })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleEdit (index, row) {
        this.tableDataIndex = index
        this.form.id = row.id
        this.form.categoryName = row.categoryName
        this.form.introduction = row.introduction
        this.form.sortShow = row.sortShow
        this.form.image = row.image
        this.dialogFormVisible = true
      },
      handleShow (index, row) {
        this.$axios.post(SITEURL.SNATCH_CATEGORY_SHOW, {id: row.id, isShow: row.isShow}).then(response => {
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
          } else {
            this.$message.error('操作失败，' + response.data.message)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      handlePictureCardPreview (event) {
        this.dialogImageUrl = event.target.src
        this.dialogVisible = true
      },
      handleRemoveCover (file, fileList) {
        this.$axios.post(SITEURL.SNATCH_CATEGORY_IMAGE_DELETE, {id: this.form.id}).then(response => {
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
        if (fileList.length > 1) {
          fileList.splice(0, 1)
        }
        if (response.success) {
          this.$message.success('操作成功，' + response.message)
          fileList = [{url: response.data.image}]
          this.form.id = response.data.id
          this.form.image = response.data.image
        } else {
          this.$message.error('操作失败，' + response.message)
        }
      },
      beforeImageUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      closeEditDialog () {
        this.form = {
          categoryName: '',
          introduction: '',
          sortShow: '',
          image: ''
        }
      }
    }
  }
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 0 !important;
  }
  .breadcrumb {
    margin: 20px 0 20px 0;
  }
  .search {
    padding: 10px 20px 10px 20px;
    background: #d3dce6;
  }
  .userlist {
    padding-top: 20px;
  }

  .cover-img {
    padding-top: 8px;
    width: 230px;
    height: 60px;
  }

  .category-edit {
    display: block;
    /*width: 45%;*/
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 24px;
  }

  .category-edit .el-form-item {
    margin: 20px
  }

  .dialog-footer {
    text-align: center;
  }
</style>
