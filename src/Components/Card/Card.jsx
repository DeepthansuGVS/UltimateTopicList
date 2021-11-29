import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard({image_url, title, text, profile}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image = {`${image_url}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${title}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${text}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {`${profile}`}
        </Button>
      </CardActions>
    </Card>
  );
}
