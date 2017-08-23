<template lang="html">
  <div class="">
    <div class="tooltip" v-bind:class="{'active':show}">
      <table>
        <tbody>
          <tr>
            <th>类别</th>
            <th>收缩压</th>
            <th>舒张压</th>
          </tr>
          <tr>
            <td>正常高压</td>
            <td>120~139</td>
            <td>80~89</td>
          </tr>
          <tr>
            <td>高血压</td>
            <td>≥140</td>
            <td>≥90</td>
          </tr>
          <tr>
            <td>1级高血压(轻度)</td>
            <td>140~159</td>
            <td>90~99</td>
          </tr>
          <tr>
            <td>2级高血压(中度)</td>
            <td>160~179</td>
            <td>100~109</td>
          </tr>
          <tr>
            <td>3级高血压(重度)</td>
            <td>≥180</td>
            <td>≥110</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
    show:false,
  }

}
</script>

<style lang="css">

/* 自定义浮动窗*/
.tooltip.active {
  position: absolute;
  background: #000;
  display:block;
  opacity: 0.7;
  border-radius: 5px;
  width: 330px;
  height: 200px;
  left: 20px;
  top: -200px;
  animation: fade-in;/*动画名称*/
  animation-duration: 0.75s;/*动画持续时间*/
  -webkit-animation:fade-in 0.75s;/*针对webkit内核*/

}

.tooltip {
  position: absolute;
  display: none;
  background: #000;
  opacity: 0.0;
  border-radius: 5px;
  width: 330px;
  height: 200px;
  left: 20px;
  top: -200px;
  animation: fade-out;/*动画名称*/
  animation-duration: 0.75s;/*动画持续时间*/
  -webkit-animation:fade-out 0.75s;/*针对webkit内核*/
}

.tooltip table {
  width: 310px;
  display: block;
  color: #fff;
  font-weight: bolder;
  text-align: center;
  margin: 10px;
}

.tooltip table tbody {
  display: block;
}

.tooltip table tr {
  line-height: 25px;
}
.tooltip table tr:first-child {
  line-height: 40px;
}

.tooltip table td {
  width: 100px;
}
.tooltip table td:first-child {
  width: 120px;
}

@keyframes fade-in {
    0% {opacity: 0;}/*初始状态 透明度为0*/
    40% {opacity: 0;}/*过渡状态 透明度为0*/
    100% {opacity: 0.7;}/*结束状态 透明度为1*/
}
@-webkit-keyframes fade-in {/*针对webkit内核*/
    0% {opacity: 0;}
    40% {opacity: 0;}
    100% {opacity: 0.7;}
}

@keyframes fade-out {
    0% {opacity: 0.7;}/*初始状态 透明度为0*/
    40% {opacity: 0.3;}/*过渡状态 透明度为0*/
    100% {opacity: 0;}/*结束状态 透明度为1*/
}
@-webkit-keyframes fade-out {/*针对webkit内核*/
    0% {opacity: 0.7;}
    40% {opacity: 0.3;}
    100% {opacity: 0;}
}

</style>
