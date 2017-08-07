<template>
  <div id="app">
    <el-alert id='tip' :title="tip_msg" type="error" show-icon v-if="isTip" v-on:close="closeAlert"></el-alert>
    <div class="logo_bg">
      <div class="login_logo">
      </div>
    </div>


      <div class="nav_bg">
        <input class='main_btn' type="button">首页</input>
      </div>

  </div>
</template>

<script>
import App from './../App.vue'
import reques from './../request/Request.vue'
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Santa Fe个人健康信息及护理决策AI系统',
      didClicked:false,
      namefoucs:false,
      passwordfoucs:false,
      content_name:"",
      content_pwd:"",
      isTip:false,
      tip_msg:""
    }
  },
  props: {

  },
  methods: {

  }
}
</script>

<style scoped src='./../../static/css/main.css'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #eee;
  margin:0 auto;
  text-align: center;
}

h1, h2 {
  font-weight: normal;
}

.login .form_box .name {
  width:250px;height:38px;border:1px solid #ddd;background: #fff;border-radius:4px;padding-left:50px;line-height:38px;
  border-color: #0082dd;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#tip {
  text-align: center;
}

.user_icon {background:url(./../../static/img/icon3.png) no-repeat;}
.password_icon {background:url(./../../static/img/icon.png) no-repeat;}
.login .user_input .user_icon.active {background:url(./../../static/img/icon4.png) no-repeat;}
.login .password_input .password_icon.active {background:url(./../../static/img/icon2.png) no-repeat;}

/*.login_logo{width:1200px;height:88px;margin:0 auto;background:#fff url(./../../static/img/indexlogo.png) 0 center no-repeat;}
.login {width:100%;height:480px;margin:0px auto 0;background:url(./../static/img/loginimg.png) ;background-size:100% 100%;}*/
</style>
