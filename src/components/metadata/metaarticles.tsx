import type {Metadata} from 'next';

export const metaarticles:Metadata={
  
    title:{
      default:"articles",
      template:`%s | articles`,
  
    },
    description:"article page",
    keywords:["article page","articles","detailed description","Thwaites Glaciers","Lightning","connecting to the web","security","What to watch out for", " six degrees of separation"," Cognitive easing","COVID trends","Corporate Portal","Ecommmerce","Store-front","STA ( Short Term rentals"],
    
    alternates:{
      canonical:"/articles",
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