const express = require('express')
const axios = require('axios').default
require('dotenv').config()

const app = express()
const port = 5000

let kraR = "https://api.kraken.com/0/public/Ticker?pair=XBTUSD,ETHUSD"
let bittrex = "https://api.bittrex.com/api/v1.1/public/getticker?market=USD-BTC"
let bittrexE = "https://api.bittrex.com/api/v1.1/public/getticker?market=USD-ETH"


var cors = require('cors')

app.use(cors())


app.get('/', (req, res) => {
  const result = [{
    btc: {
      buy: -1,
      sell: -1
    },
    eth:{
      buy: -1,
      sell: -1
    }
  },
  {
    btc: {
      buy: -1,
      sell: -1
    },
    eth:{
      buy: -1,
      sell: -1
    }
  }]

  axios.get(bittrex).then(
    ress=>{
      result[0].btc.sell = ress.data.result.Bid
      result[0].btc.buy = ress.data.result.Ask

      axios.get(kraR).then(
        resss=>{
          const ppB = resss.data.result.XXBTZUSD
          const ppE =  resss.data.result.XETHZUSD
          result[1].btc.sell = ppB.b[0]
          result[1].btc.buy = ppB.a[0]
          result[1].eth.sell = ppE.b[0]
          result[1].eth.buy = ppE.a[0]

          axios.get(bittrexE).then(
            ressss=>{
              result[0].eth.sell = ressss.data.result.Bid
              result[0].eth.buy = ressss.data.result.Ask
              res.send(result)
            }
          )
        }
      )
    }
  ).catch((err)=>console.log(err))
  
})

app.listen(port, () => {
  console.log(`crypto server listening at http://localhost:${port}`)
})