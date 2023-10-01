import React from 'react';
import { findColor, colorArr } from './ultils';
import { FormControl, Input, FormLabel } from "@mui/material";
import type { barType, barColorType, graphType_type } from "@component/extra/apexChart/types";
import { EnumType } from 'typescript';

const graphTypeArr = ["line", "bar"]

{
    colors: ['#546E7A', '#E91E63'];
}
export function barAttribs(): barType {

    return (
        {
            horizontal: false,
            borderRadiusApplication: "end",
            borderRadiusWhenStacked: "all",
            columnWidth: "100%",
            distributed: true,
            rangeBarOverlap: false,
            rangeBarGroupRows: false,
            hideZeroBarsWhenGrouped: false,
            borderRadius: 5,
            barHeight: "100%",
            isDumbbell: false,
            isFunnel: false,
            isFunnel3d: true,
            colors: {
                ranges: [
                    {
                        from: 0,
                        to: 2000,
                        color: undefined,
                    }
                ],
                backgroundBarColors: [],
                backgroundBarOpacity: 1,
                backgroundBarRadius: 1
            },
            dataLabels: {
                hideOverflowingLabels: false
            }
        }

    )


}
type mainBarChoiceFormType = {
    setGraphType: React.Dispatch<React.SetStateAction<graphType_type>>,
    graphType: graphType_type
}

const BarChoiceForm = ({ setGraphType, graphType }: mainBarChoiceFormType) => {
    //function findColor(color)=>color number
    const [color, setColor] = React.useState<string>();
    const [graph, setGraph] = React.useState<string>("line");

    React.useEffect(() => {
        if (graph) {
            setGraphType(graph as any);
        }
    }, [graph]);


    return (
        <div className="flex flex-row flex-wrap items-center justify-center">
            <FormControl>
                <FormLabel htmlFor="graphType">color</FormLabel>
                <select
                    name="graphType"
                    placeholder="bar color"
                    id="graphType"
                    defaultValue="bar"
                    value={graph}
                    onChange={(e) => setGraph(e.target.value)}
                >
                    {graphTypeArr.map((col, index) => (
                        <React.Fragment key={index}>
                            <option value={col}>{col}</option>
                        </React.Fragment>
                    ))}
                </select>
            </FormControl>
        </div>
    )
}

export default BarChoiceForm