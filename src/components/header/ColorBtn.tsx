
import React, { MouseEvent } from 'react';
// import {useTheme} from 'next-themes';
import { Switch } from '@mui/material';
import { ThemeContext } from "@context/ThemeContext";
import { IconButton } from "@mui/material";


const ColorBtn = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const [bool, setBool] = React.useState<boolean>(false);
  const [execute, setExecute] = React.useState<boolean>(false);
  const bg = theme === "dark" ? "black" : "white";


  React.useMemo(async () => {
    const colorScheme = bool ? "dark" : "light";
    if (colorScheme && execute) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ color: colorScheme })
      }

      const res = await fetch("/api/colorchange", options);
      if (!res.ok) {
        console.log(await res.json())
        return
      }
      const body: { color: string } = await res.json()
      if (body.color === "dark") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    } else { setTheme("light"); }

  }, [bool, setTheme, execute]);


  return (
    <div className={`flex flex-col items-center justify-center absolute -right-2 top-[15%] sm:right-2 sm:top-[17%] lg:-right-5 lg:top-3  shadow shadow-blue rounded-lg w-[70px] h-[40px]  ${theme}:bg-black  `} style={{ zIndex: "3000", background: bg }}>

      <Switch checked={bool} onChange={(e) => {
        setBool(e.target.checked);
        setExecute(true);
      }}
        className={"bg-white dark:bg-black rounded-lg"}
        style={{ color: "blue", }}
      />


    </div>
  )
}

export default ColorBtn