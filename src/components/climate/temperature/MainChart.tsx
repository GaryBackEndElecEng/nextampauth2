"use client";
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import type { xaxisType, seriesType, graphType_type, barType, plotOptionsType, lineStrokeType, legendType, barColorType } from "@component/extra/apexChart/types";
import BarChoices from "@/components/climate/temperature/Bar_choices";
import MDXCreator from "./MDXCreator";
import TempChart from "@climate/temperature/TempChart";
import BarChoiceForm from './BarChoiceForm';
import { barAttribs } from "./BarChoiceForm";



const MainChart = () => {
    const [refresh, setRefresh] = React.useState<boolean>(false);
    const [graphType, setGraphType] = React.useState<graphType_type>("line");
    const [legend, setLegend] = React.useState<legendType | undefined>();
    const [show, setShow] = React.useState<boolean>(true);
    const [barColor, setBarColor] = React.useState<barColorType>();
    const [barTypes, setBarTypes] = React.useState<barType>();





    React.useEffect(() => {
        setLegend({
            show: show,
            showForSingleSeries: show,
            floating: false,
            position: "top",
            horizontalAlign: "center",
            fontSize: "16px",
            fontWeight: 600,
            labels: { useSeriesColors: true },
            markers: {
                strokeColor: "green"
            },

        });
        setBarTypes(barAttribs())
    }, [setLegend, show, barColor]);

    function reDraw() {
        setRefresh(true);

    }

    return (
        <div className="w-full flex flex-col items-center mt-30">

            <BarChoices
                setBarTypes={setBarTypes}
            />
            <BarChoiceForm
                setGraphType={setGraphType}
                graphType={graphType}

            />
            <TempChart
                refresh={refresh}
                setRefresh={setRefresh}
                graphType={graphType}
                bar={barTypes}
                legend={legend}
            />
            <div className="w-full flex flex-col sm:mx-auto mx-2 prose prose-md lg:p-2 sm:p-1">
                <MDXCreator />
            </div>
        </div>
    )
}

export default MainChart