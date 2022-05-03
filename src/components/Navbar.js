import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import LOGO from '../assets/images/logo.png'
const logoCSS = {
    height: "3em",
    backgroundColor: "transparent",
    textAlign: "center",
    marginBottom: "2em",
    width: "100%"
}


const ResponsiveAppBar = () => {
  return (
    <div className="flex flex-wrap-reverse align items-center justify-center m-1">
      <Link to="/">
        <Box
        height="6rem"
        component="img"
        alt="wellbess case"
        src={ LOGO }
        />
      </Link>
    </div>
  );
};
export default ResponsiveAppBar;