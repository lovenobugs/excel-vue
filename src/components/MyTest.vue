<template>
  <div id="vue_det">
    <h1>这里是第一个VUE</h1>
    <h1>site : {{site}}</h1>
    <h1>url : {{url}}</h1>
    <h1>{{details()}}</h1>
    <el-button>这里是个按钮</el-button>
    <el-upload>这里是上传组件</el-upload>
    <button v-on:click="showUl">显示</button>
    <button v-on:click="disableUl">隐藏</button>
    <div v-show="seen" v-html="htmlv">hahaha</div>
    <p>{{ message | toLower }}</p>
    <input v-model="message" />
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'MyTest',
  data () {
    return {
      seen: false,
      message: 'dsAsdfdBDBD',
      site: '菜鸟教程',
      url: 'www.runoob.com',
      alexa: '10000',
      htmlv: '<ul>' +
        '<li>1</li>' +
        '<li>2</li>' +
        '<li>3</li>' +
        '</ul>'
    }
  },
  methods: {
    details: function () {
      return this.site + ' - 学的不仅是技术，更是梦想！'
    },
    showUl: function () {
      // eslint-disable-next-line no-return-assign
      return this.seen === true
    },
    disableUl: function () {
      // eslint-disable-next-line no-return-assign
      return this.seen === false
    }
  },
  filters: {
    toLower: function (vaule) {
      vaule = vaule.toUpperCase()
      return vaule
    }
  }
}
</script>

<style scoped>

</style>
