import React , { useRef, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import generateRandomString from '../scripts/play';
import { Navigate } from "react-router-dom";

const Play: React.FC = () => {
    const [shouldRedirect, setShoudRedirect] = useState<boolean>(false);
    const search = useLocation().search;
    const query = new URLSearchParams(search);
    const length = Number(query.get('length'));
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current! as HTMLCanvasElement;
        var array = new Array(length);
        var str = generateRandomString(length);
        const numberOfColumn = 25;
        var numberOfRow = length / 25;
        for(var i = 0; i < numberOfRow; i++){
            for(var j = 0; j < numberOfColumn; j++){
                var index = numberOfColumn * i + j;
                array[index] = canvas.getContext("2d");
                array[index].font = "20px Roboto Mono";
                var width = array[index].measureText(str[index]).width;
                array[index].fillText(str[index], 10 + j * 20 + (20 - width) / 2, 50 + i * 50)
            }
        }
        index = 0;
        window.addEventListener('keydown', (e)=>{
            const char = e.key;
            if(char === str[index]){
                width = array[index].measureText(str[index]).width;
                array[index].clearRect(10 + (index % 25) * 20, 50 + Math.floor(index / 25) * 50, 20, -50);
                array[index].fillStyle = "red";
                array[index].fillText(str[index], 10 + (index % 25) * 20 + (20 - width) / 2, 50 + Math.floor(index / 25) * 50);
                index++;
                if(index === length){
                    setShoudRedirect(true);
                }
            }else{
                for(;;){
                    width = array[index].measureText(str[index]).width;
                    array[index].clearRect(10 + (index % 25) * 20, 50 + Math.floor(index / 25) * 50, 20, -50);
                    array[index].fillStyle = "gray";
                    array[index].fillText(str[index], 10 + (index % 25) * 20 + (20 - width) / 2, 50 + Math.floor(index / 25) * 50);
                    if(index === 0) break;
                    index--;
                }
            }
        })
    })
    if(shouldRedirect){
        return <Navigate to={"/result"}/>
    }
    return (
        <>
            <canvas width="1000" height="500" ref={canvasRef}></canvas>
        </>
    )
}

export default Play;