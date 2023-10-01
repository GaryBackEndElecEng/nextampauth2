import tempArr from "@climate/temperature/temperature.json";

export const colorArr = [
    { color: "blue", number: '#1fb6ff' },
    { color: "red", number: "#FF0000" },
    { color: "pink", number: '#ff49db' },
    { color: "orange", number: '#ff7849' },
    { color: "green", number: '#13ce66' },
    { color: "gray_dark", number: '#273444' },
    { color: "gray", number: '#8492a6' },
    { color: "white", number: "rgb(255,255,255)" },
    { color: "gray_light", number: '#d3dce6' },
    { color: "site_blue_light", number: "#74B3CE" },
    { color: "site_blue_grey", number: "#508991" },
    { color: "site_blue_dark", number: "#172A3A" },
    { color: "site_green_dark", number: "#004346" },
    { color: "site_mint", number: "#09BC8A" },
    { color: "black", number: "#2B2118" },
    { color: "slate_blue", number: "#355691" },
    { color: "light_marron", number: "#DB324D" },
    { color: "lime_green", number: "#8AE9C1" },
    { color: "sky_blue", number: "#91A6FF" },
]

export function findColor(color: string): string {
    let col: string;
    const retColor = colorArr.find(col => (col.color === color));
    if (retColor) {
        return retColor.number
    } else {
        return "#1fb6ff"
    }

}
type entryType<T> = {
    [K in keyof T]: [K: string, T[K]]
}
type resultStatType = {
    avg: number,
    slope: number,
    years: number,
    totIncrease: number
} | undefined

export function genStatistic(data: entryType<object>): resultStatType {
    let arr: { year: string, value: number }[] | undefined = [];
    let result: resultStatType;
    for (const [key, amount] of Object.entries(data)) {
        arr.push({ year: key, value: parseFloat(amount) });
    }
    if (arr && arr.length!!) {
        let average: number;
        let slope: number;
        let sumValue = arr.reduce((a, b) => (a + b.value), 0);
        let sumItems = arr.length ? arr.length : 1;
        average = sumValue / sumItems;
        let sumslopes = arr.reduce((a, b) => ((b.value - Math.abs(a)), 1), 1);
        average = parseFloat(average.toFixed(3));
        slope = sumslopes / sumItems;
        slope = parseFloat(slope.toFixed(3));
        let maxMinArr = arr.map(rec => ((rec.value)))
        let maxTemp = Math.max(...maxMinArr);
        let minTemp = Math.min(...maxMinArr);
        let totIncrease = parseFloat((maxTemp - minTemp).toFixed(4))
        return { avg: average, slope: slope, years: sumItems, totIncrease: totIncrease }
    }

}

