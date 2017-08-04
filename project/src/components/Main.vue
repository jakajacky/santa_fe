<template>
  <div id="app">
    <el-alert id='tip' :title="tip_msg" type="error" show-icon v-if="isTip" v-on:close="closeAlert"></el-alert>
    <div class="login_logo">

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
    // 登录
    loginBtnDidClicked:function() {
      console.log('name:'+this.content_name+'\n'+'password:'+this.content_pwd);
      this.didClicked = true;
      this.$router.push({path:'/detail/'});
      let data = {
                user_id: this.content_name,
                fields: this.content_pwd
            }
      reques.fetch('/energon-new/web/research/partnerlogin', data)
        .then(res => {
          console.log('success:'+res);
          if (res.code != 10000) {
            this.$message({
              message:res.msg,
              type:'warning'
            });
          }
          else {
            this.$message({
              message:'登录成功',
              type:'success'
            });
            // 路由
            this.$router.push({path:'/detail/'});
          }
        })
        .catch(error => {
          console.log('fail:'+error);
          this.$message({
            message:error.message,
            type:'error'
          });
        })

    },
    closeAlert:function() {
      console.log('closeAlert');
      this.isTip = false;
    },
    loginBtnDidMouseup:function() {
      console.log('mouseup');
      this.didClicked = false
    },
    loginBtnDidMouseout:function() {
      console.log('mouseout');
      this.didClicked = false;
    },
    //获得焦点
    nameFoucs:function() {
      console.log('foucs');
      this.namefoucs = true;
    },
    //失去焦点
    nameBlur:function() {
      this.namefoucs = false;
      if (!this.checkPhone(this.content_name)) {
        this.isTip = true;
        this.tip_msg = '手机号码有误，请重新填写';
      }
      else {
        this.isTip = false;
      }
    },
    // 密码框获得焦点
    passwordFoucs:function() {
      this.passwordfoucs = true;
    },
    // 密码框失去焦点
    passwordBlur:function() {
      this.passwordfoucs = false;
    },
    // 验证手机号
    checkPhone:function(content){
      // var phone = document.getElementById('phone').value;
      if(!(/^1[34578]\d{9}$/.test(content))) {
        return false;
      }
      else {
        return true;
      }
}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #fff;
  margin:0 auto;


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
