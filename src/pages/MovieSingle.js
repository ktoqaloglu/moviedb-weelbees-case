import {useState, useEffect} from 'react';
import { baseService } from '../services/baseService';
import { API_KEY } from "../services/config";
import { useParams } from 'react-router'
import { Button, Chip, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import CreditMovieCard from '../components/CreditMovieCard';
import EmptyImg from '../assets/images/not-available.jpeg';
import millify from 'millify';

const MovieSingle = () => {
  
  const {movie_id} = useParams();
  const [movieDetails, setMovieDetails] = useState();
  const [movieCredits, setMovieCredits] = useState([]);
  const [movieTrailer, setMovieTrailer] = useState([]);

  const getMovieDetails= async ()=>{
      const data = await baseService.get(`/movie/${movie_id}?api_key=${API_KEY}&language=en-US`)
      setMovieDetails(data)
      
  }
  const getMovieCredits= async ()=>{
    const data = await baseService.get(`/movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`)
    return data.cast;
    
  }
  const getMovieTrailer= async ()=>{
    const data = await baseService.get(`/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`)
    setMovieTrailer(data.results)
    
  }
  useEffect(()=> { 
    const fetchApi = async () => {
    getMovieDetails()
    setMovieCredits(await getMovieCredits())
    getMovieTrailer()
    }
    fetchApi()
    },[movie_id])     

    return (
  <div className="container mx-auto px-4">
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center text-center" >
        {movieDetails && movieDetails.title &&  <Typography  variant="h4">{movieDetails.title}</Typography>}
        <div className="text-right">
          {movieDetails && movieDetails.vote_average && <Chip className="mr-2" label={"Vote: "+movieDetails.vote_average} color="success" />}
          {movieDetails && movieDetails.vote_count && <Chip label={"Vote Count: "+millify(movieDetails.vote_count)} color="success" />}
        </div>
      </div>
      <div className="my-2">
        <Grid container spacing={2}>
          <Grid item md={4} sm={6} xs={12}>
            <Box
              component="img"
              width="100%"
              alt={ movieDetails?.tagline}
              src={movieDetails?.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}` : EmptyImg }
            />
          </Grid>
          <Grid item md={8} sm={6} xs={12}>
            {movieDetails && movieDetails.genres && movieDetails.genres.map((genre) =>(
              <Chip className="m-1" label={genre.name} key={genre.id} />
            ))}
            {movieDetails && movieDetails.overview && <Typography mt={2} mb={2} variant="subtitle1">{movieDetails?.overview}</Typography>}
            {movieDetails && movieDetails.imdb_id && <Button size="small" target="_blank" variant="outlined" href={`https://www.imdb.com/title/${movieDetails?.imdb_id}`}>IMDB PAGE</Button>}
            <Typography mt={2} variant="h4">Production</Typography>
            {movieDetails && movieDetails.production_companies && movieDetails.production_companies.map((company) =>(
              <Chip className="m-1" label={company.name} key={company.id} />
            ))}
              <Typography variant='h6' className="my-1">Other Details</Typography>
              <Grid container spacing={1}>
                <Grid item xs={6} md={4}>
                {movieDetails && movieDetails.popularity &&
                    <Typography>
                    {"Popularity: "+millify(movieDetails?.popularity)}
                    </Typography>}
                </Grid>
                <Grid item xs={6} md={4}>
                {movieDetails && movieDetails.release_date &&
                    <Typography>
                    {"Relase: "+movieDetails?.release_date}
                    </Typography>}
                </Grid>
                <Grid item xs={6} md={4}>
                  {movieDetails && movieDetails.production_countries && 
                  movieDetails?.production_countries.map((country,key) =>(
                    <Typography key={key}>
                    {"Origin: "+country?.name}
                    </Typography>
                  ))}
                </Grid>
                <Grid item xs={6} md={4}>
                  {movieDetails && movieDetails.budget &&
                    <Typography>
                    Budget: {movieDetails.budget === 0 ? "-" : millify(movieDetails.budget) }
                    </Typography>}
                </Grid>
                <Grid item xs={6} md={4}>
                  {movieDetails && movieDetails.budget &&
                    <Typography>
                    Revenue: {movieDetails.revenue === 0 ? "-" : millify(movieDetails.revenue)}
                    </Typography>}
                </Grid>
              </Grid>
          </Grid>
        </Grid>
      </div>
      {movieTrailer[0] &&
        <iframe
          title={movieTrailer[0]?.name}
          id={movieTrailer[0]?.id}
          className="video-iframe my-2" 
          width="100%"
          height="400rem"
          src={`https://www.youtube.com/embed/${movieTrailer[0]?.key}`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        /> 
      }
      <Typography mb={2} variant="h3">Cast</Typography>
      <Grid container spacing={1}>
        {movieCredits && movieCredits.map((people) => (
        <Grid item xs={6} sm={4} md={3} key={people.id}>
          <Link to={`/person/${people.id}/`}>
            <CreditMovieCard poster={people?.profile_path} title={people?.name} character={people?.character} vote_average={millify(people?.popularity)}/>
          </Link>
        </Grid>
        ))}
      </Grid>
    </div>
  </div> 
  )
}

export default MovieSingle