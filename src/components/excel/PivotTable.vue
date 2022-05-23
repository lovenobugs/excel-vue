<template>
  <div>
    <h1>这里是Excel数据透视表</h1>
  </div>
</template>
<script>
export default {
  name: 'PivotTable',
  data () {
    return {
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    selectExcel () {
      alert('excel')
    }
  }
}
</script>
