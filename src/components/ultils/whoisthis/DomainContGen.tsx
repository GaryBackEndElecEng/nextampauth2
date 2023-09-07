"use client";
import React from 'react'
import {contactType,contactType2,ownerType} from "@/components/ultils/whoisthis/getDomainInfo";

type mainType={
    generic:ownerType
}
const DomainContGen = ({generic}:mainType) => {
  return (
        
        <small className="flex flex-col flex-wrap gap-2">
            {generic.handle &&
            <small className="text-xs m-auto">
            <div className="font-bold my-2">handle</div>
            <div>{generic.handle}</div>
            </small>
            }
            {generic.type && 
            <small className="text-xs m-auto">
            <div className="font-bold my-2">type</div>
            <div>{generic.type}</div>
            </small>
            }
            {generic.name && 
            <small className="text-xs m-auto">
            <div className="font-bold my-2">name</div>
            <div>{generic.name}</div>
            </small>
            }
            {generic.organization &&
            <small className="text-xs m-auto">
            <div className="font-bold my-2">org</div>
            <div>{generic.organization}</div>
            </small>
            }
            {generic.email &&
            <small className="text-xs m-auto">
            <div className="font-bold my-2">email</div>
            <div>{generic.email.split(" ")[0]}</div>
            <div>{generic.email.split(" ")[1]}</div>
            </small>
            }
            {generic.address &&
            <small className="text-xs m-auto">
            <div className="font-bold my-2">add:</div>
            <div>{generic.address}</div>
            </small>
            }
            {generic.city &&
            <small className="text-xs m-auto">
            <div className="font-bold my-2">city</div>
            <div>{generic.city}</div>
            </small>
            }
            {generic.fax &&
            <small className="text-xs m-auto">
            <div className="font-bold my-2">fax</div>
            <div>{generic.fax}</div>
            </small>
            }
            {generic.country && 
            <small className="text-xs m-auto">
            <div className="font-bold my-2">country</div>
            <div>{generic.country}</div>
            </small>
            }
            {generic.phone &&
            <small className="text-xs m-auto">
            <div className="font-bold my-2">phone</div>
            <div>{generic.phone}</div>
            </small>
            }
            {generic.created &&
            <small className="text-xs m-auto">
            <div className="font-bold my-2">created</div>
            <div>{generic.created}</div>
            </small>
            }
        </small>
              
  )
}

export default DomainContGen