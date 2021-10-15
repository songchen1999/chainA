import * as React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function Exchange({data}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={data.img}
        alt={data.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container space={2}>
          
                <Typography gutterBottom variant="h7" component="div">
                    Buy One Ether at {data.eth.buy}, sell at {data.eth.sell}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                    Buy One Bitcoin at {data.btc.buy}, sell at {data.btc.sell}
                </Typography>
          
        </Grid>
        
      </CardActions>
    </Card>
  );
}