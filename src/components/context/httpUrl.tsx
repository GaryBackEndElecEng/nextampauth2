

export default function httpUrl():string{
    if(process.env.NODE_ENV ==="production"){
        // return "https://www.masterultils.com"
        return "http://127.0.0.1:3000"
    }else{
        return "http://127.0.0.1:3000"
    }
}