"use client";
import React from 'react';
import axios, { AxiosError } from 'axios';
import Dollar from "./Dollar";
import CurrencyItem from './CurrencyItem';
import { Grid } from "@mui/material";
import Countries from './Countries';



type typeCurrType = { ky: string, val: string }
type keyType = { key: string, loaded: boolean }
type countryCodeType={
    name: string;
    code: string;
}
const MainCurrency = () => {
    const currency_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json";
    const [selectCurrency, setSelectCurrency] = React.useState<string | undefined>("");
    const [countryCode, setCountryCode] = React.useState<countryCodeType | null>(null);
    const [currency, setCurrency] = React.useState<typeCurrType[]>([]);
    const [currItem, setCurrItem] = React.useState<typeCurrType | null>(null);
    const [getCurrArr, setGetCurrArr] = React.useState<typeCurrType[] | null>(null)
    const [putKey, setPutKey] = React.useState<keyType>({ loaded: false, key: "" })
    const [keyCmp, setKeyCmp] = React.useState<string>("")
    React.useEffect(() => {
        async function getCurrency() {
            try {
                const res = await axios.get(currency_url);
                const body = res.data;
                const keys: (string)[] = Object.keys(body)
                const values: (string)[] = Object.values(body)
                let arr: any = [];
                for (let i: number = 0; i < keys.length; i++) {
                    let temp: typeCurrType = { ky: keys[i], val: values[i] }
                    arr.push(temp)
                }
                setCurrency(arr)

            } catch (error) {
                (error: AxiosError) => console.error(error.message)
            }
        }
        getCurrency();
    }, []);

    React.useEffect(() => {
        if (currency.length > 0 && selectCurrency) {
            const getCurr: typeCurrType[] = currency.filter(curr => (curr.val.toLowerCase().includes(selectCurrency.toLowerCase())))
            setGetCurrArr(getCurr.length > 0 ? getCurr : null)
        }
    }, [selectCurrency, currency]);

// console.log("putKey",putKey,"countryCode",countryCode,"currItem",currItem)

    return (
        <div className="container mx-auto my-2 text-black bg-white dark:bg-black dark:text-white" style={{ minHeight: "60vh" }}>
            <h2 className="text-5xl text-center mb-10">Fx rates</h2>
            <Grid container spacing={{ xs: 3, sm: 2 }} className=" " >
                <Grid item xs={12} md={6} className="px-2 mx-auto">
                    <div className="flex flex-col m-auto">

                        <label className="text-3lg text-center" htmlFor={"select currency"}>select a base currency</label>
                        <input type="text" id="select currency" className="m-auto text-center bg-[whitesmoke] border rounded-md shadow-lg shadow-site-blue-light" value={selectCurrency && selectCurrency} onChange={(e) => setSelectCurrency(e.target.value)} />
                        <div className="flex flex-col py-4 px-0 my-2 mx-1 justify-center items-start ">
                            <label htmlFor={"keyCmp"}>select a currency</label>
                            <select name="keyCmp" id="keyCmp" className="m-auto max-w-[225px] flex flex-col items-center justify-center flex-wrap bg-[whitesmoke] border rounded-md shadow-lg shadow-site-blue-light" onChange={(e) => setKeyCmp(e.target.value)}>
                                {currency ? currency.map((curr, index) => (
                                    <option value={curr.ky} key={`${curr.ky}--${index}`}
                                    className="border text-green font-bold"
                                    >
                                        {curr.val.split("").slice(0,25).join("")}
                                    </option>
                                ))
                                    :
                                    <option className="m-auto" value={"usd"} >loading</option>
                                }
                            </select>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} className="">
                    {putKey.loaded &&
                        <Dollar getKey={putKey && putKey} keyCmp={keyCmp} />
                    }
                </Grid>

            </Grid>
            <Grid container spacing={{xs:3,sm:2}} className="">
                <Grid item xs={12} md={4}>
                {getCurrArr && 
                <div className="flex flex-col">
                <h3 className="m-auto text-center text-violet-500 text-2xl">typed: {selectCurrency && selectCurrency}</h3>
                <Countries 
                selectCurrency={selectCurrency}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
                currItem={currItem}
                />
                </div>
                }
                </Grid>
                <Grid item xs={12} md={8} className="m-auto flex flex-col justify-start align-center h-[30vh] overflow-y-scroll"
                sx={{height:"30vh",display:"flex",flexDirection:"column",justifyContent:"flex-start"}}
                >
                        {(getCurrArr && selectCurrency) ? getCurrArr.map((obj: typeCurrType, index: number) => (
                            <div key={obj.ky}>
                                <CurrencyItem 
                                obj={obj}
                                 setPutKey={setPutKey}
                                 countryCode={countryCode}
                                 setCurrItem={setCurrItem}
                                 />
                            </div>
                        ))
                            :
                            <div><h3>waiting...</h3></div>
                        }
                    
                </Grid>

            </Grid>
            

        </div>
    )
}

export default MainCurrency