<template>
  <div>
    <h1>这里是PDF</h1>
  </div>
</template>
<script>
export default {
  name: 'PdfIndex',
  data () {
    return {
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    selectExcel () {
      alert('pdf')
    }
  }
}
</script>
