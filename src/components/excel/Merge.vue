<template>
  <div>
    <el-container>
      <el-main>
        <el-upload
          class="upload-demo"
          accept=".xls,.xlsx"
          :action="uploadApi"
          :http-request="uploadSectionFile"
          multiple name="upfile"
          :limit="2"
          :file-list="reportFile">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">最多只能上传两个xls或xlsx文件，且每个不超过10MB</div>
        </el-upload>
        <el-button v-if="reportFile.length > 1 && merge_button_show" @click="mergeExcel">开始合并</el-button>
        <hr />
        <div v-show="show_merge_message" id="mergeResult" >
          <el-table
            :data="merge_data"
            style="width: 100%"
            :header-cell-style="{background:'#eee',color:'#606266'}"
          >
            <el-table-column v-bind:key='column' v-for="column in merge_columns"
              :prop="column"
              :label="column"
              >
            </el-table-column>
          </el-table>
          <el-button @click="downLoadMerge">下载</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import {uploadPOST, mergeTwoExcel, downLoadPOST, getExcelColumns} from '@/api/ajax-fileserver'

export default {
  name: 'ExcelIndex',
  data () {
    return {
      reportFile: [],
      merge_button_show: true,
      show_merge_message: false,
      uploadApi: '',
      mergeParams: {
        excel_1: '',
        excel_column_1: '',
        excel_2: '',
        excel_column_2: ''
      },
      mergeExcelInfo: [],
      merge_columns: [],
      merge_data: [],
      excel_columns: []
    }
  },
  methods: {
    uploadSectionFile (param) {
      let isLt2M = param.file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'error'
        })
        return false
      }
      var form = new FormData()
      form.append('upfile', param.file)
      uploadPOST({
        data: form,
        success: (resp) => {
          if (resp != null && resp.success) {
            this.reportFile.push(param.file)
            // 获取列头
            getExcelColumns({
              data: {
                excel_path: resp.content
              },
              success: (resp2) => {
                this.mergeExcelInfo.push({
                  excel_name: param.file.name,
                  excel_path: resp.content,
                  excel_columns: resp2.content.columns,
                  merge_column: '姓名'
                })
              }
            })
          }
        }
      })
    },
    // 获取excel表头
    getExcelColumns (excelPath) {
      getExcelColumns({
        async: false,
        data: {
          excel_path: excelPath
        },
        success: (resp) => {
          var columns = resp.content.columns
          return columns
        }
      })
    },
    mergeExcel () {
      mergeTwoExcel({
        data: {
          excel_list: this.mergeExcelInfo
        },
        success: (resp) => {
          this.merge_button_show = false
          this.merge_columns = resp.content.columns
          this.merge_data = resp.content.data
          this.show_merge_message = true
          this.merge_success()
          localStorage.setItem('file_path', resp.content.file_path)
        }
      })
    },
    merge_success () {
      this.$notify({
        title: '成功',
        message: '恭喜您合并成功',
        type: 'success'
      })
    },
    downLoadMerge () {
      downLoadPOST({
        dataType: 'arraybuffer',
        data: {
          loginUserId: '',
          filePath: localStorage.getItem('file_path')
        },
        success: (resp) => {
          localStorage.removeItem('file_path')
          let blob = new Blob([resp], {
            type: 'application/vnd.ms-excel;charset=utf-8'
          })
          let objectUrl = URL.createObjectURL(blob)
          let link = document.createElement('a')
          let fname = '合并.xlsx'
          link.href = objectUrl
          link.setAttribute('download', fname)
          document.body.appendChild(link)
          link.click()
        }
      })
    }
  }
}
</script>

<style>
 #mergeResult {
   width: 100%;
   position: center;
   margin: auto;
   text-align: center;
 }
</style>
