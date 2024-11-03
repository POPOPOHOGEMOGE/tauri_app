import {Ichimatsu} from "./Ichimatsu.jsx";
import {Tomato} from "./Tomato.jsx";
import {Mandelbrot} from "./Mandelbrot.jsx";

export function MainArea(props) {
    let main_area = props.main_area;
    if (main_area == "is_in_tomato") {
        return <Tomato />;
    }
    else if  (main_area == "is_in_ichimatsu") {
        return <Ichimatsu />;
    }
    else if  (main_area == "is_in_mandelbrot") {
        return <Mandelbrot />;
    }
}