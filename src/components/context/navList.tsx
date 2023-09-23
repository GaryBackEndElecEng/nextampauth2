import { navImageLinkType } from "./Types";
import { icons } from "./Icons";
import InfoIcon from "@mui/icons-material/Info";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from '@mui/icons-material/Explore';

const staticImage = process.env.NEXT_PUBLIC_aws_static;
const masterImage = process.env.NEXT_PUBLIC_aws;
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
  { id: 1, icon: <ExploreIcon sx={{ color: "red", ml: 1, mr: 1, fontSize: "130%" }} />, name: "Custom Charts", image: graph, link: "/extra/chart", desc: [{ para: " Generate your Multiple custom graph for your project. The display graph is an image so you can copy the image from the template." }, { para: " Your Custom image comes with a custom intro, title and footer reference." }, { para: " Bar(s) or Line(s)." }] },
  { id: 2, icon: <ExploreIcon sx={{ color: "red", ml: 1, mr: 1, fontSize: "130%" }} />, name: "Custom flow-chart", image: directGraph, link: "/extra/directgraph", desc: [{ para: " New interactive flow-graph for your project. This is easily transferrable to your project from a simple copy and paste method from the generated chart." }, { para: " The system allows you to visually build your flow-chart, one node/(process and arrow) at a time." }], },
  { id: 3, icon: <ExploreIcon sx={{ color: "red", ml: 1, mr: 1, fontSize: "130%" }} />, name: "Rich Interactive Chart", image: graph, link: "/extra/richChart", desc: [{ para: " Your Custom interactive clean graph.Just click on the home icon to download your graph." }, { para: " The system allows you to visually see and analyze data with multiple graph display options." }], },
  { id: 4, icon: <ExploreIcon sx={{ color: "red", ml: 1, mr: 1, fontSize: "130%" }} />, name: "World Population", image: population, link: "/extra/countrygraph", desc: [{ para: " Visually view dynamic world population." }, { para: " It provides a visual snap-shot of population density." }], },
  { id: 5, icon: <SportsEsportsIcon sx={{ color: "red", ml: 1, mr: 1, fontSize: "130%" }} />, name: "Popular Video games", image: rawio, link: "/games/rawio", desc: [{ para: " Top dynamic Video games for review. It allows the viewer to take an inside look of the game. In addition, it provides store links for quick purchase." }] },
  { id: 6, icon: <SportsEsportsIcon sx={{ color: "red", ml: 1, mr: 1, fontSize: "130%" }} />, name: "Webtoon", image: webtoon, link: "/games/webtoon", desc: [{ para: " This gives the viewer a short insight on webtoons and shows the webtoon types." }] },
  { id: 7, icon: <SportsEsportsIcon sx={{ color: "red", ml: 1, mr: 1 }} />, name: "US Slang-word Definition", image: ninja, link: "/games/slang-word", desc: [{ para: "This interfaces with a universal US slang definitions.It gives you the best definition of known english saying, voted by the public." }] },
  { id: 8, icon: <InfoIcon sx={{ color: "red", ml: 1, mr: 1, fontSize: "130%" }} />, name: "World Currency", image: currency, link: "/ultils/currency", desc: [{ para: " This displays all the world's currencies. In addition, it provides ratios to base currencies. the currencies are daily updated to give the most current currency status." }] },
  { id: 9, icon: <InfoIcon sx={{ color: "red", ml: 1, mr: 1, fontSize: "130%" }} />, name: "World weather Forcast", image: weather, link: "/ultils/weather", desc: [{ para: " This provides the viewer free access to view all world-cities daily weather forcast.This ultility also provides easy citie search by countries." }] },
  { id: 10, icon: <InfoIcon sx={{ color: "red", ml: 1, mr: 1, fontSize: "130%" }} />, name: "Language Translate", image: translate, link: "/ultils/translate", desc: [{ para: "This provides a 40-line line translation to any desired language." }] },
  { id: 11, icon: <InfoIcon sx={{ color: "red", ml: 1, mr: 1, fontSize: "130%" }} />, name: "All Country Detail", image: countries, link: "/ultils/countries", desc: [{ para: "This provides all world country's general information from populations to telephone prefixes." }] },
  { id: 12, icon: <InfoIcon sx={{ color: "red", ml: 1, mr: 1, fontSize: "130%" }} />, name: "Tech Tools", image: techtool, link: "/ultils/techtool", desc: [{ para: "This allows you to verify emails,DNS lookups and domain verification and much more." }] },

  { id: 14, icon: <ExploreIcon sx={{ color: "red", ml: 1, mr: 1, fontSize: "130%" }} />, name: "Community Comments", image: post, link: "/posts", desc: [{ para: " see Community posts and comments. let us know what you need or drop a comment governing any respectable thought." }, { para: " We check our posts every day and follow through with requests. so let us know your thoughts." }], },

]