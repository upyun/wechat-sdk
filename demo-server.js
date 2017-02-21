'use strict'
const secret = 'Mv83tlocuzkmfKKUFbz2s04FzTw='
if (!secret) {
  console.error('通过环境变量 FILE_UPLOAD_SECRET 设置表单提交密钥')
}
console.log('Got secret', secret)

const crypto = require('crypto')
const url = require('url')
const qs = require('querystring')
const http = require('http')

const server = http.createServer((req, res) => {
  const query = qs.parse(url.parse(req.url).query)
  console.log('Got policy', query.policy)
  const signature = md5(query.policy + '&' + secret)
  console.log('Sent signature', signature)

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })
  res.end(JSON.stringify({signature}))
})

server.listen(8080, () => {
  console.log('Server listen on http://localhost:8080')
})

function md5 (str) {
  return crypto.createHash('md5').update(str, 'utf8').digest('hex')
}
