<template>
  <div id="app">
    <el-alert id='tip' :title="tip_msg" type="error" show-icon v-if="isTip" v-on:close="closeAlert"></el-alert>
    <div class="logo_bg">
      <div class="login_logo">
      </div>
    </div>
    <div class="login">
        <div class="box1">
        		<div class = "login-massage">
        			乐活&nbsp;·&nbsp;乐智能&nbsp;·&nbsp;乐健康
        		</div>
    	    <div class="form_box">
    	        <div class="login_form">
    	        		<p > 欢迎登陆Santa Fe平台</p>
    	        		<form autocomplete="off" >
    	            <div class="input_fill user_input">
    	                <!--<label>用户名</label><br />-->
    	                <input type="text" placeholder="请输入用户名" name="text" autocomplete="off" v-on:focus="nameFoucs" v-on:blur="nameBlur" v-bind:class="{'active':namefoucs}" v-model="content_name">
    	                <span class="user_icon" v-bind:class="{'active':namefoucs}"></span>
    	            </div>
    	            <div class="input_fill password_input">
    	                <!--<label>密码</label><br />-->
    	                <input type="password" placeholder="请输入密码" name="password" autocomplete="off"  v-on:focus="passwordFoucs" v-on:blur="passwordBlur" v-bind:class="{'active':passwordfoucs}" v-model="content_pwd"/>
    	                <span class="password_icon" v-bind:class="{'active':passwordfoucs}"></span>
    	            </div>
    	            </form>
    	            <div>
    	                <input type="button" v-on:mousedown='loginBtnDidClicked' v-on:mouseup='loginBtnDidMouseup' v-on:mouseout='loginBtnDidMouseout' v-bind:class="{'selected' : didClicked}" value="登录" />
    	            </div>
    	        </div>
    	        <div class="login_mask"></div>
    	    </div>
    	    <div class="QR_code">
    	    		<img src="./../../static/img/QR_code.png"/>
    	    		<p> 扫描添加</p>
    	    		<p>意见反馈界面</p>
    	    </div>
        </div>
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
      // 方便登录
      // this.content_name = '18600036466';
      // this.content_pwd = '123456';
      this.$router.push({path:'/detail/maincontent/watch',query:{fields:'sbp',page:1}});
      this.didClicked = true;
      var that = this;
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
            // this.$message({
            //   message:'登录成功',
            //   type:'success',
            //   onClose:function(sender) {
            //
            //   }
            // });
            // 路由
            that.$router.push({path:'/detail/maincontent/watch',query:{fields:'sbp',page:1}});
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
  background: #eee;
  margin:0 auto;
}

.logo_bg {
  background: #fff;
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
