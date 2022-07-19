import {usePreference} from "@utils/prefs";
import {IconButton, PaletteMode, Tooltip} from "@mui/material";
import {Brightness4 as DarkThemeIcon, Brightness7 as LightThemeIcon} from "@mui/icons-material";
import React from "react";

/**
 * Palette mode switcher.
 *
 * @constructor
 */
const AppbarThemeButton = () => {
    const [theme, setTheme] = usePreference<PaletteMode>("theme");
    return (
        <Tooltip title={theme === 'light' ? "Lights off" : "Lights on"}>
            <IconButton onClick={() => setTheme(theme === "light" ? "dark" : "light")} color="inherit" sx={{ml: 1}}>
                {theme === "light" ? <LightThemeIcon/> : <DarkThemeIcon/>}
            </IconButton>
        </Tooltip>
    );
}

export default AppbarThemeButton;
