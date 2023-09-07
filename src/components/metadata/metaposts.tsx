import type {Metadata} from 'next';

export const metaposts:Metadata={
  
    title:{
      default:"posts",
      template:`%s | posts`,
  
    },
    description:"Comment page",
    keywords:["contact page","messages","comments and messages","comments","ask Us something","We are here to help","want a free service or tool?","write Us", " we are here for you"," message board"],
    
    alternates:{
      canonical:"/posts",
      languages:{
        "en-US":"/en-US",
        "fr-CA":"/fr-CA"
      }
    },
    openGraph:{
      title:"masterultils message board",
      description: 'masterultils contact page',
      url:"/contact",
      images:[
        {
          url:"https://new-master.s3.ca-central-1.amazonaws.com/static/images/study.png",
          width:600,
          height:300
      },
        {
          url:"https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/webService.png",
          width:400,
          height:300
      },
        {
          url:"https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/logoLarge.png",
          width:600,
          height:900
      },
    ],
  
    }
   
  }