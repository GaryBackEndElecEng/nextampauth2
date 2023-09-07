"use client";
import React, { MouseEvent } from 'react'
import { inputType } from "@/components/ultils/scraper/IndexScrapper";
import { FormControl, Input, FormHelperText } from "@mui/material";
import { jsonArrType } from "@/components/ultils/scraper/type";
import ShowArray from "@/components/ultils/scraper/ShowAmazonArray";

const InputFormAWS = () => {
  const [msg, setMsg] = React.useState<string | null>(null);
  const [url_, setUrl_] = React.useState<string | null>(null);
  const [urls, setUrls] = React.useState<string[]>([]);
  const [jsonArr, setJsonArr] = React.useState<jsonArrType[]>([]);


  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    const url = `http://localhost:3000/api/URL?url=${urls}`
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
    }
    try {
      const res = await fetch(url, options);
      const body = await res.json();
      // console.log(body)
      setJsonArr(body.data)
    } catch (error) {
      console.error(new Error("did not recieved- something went wrong with the 200-return"))
    }
  };

  const handleAdd = (e: MouseEvent) => {
    e.preventDefault();
    const REGEX_https = /^(?:https:\/\/)([^\/])+(?:amazon.com\/)+[^gp\/][a-z0-9-]{0,61}/g;

    if (url_ && REGEX_https.test(url_)) {
      setUrls([...urls, url_]);
      setMsg(null);
      setUrl_(null);
    } else {
      setMsg("please enter the correct https://www.amazon.com/etc: accessories, not/gp/")
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <FormControl className="m-auto">
        <div className="text-lg text-center mx-auto my-2"> insert an url to scrape</div>
        <Input
          id="url"
          value={url_ ? url_ : ""}
          onChange={(e) => setUrl_(e.target.value)}
          className="my-2 mx-auto w-full"
        />
        {!msg ? <FormHelperText className="my-2 mx-auto">https://www.amazon.com/your selection</FormHelperText>
          :
          <FormHelperText className="my-2 mx-auto">{msg}</FormHelperText>
        }
      </FormControl>
      <button className="mx-automy-2 mt-3 rounded-lg shadow-md shadow-blue p-2 px-3" onClick={(e) => handleAdd(e)}>add</button>
      {urls.length > 0 && <button className="mx-automy-2 mt-3 rounded-lg shadow-md shadow-blue p-2 px-3" onClick={(e) => handleSubmit(e)}>submit</button>}
      <div className="flex flex-col items-center my-3 mx-0 lg:mx-auto lg:container">
        {jsonArr && jsonArr.length > 0 ?
          jsonArr.map((items, index) => (
            <div className="m-auto" key={`${index}-${index * 2}`}>
              <ShowArray items={items.items} />
            </div>
          ))
          :
          <div className="grid grid-cols-3 place-items-center">
            <div className="text-lg m-auto">loading...</div>
          </div>
        }
      </div>
    </div>
  )
}

export default InputFormAWS