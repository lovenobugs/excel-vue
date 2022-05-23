import {ajaxFilePOST, ajaxPOST} from './ajax'

// 上传文件
export const uploadPOST = (option) => {
  option.url = 'http://localhost:9001/api/file/' + 'upload'
  ajaxFilePOST(option)
}

// 下载文件
export const downLoadPOST = (option) => {
  option.url = 'http://localhost:9001/api/file/' + 'download'
  ajaxPOST(option)
}

// 获取excel的列头
export const getExcelColumns = (option) => {
  option.url = 'http://localhost:9001/api/excel/columns'
  ajaxPOST(option)
}

// 合并文件
export const mergeTwoExcel = (option) => {
  option.url = 'http://localhost:9001/api/excel/merge'
  ajaxPOST(option)
}
