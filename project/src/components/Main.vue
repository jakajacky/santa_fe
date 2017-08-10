<template>
  <div id="app">
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

    <div class="content_bg">
      <!-- 总数统计 -->
      <div class="total_statistic">
        <span class="total_statistic_title">总数统计</span>
        <ul class="total_statistic_list">
          <li>
            <span>用户数量</span>
            <span id="num" class="user_num">4626</span>
          </li>
          <li>
            <span>测量数量</span>
            <span id="num" class="test_num">43012</span>
          </li>
          <li>
            <span>本周新增用户</span>
            <span id="num" class="new_user_num">1</span>
          </li>
          <li>
            <span>本周新增数据</span>
            <span id="num" class="new_data_num">12</span>
          </li>
        </ul>
      </div>

      <!-- <div class="margin-3">  </div> -->
      <!-- 数据列表 -->
      <div class="statistic_list">
        <div class="device_nav">
          <input class="watch_btn" type="button" v-on:click="watch_btnDidClicked" v-bind:class="{'active':watch_btn_active}" value="脉搏波智能手表"></input><input class="linto_btn" type="button" v-on:click="linto_btnDidClicked" v-bind:class="{'active':linto_btn_active}" value="多合一参数设备"></input>
        </div>
        <div class="margin-4">  </div>
        <div class="data_type_nav" v-if="watch_btn_active">
          <input class="watch_bloodp_btn" type="button" v-on:click="watch_bloodp_btnDidClicked" v-bind:class="{'active':watch_bloodp_btn_active}" value="血压异常数据"></input><input class="watch_heartshake_btn" type="button" v-on:click="watch_heartshake_btnDidClicked" v-bind:class="{'active':watch_heartshake_btn_active}" value="房颤风险"></input><input class="watch_pwv_btn" type="button" v-on:click="watch_pwv_btnDidClicked" v-bind:class="{'active':watch_pwv_btn_active}" value="PWV异常数据"></input><input class="watch_heartrate_btn" type="button" v-on:click="watch_heartrate_btnDidClicked" v-bind:class="{'active':watch_heartrate_btn_active}" value="心率异常数据"></input>
        </div>
        <div class="data_type_nav" v-if="linto_btn_active">
          <input class="linto_bloodp_btn" type="button" v-on:click="linto_bloodp_btnDidClicked" v-bind:class="{'active':linto_bloodp_btn_active}" value="血压异常数据"></input><input class="linto_bloodo_btn" type="button" v-on:click="linto_bloodo_btnDidClicked" v-bind:class="{'active':linto_bloodo_btn_active}" value="血氧异常数据"><input class="linto_heartshake_btn" type="button" v-on:click="linto_heartshake_btnDidClicked" v-bind:class="{'active':linto_heartshake_btn_active}" value="房颤异常数据"></input><input class="linto_heartrate_btn" type="button" v-on:click="linto_heartrate_btnDidClicked" v-bind:class="{'active':linto_heartrate_btn_active}" value="心率异常数据"></input><input class="linto_temp_btn" type="button" v-on:click="linto_temp_btnDidClicked" v-bind:class="{'active':linto_temp_btn_active}" value="体温异常数据"></input>
        </div>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column
            prop="user_id"
            label="用户ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="date"
            label="时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="shousuo"
            label="收缩压">
          </el-table-column>
          <el-table-column
            prop="shuzhang"
            label="舒张压">
          </el-table-column>
          <el-table-column
            prop="detail"
            label="">
            <template scope="scope">
              <el-button
                size="small"
                type="text"
                @click="handleDetail(scope.$index, scope.row)">详细参数</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="wave"
            label="">
            <template scope="scope">
              <el-button
                size="small"
                type="text"
                @click="handleWave(scope.$index, scope.row)">波形</el-button>
            </template>

          </el-table-column>

        </el-table>
        <div class="margin-5">  </div>
        <el-pagination style="float:right;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="100"
          layout="total, prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>

      <div class="margin-2">  </div>
      <!-- 用户年龄及性别组成 -->
      <div class="age_gender_statistic">
        <span class="age_gender_statistic_title">用户年龄及性别组成</span>
        <!-- 图表 -->
        <div id="age_gender_charts_id" class="age_gender_charts">

        </div>
      </div>



    </div>

  </div>
</template>

<script>
import App from './../App.vue'
import reques from './../request/Request.vue'
import echarts from 'echarts'
import axios from 'axios'

