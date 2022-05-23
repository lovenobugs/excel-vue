import { Message } from 'element-ui'

(function ($) {
  /**
   * Register ajax transports for blob send/recieve and array buffer send/receive via XMLHttpRequest Level 2
   * within the comfortable framework of the jquery ajax request, with full support for promises.
   *
   * Notice the +* in the dataType string? The + indicates we want this transport to be prepended to the list
   * of potential transports (so it gets first dibs if the request passes the conditions within to provide the
   * ajax transport, preventing the standard transport from hogging the request), and the * indicates that
   * potentially any request with any dataType might want to use the transports provided herein.
   *
   * Remember to specify 'processData:false' in the ajax options when attempting to send a blob or arraybuffer -
   * otherwise jquery will try (and fail) to convert the blob or buffer into a query string.
   *
   * This revision now includes sending headers, resolves the stack overflow in abort(), and sets the status text
   * into the response if the request is unsuccessful.
   */
  $.ajaxTransport('+*', function (options) {
    // Test for the conditions that mean we can/want to send/receive blobs or arraybuffers - we need XMLHttpRequest
    // level 2 (so feature-detect against window.FormData), feature detect against window.Blob or window.ArrayBuffer,
    // and then check to see if the dataType is blob/arraybuffer or the data itself is a Blob/ArrayBuffer
    if (window.FormData && ((options.dataType && (options.dataType === 'blob' || options.dataType === 'arraybuffer')) ||
      (options.data && ((window.Blob && options.data instanceof Blob) ||
        (window.ArrayBuffer && options.data instanceof ArrayBuffer)))
    )) {
      let xhr

      return {
        /**
         * Return a transport capable of sending and/or receiving blobs - in this case, we instantiate
         * a new XMLHttpRequest and use it to actually perform the request, and funnel the result back
         * into the jquery complete callback (such as the success function, done blocks, etc.)
         *
         * @param headers
         * @param completeCallback
         */
        send: function (headers, completeCallback) {
          // eslint-disable-next-line one-var
          let url = options.url || window.location.href,
            type = options.type || 'GET',
            dataType = options.dataType || 'text',
            data = options.data || null,
            async = options.async || true

          xhr = new XMLHttpRequest()
          xhr.addEventListener('load', function () {
            // eslint-disable-next-line one-var
            let res = {},
              // eslint-disable-next-line no-mixed-operators
              success = xhr.status >= 200 && xhr.status < 300 || xhr.status === 304

            if (success) {
              res[dataType] = xhr.response
            } else {
              res.text = xhr.statusText
            }

            completeCallback(xhr.status, xhr.statusText, res, xhr.getAllResponseHeaders())
          })

          xhr.open(type, url, async)
          xhr.responseType = dataType

          for (let key in headers) {
            if (headers.hasOwnProperty(key)) {
              xhr.setRequestHeader(key, headers[key])
            }
          }

          xhr.send(data)
        },
        abort: function () {
          if (xhr) {
            xhr.abort()
          }
        }
      }
    }
  })
// eslint-disable-next-line no-undef
})(jQuery)

const cacheMap = {}

function cache (option) {
  if (!option.needCache) {
    return null
  }

  if (cacheMap[option.originalUrl] && cacheMap[option.originalUrl][option.type] && cacheMap[option.originalUrl][option.type][option.originalData]) {
    return JSON.parse(cacheMap[option.originalUrl][option.type][option.originalData])
  }

  return null
}

function cachePut (option, data) {
  if (!option.needCache) {
    return
  }
  if (!data) {
    return
  }
  if (!cacheMap[option.originalUrl]) {
    cacheMap[option.originalUrl] = {}
  }
  if (!cacheMap[option.originalUrl][option.type]) {
    cacheMap[option.originalUrl][option.type] = {}
  }
  cacheMap[option.originalUrl][option.type][option.originalData] = JSON.stringify(data)
}

