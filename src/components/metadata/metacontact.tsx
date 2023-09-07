import type {Metadata} from 'next';

export const metacontact:Metadata={
  
    title:{
      default:"Contact",
      template:`%s | Contact`,
  
    },
    description:"Our contact page",
    keywords:["contact page","tools for you","web design info","contact information"],
    
    alternates:{
      canonical:"/contact",
      languages:{
        "en-US":"/en-US",
        "fr-CA":"/fr-CA"
      }
    },
    openGraph:{
      title:"masterultils contact",
      description: 'masterultils contact page',
      url:"/contact",
      images:[
        {
          url:"https://new-master.s3.ca-central-1.amazonaws.com/static/masterultils/webService.png",
          width:600,
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