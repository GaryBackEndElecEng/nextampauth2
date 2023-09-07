import React from 'react'
import { optionsType, seriesType, xaxisType, topTenType, countryType } from '@/components/extra/miscgraph/types';

type return_type = {
  xaxis: xaxisType,
  yseries: seriesType
}

export const countryPrep = (country: countryType[]): return_type => {
  let x_categoryArr: string[] = [];
  let y_dataArr: number[] = [];
  country.forEach((co, index) => {
    x_categoryArr.push(co.countryName);
    y_dataArr.push(parseInt(co.population));
  });
  const xaxis: xaxisType = { categories: x_categoryArr }
  const yseries: seriesType = [{ name: "population", data: y_dataArr }]
  return { xaxis, yseries }
}
export const euroPrep = (country: countryType[]): return_type => {
  let x_categoryArr: string[] = [];
  let y_dataArr: number[] = [];
  country.forEach((co, index) => {
    if (co.continentName.toLowerCase().startsWith("eur")) {
      x_categoryArr.push(co.countryName);
      y_dataArr.push(parseInt(co.population));
    }
  });
  const xaxis: xaxisType = { categories: x_categoryArr }
  const yseries: seriesType = [{ name: "population", data: y_dataArr }]
  return { xaxis, yseries }
}
export const asiaPrep = (country: countryType[]): return_type => {
  let x_categoryArr: string[] = [];
  let y_dataArr: number[] = [];
  country.forEach((co, index) => {
    if (co.continentName.toLowerCase().startsWith("asia")) {
      x_categoryArr.push(co.countryName);
      y_dataArr.push(parseInt(co.population));
    }
  });
  const xaxis: xaxisType = { categories: x_categoryArr }
  const yseries: seriesType = [{ name: "population", data: y_dataArr }]
  return { xaxis, yseries }
}
export const naPrep = (country: countryType[]): return_type => {
  let x_categoryArr: string[] = [];
  let y_dataArr: number[] = [];
  country.forEach((co, index) => {
    if (co.continentName.toLowerCase().startsWith("north ameri")) {
      x_categoryArr.push(co.countryName);
      y_dataArr.push(parseInt(co.population));
    }
  });
  const xaxis: xaxisType = { categories: x_categoryArr }
  const yseries: seriesType = [{ name: "population", data: y_dataArr }]
  return { xaxis, yseries }
}
export const saPrep = (country: countryType[]): return_type => {
  let x_categoryArr: string[] = [];
  let y_dataArr: number[] = [];
  country.forEach((co, index) => {
    if (co.continentName.toLowerCase().startsWith("south ameri")) {
      x_categoryArr.push(co.countryName);
      y_dataArr.push(parseInt(co.population));
    }
  });
  const xaxis: xaxisType = { categories: x_categoryArr }
  const yseries: seriesType = [{ name: "population", data: y_dataArr }]
  return { xaxis, yseries }
}
export const africaPrep = (country: countryType[]): return_type => {
  let x_categoryArr: string[] = [];
  let y_dataArr: number[] = [];
  country.forEach((co, index) => {
    if (co.continentName.toLowerCase().startsWith("africa")) {
      x_categoryArr.push(co.countryName);
      y_dataArr.push(parseInt(co.population));
    }
  });
  const xaxis: xaxisType = { categories: x_categoryArr }
  const yseries: seriesType = [{ name: "population", data: y_dataArr }]
  return { xaxis, yseries }
}

export const topTenWorld = (country: countryType[]): topTenType[] | [] => {
  let arr: topTenType[] = [];
  const sorted = country.sort((a, b) => (parseInt(b.population) - parseInt(a.population)))
  sorted.slice(0, 5).forEach((co, index) => {
    arr.push({ id: index, name: co.countryName, pop: parseInt(co.population) })
  });

  return arr;
}
export const topTenEuro = (country: countryType[]): topTenType[] | [] => {
  let arr: topTenType[] = [];
  const sorted = country.sort((a, b) => (parseInt(b.population) - parseInt(a.population))).filter(obj => obj.continentName.toLowerCase().startsWith("euro"))
  sorted.slice(0, 5).forEach((co, index) => {

    arr.push({ id: index, name: co.countryName, pop: parseInt(co.population) });

  });

  return arr;
}
export const topTenNA = (country: countryType[]): topTenType[] | [] => {
  let arr: topTenType[] = [];
  const sorted = country.sort((a, b) => (parseInt(b.population) - parseInt(a.population))).filter(obj => obj.continentName.toLowerCase().startsWith("north amer"))
  sorted.slice(0, 5).forEach((co, index) => {

    arr.push({ id: index, name: co.countryName, pop: parseInt(co.population) });

  });

  return arr;
}
export const topTenSA = (country: countryType[]): topTenType[] | [] => {
  let arr: topTenType[] = [];
  const sorted = country.sort((a, b) => (parseInt(b.population) - parseInt(a.population))).filter(obj => obj.continentName.toLowerCase().startsWith("south amer"))
  sorted.slice(0, 5).forEach((co, index) => {

    arr.push({ id: index, name: co.countryName, pop: parseInt(co.population) });

  });

  return arr;
}
export const topTenAsia = (country: countryType[]): topTenType[] | [] => {
  let arr: topTenType[] = [];
  const sorted = country.sort((a, b) => (parseInt(b.population) - parseInt(a.population))).filter(obj => obj.continentName.toLowerCase().startsWith("asia"))
  sorted.slice(0, 5).forEach((co, index) => {

    arr.push({ id: index, name: co.countryName, pop: parseInt(co.population) });

  });

  return arr;
}
export const topTenAfrica = (country: countryType[]): topTenType[] | [] => {
  let arr: topTenType[] = [];
  const sorted = country.sort((a, b) => (parseInt(b.population) - parseInt(a.population))).filter(obj => obj.continentName.toLowerCase().startsWith("africa"))
  sorted.slice(0, 5).forEach((co, index) => {

    arr.push({ id: index, name: co.countryName, pop: parseInt(co.population) });

  });

  return arr;
}

