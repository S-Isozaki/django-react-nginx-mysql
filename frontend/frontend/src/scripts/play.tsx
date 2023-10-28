export default function generateRandomString (len: number) {
    
    var c = "abcdefghijklmnopqrstuvwxyz0123456789";
    
    var cl = c.length;
    var r = "";
    for(var i=0; i<len; i++){
        r += c[Math.floor(Math.random()*cl)];
    }
    return r;
}