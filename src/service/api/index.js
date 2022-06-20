import http from '@/service/http'
import { Message } from '@/utils/tool.js'

export function handleExportXls(url,param={},fileName='导出文件'){
    console.log("导出参数",param)
    http.downFile(url,param).then((data)=>{
      if (!data) {
        Message('warning',"文件下载失败")
        return
      }
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(new Blob([data],{type: 'application/vnd.ms-excel'}), fileName+'.xls')
      }else{
        let url = window.URL.createObjectURL(new Blob([data],{type: 'application/vnd.ms-excel'}))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', fileName+'.xls')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link); //下载完成移除元素
        window.URL.revokeObjectURL(url); //释放掉blob对象
      }
    })
  }