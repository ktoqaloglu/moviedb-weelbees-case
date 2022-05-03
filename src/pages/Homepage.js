import React, {useState, useEffect} from 'react';
import { baseService } from '../services/baseService';
import { API_KEY } from "../services/config";
import { Grid, Tabs, Tab, Typography, Pagination, TextField} from '@mui/material'; 
import { Link } from 'react-router-dom';
import { useDebouncedValue } from '@mantine/hooks';
import millify from 'millify';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from '../stores/page';

const Homepage = () => {
  
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState();
  const [searchResults, setsearchResults] = useState([]);
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 700);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
 
  const page = useSelector(state => state.page.value)
  const dispatch = useDispatch()

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  const getPopularMovies= ()=>{
    baseService.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)
    .then(data =>setPopularMovies(data.results))
  }
  useEffect(()=> { 
    getPopularMovies() 
    window.scrollTo({top: 0})
    },[page])

  const getSearchResults = () => {
    baseService.get(`/search/multi?api_key=${API_KEY}&language=en-US&query=${searchQuery}`)
    .then(data=>setsearchResults(data.results)) 
    setIsLoading(false)
  }
  useEffect(() => {
    if(!searchQuery) return
      getSearchResults()
  },[debouncedSearchQuery])
    
    return ( 
    <div className="container  mx-auto px-4">
      <div  className="container mx-auto px-4">
        <TextField  fullWidth className="search-bar" color="primary" label="Search for anything" size="small" onChange={(e) => {
          e.target.value === '' ? setIsLoading(false) : setIsLoading(true)
          setSearchQuery(e.target.value)}}/>
        {isLoading === true &&
          <Loader />
        }
        {searchResults.length > 0 && isLoading === false &&
        <div className="border-b-2 flex justify-center mb-4">
          <Tabs  value={selectedTab} onChange={handleTabChange} >
            <Tab label="Movies"  />
            <Tab label="Tv"/>
            <Tab label="Person" />
          </Tabs>
        </div> 
        }
        <TabPanel value={selectedTab} index={0}>
          <Grid container spacing={1}>          
            {searchResults.filter(result => result.media_type === "movie").map(filteredResult =>(
              <Grid item key={filteredResult.id} xs={6} sm={4} md={3}>
                <Link to={`/movie/${filteredResult.id}`}>
                  <MovieCard  poster={filteredResult?.poster_path} title={filteredResult?.title} vote_average={filteredResult?.vote_average} />
                  </Link>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
        <Grid container spacing={1}>          
            {searchResults.filter(result => result.media_type === "tv").map(filteredResult =>(
              <Grid item key={filteredResult.id} xs={6} sm={4} md={3}>
                <Link to={`/tv/${filteredResult.id}`}>
                  <MovieCard  poster={filteredResult?.poster_path} title={filteredResult?.name} vote_average={filteredResult?.vote_average} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
        <Grid container spacing={1}>          
            {searchResults.filter(result => result.media_type === "person").map((filteredResult) =>(
              filteredResult.length === 0 ? console.log("sonuç sıfır") :
              <Grid item key={filteredResult.id} xs={6} sm={4} md={3}>
                  <Link to={`/person/${filteredResult.id}`}>
                    <MovieCard poster={filteredResult?.profile_path} title={filteredResult?.name} vote_average={millify(filteredResult?.popularity)} />
                  </Link>               
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </div>
        
      <div className="container mx-auto px-4 mt-12">
        <Typography variant="h6" align="left" color="text.primary" paragraph>
              Most Popular Movies
        </Typography>
        <Grid container  spacing={1}>
          {popularMovies.map((movie) => (
            <Grid item key={movie.id} xs={6} sm={4} md={3}>
            <Link to={`/movie/${movie.id}`}>
              <MovieCard poster={movie?.poster_path} title={movie?.title} vote_average={movie?.vote_average} />
              </Link>
            </Grid>
          ))}
        </Grid>
        <div className="flex justify-center mt-4">
          <Pagination count={200} color="primary" onChange={(event,value) => dispatch(changePage(value))} />
        </div>
      </div>
    </div>
  );
}

function TabPanel(props) {
  const {children, value, index} = props;
  return(<div>
    {
      value === index && (
        <h1>{children}</h1>
      )
    }
  </div>)
}

export default Homepage

