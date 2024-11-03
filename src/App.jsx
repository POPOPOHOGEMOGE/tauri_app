import { useState } from "react";

import { styled, useTheme } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar from '@mui/material/AppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles'

//import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';


import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';
import { MainArea } from "./MainArea.jsx";

import ichimatsuicon from "./assets/ichimatsu.svg"


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function App() {

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [main_area, setMainArea] = useState("is_in_tomato");

  const changeMainAreaToTomato = () => {
    setMainArea("is_in_tomato");
  };
  const changeMainAreaToIchimatsu = () => {
    setMainArea("is_in_ichimatsu");
  };
  const changeMainAreaToMandelbrot = () => {
    setMainArea("is_in_mandelbrot");
  };

  function AppBarTitle() {
    if (main_area == "is_in_tomato") {
        return "Tomato";
    }
    else if  (main_area == "is_in_ichimatsu") {
        return "Ichimatsu";
    }
    else if  (main_area == "is_in_mandelbrot") {
      return "Mandelbrot";
  }
}


  const theme = useTheme();

  const color_theme = createTheme({
    palette: {
      mode: 'dark'
      //mode: 'light'
    }
  });



  return (
    <ThemeProvider theme={color_theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItemButton onClick={changeMainAreaToTomato}>
              <ListItemIcon>
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText primary="Tomato" />
            </ListItemButton>
            <ListItemButton onClick={changeMainAreaToIchimatsu}>
              <ListItemIcon>
                <img src={ichimatsuicon} />
              </ListItemIcon>
              <ListItemText primary="Ichimatsu" />
            </ListItemButton>
            <ListItemButton onClick={changeMainAreaToMandelbrot}>
              <ListItemIcon>
                <img src={ichimatsuicon} />
              </ListItemIcon>
              <ListItemText primary="Mandelbrot" />
            </ListItemButton>
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />

          <Container maxWidth="false" sx={{ height: "80vh" }}>

            <AppBar position="fixed" color="default" open={open}>
              <Toolbar >
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen} sx={{ mr: 2, ...(open && { display: 'none' }) }}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                  {AppBarTitle()}
                </Typography>
              </Toolbar>
            </AppBar>



            <MainArea main_area={main_area} />

          </Container >
        </Main>
      </Box>
    </ThemeProvider>
  );
}

export default App;
