import {useState, useEffect} from 'react';
import { baseService } from '../services/baseService';
import { API_KEY } from "../services/config";
import { useParams } from 'react-router';
import { Box, Typography, Grid, Button, Chip} from '@mui/material';
import { Link } from 'react-router-dom';
import CreditMovieCard from '../components/CreditMovieCard';
import EmptyImg from '../assets/images/not-available.jpeg';
import millify from 'millify';

const People = () => {

  const { person_id } = useParams()
  const [ personDetails, setPersonDetails ] = useState()
  const [ creditDetails, setCreditDetails ] = useState([])
  
  const getPersonDetails= async () =>{
    const data = await baseService.get(`/person/${person_id}?api_key=${API_KEY}`)
    setPersonDetails(data) 
  }
  const getCreditDetails= async () =>{
    const data = await baseService.get(`/person/${person_id}/movie_credits?api_key=${API_KEY}`)
    setCreditDetails(data.cast) 
  }
  useEffect(()=> { 
    const fetchApi = async () => {
    getPersonDetails()
    getCreditDetails()
    }
    fetchApi()
    },[person_id])   
  
  return (

    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center text-center my-4">
        {personDetails &&  <Typography mt={2} fontWeight="300"  variant="h3">{personDetails.name}</Typography>}
        <div className="text-right">
        {personDetails && <Chip label={"Popularity: "+millify(personDetails.popularity)} color="success" />}
        </div>
      </div>
      <Grid container spacing={1}>
        <Grid item md={4} sm={4} xs={12}>
          <Box
            justifyContent="center"
            component="img"
            alt={ personDetails?.name}
            src={personDetails?.profile_path ? `https://image.tmdb.org/t/p/w300${personDetails?.profile_path}` : EmptyImg }
            borderRadius=".5rem"
          />
        {personDetails  && <div className="my-4" ><Button size="small" target="_blank" variant="outlined" href={`https://www.imdb.com/name/${personDetails?.imdb_id}`}>GO TO IMDB</Button></div>}
        </Grid>
        <Grid item md={8} sm={8} xs={12}>
          <Typography variant="h5" mb={3} fontWeight="semi-bold">Biography</Typography>
          <Typography variant="subtitle2" mb={1}>{personDetails?.biography}</Typography>
          <Typography variant="h6" mt={3} mb={1} textAlign="end" fontWeight="semi-bold">Personal Details</Typography>
          {personDetails && (personDetails.birthday ? <Typography textAlign="end">{"Born: "+personDetails?.birthday + " in " + personDetails?.place_of_birth}</Typography> : "" )}
          {personDetails && personDetails.gender && (personDetails.gender === 1 ? <Typography textAlign="end">Gender: Female</Typography> : <Typography textAlign="end">Gender: Male</Typography>)}
        </Grid>
      </Grid>
        <Typography variant="h5" textAlign="end" fontWeight="bold" mb={2} mt={2}>Projects</Typography>
      <Grid container  spacing={1}>
        {creditDetails &&
        creditDetails.map((credit) => (
        <Grid item key={credit?.credit_id} xs={6} sm={4} md={3}>
          <Link to={`/movie/${credit?.id}`}>
            <CreditMovieCard poster={credit?.poster_path} title={credit?.title} character={credit?.character} vote_average={credit?.vote_average}/>
          </Link>
        </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default People