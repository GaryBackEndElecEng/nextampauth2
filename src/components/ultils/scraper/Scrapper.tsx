
import { itemType } from "./type";
import React from 'react';
const { Cluster } = require('puppeteer-cluster');
import ShowArray from "./ShowAmazonArray";



type clusterType = ReturnType<typeof Cluster>;
export type jsonArrType = {
    items: itemType[]
}


let items: itemType[] = [];
var url: string;

const Scrapper = ({ urls }: { urls: string[] }) => {
    let JsonArr: jsonArrType[] = [];
    (async () => {
        let isBtnDisabled = false;
        let count = 0;
        const maxCount = 2;
        let count2 = 0;
        let count3 = 0;
        const cluster1: clusterType = await Cluster.launch({
            concurrency: Cluster.CONCURRENCY_PAGE,
            maxConcurrency: 2,
            monitor: false,
            puppeteerOptions: {
                // headless:true,
                defaultViewport: false,
                userDataDir: "/tmp"
            }
        });
        // Event handler to be called in case of problems
        cluster1.on('taskerror', (err: any, data: any) => {
            console.log(`Error crawling ${data}: ${err.message}`);
        });

        await cluster1.task(async ({ page, data }: { page: any, data: any }) => {

            ////----PAGELOOKUP////////////////
            await page.goto(data.url, { waitUntil: 'domcontentloaded' });
            while (count < maxCount) {
                const productHandles = await page.$$('div.p13n-desktop-grid > div >div#gridItemRoot');


                for (const producthandle of productHandles) {
                    let id = count2;
                    let title = "null";
                    let price = "null";
                    let image = "null";
                    let href = "null";
                    //pass teh single handle below
                    try {
                        href = await page.evaluate((el: any) => el.querySelector("a.a-link-normal").getAttribute("href"), producthandle);
                    } catch (error) {

                    }
                    try {
                        title = await page.evaluate((el: any) => el.querySelector("a.a-link-normal > span >div").textContent, producthandle);

                    } catch (error) {

                    }
                    try {
                        price = await page.evaluate((el: any) => el.querySelector("a.a-link-normal > div > span > span").textContent, producthandle);
                    } catch (error) {

                    }
                    try {
                        image = await page.evaluate((el: any) => el.querySelector("a.a-link-normal >div > img").getAttribute("src"), producthandle);

                    } catch (error) {

                    }
                    if (title !== "null" && typeof (items) === 'object') {
                        items.push({ id: count2, title: title, price: price, image: image, href: href });
                        count2++;
                    }


                }


                await page.waitForSelector("div.a-text-center >ul>li.a-last", { visible: true });

                if (count < maxCount) {
                    // console.log("clicked!!")
                    await Promise.all([
                        //This waits for the page to load
                        page.waitForNavigation(),
                        page.click("div.a-text-center >ul>li.a-last"),
                    ]);

                }

                count++;
            }

            JsonArr.push({ items: items });
            count3++;





            ////----PAGELOOKUP////////////////

        });

        for (const url of urls) {

            await cluster1.queue(url);

        }



        // many more pages

        await cluster1.idle();
        await cluster1.close();
    })();
    return (
        <div className="flex flex-col items-center gap-2 w-full">
            {JsonArr.length > 0 ?
                JsonArr.map((items, index) => (
                    <div className="w-full my-2" key={`${index}-items-${index}`}>
                        <ShowArray items={items.items} />
                    </div>
                ))
                :
                <div className="w-full text-center text-lg my-2">
                    <div>loading..</div>
                </div>
            }
        </div>
    )
}

export default Scrapper;
