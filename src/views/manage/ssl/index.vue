<template>
  <div class="app-container">
    <el-button type="primary" @click="onAdd" style="margin-bottom: 10px">新增</el-button>
    <el-popconfirm
      title="确定刷新证书吗？"
      @confirm="refresh()"
      confirm-button-text="确认"
      cancel-button-text="取消"
      style="margin-left: 10px"
    >
      <el-button type="primary" slot="reference" style="margin-bottom: 10px" icon="el-icon-refresh">手动刷新所有证书</el-button>
    </el-popconfirm>
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
        <template slot-scope="{row}">
          <a class="link-type" @click="onEdit(row)">{{ row.register_time }}</a>
        </template>
      </el-table-column>
      <el-table-column label="到期时间" align="center">
        <template slot-scope="{row}">
          <a class="link-type" @click="onEdit(row)">{{ row.exp_time }}</a>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <el-tag :type="getStatusTagType(row.status)">{{ getStatusString(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="330">
        <template slot-scope="{row}">
          <el-button type="primary" icon="el-icon-edit" @click="onEdit(row)">编辑</el-button>
          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDelete(row.id)"
            confirm-button-text="确认"
            cancel-button-text="取消"
            style="margin-left: 10px"
          >
            <el-button type="danger" slot="reference" icon="el-icon-delete">删除</el-button>
          </el-popconfirm>
          <el-popconfirm
            title="确定刷新该条数据吗？"
            @confirm="single_refresh(row.id)"
            confirm-button-text="确认"
            cancel-button-text="取消"
            style="margin-left: 10px"
          >
            <el-button type="primary" slot="reference" icon="el-icon-refresh">刷新</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px"
               style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="主域名" prop="first_domain_id">
          <el-select
            v-model="domainValue"
            filterable
            placeholder="请选择主域名"
            @change="changeDomain(domainValue)"
          >
            <el-option
              v-for="domain in chooseDomainList"
              :key="domain.value"
              :label="domain.label"
              :value="domain.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="服务器" prop="certificate_domain">
          <el-select
            v-model="serverValue"
            multiple
            placeholder="请选择服务器"
            @change="changeServer(serverValue)"
          >
            <el-option
              v-for="server in chooseServerList"
              :key="server.value"
              :label="server.label"
              :value="server.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="域名" prop="certificate_domain">
          <el-input v-model="temp.certificate_domain"/>
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
import { addSsl, deleteSsl, editSsl, refreshSsl, sslList, singleRefreshSsl } from '@/api/ssl'
import { domainList } from '@/api/domain'
import { serverList } from '@/api/server'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
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
        first_domain_id: undefined,
        server_ids: [],
        certificate_domain: '',
      },
      domainValue: '',
      serverValue: '',
      chooseDomainList: [],
      chooseServerList: [],
      serverData: [],
      domainData: []
    }
  },
  created() {
    this.getSslList()
  },
  methods: {
    refresh(){
      this.listLoading = true
      refreshSsl()
        .then(res => {
          if (res.code === 0) {
            this.listLoading = false
            this.getSslList()
          }
        })
    },
    single_refresh(ssl_id){
      this.listLoading = true
      singleRefreshSsl(ssl_id)
        .then(res => {
          if (res.code === 0) {
            this.listLoading = false
            this.getSslList()
          }
        })
    },
    async getDomainList() {
      await domainList()
        .then(res => {
          if (res.code === 0) {
            this.domainData = res.data.items
          }
        })
    },
    async getServerList() {
      await serverList()
        .then(res => {
          if (res.code === 0) {
            this.serverData = res.data.items
          }
        })
    },
    getSslList() {
      this.listLoading = true
      sslList()
        .then(res => {
          if (res.code === 0) {
            this.list = res.data.items
            this.listLoading = false
          }
        })
    },
    createData() {
      addSsl(this.temp)
        .then(res => {
          if (res.code === 0) {
            this.dialogFormVisible = false
            this.getSslList()
          }
        })
    },
    changeDomain(first_domain_id) {
      this.temp.first_domain_id = first_domain_id
    },
    changeServer(server_ids) {
      this.temp.server_ids = server_ids
    },
    updateData() {
      editSsl(this.temp)
        .then(res => {
          if (res.code === 0) {
            this.dialogFormVisible = false
            this.getSslList()
          }
        })
    },
    getStatusString(status) {
      switch (status) {
        case 0:
          return '不进行续期'
        case 1:
          return '正常'
        case 2:
          return '新建/过期'
      }
    },
    getStatusTagType(status) {
      switch (status) {
        case 0:
          return 'info'
        case 1:
          return 'success'
        case 2:
          return 'warning'
      }
    },
    async onEdit(row) {
      await this.getFromData()
      this.temp = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
    },
    async onAdd() {
      await this.getFromData()
      this.resetTemp()
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
    },
    async getFromData(){
      await this.getDomainList()
      await this.getServerList()
      this.chooseServerList = []
      this.chooseDomainList = []
      this.domainValue = undefined
      this.serverValue = []
      for (var domain in this.domainData) {
        this.chooseDomainList.push({
          value: this.domainData[domain]['id'],
          label: this.domainData[domain]['domain'],
        })
      }
      for (var server in this.serverData) {
        this.chooseServerList.push({
          value: this.serverData[server]['id'],
          label: this.serverData[server]['hostname']
        })
      }
    },
    // 清除数据
    resetTemp() {
      this.temp = {
        id: undefined,
        first_domain_id: undefined,
        server_ids: [],
        certificate_domain: '',
      }
    },
    handleDelete(server_id) {
      deleteSsl(server_id)
        .then(res => {
          if (res.code === 0) {
            this.dialogFormVisible = false
            this.getSslList()
          }
        })
    }
  }
}
</script>


<style type="scss">

</style>
