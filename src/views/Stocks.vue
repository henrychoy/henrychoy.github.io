<template>

  <div>
    <h1>Stock Tracker</h1>

    <StockDashboard title="Indexes" v-bind:list="defaults.slice(0,3)"></StockDashboard> <br>
    <StockDashboard title="Crypto" v-bind:list="crypto"></StockDashboard>

    <br><br><br>

      <form id="form" @submit.prevent="lookupStock(input, false)">
          <input type="text" id="inputValue" placeholder=" Enter ticker symbol..." v-model="input">
          <input type="submit" value="Submit" id="btn">
          <div id="error" :style="{'opacity':error?1:0}">INVALID TICKER SYMBOL!</div>
      </form>
      
    <br>
    
    <StockDashboard title="Watch List" v-bind:list="userList" v-on:close="close($event)"></StockDashboard>
  </div>

</template>

<script>
import StockDashboard from '../components/StockDashboard.vue'

const STORAGE_KEY = 'userListStorage'

export default {
  name: 'About',
  components: {
    StockDashboard,
  },
  data() {
    return {
      defaults: [],
      crypto: [],
      input: '',
      userList: [],
      error: false,
    }
  },
  methods: {
    lookupStock(input, initialLoad){
      this.input = ''
      //form.reset()
      fetch(`https://api.tdameritrade.com/v1/marketdata/quotes?apikey=5IUGJ2VEGAB3QW4GEGADIJ7JXC75SEMK&symbol=${input}`, {
      "method": "GET"
      })
      .then(res => res.json())
      .then(res => {
        let data = Object.keys(res).map(key => {
        return res[key]})
        if(data.length === 0 && !initialLoad){
          console.log('errorrrrrrrrrrrr')
          this.error = true
        }
        else{
          console.log(data)
          this.error = false
          for(let i = 0; i < data.length; i++){
            data[i].user = true
            this.userList.push(data[i])
          }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.userList))
        }

      })
      
    },

    close(stock){
      this.userList = this.userList.filter(stocks => stocks !== stock)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.userList))
    }

  },
  mounted() {
    // when refresh, get stocks from localStorage and look them all up again
    this.userList = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    localStorage.clear()
    for(let i = 0; i < this.userList.length; i++){
      this.input += this.userList[i].symbol + ','
    }
    this.userList = []
    this.lookupStock(this.input, true)

    fetch("https://api.tdameritrade.com/v1/marketdata/quotes?apikey=5IUGJ2VEGAB3QW4GEGADIJ7JXC75SEMK&symbol=$DJI,$SPX.X,$NDX.X", {
      "method": "GET"
    })
    .then(response => {
      return response.json()
    })
    .then(stock => {
      var data = Object.keys(stock).map(key => {
      return stock[key];})
      this.defaults = data
      console.log(data)
      for(let i = 0; i < this.defaults.length; i++){
        if(this.defaults[i].symbol === "$DJI"){
          this.defaults[i].symbol = "Dow Jones"
        }
        if(this.defaults[i].symbol === "$SPX.X"){
          this.defaults[i].symbol = "S&P 500"
        }
        if(this.defaults[i].symbol === "$NDX.X"){
          this.defaults[i].symbol = "NASDAQ"
        }
      }
    })
    .catch(err => {
      console.error(err);
    });

    fetch("https://henry-cors-server.herokuapp.com/https://api.nomics.com/v1/currencies/ticker?key=3b2c0423766a315fa1a6fea668ef7154450f1c89&ids=BTC,ETH,DOGE&interval=1d&per-page=100&page=1")
      .then(response => response.json())
      .then(data => {
        this.crypto = data
        for(let i = 0; i < this.crypto.length; i++){
          this.crypto[i].symbol = this.crypto[i].name
          this.crypto[i].lastPrice = parseFloat(this.crypto[i].price)
          this.crypto[i].netChange = parseFloat(this.crypto[i]["1d"].price_change)
          this.crypto[i].netPercentChangeInDouble = parseFloat(this.crypto[i]["1d"].price_change_pct * 100)
        }
        console.log(data)})


  },

}
</script>

<style scoped>

  form{
    text-align: left;
  }

  #error{
    color: red;
    margin-top: 5px;
    font-weight: bold;

  }

  #inputValue {
  height: 40px;
  width: 300px;
  background: #dfdfdf;
  font-weight: bold;
  font-size: 18px;
  text-transform: uppercase;
}

#btn{
  height: 40px;
  width: 100px;
  background: #e7e7e7;
  font-weight: bold;
  font-size: 18px;
  padding: 0;
  margin: 0;
}

@media only screen and (max-width: 600px) {
    #inputValue, #btn{
        font-size: 1.1em;
    }
    #inputValue{
      width: 50%;
      height: 3em
    }
    #btn{
      width: 25%;
      height: 3em
    }

}
</style>