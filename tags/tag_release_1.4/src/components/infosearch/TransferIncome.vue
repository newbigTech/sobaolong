<template>
    <div class='content'>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>信息查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='search' @keyup.enter="onSearch">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
               <el-row>
                <el-col :span="18">
                    <el-form-item label="查询入口">
                        <el-input class="inline-input"  v-model='formInline.search' placeholder="输入您想查询的关键字"></el-input>
                    </el-form-item> 
                    <el-form-item label="从">
                        <el-date-picker v-model="formInline.fromDate" align="right" type="date" placeholder="选择起始日期" :picker-options="pickerOptions"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="到">
                        <el-date-picker v-model="formInline.toDate" align="right" type="date" placeholder="选择结束日期" :picker-options="pickerOptions"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSearch" icon="search">查询</el-button>
                    </el-form-item>
                </el-col>
              </el-row>
            </el-form>
        </div>
        <div class="userlist">
            <el-table  stripe border style="width: 100%" :height="$store.state.tableHeight" type="selection">
                <el-table-column  label="业务流水号" width="180"></el-table-column>
                <el-table-column  label="区域" width="180"></el-table-column>
                <el-table-column  label="日期"></el-table-column>
                <el-table-column  label="会员名称"></el-table-column>
                <el-table-column  label="摘要"></el-table-column>
                <el-table-column  label="收入金额"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination >
                </el-pagination>
            </div>
        </div>       
    </div>
</template>

<script>

</script>



<style scoped>
     .el-form-item {
        margin-bottom: 0 !important;
    }
    .breadcrumb {
        margin: 20px 0 20px 0;
    }
    .search {
        padding: 20px;
        background: #d3dce6;
    }
    .userlist {
        padding-top: 20px;
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
        width: 220px;
    }
    
</style>
