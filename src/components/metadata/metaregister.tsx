import type {Metadata} from 'next';

export const metaregister:Metadata={
  
    title:{
      default:"register",
      template:`%s | register`,
  
    },
    description:"register page",
    keywords:["register","register page","register with us","sign up"],
    
    alternates:{
      canonical:"/register",
      languages:{
        "en-US":"/en-US",
        "fr-CA":"/fr-CA"
      }
    },
    openGraph:{
      title:"masterultils Newly created Articles for the mind",
      description: 'These are technically indepth descriptions of must-know-stuff',
      url:"/contact",
      images:[
        {
          url:"https://new-master.s3.ca-central-1.amazonaws.com/static/images/earth.png",
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