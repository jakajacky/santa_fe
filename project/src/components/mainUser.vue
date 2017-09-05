<template lang="html">
<div class="user">
  <div class="content_bg_user">
    <!-- 总数统计 -->
    <div class="user_list_container">
      <div class="user_list_nav">
        <input type="button" value="[切换设备]" v-on:click="didDialogFormVisible"></input><span>脉搏波智能手表</span>
        <el-dialog title="切换设备" :visible.sync="dialogFormVisible" size="small">
          <p>亲爱的用户您好：</p>
          <p>切换设备，对用户进行精准分类：</p>
          <ul class="device_list">
            <li>
              <div class="watch">
                <img src="./../../static/img/watch.png">
                <span>脉搏波智能手表</span>
                <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
              </div>
            </li>
            <li>
              <div class="linto">
                <img src="./../../static/img/linktop.png">
                <span>多合一参数设备</span>
                <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
              </div>
            </li>
          </ul>

        </el-dialog>
        <el-input placeholder="" size="small" v-model="searchcontent" icon="search" :on-icon-click="handleIconClick">

        </el-input>
      </div>
      <div class="margin-100">  </div>
      <el-table :data="tableData" stripe style="width: 100%;border-width:0px;">
        <el-table-column
          prop="login_name"
          label="用户ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="sbp"
          label="血压平均值">
        </el-table-column>
        <el-table-column
          prop="sbplevel"
          label="血压程度">
        </el-table-column>
        <el-table-column
          prop="pwv"
          label="PWV均值">
        </el-table-column>
        <el-table-column
          prop="pwvlevel"
          label="PWV程度">
        </el-table-column>
        <el-table-column
          prop="medihis"
          label="慢性病史">
        </el-table-column>
        <el-table-column
          prop="is_afib"
          label="房颤">
        </el-table-column>
        <el-table-column
          prop="count"
          label="数据量">
        </el-table-column>
        <el-table-column
          prop="detail"
          label="">
          <template scope="scope">
            <el-button
              class="elbutton"
              size="small"
              type="text"
              @click="handleDetail(scope.$index, scope.row)">数据详细</el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="margin-100">  </div>
      <el-pagination style="float:right;padding-right:20px;"
        @current-change="handleCurrentPageChange_"
        :current-page.sync="this.currentPage1_"
        :page-size="10"
        layout="total, prev, pager, next"
        :page-count="this.total_page"
        :total="this.total_size">
      </el-pagination>
    </div>

  </div>
</div>
</template>

<script>
import App from './../App.vue'
import reques from './../request/Request.vue'
import echarts from 'echarts'
import axios from 'axios'
import Tooltip from './Tooltip.vue'
import {Message} from 'element-ui'

var fetchDatas_user=function(page){
  return new Promise((resolve,reject) => {
    // 网络请求四
    let data_4 = {
      reg_id: page,
    }
    reques.fetch('/energon-new/web/research/users', data_4)
      .then(res => {
        console.log('success:'+res);
        if (res.code != 10000) {
          Message({
            message:res.msg,
            type:'warning'
          });
          reject(res.msg);
        }
        else {
          // Message({
          //   message:'加载成功',
          //   type:'success'
          // });
          console.log('list:'+res.data);
          resolve(res.data);
        }
      })
      .catch(error => {
        console.log('fail:'+error);
        Message({
          message:error.message,
          type:'error'
        });
        reject(error);
      })

  });
};

export default {
  name: 'app',
  data () {
    return {
      currentPage1_:1,
      searchcontent:'',
      total_page:0,
      total_size:0,
      tableData:[],
      dialogFormVisible:false,
    }
  },
  props: {

  },
  components: {Tooltip},
  methods: {
    didDialogFormVisible:function() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    handleIconClick:function() {
      console.log('search for:'+this.searchcontent);
    },
    handleCurrentPageChange_:function(currentPage_) {
      console.log(currentPage_);

      this.currentPage1_ = currentPage_;
      this.$router.push({path:'/detail/mainuser/watch', query:{page:currentPage_}});
      // this.routerDidChanged();
    },
    routerDidChanged_:function() {
      // 判定 分页
      this.currentPage1_ = this.$route.query.page;
      // 网络请求
      fetchDatas_user(this.currentPage1_)
      .then(res => {
        this.total_page = res[0].pagesize;
        this.total_size = res[0].datasize;
        console.log('total_page:'+this.total_page);
        res.shift();
        this.tableData = res;
        console.log('tableData:'+this.tableData.length);
      })
      .catch(error => {

      })
    }
  },
  watch: {
    '$route':'routerDidChanged_'
  },
  create() {
    console.log('create mainuser.vue');

  },
  beforeCreate() {
    console.log('beforeCreate mainuser.vue');
    this.currentPage1_ = this.$route.query.page;
    console.log('beforeCreate mainuser.vue:'+this.currentPage1_);
    // this.routerDidChanged_();
    fetchDatas_user(this.currentPage1_)
    .then(res => {
      this.total_page = res[0].pagesize;
      this.total_size = res[0].datasize;
      console.log('total_page:'+this.total_page);
      res.shift();
      this.tableData = res;
      console.log('tableData:'+this.tableData.length);
      this.currentPage1_ = this.$route.query.page;
    })
    .catch(error => {

    })
  },
  mounted() {
    console.log('mounted:'+this.$route.query.page);
    // this.currentPage1_ = this.$route.query.page;
  }
}
</script>

<style src='./../../static/css/main.css'>
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

/*.login_logo{width:1200px;height:88px;margin:0 auto;background:#fff url(./../../static/img/indexlogo.png) 0 center no-repeat;}
.login {width:100%;height:480px;margin:0px auto 0;background:url(./../static/img/loginimg.png) ;background-size:100% 100%;}*/
</style>
