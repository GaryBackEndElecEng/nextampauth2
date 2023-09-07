"use client"
import React from 'react'
import Translate from "./Translate";
import Form from './Form';
import { Grid, Container } from "@mui/material";
import "./translate.css"
// import {Input,FormControl,InputLabel} from "@mui/material";
type formType = {
    loaded: boolean,
    data: {
        text: string,
        source: string,
        target: string,
    }
}
type listType = {

    name: string,
    value: string

}[]
const Index = () => {
    const [show, setShow] = React.useState<boolean>(false);
    const [getWidth, setGetWidth] = React.useState<number>(1400);
    const is_900: boolean = getWidth < 920 ? true : false;
    const vertHorz: {} | undefined = is_900 ? { writingMode: "" } : { writingMode: "vertical-lr" };
    const decoStyle: string = is_900 ? "flex flex-col justify-center items-center" : "flex flex-row justify-center items-center gap-2";

    React.useEffect(() => {
        if (window.innerWidth) {
            setGetWidth(window.innerWidth);
        }
    }, []);

    const list: listType = [
        { name: "select", value: "default" },
        { name: "english", value: "en" },
        { name: "french", value: "fr" },
        { name: "african", value: "af" },
        { name: "arabic", value: "ar" },
        { name: "armenian", value: "hy" },
        { name: "baskish", value: "eu" },
        { name: "belerusian", value: "be" },
        { name: "German", value: "de" },
        { name: "Dutch", value: "nl" },
        { name: "Spanish", value: "eo" },
        { name: "Scottish", value: "gd" },
        { name: "Greek", value: "el" },
        { name: "Indonesian", value: "id" },
        { name: "Japanese", value: "jp" },
        { name: "Persian", value: "fa" },
    ]
    const [contain, setContain] = React.useState<formType>({
        loaded: false,
        data: {
            text: "",
            source: "",
            target: ""
        }
    })




    return (
        <Container maxWidth="lg" className=" translateContainer px-1 mt-10 flex flex-col items-center min-h-[100vh] bg-white text-black dark:bg-black dark:text-white my-2 p-2 rounded-lg">
            <h1 className="text-5xl text-center mx-auto my-1 mb-2"> Translate page</h1>
            <div className="flex flex-row flex-wrap mx-auto justify-center items-center p-2 mx-3 gap-3 w-full lg:w-1/2  my-10 rounded-lg shadow-xl shadow-indigo-800">

                <h2 className="text-xl m-auto text-center font-bold" >languages:</h2>
                {list && list.map(obj => (
                    <div key={obj.name} className="text-center">{obj.name}</div>
                ))}
            </div>


            
            <Grid container spacing={{ xs: 3, sm: 2 }} className=" justify-center items-center p-2">
                <Grid item xs={12} md={2}>
                    <div className={decoStyle}>
                        <p className="translate m-3 text-5xl" style={vertHorz}>TRANSLATE</p>
                        <p className="m-3 text-3lg">15 languages to choose from </p>
                    </div>
                </Grid>
                <Grid item xs={12} md={8} className="mx-auto shadow-lg shadow-black ">
                    <h3 className="text-2xl text-center m-auto align-middle">Translate</h3>
                    <Form
                        contain={contain}
                        list={list}
                        setContain={setContain}
                        setShow={setShow}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <div className={decoStyle}>
                        <p className="m-3 text-3lg">select the source and target </p>
                        <p className="translate m-3 text-5xl" style={vertHorz}>TRANSLATE</p>

                    </div>
                </Grid>
            </Grid>
            <div className="mx-auto container px-5 flex flex-col justify-center items-center my-1 min-h-[10vh] w-full">
                {contain.loaded && <Translate phrase={contain.data.text} source={contain.data.source} target={contain.data.target} />}
            </div>
        </Container>
    )
}

export default Index