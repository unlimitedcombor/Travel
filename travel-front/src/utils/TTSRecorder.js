import CryptoJS from "crypto-js"
const APPID = '53384ddf' // 从控制台可以获取
const API_SECRET = 'MzA0YzAwZTI1OTg4NThlYzA1NTQ5YjYz' // 从控制台可以获取
const API_KEY = '79f43022dd20402f1aa6efd95898484a' // 从控制台可以获取
let total_res = "";

function getWebsocketUrl() {
  return new Promise((resolve, reject) => {
    var apiKey = API_KEY
    var apiSecret = API_SECRET
    var url = 'ws://spark-api.xf-yun.com/v3.5/chat'
    var host = location.host
    var date = new Date().toGMTString()
    var algorithm = 'hmac-sha256'
    var headers = 'host date request-line'
    var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v3.5/chat HTTP/1.1`
    var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
    var signature = CryptoJS.enc.Base64.stringify(signatureSha)
    var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
    var authorization = btoa(authorizationOrigin)
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`
    resolve(url)
  })
}


export default class TTSRecorder {
  constructor({appId = APPID} = {}) {
    this.appId = appId
    this.msgStore = null
    this.msgDom = null
  }

  // 连接websocket
  connectWebSocket() {
    return getWebsocketUrl().then(url => {
      let ttsWS
      if ('WebSocket' in window) {
        ttsWS = new WebSocket(url)
      } else if ('MozWebSocket' in window) {
        ttsWS = new MozWebSocket(url)
      } else {
        alert('浏览器不支持WebSocket')
        return
      }
      this.ttsWS = ttsWS
      ttsWS.onopen = e => {
        this.webSocketSend()
      }
      ttsWS.onmessage = e => {
        this.result(e.data)
      }
      ttsWS.onerror = e => {
        alert('WebSocket报错，请f12查看详情')
        console.error(`详情查看：${encodeURI(url.replace('wss:', 'https:'))}`)
      }
      ttsWS.onclose = e => {
        console.log(e)
      }
    })
  }


  // websocket发送数据
  webSocketSend() {
    // 构建消息历史
    const messages = this.msgStore.state.msg.list.map(msg => ({
        role: msg.role,
        content: msg.content
    }))

    var params = {
        "header": {
            "app_id": this.appId,
        },
        "parameter": {
            "chat": {
                "domain": "generalv3",
                "temperature": 0.5,
                "max_tokens": 1024
            }
        },
        "payload": {
            "message": {
                "text": messages  // 修改这里，传入消息历史数组
            }
        }
    }
    
    console.log('发送的参数：', params)
    this.ttsWS.send(JSON.stringify(params))
  }

  start(store, msgDom) {
    this.msgStore = store
    this.msgDom = msgDom
    this.connectWebSocket()
  }

  // websocket接收数据的处理
  result(resultData) {
    let jsonData = JSON.parse(resultData)
    console.log('接收到的数据：', jsonData)
    
    // 检查数据结构
    if (!jsonData.payload) {
        console.log('等待数据响应...')
        return
    }

    // 检查响应文本
    const text = jsonData.payload.text || (jsonData.payload.choices && jsonData.payload.choices.text)
    
    if (text) {
        // 处理返回的文本
        const content = Array.isArray(text) ? text[0].content : text
        this.msgStore.dispatch('msg/aiAddMsg', {
            content: content,
            status: jsonData.header.status
        })
    }

    // 检查错误
    if (jsonData.header.code !== 0) {
        alert(`提问失败: ${jsonData.header.code}:${jsonData.header.message}`)
        console.error(`${jsonData.header.code}:${jsonData.header.message}`)
        return
    }

    // 检查会话是否完成
    if (jsonData.header.code === 0 && jsonData.header.status === 2) {
        console.log('会话完成：', jsonData)
        this.ttsWS.close()
    }

    // 滚动到底部
    if (this.msgDom) {
        this.msgDom.scrollTop = this.msgDom.scrollHeight + 500
    }
  }
}
