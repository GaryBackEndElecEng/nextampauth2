
import MainChart from "../../../components/extra/chart/MainChart";
import {metachart} from '../../../components/metadata/metaextra';
export const metadata =metachart;
const page = () => {
    
  return (
    <div className="mx-0 my-2 w-full lg:mx-auto lg:container "
    >
        <MainChart/>
    </div>
  )
}

export default page;