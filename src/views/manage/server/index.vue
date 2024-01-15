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
      <el-table-column label="hostname" width="210">
        <template slot-scope="{row}">
          <a class="link-type" @click="onEdit(row)">{{ row.hostname }}</a>
        </template>
      </el-table-column>
      <el-table-column label="svn地址" align="center">
        <template slot-scope="{row}"  >
          <a class="link-type" @click="onEdit(row)">{{ row.webroot }}</a>
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
        <el-form-item label="hostname" prop="hostname">
          <el-input v-model="temp.hostname" />
        </el-form-item>
        <el-form-item label="svn地址" prop="webroot">
          <el-input v-model="temp.webroot" />
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
import { serverList, addServer, editServer, deleteServer } from '@/api/server'

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
        hostname: '',
        webroot: '',
      },
    }
  },
  created() {
    this.getServerList()
  },
  methods: {
    createData(){
      addServer(this.temp)
        .then(res => {
          if (res.code === 0) {
            this.dialogFormVisible = false
            this.getServerList()
          }
        })
    },
    updateData(){
      editServer(this.temp)
        .then(res => {
          if (res.code === 0) {
            this.dialogFormVisible = false
            this.getServerList()
          }
        })
    },
    getServerList() {
      this.listLoading = true
      serverList()
        .then(res => {
            if (res.code === 0) {
              this.list = res.data.items
              this.listLoading = false
            }
      })
    },
    onEdit(row) {
      this.resetTemp()
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
        hostname: '',
        webroot: '',
      }
    },
    handleDelete(server_id) {
      deleteServer(server_id)
        .then(res => {
          if (res.code === 0) {
            this.dialogFormVisible = false
            this.getServerList()
          }
        })
    },
  }
}
</script>


<style type="scss">

</style>
