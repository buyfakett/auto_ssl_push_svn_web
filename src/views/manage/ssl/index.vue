<template>
  <div class="app-container">
    <el-button type="primary" @click="onAdd" style="margin-bottom: 10px">新增</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="id" width="95">
        <template slot-scope="{row}">
          <a class="link-type" @click="onEdit(row)">{{ row.id }}</a>
        </template>
      </el-table-column>
      <el-table-column label="域名" width="210">
        <template slot-scope="{row}">
          <a class="link-type" @click="onEdit(row)">{{ row.certificate_domain }}</a>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{row}"  >
          <a class="link-type" @click="onEdit(row)">{{ row.register_time }}</a>
        </template>
      </el-table-column>
      <el-table-column label="到期时间" align="center">
        <template slot-scope="{row}"  >
          <a class="link-type" @click="onEdit(row)">{{ row.exp_time }}</a>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}"  >
          <a class="link-type" @click="onEdit(row)">{{ getStatusString(row.status) }}</a>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="210">
        <template slot-scope="{row}">
          <el-button type="primary" icon="el-icon-edit" @click="onEdit(row)">编辑</el-button>
          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDelete(row.id)"
            confirm-button-text='确认'
            cancel-button-text='取消'
            style="margin-left: 10px">
            <el-button type="danger" slot="reference" icon="el-icon-delete">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="主域名" prop="certificate_domain">
          <el-select
            v-model="appNameValue"
            filterable
            placeholder="请选择主域名"
            @change="fetchData(value,appNameValue)"
          >
            <el-option
              v-for="appNameItem in appNameList"
              :key="appNameItem.value"
              :label="appNameItem.label"
              :value="appNameItem.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="域名" prop="certificate_domain">
          <el-input v-model="temp.certificate_domain" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-input v-model="temp.status" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          关闭
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, addSsl, editSsl, deleteSsl } from '@/api/ssl'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger',
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      temp: {
        id: undefined,
        certificate_domain: '',
        register_time: '',
        exp_time: '',
        status: '',
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    createData(){
      addSsl(this.temp)
        .then(res => {
          if (res.code === 0) {
            this.dialogFormVisible = false
            this.listLoading = true
            getList().then(response => {
              this.list = response.data.items
              this.listLoading = false
            })
          }
        })
    },
    updateData(){
      console.log(this.temp)
      editSsl(this.temp)
        .then(res => {
          if (res.code === 0) {
            this.dialogFormVisible = false
            this.listLoading = true
            getList().then(response => {
              this.list = response.data.items
              this.listLoading = false
            })
          }
        })
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    getStatusString(status) {
      switch (status) {
        case 0:
          return '不进行续期';
        case 1:
          return '正常';
        case 2:
          return '新建/过期';
      }
    },
    onEdit(row) {
      console.log(row)
      this.temp = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
    },
    onAdd() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
    },
    // 清除数据
    resetTemp() {
      this.temp = {
        id: undefined,
        certificate_domain: '',
        register_time: '',
        exp_time: '',
        status: '',
      }
    },
    handleDelete(server_id) {
      console.log(server_id)
      deleteSsl(server_id)
        .then(res => {
          if (res.code === 0) {
            this.dialogFormVisible = false
            this.listLoading = true
            getList().then(response => {
              this.list = response.data.items
              this.listLoading = false
            })
          }
        })
    },
  }
}
</script>


<style type="scss">

</style>
