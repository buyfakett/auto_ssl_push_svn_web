(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4fea6c0e"],{aa22:function(t,e,n){"use strict";n.d(e,"d",(function(){return o})),n.d(e,"a",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"b",(function(){return l}));var i=n("b775");function o(t){return Object(i["a"])({url:"/server/list",method:"get",params:t})}function a(t){return Object(i["a"])({url:"/server/add",method:"put",data:t})}function r(t){return Object(i["a"])({url:"/server/edit",method:"post",data:t})}function l(t){return Object(i["a"])({url:"/server/delete/".concat(t),method:"delete"})}},ad9f:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"primary"},on:{click:t.onAdd}},[t._v("新增")]),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,"element-loading-text":"拼命加载中",border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",label:"id",width:"95"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("a",{staticClass:"link-type",on:{click:function(e){return t.onEdit(i)}}},[t._v(t._s(i.id))])]}}])}),n("el-table-column",{attrs:{label:"hostname",width:"210"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("a",{staticClass:"link-type",on:{click:function(e){return t.onEdit(i)}}},[t._v(t._s(i.hostname))])]}}])}),n("el-table-column",{attrs:{label:"svn地址",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("a",{staticClass:"link-type",on:{click:function(e){return t.onEdit(i)}}},[t._v(t._s(i.webroot))])]}}])}),n("el-table-column",{attrs:{label:"操作",align:"center",width:"210"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row;return[n("el-button",{attrs:{type:"primary",icon:"el-icon-edit"},on:{click:function(e){return t.onEdit(i)}}},[t._v("编辑")]),n("el-popconfirm",{staticStyle:{"margin-left":"10px"},attrs:{title:"确定删除吗？","confirm-button-text":"确认","cancel-button-text":"取消"},on:{confirm:function(e){return t.handleDelete(i.id)}}},[n("el-button",{attrs:{slot:"reference",type:"danger",icon:"el-icon-delete"},slot:"reference"},[t._v("删除")])],1)]}}])})],1),n("el-dialog",{attrs:{"close-on-click-modal":!1,title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[n("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{model:t.temp,"label-position":"left","label-width":"100px"}},[n("el-form-item",{attrs:{label:"hostname",prop:"hostname"}},[n("el-input",{model:{value:t.temp.hostname,callback:function(e){t.$set(t.temp,"hostname",e)},expression:"temp.hostname"}})],1),n("el-form-item",{attrs:{label:"svn地址",prop:"webroot"}},[n("el-input",{model:{value:t.temp.webroot,callback:function(e){t.$set(t.temp,"webroot",e)},expression:"temp.webroot"}})],1)],1),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v(" 关闭 ")]),n("el-button",{attrs:{type:"primary"},on:{click:function(e){"create"===t.dialogStatus?t.createData():t.updateData()}}},[t._v(" 确认 ")])],1)],1)],1)},o=[],a=n("aa22"),r={filters:{statusFilter:function(t){var e={published:"success",draft:"gray",deleted:"danger"};return e[t]}},data:function(){return{list:null,listLoading:!0,dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"新增"},temp:{id:void 0,hostname:"",webroot:""}}},created:function(){this.getServerList()},methods:{createData:function(){var t=this;Object(a["a"])(this.temp).then((function(e){0===e.code&&(t.dialogFormVisible=!1,t.getServerList())}))},updateData:function(){var t=this;Object(a["c"])(this.temp).then((function(e){0===e.code&&(t.dialogFormVisible=!1,t.getServerList())}))},getServerList:function(){var t=this;this.listLoading=!0,Object(a["d"])().then((function(e){0===e.code&&(t.list=e.data.items,t.listLoading=!1)}))},onEdit:function(t){this.resetTemp(),this.temp=Object.assign({},t),this.dialogFormVisible=!0,this.dialogStatus="update"},onAdd:function(){this.resetTemp(),this.dialogFormVisible=!0,this.dialogStatus="create"},resetTemp:function(){this.temp={id:void 0,hostname:"",webroot:""}},handleDelete:function(t){var e=this;Object(a["b"])(t).then((function(t){0===t.code&&(e.dialogFormVisible=!1,e.getServerList())}))}}},l=r,s=n("2877"),c=Object(s["a"])(l,i,o,!1,null,null,null);e["default"]=c.exports}}]);