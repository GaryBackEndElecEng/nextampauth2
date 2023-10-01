import React from 'react';
import type { barType, barDataLabelType } from "@component/extra/apexChart/types";
import { FormControl, FormLabel, Input } from '@mui/material';

export type mainBarChoices = {
    setBarTypes: React.Dispatch<React.SetStateAction<barType | undefined>>
}

const BarChoices = ({ setBarTypes }: mainBarChoices) => {
    const [horiz, setHoriz] = React.useState<boolean>(false);
    const [distrib, setDistrib] = React.useState<boolean>(false);

    React.useMemo(() => {

        setBarTypes(
            {
                horizontal: horiz,
                borderRadiusApplication: "end",
                borderRadiusWhenStacked: "all",
                columnWidth: "100%",
                distributed: distrib,
                rangeBarOverlap: false,
                rangeBarGroupRows: false,
                hideZeroBarsWhenGrouped: true,
                borderRadius: 5,
                barHeight: "100%",
                isDumbbell: false,
                isFunnel: false,
                isFunnel3d: true,
                dataLabels: {
                    hideOverflowingLabels: true
                }
            }
        )
    }, [setBarTypes, horiz, distrib]);

    return (
        <div className="flex flex-row items-center justify-center flex-wrap px-3 py-2 border border-blue rounded-lg shadow shadow-blue-700 md:w-1/2 gap-2">
            <FormControl>
                <FormLabel htmlFor="horizontal">horizontal</FormLabel>
                <input
                    name="horizontal"
                    type="checkbox"
                    placeholder="horizontal"
                    id="horizontal"
                    checked={horiz}
                    onChange={(e) => setHoriz(e.target.checked)}
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="distributed">distributed</FormLabel>
                <input
                    name="distributed"
                    type="checkbox"
                    placeholder="distributed"
                    id="distributed"
                    checked={distrib}
                    onChange={(e) => setDistrib(e.target.checked)}
                />
            </FormControl>
        </div>


    )
}

export default BarChoices