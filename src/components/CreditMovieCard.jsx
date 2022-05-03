import { Badge, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import EmptyImg from '../assets/images/not-available.jpeg'

const MovieCard = (props) => {
  return (
    <div className="min-h-96">
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>                  
          <CardMedia
            component="img"
            image={props.poster ? `https://image.tmdb.org/t/p/w300${props.poster}` : EmptyImg}
            alt={props.title}
          />
        <CardHeader 
          title={
          <Typography variant="subtitle1" component="h6" fontWeight="bold">{props.title}</Typography>
          }
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="subtitle2" component="p">
          {props.character}
          </Typography>
          <div className="float-right bottom-0 pr-2">
          <Badge className="card-badge" badgeContent={props.vote_average} color="secondary"/>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MovieCard