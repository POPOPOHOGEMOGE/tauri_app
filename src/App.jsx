import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function App() {
  const [output, setOutputText] = useState("");
  const [input, setInputText] = useState("");

  async function tomato() {
    setOutputText(await invoke("run_tomato", { input }));
  }

  return (
    <div className="container">
      <Container maxWidth="lg" sx={{ height: "90vh" }}>
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="default">
              <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                  MiniTomato
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>
        </div>
        <div className="text-input">
          <div>
            <TextField
              id="standard-multiline-static"
              label="Script"
              multiline
              rows={4}
              color="primary"
              variant="outlined"
              fullWidth
              margin="dense"
              placeholder="Enter tomato script..."
              onChange={(e) => setInputText(e.currentTarget.value)}
            />
          </div>
          <div className="exec-ui">
            <Button variant="contained" color="success" onClick={() => tomato()}>実行</Button>
          </div>
        </div>

        <div className="text-output">
          <Card>
            <CardContent>
              <Typography component="div" style={{ whiteSpace: "pre-line" }}>
                処理結果: <br />
                {output}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default App;
