"use client";
import React, { Component } from 'react';
// import Chart from 'react-apexcharts';
import { seriesType, xaxisType } from './types';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


export default function MainChart() {
  const options = {
    chart: {
      height: 200,
      type: "bar",
      offsetY: 16,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: true,
        barHeight: "85%"
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      position: "top"
    },
    yaxis: {
      show: false
    },
    grid: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    colors: [
      "#33b2df",
      "#546E7A",
      "#d4526e",
      "#13d8aa",
      "#A5978B",
      "#2b908f",
      "#f9a3a4",
      "#90ee7e",
      "#f48024",
      "#69d2e7"
    ]
  };

  const series = [
    {
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    }
  ];

  return (
    <></>
    // <Chart
    //   options={options}
    //   series={series}
    //   type="bar"
    //   height={740}
    //   className="apex-charts"
    //   dir="ltr"
    // />
  );
}