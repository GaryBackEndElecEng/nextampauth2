"useClient";
import React from 'react'
import GetClientDomainInfo from "./GetClientDomainInfo";
const IndexClientDetail = () => {
  return (
    <div className="lg:mx-auto lg:container shadow-lg rounded-lg shadow-blue">
      <h3 className="text-xl text-center my-2 ">Detail domaine scan</h3>
        <GetClientDomainInfo/>
    </div>
  )
}

export default IndexClientDetail