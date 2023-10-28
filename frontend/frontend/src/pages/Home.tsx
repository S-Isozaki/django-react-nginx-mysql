import { Link } from "react-router-dom";
import PlayingField from "./PlayingField";

export default function Home () {
    return (
        <div>
            <h1>home</h1>
            <Link to={`/playingfield`}>Playing Field</Link>
        </div>
    )
}