import { useState } from "react";

import { invoke } from "@tauri-apps/api/tauri";
import { convertFileSrc } from '@tauri-apps/api/tauri';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';

export function Mandelbrot() {

    const [multi_threading, setMultiThreading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [imagehash, setImageHash] = useState();
    const [proc_time, setProcTime] = useState('');

    function ImageArea() {
        setUrl(convertFileSrc("./mandelbrot.png"));
        if (loading) {
            return <CircularProgress />;
        } else {
            return <img src={`${url}?${imagehash}`} alt="No Image" />;
        }
    }

    function generate_args_vec() {
        let array = [];
        array.push("mandelbrot.png");
        array.push(document.getElementById('width').value + 'x' + document.getElementById('height').value);
        array.push(document.getElementById('upper_left_re').value + ',' + document.getElementById('upper_left_im').value);
        array.push(document.getElementById('lower_right_re').value + ',' + document.getElementById('lower_right_im').value);
        if (multi_threading) {
            array.push("multi");
        } else {
            array.push("single");
        }
        return array;
    }

    async function generate_mandelbrot(array) {
        setLoading(true);
        setProcTime(await invoke("run_mandelbrot", { args: array }));
        setImageHash(new Date().getTime());
        setLoading(false);
    }

    return (
        <Grid container spacing={3} direction="column" alignItems="center" justify="center">
            <Grid item xs={12}>
                <TextField
                    required
                    id="width"
                    variant="outlined"
                    label="横幅(pixel)"
                    defaultValue="1000"
                />
                <TextField
                    required
                    id="height"
                    variant="outlined"
                    label="縦幅(pixel)"
                    defaultValue="750"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    id="upper_left_re"
                    variant="outlined"
                    label="左上実部"
                    defaultValue="-1.20"
                />
                <TextField
                    required
                    id="upper_left_im"
                    variant="outlined"
                    label="左上虚部"
                    defaultValue="0.35"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    id="lower_right_re"
                    variant="outlined"
                    label="右下実部"
                    defaultValue="-1"
                />
                <TextField
                    required
                    id="lower_right_im"
                    variant="outlined"
                    label="右下虚部"
                    defaultValue="0.20"
                />
            </Grid>
            <Grid item xs={12}>
                マルチスレッド：
                <Switch checked={multi_threading} onChange={(e) => setMultiThreading(e.target.checked)} />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="success" onClick={() => generate_mandelbrot(generate_args_vec())}>生成</Button>
            </Grid>
            <Grid item xs={12}>
                <ImageArea />
            </Grid>
            <Grid item xs={12}>
                {proc_time}
            </Grid>

        </Grid>
    );
}