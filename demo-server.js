'use strict'

const crypto = require('crypto')
const url = require('url')
const qs = require('querystring')
const http = require('http')

const md5Password = md5('grjxv2mxELR3')
console.log('password md5', md5Password)

const server = http.createServer((req, res) => {
  const query = qs.parse(url.parse(req.url).query)
  console.log('query', query)

  const data = [query.method, query.uri, query.date, query.policy]
  const signature = base64Sha1(data.join('&'), md5Password)
  console.log('signature', signature)

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

function base64Sha1 (str, secret) {
  return crypto.createHmac('sha1', secret).update(str, 'utf8').digest().toString('base64')
}
