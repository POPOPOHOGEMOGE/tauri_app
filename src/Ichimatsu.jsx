import { invoke } from "@tauri-apps/api/tauri";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


export function Ichimatsu() {
    async function generate_ichimatsu() {
        await invoke("run_ichimatsu");
    }
    return (
        <Grid container spacing={3} direction="column" alignItems="center" justify="center">
            <Grid item xs={12}>
                <Button variant="contained" color="success" onClick={() => generate_ichimatsu()}>生成</Button>
            </Grid>
        </Grid>
    );
}