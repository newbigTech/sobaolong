<template>
  <div id="merchant-audit" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>平台设置</el-breadcrumb-item>
        <el-breadcrumb-item>扣点模式</el-breadcrumb-item>
        <el-breadcrumb-item>模式列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" @click="addScale" icon="caret-right">新建模式</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="contentlist">
      <template>
        <el-table :data="tableData" stripe border style="width: 100%" :height="750" type="selection" v-loading="loading">
          <el-table-column prop="scale" label="基础比例"></el-table-column>
          <el-table-column prop="scaleByMerchant" label="商家积分系数"></el-table-column>
          <el-table-column prop="scaleByUser" label="用户积分系数"></el-table-column>
          <el-table-column prop="scaleDescribe" label="模式描述"></el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="success" @click="handleShow(scope.$index, scope.row)" v-if="scope.row.isShow==0">显示</el-button>
              <el-button size="small" type="danger" @click="handleShow(scope.$index, scope.row)" v-if="scope.row.isShow==1">不显示</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <el-dialog title="模式修改" v-model="dialogFormVisible" @close="closeEditDialog" size="tiny">
      <el-form :model="form" ref="scaleForm" :rules="rules" class="scale-edit" v-loading="editLoading">
        <el-form-item label="基础比例" :label-width="formLabelWidth" prop="name">
          <el-input v-model.number="form.scale" placeholder="请填写标签名称"></el-input>
        </el-form-item>
        <el-form-item label="商家积分系数" :label-width="formLabelWidth" prop="display_name">
          <el-input v-model.number="form.scaleByMerchant"></el-input>
        </el-form-item>
        <el-form-item label="用户积分系数" :label-width="formLabelWidth">
          <el-input v-model.number="form.scaleByUser"></el-input>
        </el-form-item>
        <el-form-item label="模式描述" :label-width="formLabelWidth">
          <el-input v-model="form.scaleDescribe"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="info" icon="circle-check" @click="onSubmit('scaleForm')" style="width: 150px;">提 交</el-button>
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
        formInline: {
          search: ''
        },
        form: {
          id: '',
          scale: '',
          scaleByMerchant: '',
          scaleByUser: '',
          scaleDescribe: ''
        },
        tableData: [],
        formLabelWidth: '100px',
        loading: false,
        visible2: false,
        dialogFormVisible: false,
        tableDataIndex: 0,
        editLoading: false,
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
      this.loading = true
      this.getScale()
    },
    methods: {
      getScale () {
        this.$axios.get(SITEURL.MERCHANT_SCALE_LIST).then(response => {
          // get body data
          this.loading = false
          this.tableData = response.data.data
        }).catch(error => {
          console.log(error)
        })
      },
      addScale () {
        this.$router.push({ path: '/setting/scale/create' })
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
        this.getMerchant(val)
      },
      handleShow (index, row) {
        this.$axios.post(SITEURL.MERCHANT_SCALE_SHOW, {id: row.id, isShow: row.isShow}).then(response => {
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
            row.isShow = row.isShow === 1 ? 0 : 1
//            this.tableData.splice(index, 1)
          } else {
            this.$message.error('操作失败，' + response.data.message)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      closeEditDialog () {
        this.form = {
          id: '',
          scale: '',
          scaleByMerchant: '',
          scaleByUser: '',
          scaleDescribe: ''
        }
      },
      handleEdit (index, row) {
        this.tableDataIndex = index
        this.form.id = row.id
        this.form.scale = row.scale
        this.form.scaleByMerchant = row.scaleByMerchant
        this.form.scaleByUser = row.scaleByUser
        this.form.scaleDescribe = row.scaleDescribe
        this.dialogFormVisible = true
      },
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          const that = this
          if (valid) {
            that.editLoading = true
            that.$axios.post(SITEURL.MERCHANT_SCALE_EDIT, that.form).then(response => {
              that.editLoading = false
              if (response.data.success) {
                this.$message.success('操作成功，' + response.data.message)
                that.tableData[that.tableDataIndex].id = response.data.data.id
                that.tableData[that.tableDataIndex].scale = response.data.data.scale
                that.tableData[that.tableDataIndex].scaleByMerchant = response.data.data.scaleByMerchant
                that.tableData[that.tableDataIndex].scaleByUser = response.data.data.scaleByUser
                that.tableData[that.tableDataIndex].scaleDescribe = response.data.data.scaleDescribe
              } else {
                this.$message.error('操作失败，' + response.data.message)
              }
              that.dialogFormVisible = false
            }).catch(error => {
              console.log(error)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 0 !important;
  }
  .search {
    padding: 10px 20px 10px 20px;
    background: #d3dce6;
  }
  .pagination {
    padding: 10px;
  }
  .inline-input {
    width: 220px;
  }
  .scale-edit .el-form-item {
    margin: 20px
  }
</style>