function ajax (option) {
  if (option.async == null) {
    option.async = !option.needCache
  }
  if (option.processData == null) {
    option.processData = true
  }
  if (option.dataType == null) {
    option.dataType = 'json'
  }
  if (option.timeout == null) {
    option.timeout = 60000
  }
  // 无敌提的防刷 timestamp:当前时间戳 + loginUserId:userid 没有userid就填空字符串  sign: 拼接后Encrypt加密
  let sUserId = localStorage.getItem('userId') || ''
  let sTimestamp = new Date().getTime()
  let sSign = sTimestamp + '' + sUserId
  if (/\?/.test(option.url)) {
    option.url = `${option.url}&timestamp=${sTimestamp}&sign=${sSign}`
  } else {
    option.url = `${option.url}?timestamp=${sTimestamp}&sign=${sSign}`
  }
  if (typeof option.data === 'string') {
    option.url += `&loginUserId=${sUserId}`
  }
  // eslint-disable-next-line no-undef
  $.ajax({
    url: option.url,
    dataType: option.dataType,
    processData: option.processData,
    contentType: option.contentType,
    data: option.data,
    async: option.async,
    type: option.type,
    timeout: option.timeout,
    beforeSend: function (XMLHttpRequest) {
      XMLHttpRequest.setRequestHeader('Authorization', localStorage.getItem('token'))
      XMLHttpRequest.setRequestHeader('userId', localStorage.getItem('userId'))
    },
    complete: function () {
      if (option.complete) {
        option.complete()
      }
    },
    success: function (data) {
      if (option.dataType !== 'json' && option.success) {
        option.success(data)
        return
      }
      if (data.code === 99999) {
        Message.error('操作频繁，请稍后再试！')
        return
      }
      if (data.code === 10002) {
        let pathSearch = location.pathname + location.search + location.hash
        location.href = pathSearch
        return
      }
      if (data.code !== 10000) {
        if (data.message == null) {
          data.message = ''
        }
        if (option.codeError) {
          option.codeError(data)
        } else {
          Message.error(data.message)
        }
        return
      }
      if (option.success) {
        cachePut(option, data)
        option.success(data)
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.responseJSON && jqXHR.responseJSON.code === 10002) {
        let pathSearch = location.pathname + location.search + location.hash
        location.href = pathSearch
        return
      }
      if (option.error) {
        option.error(jqXHR, textStatus, errorThrown)
      }
      console.log('%c 请求失败\n 路由:' + option.url + '\n 状态码:' + jqXHR.status + '\n 信息:' + jqXHR.responseText + '\n textStatus：' + textStatus + '\n errorThrown：' + errorThrown, 'color:red')
    }
  })
}

export function ajaxGET (option) {
  option.type = 'GET'
  option.contentType = 'application/x-www-form-urlencoded; charset=UTF-8'
  option.originalData = JSON.stringify(option.data)
  option.originalUrl = option.url
  if (cache(option)) {
    if (option.success) {
      option.success(cache(option))
    }
    if (option.complete) {
      option.complete()
    }
  } else {
    // eslint-disable-next-line no-undef
    option.data = $.extend(
      {}, option.data, { loginUserId: localStorage.getItem('userId') }
    )
    ajax(option)
  }
}

export function ajaxPOST (option) {
  option.type = 'POST'
  option.contentType = 'application/json; charset=UTF-8'
  option.originalData = JSON.stringify(option.data)
  option.originalUrl = option.url
  if (cache(option)) {
    if (option.success) {
      option.success(cache(option))
    }
    if (option.complete) {
      option.complete()
    }
  } else {
    // eslint-disable-next-line no-undef
    option.data = JSON.stringify($.extend(
      {}, option.data, { loginUserId: localStorage.getItem('userId') })
    )
    ajax(option)
  }
}

export function ajaxPUT (option) {
  option.type = 'PUT'
  option.contentType = 'application/json; charset=UTF-8'
  option.originalData = JSON.stringify(option.data)
  option.originalUrl = option.url
  if (cache(option)) {
    if (option.success) {
      option.success(cache(option))
    }
    if (option.complete) {
      option.complete()
    }
  } else {
    // eslint-disable-next-line no-undef
    option.data = JSON.stringify($.extend(
      {}, option.data, { loginUserId: localStorage.getItem('userId') })
    )
    ajax(option)
  }
}

export function ajaxDELETE (option) {
  option.type = 'DELETE'
  option.contentType = 'application/json; charset=UTF-8'
  option.originalData = JSON.stringify(option.data)
  option.originalUrl = option.url
  if (cache(option)) {
    if (option.success) {
      option.success(cache(option))
    }
    if (option.complete) {
      option.complete()
    }
  } else {
    // eslint-disable-next-line no-undef
    option.data = $.extend(
      {}, option.data, { loginUserId: localStorage.getItem('userId') }
    )
    // 配合后端，后端的DELETE不是放在httpBody中，而是读URI
    option.url = option.url + '?' + Object.keys(option.data).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(option.data[key])
    }).join('&')
    option.data = JSON.stringify(option.data)
    ajax(option)
  }
}

export function ajaxFilePOST (option) {
  // 告诉jQuery不要去处理发送的数据
  option.processData = false
  // 告诉jQuery不要去设置Content-Type请求头
  option.contentType = false
  option.url = option.url + '?loginUserId=' + localStorage.getItem('userId')
  option.type = 'POST'
  ajax(option)
}

export function ajaxFileGET (option) {
  option.url = option.url + '?loginUserId=' + localStorage.getItem('userId')
  option.type = 'GET'
  option.contentType = 'application/x-www-form-urlencoded; charset=UTF-8'
  option.dataType = 'blob'
  ajax(option)
}
