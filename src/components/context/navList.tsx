 import {navImageLinkType} from "./Types";
import {icons} from "./Icons";
import InfoIcon from "@mui/icons-material/Info";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from '@mui/icons-material/Explore';

 const staticImage=process.env.NEXT_PUBLIC_aws_static;
const masterImage=process.env.NEXT_PUBLIC_aws;
const directGraph = `${masterImage}/directGraph3.png`;
  const graph = `${masterImage}/graph.png`;
  const population = `${masterImage}/population.png`;
  const webtoon = `${masterImage}/webtoon1.png`;
  const ninja = `${masterImage}/slang.png`;
  const rawio = `${masterImage}/games.png`;
  const weather = `${masterImage}/weather.png`;
  const translate = `${masterImage}/translate.png`;
  const currency = `${masterImage}/currency.png`;
  const techtool = `${masterImage}/techtool.png`;
  const post = `${staticImage}/images/study.png`;
  const countries = `https://new-master.s3.ca-central-1.amazonaws.com/static/book.png`;
  const scrape = `${masterImage}/scrape.png`;

 export const allNavLinks: navImageLinkType[] = [
    {id:1,icon:<ExploreIcon sx={{color:"red",ml:1,mr:1,fontSize:"130%"}}/>, name: "charts", image: graph ,link:"/extra/chart",desc:[{para:" This allows you to generate your custom graphs for a project. The display graph is an image so you can copy the image from the template, once completed and simply paste it into your project."},{para:" You have an option of a bar, pie, donut, radar, or line graph."},{para:" The graph comes with multiple input, as well as a summary and legend for easy customization."}]},
   {id:2,icon:<ExploreIcon sx={{color:"red",ml:1,mr:1,fontSize:"130%"}}/>, name: "directgraph", image: directGraph ,link:"/extra/directgraph",desc:[{para:" This allows you to generate a flow chart for your project. This is easily transferrable to your project from a simple copy and paste method from the generated chart."},{para:" The system allows you to visually build your flow-chart, one node/(process and arrow) at a time."}],},
   {id:3,icon:<ExploreIcon sx={{color:"red",ml:1,mr:1,fontSize:"130%"}}/>, name: "richChart", image: graph ,link:"/extra/richChart",desc:[{para:" This allows you to generate either a line or  bar dynamic graphs for your presentation - just click on the home icon to download your graph."},{para:" The system allows you to visually see and analyze data."}],},
   {id:4,icon:<ExploreIcon sx={{color:"red",ml:1,mr:1,fontSize:"130%"}}/>, name: "Continent Population", image: population ,link:"/extra/countrygraph",desc:[{para:" This allows you to view world's and continent's populations."},{para:" It provides a visual snap-shot of population density."}],},
   {id:5,icon:<SportsEsportsIcon sx={{color:"red",ml:1,mr:1,fontSize:"130%"}}/>, name: "rawio", image: rawio ,link:"/games/rawio",desc:[{para:" This displays all video games. It allows the viewer to take an inside look of the game. In addition, it has store links for quick purchases"}]},
     {id:6,icon:<SportsEsportsIcon sx={{color:"red",ml:1,mr:1,fontSize:"130%"}}/>, name: "webtoon", image: webtoon ,link:"/games/webtoon",desc:[{para:" This gives the viewer a short insight on webtoons and shows the webtoon types."}]},
     {id:7,icon:<SportsEsportsIcon sx={{color:"red",ml:1,mr:1}}/>, name: "slang-word", image: ninja,link:"/games/slang-word",desc:[{para:"This interfaces with a universal definition of slang words.It gives you the best definition of known english saying, voted by the public."}] },
     {id:8,icon:<InfoIcon sx={{color:"red",ml:1,mr:1,fontSize:"130%"}}/>, name: "currency", image: currency ,link:"/ultils/currency",desc:[{para:" This displays all the world's currencies. In addition, it provides ratios to base currencies. the currencies are daily updated to give the most current currency status."}]},
     {id:9,icon:<InfoIcon sx={{color:"red",ml:1,mr:1,fontSize:"130%"}}/>, name: "weather", image: weather ,link:"/ultils/weather",desc:[{para:" This provides the viewer free access to view all world-cities daily weather forcast.This ultility also provides easy citie search by countries."}]},
     {id:10,icon:<InfoIcon sx={{color:"red",ml:1,mr:1,fontSize:"130%"}}/>, name: "translate", image: translate ,link:"/ultils/translate",desc:[{para:"This provides a 40-line line translation to any desired language."}] },
     {id:11,icon:<InfoIcon sx={{color:"red",ml:1,mr:1,fontSize:"130%"}}/>, name: "country detail", image: countries ,link:"/ultils/countries",desc:[{para:"This provides all world country's general information from populations to telephone prefixes."}] },
     {id:12,icon:<InfoIcon sx={{color:"red",ml:1,mr:1,fontSize:"130%"}}/>, name: "techtool", image: techtool ,link:"/ultils/techtool",desc:[{para:"This allows you to verify emails,DNS lookups and domain verification."}] },
     
     {id:14,icon:<ExploreIcon sx={{color:"red",ml:1,mr:1,fontSize:"130%"}}/>, name: "Comments", image: post ,link:"/posts",desc:[{para:" see posts and comments. let us know what you need or drop a comment."},{para:" We check our posts every day and follow through with requests. so let us know and thanks for being with us."}],},
   
]