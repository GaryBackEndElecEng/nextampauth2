import React from 'react'
import {Grid} from "@mui/material";

const Explain = () => {
  return (
    <div className="container mx-auto dark:bg-black dark:text-white">
        <Grid container spacing={{xs:2,sm:1}}>
            <Grid item xs={12} sm={6} className="mx-auto rounded-lg shadow-lg shadow-black">
            <h3 className="text-xl mx-auto my-2 font-bold text-center">Simple Steps</h3>
            <h4 className="text-xl mb-2 font-bold text-center">step one</h4>
            <p className="text-lg mx-auto my-1">
                Add a layer and then click on 
            </p>
            <blockquote className="font-bold">&#39;add layer&#39;</blockquote>
            <h4 className="text-xl mb-2 font-bold text-center">step two</h4>
            <p className="text-lg mx-auto my-1">
                Add a minimum of two nodes. Click on</p>
                 <blockquote className="font-bold">&#39;add node to nodes&#39;</blockquote>
                 <p className="text-lg mx-auto my-1">
                     after assigning it to the layer and choosing the color. Once added, arrow assignments will appear
            </p>
            <p className="text-lg mx-auto my-1">
                 Once added, arrow assignments will appear
            </p>
            <small className="font-bold"> a layer houses all nodes and arrows or simply the flow chart</small>
            </Grid>
            <Grid item xs={12} sm={6} className="mx-auto rounded-lg shadow-lg shadow-black">
            <h3 className="text-xl mx-auto my-2 font-bold text-center" >Adding the arrows</h3>
            <h4 className="text-xl mb-2 font-bold text-center">step three</h4>
            <p className="text-lg mx-auto my-1">
                Add an edge label,and then its color.
            </p>
            <p className="text-lg mx-auto my-1">
                Once done, select the</p> <blockquote className="font-bold">&#39; edge from node&#39;.</blockquote>
                <p className="text-lg mx-auto my-1"> from the drop-down</p>
            <p className="text-lg mx-auto my-1">
                Now, select the</p> <blockquote className="font-bold"> edge to node.</blockquote> <p className="text-lg mx-auto my-1"> &#39;from the drop-down&#39;
            </p>
            <small className="font-bold">Note:select the second node and then the first node if it does not added. This allows the system to sense a change in variables.</small>
            <h4 className="text-xl mb-2 font-bold text-center">step four</h4>
            <p className="text-lg mx-auto my-1">
                You will see your flow-chart. You can add additional nodes and arrows to visually build your flow-chart.
                <span className="text-xl mx-auto my-1 text-blue my-2">&#39;ENJOY!&#39;</span>
            </p>
            
            
            <small className="font-bold"> arrows are flow directions to and from your nodes</small>
            </Grid>
        </Grid>
    </div>
  )
}

export default Explain