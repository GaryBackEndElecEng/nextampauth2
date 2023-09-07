"use client";
import React, { MouseEvent } from 'react'
import { inputType } from "@/components/ultils/scraper/IndexScrapper";
import { FormControl, Input, FormHelperText } from "@mui/material";
import { jsonWebArrType } from "@/components/ultils/scraper/type";
import ShowArray from "@/components/ultils/scraper/ShowWebArray";

const InputFormWebSite = () => {
  const [msg, setMsg] = React.useState<string | null>(null);
  const [url_, setUrl_] = React.useState<string | null>(null);
  const [urls, setUrls] = React.useState<string[]>([]);
  const [Name, setName] = React.useState<boolean>(false);
  const [nameLabel, setNameLabel] = React.useState<string | null>(null);
  const [title, setTitle] = React.useState<boolean>(false);
  const [price, setPrice] = React.useState<boolean>(false);
  const [href, setHref] = React.useState<boolean>(false);
  const [desc, setDesc] = React.useState<boolean>(false);
  const [headers, setHeaders] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<boolean>(false);
  const [jsonArr, setJsonArr] = React.useState<jsonWebArrType[]>([]);


  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    const url = `http://localhost:3000/api/website?url=${urls}&Name=${Name}&nameLabel=${nameLabel}&title=${title}&price=${price}&href=${href}&desc=${desc}&image=${image}&headers=${headers}&email=${email}`
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
    }
    try {
      const res = await fetch(url, options);
      const body = await res.json();

      setJsonArr(body.data)
    } catch (error) {
      console.error(new Error("did not recieved- something went wrong with the 200-return"))
    }
  };

  const handleAdd = (e: MouseEvent) => {
    e.preventDefault();
    const REGEX_https = /^(?:https:\/\/)([^\/])+((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z \/]{2,})[[a-z0-9\/A-Z0-9\-\| *]*/g;

    if (url_ && REGEX_https.test(url_)) {
      setUrls([...urls, url_]);
      setMsg(null);
    } else {
      setMsg("please enter the correct https://www.domain.com/.ca/.io,,,")
    }
  };
  const handleReset = (e: MouseEvent) => {
    e.preventDefault();
    setUrls([]);
    setUrl_(null);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mx-auto">
        <FormControl className="m-auto">
          <div className="text-lg text-center mx-auto my-2"> insert an url to scrape</div>
          <Input
            id="url"
            value={url_ ? url_ : ""}
            onChange={(e) => setUrl_(e.target.value)}
            className="my-2 mx-auto w-full"
          />
          {!msg ? <FormHelperText className="my-2 mx-auto">https://domain.com or https://www.domain.com</FormHelperText>
            :
            <FormHelperText className="my-2 mx-auto">{msg}</FormHelperText>
          }
        </FormControl>
      </div>
      <div className="mx-auto flex flex-row flex-wrap justify-center items-center gap-2 px-2">
        <div className="flex flex-col items-center justify-center">
          <FormControl className="m-auto ">
            <div className="text-lg text-center mx-auto my-2"> search name?</div>
            <input
              id="name"
              type="checkbox"
              arai-checked={Name.toString()}
              checked={Name}
              onChange={(e) => setName(e.target.checked)}
              className="my-2 mx-auto arai-checked"
            />
            <FormHelperText className="my-2 mx-auto">find <q>name</q>?</FormHelperText>

          </FormControl>
          {Name &&
            <FormControl className="m-auto ">
              <div className="text-lg text-center mx-auto my-2"> enter name Label</div>
              <Input
                id="nameLabel"
                value={nameLabel ? nameLabel : ""}
                onChange={(e) => setNameLabel(e.target.value)}
                className="my-2 mx-auto my-2 w-3/4"
              />
              <FormHelperText className="my-2 mx-auto">enter <q>name label</q>wild card?</FormHelperText>

            </FormControl>
          }
        </div>
        <FormControl className="m-auto ">
          <div className="text-lg text-center mx-auto my-2"> search price?</div>
          <input
            id="price"
            type="checkbox"
            arai-checked={price.toString()}
            checked={price}
            onChange={(e) => setPrice(e.target.checked)}
            className="my-2 mx-auto arai-checked"
          />
          <FormHelperText className="my-2 mx-auto">find <q>price</q>?</FormHelperText>
        </FormControl>
        <FormControl className="m-auto ">
          <div className="text-lg text-center mx-auto my-2"> search title?</div>
          <input
            id="title"
            type="checkbox"
            arai-checked={title.toString()}
            checked={title}
            onChange={(e) => setTitle(e.target.checked)}
            className="my-2 mx-auto arai-checked"
          />
          <FormHelperText className="my-2 mx-auto">find <q>title</q>?</FormHelperText>
        </FormControl>
        <FormControl className="m-auto ">
          <div className="text-lg text-center mx-auto my-2"> search emails?</div>
          <input
            id="email"
            type="checkbox"
            arai-checked={email.toString()}
            checked={email}
            onChange={(e) => setEmail(e.target.checked)}
            className="my-2 mx-auto arai-checked"
          />
          <FormHelperText className="my-2 mx-auto">find <q>emails</q>?</FormHelperText>
        </FormControl>
        <FormControl className="m-auto ">
          <div className="text-lg text-center mx-auto my-2"> search images?</div>
          <input
            id="image"
            type="checkbox"
            arai-checked={image.toString()}
            checked={image}
            onChange={(e) => setImage(e.target.checked)}
            className="my-2 mx-auto arai-checked"
          />
          <FormHelperText className="my-2 mx-auto">find <q>images</q>?</FormHelperText>
        </FormControl>
        <FormControl className="m-auto ">
          <div className="text-lg text-center mx-auto my-2"> search descriptions?</div>
          <input
            id="desc"
            type="checkbox"
            arai-checked={desc.toString()}
            checked={desc}
            onChange={(e) => setDesc(e.target.checked)}
            className="my-2 mx-auto arai-checked"
          />
          <FormHelperText className="my-2 mx-auto">find <q>descriptions</q>?</FormHelperText>
        </FormControl>
        <FormControl className="m-auto ">
          <div className="text-lg text-center mx-auto my-2"> search headers?</div>
          <input
            id="headers"
            type="checkbox"
            arai-checked={headers.toString()}
            checked={headers}
            onChange={(e) => setHeaders(e.target.checked)}
            className="my-2 mx-auto arai-checked"
          />
          <FormHelperText className="my-2 mx-auto">find <q>headers</q>?</FormHelperText>
        </FormControl>
        <FormControl className="m-auto ">
          <div className="text-lg text-center mx-auto my-2"> search links?</div>
          <input
            id="href"
            type="checkbox"
            arai-checked={href.toString()}
            checked={href}
            onChange={(e) => setHref(e.target.checked)}
            className="my-2 mx-auto arai-checked"
          />
          <FormHelperText className="my-2 mx-auto">find <q>links</q>?</FormHelperText>
        </FormControl>
      </div>
      {urls.length < 1 ? <button className="mx-automy-2 mt-3 rounded-lg shadow-md shadow-blue p-2 px-3" onClick={(e) => handleAdd(e)}>add</button>
        :
        <button className="mx-automy-2 mt-3 rounded-lg shadow-md shadow-blue p-2 px-3" onClick={(e) => handleReset(e)}>reset</button>
      }
      {urls.length > 0 && <button className="mx-automy-2 mt-3 rounded-lg shadow-md shadow-blue p-2 px-3" onClick={(e) => handleSubmit(e)}>submit</button>}

      <div className=" m-auto flex flex-col items-center my-3 mx-0 lg:mx-auto lg:container px-1">

        {jsonArr && jsonArr.length > 0 && url_ ?
          jsonArr.map((items, index) => (
            <div className="m-auto" key={`${index}-${index * 2}`}>
              <ShowArray items={items.items} />
            </div>
          ))
          :
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center  ">
            {url_ && <div className="text-lg m-auto">loading...</div>}
          </div>
        }
      </div>
    </div>
  )
}

export default InputFormWebSite