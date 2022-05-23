<template>
  <div>
    <h1>这里是Excel同环比计算</h1>
  </div>
</template>
<script>
export default {
  name: 'ComparedSequential',
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
