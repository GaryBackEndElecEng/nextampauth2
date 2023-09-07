import React from 'react'
type returnType={
    first:string ,
    second:string
}
export const filterFunc = (words:string):returnType => {
    var firstWord:string="" ,secondWord:string ="";
    if( words && words.split("")){
        firstWord = words.split(" ")[0].toLowerCase().split("").slice(0,5).join("")
        if(words.split(" ").length > 1){
            secondWord=words.split(" ")[1].toLowerCase().split("").slice(0,5).join("")
        }
    }
    return {first:firstWord,second:secondWord}
  
}

