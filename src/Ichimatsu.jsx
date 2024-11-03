import { useState } from "react";

import { invoke } from "@tauri-apps/api/tauri";
import { convertFileSrc } from '@tauri-apps/api/tauri';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Switch from '@mui/material/Switch';

export function Ichimatsu() {

    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [imagehash, setImageHash] = useState();

    function ImageArea() {
        setUrl(convertFileSrc("./ichimatsu.png"));
        if (loading) {
            return <CircularProgress />;
        } else {
            return <img src={`${url}?${imagehash}`} alt="No Image" />;
        }
    }

    async function generate_ichimatsu() {
        {/*setLoading((prevState) => !prevState);*/}
        setLoading(true);
        await invoke("run_ichimatsu");
        setImageHash(new Date().getTime());
        setLoading(false);
    }

    return (
        <Grid container spacing={3} direction="column" alignItems="center" justify="center">
            <Grid item xs={12}>
                <Button variant="contained" color="success" onClick={() => generate_ichimatsu()}>生成</Button>
            </Grid>
            <Grid item xs={12}>
                <Switch checked={loading} onChange={(e) => setLoading(e.target.checked)} />
            </Grid>
            <Grid item xs={12}>
                <ImageArea />
                {/*<br/>{url}*/}
            </Grid>
        </Grid>
    );
}