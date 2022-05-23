<template>
  <div>
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">

          <el-submenu index="1">
            <template slot="title" >Excel助手</template>
            <el-menu-item index="1-1" @click="selectMenu('ExcelMerge')">多表合并</el-menu-item>
            <el-menu-item index="1-2" @click="selectMenu('ComparedSequential')">同环比计算</el-menu-item>
            <el-menu-item index="1-3" @click="selectMenu('PivotTable')">数据透视</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title" >PDF处理</template>
            <el-menu-item index="2-1" @click="selectMenu('PdfIndex')">PDF转图片</el-menu-item>
            <el-menu-item index="2-2">PDF转word</el-menu-item>
            <el-menu-item index="2-3">PDF添加水印</el-menu-item>
          </el-submenu>
          <el-menu-item index="3" >BI智能报表</el-menu-item>
        </el-menu>
      </el-header>
<!--      <el-aside>这里是侧边</el-aside>-->
      <el-main :is="mainCom">这里是主区域</el-main>
<!--      <el-footer>这里是脚部</el-footer>-->
    </el-container>
  </div>
</template>
<script>
import ExcelMerge from '../excel/Merge.vue'
import ComparedSequential from '../excel/ComparedSequential.vue'
import PivotTable from '../excel/PivotTable.vue'
import PdfIndex from '../pdf/PdfIndex.vue'
export default {
  name: 'IndexPage',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      mainCom: 'main'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    selectMenu (comName) {
      this.mainCom = comName
    }
  },
  components: {
    ExcelMerge,
    ComparedSequential,
    PivotTable,
    PdfIndex
  }
}
</script>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  margin-top: 10px;
  line-height: 10px;
}

.el-main {
  color: #333;
  width: 600px;
  height: 800px;
}
</style>
