import type {Metadata} from 'next';

export const metasignin:Metadata={
  
    title:{
      default:"signin",
      template:`%s | register`,
  
    },
    description:"signin page",
    keywords:["signin","signin page","signin with us","sign up"],
    
    alternates:{
      canonical:"/api/auth/signin",
      languages:{
        "en-US":"/en-US",
        "fr-CA":"/fr-CA"
      }
    },
    openGraph:{
      title:"Sign in page",
      description: 'Sign in to add a comment and view other pages',
      url:"/api/auth/signin",
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