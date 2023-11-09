import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Timer from '../components/Timer';
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

const Play = () => {
    const length = Number(new URLSearchParams(useLocation().search).get('length'));
    const canvasRef = useRef(null);
    const str = generateRandomString(length);
    useEffect(() => {
        const canvas = canvasRef.current! as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        canvas.width = 1080;
        canvas.height = 500;
        renderString(canvas, length, str);
        
        var index = 0;
        window.addEventListener('keydown', (e) => {
            const char = e.key;
            if(char === str[index]){
                changeColor(canvas, index, str[index], 'red');
                index++;
                if(index === length){
                    client.post(
                        '/typinggame/addrecord',
                        {
                            user_name: 'pqooo',
                            elapsed_time: 10.000,
                            word_length: length,
                        },
                    )
                }
            }else{
                for(;;){
                    changeColor(canvas, index, str[index], 'gray');
                    if(index === 0) break;
                    index--;
                }
            }
        })
    })
    return (
        <>
            <Timer />
            <canvas id="display" ref={canvasRef}></canvas>
        </>
    )
}
export default Play;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// sub functions
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const changeColor = (canvas: HTMLCanvasElement, index: number, str: string, color: string) => {
    var ctx = canvas.getContext("2d")!;
    var width = ctx.measureText(str).width;
    ctx.clearRect(10 + (index % 25) * 20, 50 + Math.floor(index / 25) * 50, 20, -50);
    ctx.fillStyle = color;
    ctx.fillText(str, 10 + (index % 25) * 20 + (20 - width) / 2, 50 + Math.floor(index / 25) * 50);
}

const renderString = (canvas: HTMLCanvasElement, length: any, str: string) => {
    var ctx = canvas.getContext("2d")!;
    const numberOfColumn = 25;
    var numberOfRow = length / 25;
    for(var i = 0; i < numberOfRow; i++){
        for(var j = 0; j < numberOfColumn; j++){
            var index = numberOfColumn * i + j;
            ctx.font = "20px Roboto Mono";
            var width = ctx.measureText(str[index]).width;
            ctx.fillStyle = "gray";
            ctx.fillText(str[index], 10 + j * 20 + (20 - width) / 2, 50 + i * 50)
        }
    }
}

const generateRandomString = (len: number) => {
    var c = "abcdefghijklmnopqrstuvwxyz0123456789";
    
    var cl = c.length;
    var r = "";
    for(var i=0; i<len; i++){
        r += c[Math.floor(Math.random()*cl)];
    }
    return r;
}