<template>
  <div id="app_">
    <el-alert id='tip' :title="tip_msg" type="error" show-icon v-if="isTip" v-on:close="closeAlert"></el-alert>
    <div class="logo_bg">
      <div class="login_logo">
      </div>
    </div>
    <div class="margin"></div>
    <div class="nav_bg">
      <input class='main_btn' type="button" value="首页" v-on:click="main_btnDidClicked" v-bind:class="{'active':main_btn_active}"></input><input class='userManager_btn' type="button" value="用户管理" v-on:click="user_btnDidClicked" v-bind:class="{'active':user_btn_active}"></input>
      <el-dropdown class="el-dropdown-class" menu-align="start" @command="dropdown_handleCommand">
        <span class="el-dropdown-link">
          悦享趋势<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu class="el-dropdown-menu-class" slot="dropdown">
          <el-dropdown-item class="el-dropdown-item-class" command="退出登录">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="margin-1"> </div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import App from './../App.vue'
import reques from './../request/Request.vue'
import echarts from 'echarts'
import axios from 'axios'
import Tooltip from './Tooltip.vue'

export default {
  name: 'app_',
  data () {
    return {
      msg: 'Santa Fe个人健康信息及护理决策AI系统',
      didClicked:false,
      namefoucs:false,
      passwordfoucs:false,
      content_name:"",
      content_pwd:"",
      isTip:false,
      tip_msg:"",
      main_btn_active:true,
      user_btn_active:false,
      watch_btn_active:true,
      linto_btn_active:false,
      watch_bloodp_btn_active:true,
      watch_heartshake_btn_active:false,
      watch_pwv_btn_active:false,
      watch_heartrate_btn_active:false,
      linto_bloodp_btn_active:true,
      linto_bloodo_btn_active:false,
      linto_heartshake_btn_active:false,
      linto_heartrate_btn_active:false,
      linto_temp_btn_active:false,
      currentPage1:1,
      alluser:'',
      alldata:'',
      weekadduser:'',
      weekadddata:'',
      age_total_num:0,
      male_num:0,
      female_num:0,
      male_num_perc:0,
      female_num_perc:0,
      leftData:{},
      afib_num:0,
      spo2h_num:0,
      sbp_num:0,
      temp_num:0,
      tooltip_isactive:false,
      dbplist:[],
      sbplist:[],
      sbp_num_140:0,
      sbp_num_180:0,
      sbp_num_90:0,
      dbp_num_90:0,
      dbp_num_100:0,
      dbp_num_60:0,
    }
  },
  props: {

  },
  components: {Tooltip},
  methods: {
    main_btnDidClicked:function() {
      this.main_btn_active = true;
      this.user_btn_active = false;
      // this.$router.push({path:'/detail/maincontent'});
      this.$router.push({path:'/detail/maincontent/watch',query:{fields:'sbp',page:1}});
    },
    user_btnDidClicked:function() {
      this.main_btn_active = false;
      this.user_btn_active = true;
      this.$router.push({path:'/detail/mainuser/watch',query:{page:5}});
      console.log('user_btn did clicked');
    },
    dropdown_handleCommand:function(command) {
      this.$message({
        message:command,
        type:"warning",
      });
      this.$router.push({path:'/'});
    },
    tipbtnMousemove:function() {
      console.log("------======------");
      this.tooltip_isactive = true;
    },
    tipbtnMouseout:function() {
      console.log("------+++++------");
      this.tooltip_isactive = false;
    }
  },
  mounted() {
    console.log('当前路径：'+this.$route.path);
    if (this.$route.path=='/detail/mainuser/watch' || this.$route.path=='/detail/mainuser/linto') {
      this.user_btn_active = true;
      this.main_btn_active = false;
    }
    else {
      this.user_btn_active = false;
      this.main_btn_active = true;
    }
  }
}
</script>

<style scoped src='./../../static/css/main.css'>
#app_ {
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

/*.login_logo{width:1200px;height:88px;margin:0 auto;background:#fff url(./../../static/img/indexlogo.png) 0 center no-repeat;}
.login {width:100%;height:480px;margin:0px auto 0;background:url(./../static/img/loginimg.png) ;background-size:100% 100%;}*/
</style>
