<template>
  <div class="app-container">
    <el-button type="primary" @click="onAdd" style="margin-bottom: 10px">新增</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
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
          <a class="link-type" @click="onEdit(row)">{{ row.domain }}</a>
        </template>
      </el-table-column>
      <el-table-column label="厂商" align="center">
        <template slot-scope="{row}"  >
          <a class="link-type" @click="onEdit(row)">{{ row.domain_manufacturer }}</a>
        </template>
      </el-table-column>
      <el-table-column label="key" align="center">
        <template slot-scope="{row}"  >
          <a class="link-type" @click="onEdit(row)">{{ row.domain_account_key }}</a>
        </template>
      </el-table-column>
      <el-table-column label="secret" align="center">
        <template slot-scope="{row}"  >
          <a class="link-type" @click="onEdit(row)">{{ row.domain_account_secret }}</a>
        </template>
      </el-table-column>
      <el-table-column label="是否假删除" align="center">
        <template slot-scope="{row}"  >
          <el-switch
            v-model="row.is_delete"
            active-color="#13ce66"
            inactive-color="#ff4949"
            disabled>
          </el-switch>
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
        <el-form-item label="域名" prop="domain">
          <el-input v-model="temp.domain" />
        </el-form-item>
        <el-form-item label="厂商" prop="domain_manufacturer">
          <el-input v-model="temp.domain_manufacturer" />
        </el-form-item>
        <el-form-item label="key" prop="domain_account_key">
          <el-input v-model="temp.domain_account_key" />
        </el-form-item>
        <el-form-item label="secret" prop="domain_account_secret">
          <el-input v-model="temp.domain_account_secret" />
        </el-form-item>
        <el-form-item label="是否假删除" prop="is_delete">
          <el-switch
            v-model="temp.is_delete"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
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
import { domainList, addDomain, editDomain, deleteDomain } from '@/api/domain'

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
        domain: '',
        domain_manufacturer: '',
        domain_account_key: '',
        domain_account_secret: '',
        is_delete: false,
      },
    }
  },
  created() {
    this.getDomainList()
  },
  methods: {
    createData(){
      addDomain(this.temp)
        .then(res => {
          if (res.code === 0) {
            this.dialogFormVisible = false
            this.getDomainList()
          }
        })
    },
    updateData(){
      editDomain(this.temp)
        .then(res => {
          if (res.code === 0) {
            this.dialogFormVisible = false
            this.getDomainList()
          }
        })
    },
    getDomainList() {
      this.listLoading = true
      domainList()
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
        domain: '',
        domain_manufacturer: '',
        domain_account_key: '',
        domain_account_secret: '',
        is_delete: false,
      }
    },
    handleDelete(domain_id) {
      deleteDomain(domain_id)
        .then(res => {
          if (res.code === 0) {
            this.dialogFormVisible = false
            this.getDomainList()
          }
        })
    },
  }
}
</script>


<style type="scss">

</style>
