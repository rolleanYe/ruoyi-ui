<template>
  <div class="app-container">
    <el-form  ref="queryForm" :model="queryForm"  label-width="68px">
      <el-form-item label="时间">
        <el-date-picker
          v-model="queryForm.dateRangeExt"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="list.slice((pageNum-1)*pageSize,pageNum*pageSize)"
      style="width: 100%"
    >
      <el-table-column label="序号" type="index" align="center">
        <template slot-scope="scope">
          <span>{{(pageNum - 1) * pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="主键ID" align="center" prop="performanceId" :show-overflow-tooltip="true" />
      <el-table-column label="绩效名称" align="center" prop="performanceName" :show-overflow-tooltip="true" />
      <el-table-column label="创建者" align="center" prop="createBy" :show-overflow-tooltip="true" />
      <el-table-column label="创建时间" align="center" prop="createTime" :show-overflow-tooltip="true" />
      <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" />
  </div>
</template>

<script>
  import { listPerformance } from "@/api/jobs/performance/performance";
  // import { list, forceLogout } from "@/api/monitor/online";

  export default {
    name: "Performance",
    data(){
      return{
        loading: true,
        total: 0,
        list: [],
        pageNum: 1,
        pageSize: 10,
        queryForm:{
          dateRangeExt: [],
        },
        queryParams: {
          ipaddr: undefined,
          userName: undefined
        }
      };
    },
    created() {
      this.handleQuery();
    },
    methods:{
      handleQuery(){
        this.loading = true;

        // list(this.queryParams).then(response => {
        //
        //   alert(response.total);
        //
        //   this.loading = false;
        // });

        listPerformance().then(response => {
          this.list = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      },
      resetQuery() {
        this.queryForm.dateRangeExt = [];
        this.resetForm("queryForm");

      },
    }
  }
</script>
