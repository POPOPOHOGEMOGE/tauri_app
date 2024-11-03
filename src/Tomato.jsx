import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'; // Grid version 1
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export function Tomato() {
    const [output, setOutputText] = useState("");
    const [input, setInputText] = useState("");

    async function tomato() {
        setOutputText(await invoke("run_tomato", { input }));
    }

    return (
        <Grid container spacing={3} direction="column" alignItems="center" justify="center">
            <Grid container item xs={12}>
                <TextField
                    id="standard-multiline-static"
                    label="Script"
                    multiline
                    rows={6}
                    color="primary"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    placeholder="Enter tomato script..."
                    onChange={(e) => setInputText(e.currentTarget.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="success" onClick={() => tomato()}>実行</Button>
            </Grid>
            <Grid container item xs={12}>
                <Box
                    component="div"
                    sx={{
                        width: 1,
                        height: '30vh',
                        overflow: 'auto',
                        border: 1,
                        borderColor: 'grey.500',
                        //my: 2,
                        p: 1,
                        borderRadius: 1,
                    }}
                >
                    <Typography component="div" style={{ whiteSpace: "pre-line" }}>
                        処理結果：<br />
                        {output}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}