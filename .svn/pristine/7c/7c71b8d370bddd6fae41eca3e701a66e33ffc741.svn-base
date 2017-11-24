<template>
  <div id="merchantlist" class="content">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>商家管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
        <el-breadcrumb-item>商家列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商家搜索">
          <el-radio class="radio" v-model="radio" label="0">全部</el-radio>
          <el-radio class="radio" v-model="radio" label="1">推荐</el-radio>
          <el-input class="inline-input" v-model="formInline.search" style="margin-left:12px" placeholder="手机号|商家名称|真实姓名|商家所在区域"></el-input>
        </el-form-item>     
        <el-form-item>
          <el-button type="primary" @click="onSearch()" icon="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="contentlist">
      <template>
        <el-table :data="tableData" stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection" v-loading="loading">
          <el-table-column type="expand">
            <template scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="日期">{{ props.row.createDate }}</el-form-item>
                <el-form-item label="商家联系人"><span>{{ props.row.contacts }}</span></el-form-item>
                <el-form-item label="联系电话"><span>{{ props.row.phoneNumber }}</span></el-form-item>
                <el-form-item label="浏览次数"><span>{{ props.row.browseNumber }}</span></el-form-item>
                <el-form-item label="关注人数"><span>{{ props.row.attentionNumber }}</span></el-form-item>
                <el-form-item label="商家星级"><span>{{ props.row.hotelRating }}</span></el-form-item>
                <el-form-item label="基础比例"><span>{{ props.row.scale }}</span></el-form-item>
                <el-form-item label="商家积分系数"><span>{{ props.row.scaleByMerchant }}</span></el-form-item>
                <el-form-item label="用户积分系数"><span>{{ props.row.scaleByUser }}</span></el-form-item>
                <el-form-item label="商家赠送用户积分比"><span>{{ props.row.merchantGiveUserPointScale }}</span></el-form-item>
                <el-form-item label="营业时间"><span>{{ props.row.businessHours }}</span></el-form-item>
                <el-form-item label="已到账"><span>{{ props.row.gathering }}</span></el-form-item>
                <el-form-item label="未到账"><span>{{ props.row.gathering_not_received }}</span></el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column prop="realName" label="真实姓名"></el-table-column>
          <el-table-column prop="companyName" label="商家名称"></el-table-column>
          <el-table-column prop="mobile" label="注册账号" width="130"></el-table-column>
          <el-table-column prop="phoneNumber" label="联系方式" width="130"></el-table-column>
          <el-table-column prop="categoryName" label="分类" width="70"></el-table-column>
          <el-table-column prop="tagName" label="商家标签" width="100"></el-table-column>
          <el-table-column prop="fullName" label="所在区域"></el-table-column>
          <el-table-column prop="addr" label="商家地址" width="200"></el-table-column>
          <el-table-column prop="coverImg" label="商家封面图" width="140">
            <template scope="scope">
              <img v-lazy="scope.row.coverImg" class="cover-img" @click="handlePictureCardPreview" />
            </template>
          </el-table-column>
          <el-table-column label="是否推荐" width="95">
             <template scope="scope">
              <i v-if="scope.row.isRecommend===true" class="el-icon-check"></i>
              <i v-if="scope.row.isRecommend===false" class="el-icon-minus"></i>            
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
          
            <template scope="scope">  
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="warning" @click="handleOffline(scope.$index, scope.row)">下线</el-button>
              <el-button size="small" type="danger" @click="handleDisable(scope.$index, scope.row)">停用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange"
       :current-page="currentPage"
       :page-size="pageSize"
       layout="total, prev, pager, next"
       :total="total">
      </el-pagination>
    </div>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" height="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import * as SITEURL from '@/store/app-urls'
  import { MERCHANT_INFO } from '@/store/mutation-types'
  export default {
    name: 'user',
    data () {
      return {
        formInline: {
          search: ''
        },
        tableData: [],
        currentPage: 1,
        pageSize: 1,
        total: 0,
        loading: false,
        dialogImageUrl: '',
        dialogVisible: false,
        radio: '0'
      }
    },
    created: function () {
      this.loading = true
      this.getMerchant()
    },
    methods: {
      getMerchant (page = 1) {
        this.$axios.get(SITEURL.MERCHANT_LIST + '/0?page=' + page + '&recommend=' + this.radio).then(response => {
          // get body data
          this.loading = false
          this.tableData = response.data.data.data
          this.currentPage = response.data.data.current_page
          this.pageSize = response.data.data.per_page
          this.total = response.data.data.total
        }).catch(error => {
          console.log(error)
        })
      },
      onSearch (page = 1) {
        var text = this.formInline.search.trim()
        this.loading = true
        if (!this.formInline.search) {
          this.getMerchant()
        } else {
          this.$axios.get(SITEURL.MERCHANT_SEARCH_URL + '?type=list&status=0&text=' + text + '&recommend=' + this.radio + '&page=' + page + '&limit=10')
            .then(response => {
              this.loading = false
              this.tableData = response.data.data.data
              this.pageSize = 10
              this.total = response.data.data.total
            }).catch(error => {
              console.log(error)
            })
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleEdit (index, row) {
        this.$store.commit(MERCHANT_INFO, row)
        this.$router.push({ path: '/merchant/edit' })
      },
      handleOffline (index, row) {
        this.$axios.post(SITEURL.MERCHANT_STATUS, {id: row.id, status: 1}).then(response => {
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
            this.tableData.splice(index, 1)
          } else {
            this.$message.error('操作失败，' + response.data.message)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      handleDisable (index, row) {
        this.$axios.post(SITEURL.MERCHANT_STATUS, {id: row.id, status: 2}).then(response => {
          if (response.data.success) {
            this.$message.success('操作成功，' + response.data.message)
            this.tableData.splice(index, 1)
          } else {
            this.$message.error('操作失败，' + response.data.message)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
        if (this.formInline.search) {
          this.onSearch(val)
        } else {
          this.getMerchant(val)
        }
      },
      handlePictureCardPreview (event) {
        this.dialogImageUrl = event.target.src
        this.dialogVisible = true
      }
    }
  }
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 0 !important;
  }
  .search {
    padding: 20px;
    background: #d3dce6;
  }
  .pagination {
    padding: 10px;
  }
  .cover-img {
    padding-top: 8px;
    width: 100px;
    height: 60px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 100px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 30%;
  }
  .inline-input {
    width: 300px;
  }
  .el-icon-check {
    color:#13ce66;
  }
  .el-icon-minus{
    color:#97a8be;
    font-size:16px;
  }
</style>
