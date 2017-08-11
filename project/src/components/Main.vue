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
            <span id="num" class="user_num">{{this.alluser}}</span>
          </li>
          <li>
            <span>测量数量</span>
            <span id="num" class="test_num">{{this.alldata}}</span>
          </li>
          <li>
            <span>本周新增用户</span>
            <span id="num" class="new_user_num">{{this.weekadduser}}</span>
          </li>
          <li>
            <span>本周新增数据</span>
            <span id="num" class="new_data_num">{{this.weekadddata}}</span>
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
                class="elbutton"
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
                class="elbutton"
                size="small"
                type="text"
                @click="handleWave(scope.$index, scope.row)">波形</el-button>
            </template>

          </el-table-column>

        </el-table>
        <div class="margin-5">  </div>
        <el-pagination style="float:right;padding-right:20px;"
          @current-change="handleCurrentPageChange"
          :current-page.sync="currentPage1"
          :page-size="8"
          layout="total, prev, pager, next"
          :total="25">
        </el-pagination>
      </div>

      <div class="margin-2">  </div>
      <!-- 用户年龄及性别组成 -->
      <div class="age_gender_statistic">
        <span class="age_gender_statistic_title">用户年龄及性别组成</span>
        <!-- 图表 -->
        <div id="age_gender_charts_id" class="age_gender_charts">

        </div>
        <!-- 进度 -->
        <span class="male_title" style="margin-left:30px;color:#13ce66">男性人数：{{this.male_num}}</span>
        <el-progress class="progresss"
          :show-text="false"
          :text-inside="true"
          :stroke-width="16"
          :percentage="100"
          status="success">
        </el-progress>
        <div class="margin-7">  </div>
        <span class="female_title" style="margin-left:30px;color:#20a0ff">女性人数：{{this.female_num}}</span>
        <el-progress class="progresss"
          :show-text="false"
          :text-inside="true"
          :stroke-width="16"
          :percentage="100">
        </el-progress>
      </div>

      <div class="margin-6">  </div>
      <!-- 异常数据统计 -->
      <div class="exception_total">
        <div class="exception_total_nav">
          <span class="title">异常数据统计</span>
        </div>
        <ul class="danger">
          <li>
            <p >房颤人数</p>
            <div class="num_div">
              <span class="num">{{this.afib_num}}</span><span> 人</span>
            </div>

          </li>
          <li>
            <p >血氧异常人数</p>
            <div class="num_div">
              <span class="num">{{this.spo2h_num}}</span><span> 人</span>
            </div>
          </li>
          <li>
            <p >血压异常人数</p>
            <div class="num_div">
              <span class="num">{{this.sbp_num}}</span><span> 人</span>
            </div>
          </li>
          <li>
            <p>体温异常人数</p>
            <div class="num_div">
              <span class="num">{{this.temp_num}}</span><span> 人</span>
            </div>
          </li>
        </ul>

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
        left: '36.5%',
        top: '42.5%',
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
        radius: ['30%', '45%'],
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
          {value:0,name:'小于20岁'},
          {value:0,name:'20-40岁'},
          {value:0,name:'40-60岁'},
          {value:0,name:'60-80岁'},
          {value:0,name:'大于80岁'}]
    }]
};

//按照西方国家的方法显示数字
var cutStr=function(str){
    var newStr=new Array(str.length+parseInt(str.length/3));
    var strArray=str.split("");
    newStr[newStr.length-1]=strArray[strArray.length-1];
    var currentIndex=strArray.length-1;
    for (var index = newStr.length - 1; index >= 0; index--) {
      if ((newStr.length - index) % 4 == 0) {
        newStr[index] = ",";
      }
      else{
        newStr[index] = strArray[currentIndex--];
      }
    }
    var reg = /^\,/;
    if(reg.test(newStr)){
        newStr.shift();
        return newStr.join("");
          }else{
              return newStr.join("");
          }

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
      currentPage1:1,
      alluser:'',
      alldata:'',
      weekadduser:'',
      weekadddata:'',
      age_total_num:0,
      male_num:0,
      female_num:0,
      leftData:{},
      afib_num:0,
      spo2h_num:0,
      sbp_num:0,
      temp_num:0,
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
    },
    handleCurrentPageChange:function(currentPage) {
      console.log(currentPage);
    },
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('age_gender_charts_id'));
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    // 网络请求一
    let data = {
              reg_id: 1,
          }
    reques.fetch('/energon-new/web/research/userlistdetails', data)
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
            message:'加载成功',
            type:'success'
          });
          //
          console.log(res.data);
          this.leftData = res.data;
          // 总数
          this.alluser = cutStr(this.leftData.alluser+'');
          this.alldata = cutStr(this.leftData.alldata+'');
          this.weekadduser = cutStr(this.leftData.weekadduser+'');
          this.weekadddata = cutStr(this.leftData.weekadddata+'');
          // 饼图
          var total_num = 0;
          for (var i = 0; i < this.leftData.agelist.length; i++) {
            option.series[0].data[i].value = this.leftData.agelist[i].count;
            total_num += this.leftData.agelist[i].count;
          }
          this.age_total_num = total_num;
          option.title[0].text = ''+this.age_total_num;
          myChart.setOption(option);
          // 男女比例
          this.male_num = this.leftData.genderlist[1].count;
          this.female_num = this.leftData.genderlist[0].count;
        }
      })
      .catch(error => {
        console.log('fail:'+error);
        this.$message({
          message:error.message,
          type:'error'
        });
      })

    // 网络请求二
    reques.receive('/energon-new/web/linktop/counts')
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
            message:'加载成功',
            type:'success'
          });
          //
          console.log(res.data);
          this.afib_num = res.data.afib;
          this.spo2h_num = res.data.spo2h;
          this.sbp_num = res.data.sbp;
          this.temp_num = res.data.temp;
        }
      })
      .catch(error => {
        console.log('fail:'+error);
        this.$message({
          message:error.message,
          type:'error'
        });
      })

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
