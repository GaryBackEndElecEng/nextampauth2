import type {Metadata} from 'next';

export const metagames:Metadata={
  
    title:{
      default:"games",
      template:`%s |games`,
  
    },
    description:"Games for your liking. Well informative games description allows you to apply the best picks on what games to buy.",
    keywords:["games","view the best games","games for your liking","games for you","Free games","all you want in games"],

    
    alternates:{
      canonical:"/games",
      languages:{
        "en-US":"/en-US",
        "fr-CA":"/fr-CA"
      }
    },
    openGraph:{
      title:"Masterultils Games",
      description: 'Games for you to use.View your favorite games',
      url:"/games",
      images:[
        {
          url:"https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/games.png",
          width:600,
          height:400
      },
        {
          url:"https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/header.png",
          width:600,
          height:300
      },
        
    ],
  
    }
   
  }
export const metarawio:Metadata={
  
    title:{
      default:"rawio",
      template:`%s |rawio`,
  
    },
    description:"This allows you to view ALL available games and allows you to purchase them at available unline stores.",
    keywords:["Video Games","All Available Games","rawio games","Quick access to view available games"],
    // colorScheme:"light",
    alternates:{
      canonical:"/games/rawio",
      languages:{
        "en-US":"/en-US",
        "fr-CA":"/fr-CA"
      }
    },
    openGraph:{
      title:"masterultils games",
      description: 'This allows you to view ALL available games and allows you to purchase them at available unline stores.',
      url:"/games/rawio",
      images:[
        {
          url:"https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/games.png",
          width:600,
          height:300
      },
        {
          url:"https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/logo.png",
          width:600,
          height:300
      },
        
    ],
  
    }
   
  }
export const metawebtoon:Metadata={
  
    title:{
      default:"webtoons",
      template:`%s |webtoons`,
  
    },
    description:"This is acute game to retrieve webtoons logos",
    keywords:["webtoons","webtoons logo for you","check out webtoons","Quick access to view available games"],
    // colorScheme:"light",
    alternates:{
      canonical:"/games/webtoon",
      languages:{
        "en-US":"/en-US",
        "fr-CA":"/fr-CA"
      }
    },
    openGraph:{
      title:"masterultils Webtoons",
      description: 'This is acute game to retrieve webtoons logos.',
      url:"/games/webtoon",
      images:[
        {
          url:"https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/webtoon1.png",
          width:300,
          height:300
      },
        {
          url:"https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/webtoon2.png",
          width:300,
          height:300
      },
        {
          url:"https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/logo.png",
          width:300,
          height:300
      },
        
    ],
  
    }
   
  }
export const metaslang:Metadata={
  
    title:{
      default:"slang",
      template:`%s |slang`,
  
    },
    description:"This allows you to translate english slang words with one entry. Find out funny slang-word definitions",
    keywords:["slang-words","slang for you","check out slang words","Quick access to look up slang words"],
    // colorScheme:"light",
    alternates:{
      canonical:"/games/slang-word",
      languages:{
        "en-US":"/en-US",
        "fr-CA":"/fr-CA"
      }
    },
    openGraph:{
      title:"masterultils slang-words and sayings",
      description: 'This is a power lookup for slang words. Find your slang-word',
      url:"/games/slang-word",
      images:[
        {
          url:"https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/slang.png",
          width:300,
          height:300
      },
        
        {
          url:"https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/logo.png",
          width:300,
          height:300
      },
        
    ],
  
    }
   
  }