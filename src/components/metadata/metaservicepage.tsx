import type {Metadata} from 'next';

export const metaservicepage:Metadata={
  
    title:{
      default:"posts",
      template:`%s | posts`,
  
    },
    description:"Service page",
    keywords:["service page"],
    
    alternates:{
      canonical:"/terms-of-servce",
      languages:{
        "en-US":"/en-US",
        "fr-CA":"/fr-CA"
      }
    },
    openGraph:{
      title:"masterultils message board",
      description: 'masterultils contact page',
      url:"/terms-of-servce",
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