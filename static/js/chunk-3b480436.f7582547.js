(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b480436"],{"0edd":function(e,s,t){},9224:function(e){e.exports=JSON.parse('{"name":"auto_ssl_push_svn_web","version":"1.4.1","description":"","author":"buyfakett <buyfakett@vip.qq.com>","scripts":{"dev":"vue-cli-service serve","build":"vue-cli-service build","build:prod":"vue-cli-service build","build:stage":"vue-cli-service build --mode staging","preview":"node build/index.js --preview","svgo":"svgo -f src/icons/svg --config=src/icons/svgo.yml","test:unit":"jest --clearCache && vue-cli-service test:unit","test:ci":"npm run lint && npm run test:unit"},"dependencies":{"axios":"0.18.1","core-js":"3.6.5","element-ui":"2.15.14","js-cookie":"2.2.0","normalize.css":"7.0.0","nprogress":"0.2.0","path-to-regexp":"2.4.0","vue":"2.6.10","vue-router":"3.0.6","vuex":"3.1.0"},"devDependencies":{"@vue/cli-plugin-babel":"4.4.4","@vue/cli-plugin-unit-jest":"4.4.4","@vue/cli-service":"4.4.4","@vue/test-utils":"1.0.0-beta.29","autoprefixer":"9.5.1","babel-jest":"23.6.0","babel-plugin-dynamic-import-node":"2.3.3","chalk":"2.4.2","connect":"3.6.6","html-webpack-plugin":"3.2.0","mockjs":"1.0.1-beta3","runjs":"4.3.2","sass":"1.26.8","sass-loader":"8.0.2","script-ext-html-webpack-plugin":"2.1.3","serve-static":"1.13.2","svg-sprite-loader":"4.1.3","svgo":"1.2.2","vue-template-compiler":"2.6.10"},"browserslist":["> 1%","last 2 versions"],"engines":{"node":">=8.9","npm":">= 3.0.0"},"license":"MIT"}')},"9ed6":function(e,s,t){"use strict";t.r(s);var n=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"login-container"},[t("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,"auto-complete":"on","label-position":"left"}},[t("div",{staticClass:"title-container"},[t("h3",{staticClass:"title"},[e._v("登录")])]),t("el-form-item",{attrs:{prop:"username"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"user"}})],1),t("el-input",{ref:"username",attrs:{placeholder:"请输入账号",name:"Username",type:"text",tabindex:"1","auto-complete":"on"},model:{value:e.loginForm.user,callback:function(s){e.$set(e.loginForm,"user",s)},expression:"loginForm.user"}})],1),t("el-form-item",{attrs:{prop:"password"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"password"}})],1),t("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,placeholder:"请输入密码",name:"password",tabindex:"2","auto-complete":"on"},nativeOn:{keyup:function(s){return!s.type.indexOf("key")&&e._k(s.keyCode,"enter",13,s.key,"Enter")?null:e.handleLogin(s)}},model:{value:e.loginForm.password,callback:function(s){e.$set(e.loginForm,"password",s)},expression:"loginForm.password"}}),t("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[t("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1),t("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(s){return s.preventDefault(),e.handleLogin(e.loginForm)}}},[e._v("登录 ")]),t("div",{staticClass:"tips"},[t("span",{staticStyle:{"margin-right":"20px"}},[e._v("默认账号：admin")]),t("span",[e._v(" 默认密码：admin123456")])])],1)],1)},i=[],o=t("61f7"),r=t("c24f"),a=t("5f87"),c=t("b775");function l(){return Object(c["a"])({url:"/getServerVersion",method:"get"})}var u={name:"Login",data:function(){var e=function(e,s,t){Object(o["b"])(s)?t():t(new Error("请输入正确的用户名"))},s=function(e,s,t){s.length<6?t(new Error("密码不能少于6位")):t()};return{loginForm:{user:"",password:""},loginRules:{user:[{required:!0,trigger:"blur",validator:e}],password:[{required:!0,trigger:"blur",validator:s}]},loading:!1,passwordType:"password",redirect:void 0}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},methods:{showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){e.$refs.password.focus()}))},handleLogin:function(){var e=this;this.$refs.loginForm.validate((function(s){s&&Object(r["b"])(e.loginForm).then((function(s){if(0===s.code){Object(a["c"])(s.data.token),e.$router.push({path:e.redirect||"/"});var n=t("9224").version;console.log("当前前端版本号: V".concat(n)),l().then((function(e){0===e.code&&console.log("当前服务端版本为: V".concat(e.data.version))})).catch((function(e){console.error("获取服务端版本失败:",e)}))}}))}))}}},d=u,p=(t("ebfe"),t("fdda"),t("2877")),v=Object(p["a"])(d,n,i,!1,null,"67cc61e2",null);s["default"]=v.exports},a3c7:function(e,s,t){},ebfe:function(e,s,t){"use strict";t("a3c7")},fdda:function(e,s,t){"use strict";t("0edd")}}]);