import {Ichimatsu} from "./Ichimatsu.jsx";
import {Tomato} from "./Tomato.jsx";

export function MainArea(props) {
    let main_area = props.main_area;
    if (main_area == "is_in_tomato") {
        return <Tomato />;
    }
    else if  (main_area == "is_in_ichimatsu") {
        return <Ichimatsu />;
    }
}