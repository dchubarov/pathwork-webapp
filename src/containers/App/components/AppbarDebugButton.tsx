import {usePreference} from "@utils/prefs";
import {IconButton, Tooltip} from "@mui/material";
import {PestControl as DebugOnIcon, PestControlOutlined as DebugOffIcon} from "@mui/icons-material";
import React from "react";

/**
 * A button allowing to turn debugging features on and off.
 * Switching is done by setting toggling preference value `developer.enableDebugFeatures` which
 * is only available if NODE_ENV === "development".
 *
 * @constructor
 */
const AppbarDebugButton = () => {
    const [enableDebugFeatures, setEnableDebugFeatures] = usePreference("developer.enableDebugFeatures");
    return (
        <Tooltip title={`${enableDebugFeatures ? "Disable" : "Enable"} debug features`}>
            <IconButton color="inherit" onClick={() => setEnableDebugFeatures(!enableDebugFeatures)}>
                {enableDebugFeatures ? <DebugOnIcon/> : <DebugOffIcon/>}
            </IconButton>
        </Tooltip>
    );
}

export default AppbarDebugButton;