// echart 配置
// 指定图表的配置项和数据
var option = {
    // tooltip: {},
    title: [{
                text: '',
                left: '33%',
                top: '48%',
                textAlign: 'center',
                textBaseline: 'middle',
                textStyle: {
                    color: '#666',
                    fontWeight: 'normal',
                    fontSize: 14
                }
            }],
    color:['#72dc95', '#f9cd83', '#ec7c7b', '#d294e4', '#7abcdf'],
    legend: {
        orient:'vertical',
        x:'right',
        y: 30,
        itemWidth: 14,
        data:[
          {name:'小于20岁'},
          {name:'20-40岁'},
          {name:'40-60岁'},
          {name:'60-80岁'},
          {name:'大于80岁'}]
    },
    series: [{
        name: '占比',
        type: 'pie',
        center: ['125', '90'],
        radius: ['25%', '40%'],
        // avoidLabelOverlap: false,
        label: {
            normal: {
                textStyle: {
                    fontSize: 12
                }
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '12',
                    fontWeight: 'bold'
                }
            }
        },
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    formatter: '{d}%'
                }
            }
        },
        data: [
          {value:302,name:'小于20岁'},
          {value:1376,name:'20-40岁'},
          {value:932,name:'40-60岁'},
          {value:387,name:'60-80岁'},
          {value:472,name:'大于80岁'}]
    }]
};

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
      tableData: [{
        user_id:'18515982821',
        date: '2016-05-02 22:55:30',
        shousuo: '160',
        shuzhang: '90',
       }, {
         user_id:'18515982821',
         date: '2016-05-02 22:55:30',
         shousuo: '160',
         shuzhang: '90',
       }, {
         user_id:'18515982821',
         date: '2016-05-02 22:55:30',
         shousuo: '160',
         shuzhang: '90',
       }, {
         user_id:'18515982821',
         date: '2016-05-02 22:55:30',
         shousuo: '160',
         shuzhang: '90',
       }, {
         user_id:'18515982821',
         date: '2016-05-02 22:55:30',
         shousuo: '160',
         shuzhang: '90',
       }, {
         user_id:'18515982821',
         date: '2016-05-02 22:55:30',
         shousuo: '160',
         shuzhang: '90',
       }, {
         user_id:'18515982821',
         date: '2016-05-02 22:55:30',
         shousuo: '160',
         shuzhang: '90',
       }, {
         user_id:'18515982821',
         date: '2016-05-02 22:55:30',
         shousuo: '160',
         shuzhang: '90',
       }]
    }
  },
  props: {

  },
  methods: {
    main_btnDidClicked:function() {
      this.main_btn_active = true;
      this.user_btn_active = false;
    },
    user_btnDidClicked:function() {
      this.main_btn_active = false;
      this.user_btn_active = true;
    },
    dropdown_handleCommand:function(command) {
      this.$message({
        message:command,
        type:"warning",
      });
      this.$router.push({path:'/'});
    },
    handleDetail:function() {
      console.log('详细参数');
    },
    handleWave:function() {
      console.log('波形');
    },
    linto_btnDidClicked:function() {
      this.watch_btn_active = false;
      this.linto_btn_active = true;
    },
    watch_btnDidClicked:function() {
      this.watch_btn_active = true;
      this.linto_btn_active = false;
    },

    watch_bloodp_btnDidClicked:function() {
      this.watch_bloodp_btn_active =true;
      this.watch_heartshake_btn_active =false;
      this.watch_pwv_btn_active = false;
      this.watch_heartrate_btn_active = false;
    },
    watch_heartshake_btnDidClicked:function() {
      this.watch_bloodp_btn_active =false;
      this.watch_heartshake_btn_active =true;
      this.watch_pwv_btn_active = false;
      this.watch_heartrate_btn_active = false;
    },
    watch_pwv_btnDidClicked:function() {
      this.watch_bloodp_btn_active =false;
      this.watch_heartshake_btn_active =false;
      this.watch_pwv_btn_active = true;
      this.watch_heartrate_btn_active = false;
    },
    watch_heartrate_btnDidClicked:function() {
      this.watch_bloodp_btn_active =false;
      this.watch_heartshake_btn_active =false;
      this.watch_pwv_btn_active = false;
      this.watch_heartrate_btn_active = true;
    },
    linto_bloodp_btnDidClicked:function() {
      this.linto_bloodp_btn_active=true;
      this.linto_bloodo_btn_active=false;
      this.linto_heartshake_btn_active=false;
      this.linto_heartrate_btn_active=false;
      this.linto_temp_btn_active=false;
    },
    linto_bloodo_btnDidClicked:function() {
      this.linto_bloodp_btn_active=false;
      this.linto_bloodo_btn_active=true;
      this.linto_heartshake_btn_active=false;
      this.linto_heartrate_btn_active=false;
      this.linto_temp_btn_active=false;
    },
    linto_heartshake_btnDidClicked:function() {
      this.linto_bloodp_btn_active=false;
      this.linto_bloodo_btn_active=false;
      this.linto_heartshake_btn_active=true;
      this.linto_heartrate_btn_active=false;
      this.linto_temp_btn_active=false;
    },
    linto_heartrate_btnDidClicked:function() {
      this.linto_bloodp_btn_active=false;
      this.linto_bloodo_btn_active=false;
      this.linto_heartshake_btn_active=false;
      this.linto_heartrate_btn_active=true;
      this.linto_temp_btn_active=false;
    },
    linto_temp_btnDidClicked:function() {
      this.linto_bloodp_btn_active=false;
      this.linto_bloodo_btn_active=false;
      this.linto_heartshake_btn_active=false;
      this.linto_heartrate_btn_active=false;
      this.linto_temp_btn_active=true;
    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('age_gender_charts_id'));
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
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
