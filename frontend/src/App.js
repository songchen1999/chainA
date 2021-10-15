import Grid from '@mui/material/Grid';
import  { useEffect, useState } from "react"
import Exchange from './exchange/exchange';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Loading from "./loading/loading"

const axios = require('axios').default

function App() {

  let link = "https://pacific-basin-13963.herokuapp.com/" || "http://localhost:80"
  const [prices,setPrices] = useState([])

  const suite = [
    {name: "Bittrex",img:"https://cryptotips.eu/wp-content/uploads/2020/06/bittrex-review.png"},
  
    {name: "Kraken",
    img: "https://logos-world.net/wp-content/uploads/2021/02/Kraken-Emblem.png"},
    
  ]


  useEffect(() => {
    let mounted = true;
    axios.get(link)
      .then(items => {
        if(mounted) {
          console.log(items)
          setPrices(items.data)

        }
      })
    return () => mounted = false;
  }, [])

  return (
    <div>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Price Comparision 
        </Typography>
          {
            prices.length>1?
          <Typography variant="h5" align="center" color="text.secondary" component="p">
            It's recommeded to buy Ether at {suite[(prices[0].eth.buy>prices[1].eth.buy)?1:0].name}, and sell at {suite[(prices[0].eth.sell>prices[1].eth.sell)?0:1].name}. 
            It's recommeded to buy Bitcoin at {suite[(prices[0].btc.buy>prices[1].btc.buy)?1:0].name}, and sell at {suite[(prices[0].btc.sell>prices[1].btc.sell)?0:1].name}
          </Typography> : <Loading/>
          }
      </Container>

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">

        {
        prices.map(
          (price,index) => { 
            return (
              <Grid
              justifyContent='center'
                  item
                  xs={14}
                  sm={6}
                  md={6}
              >
                  <Exchange data={{...price,...suite[index]}} />
              </Grid>
              )
          }
        )}
        </Grid>
        
      </Container>
      </div>
    
  );
}

export default App;
