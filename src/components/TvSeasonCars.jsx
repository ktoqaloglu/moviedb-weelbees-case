import { Card, CardContent, CardHeader, Chip, Typography } from "@mui/material"
import EmptyImg from '../assets/images/not-available.jpeg'

const TvSeasonsCards = (props) => {
  return (
    <div className="my-4">
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>                  
            <div className="flex sm:flex-col md:flex-row">
                <img className="object-fit md:w-1/6"
                alt={props.name}
                src={props.poster ? `https://image.tmdb.org/t/p/w300${props.poster}` : EmptyImg}
                />
                <div className="w-full">
                    <CardHeader
                        title={
                        <Typography variant="subtitle1" component="h6" fontWeight="bold">{props.title}</Typography>}/>
                    <CardContent className="mt-1 p-0">
                        <Typography variant="subtitle2" component="p">
                        {props.overview === "" ? "---" : props.overview}
                        </Typography>
                        <Typography variant="subtitle2" fontWeight="bold" component="p">Total Episode: {props.episodes}</Typography>
                        <div className="float-right bottom-0 my-2">
                            <Chip  label={"Air: "+props.air_date} color="secondary"/>
                        </div>
                    </CardContent>
                </div>
            </div>
        </Card>
    </div>
  )
}

export default TvSeasonsCards