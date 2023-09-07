"use client";
import React from 'react';
import { dnslookupType } from "./getDNSlookup";

type mainDnsType = {
    getResults: dnslookupType | undefined 
}
const GetDNSresults = ({ getResults }: mainDnsType) => {
    return (
        <div className="mx-0 my-2 pp-2 w-full flex flex-col justify-center items-center gap-2">
            {getResults  &&
                <div className="mx-auto text-center">
                    <h3 className=" text-xl my-2 mx-auto font-bold">class A</h3>

                    {getResults && getResults.A?.map((obj, index) => (
                        <h3 className=" text-sx" key={`${index}-${obj}`}>{obj}</h3>
                    ))}

                    <h3 className=" text-xl my-2 mx-auto font-bold">class NS</h3>

                    {getResults && getResults.NS?.map((obj, index) => (
                        <h3 className=" text-sx" key={`${index}-${obj}`}>{obj}</h3>
                    ))}

                    <h3 className=" text-xl my-2 mx-auto font-bold">text- TXT</h3>

                    {getResults && getResults.TXT?.map((obj, index) => (
                        <h3 className=" text-sx" key={`${index}-${obj}`}>{obj}</h3>
                    ))}

                    <h3 className=" text-xl my-2 mx-auto font-bold">MX</h3>

                    {getResults && getResults.MX?.map((obj, index) => (
                        <div className="mx-auto" key={`${index}-${"MX"}`}>
                            <h3 className=" text-sx">exchange: {obj.exchange}</h3>
                            <h3 className=" text-sx"> priority: {obj.priority}</h3>
                        </div>
                    ))}

                    <h3 className=" text-xl my-2 mx-auto font-bold">SOA</h3>

                    <div className="mx-auto font-bold" >
                        <h3 className=" text-sx">expire: {getResults.SOA?.expire}</h3>
                        <h3 className=" text-sx">host master: {getResults.SOA?.hostmaster}</h3>
                        <h3 className=" text-sx">min tot. time: {getResults.SOA?.minttl}</h3>
                        <h3 className=" text-sx">ns name: {getResults.SOA?.nsname}</h3>
                        <h3 className=" text-sx">refresh: {getResults.SOA?.refresh}</h3>
                        <h3 className=" text-sx">retry: {getResults.SOA?.retry}</h3>
                        <h3 className=" text-sx">serial: {getResults.SOA?.serial}</h3>

                    </div>
                </div>
            }
        </div>
    )
}

export default GetDNSresults