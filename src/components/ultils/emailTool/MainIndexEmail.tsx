"use client";
import React from 'react';
import GenResponse from './GenResponse';
import { GeneralContext } from '@/components/context/GeneralContextProvider';


const MainIndexEmail = () => {
  const { setPage } = React.useContext(GeneralContext);

  React.useEffect(() => {
    setPage("/techTool");
  }, [setPage]);

  return (
    <div className="lg:mx-auto lg:container my-2 p-2 shadow-lg rounded-lg shadow-blue">
      <GenResponse />
    </div>

  )
}

export default MainIndexEmail