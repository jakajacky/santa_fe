<template lang="html">
<div class="user">
  <div class="content_bg_user">
    <!-- 总数统计 -->
    <div class="user_list_container">
      <div class="user_list_nav">
        <input type="button" value="[切换设备]"></input><span>脉搏波智能手表</span>
      </div>
      <div class="margin-100">  </div>
      <el-table :data="tableData" stripe style="width: 100%;border-width:0px;">
        <el-table-column
          prop="login_name"
          label="用户ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="create_date"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="sbp"
          label="血压平均值">
        </el-table-column>
        <el-table-column
          prop="dbp"
          label="血压程度">
        </el-table-column>
        <el-table-column
          prop="sbp"
          label="PWV均值">
        </el-table-column>
        <el-table-column
          prop="dbp"
          label="PWV程度">
        </el-table-column>
        <el-table-column
          prop="sbp"
          label="慢性病史">
        </el-table-column>
        <el-table-column
          prop="dbp"
          label="房颤">
        </el-table-column>
        <el-table-column
          prop="dbp"
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
        @current-change="handleCurrentPageChange"
        :current-page.sync="currentPage1"
        :page-size="8"
        layout="total, prev, pager, next"
        :total="10">
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

export default {
  name: 'app',
  data () {
    return {
      currentPage1:1,
    }
  },
  props: {

  },
  components: {Tooltip},
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

/*.login_logo{width:1200px;height:88px;margin:0 auto;background:#fff url(./../../static/img/indexlogo.png) 0 center no-repeat;}
.login {width:100%;height:480px;margin:0px auto 0;background:url(./../static/img/loginimg.png) ;background-size:100% 100%;}*/
</style>
