import React, {useContext} from "react";
import {Box, Divider, Drawer, Toolbar, Typography} from "@mui/material";
import {ApplicationContext} from "@utils/context";

const sidebarWidth = 240;

export interface Props {
    showCaptions?: boolean;
    showDividers?: boolean;
}

const Sidebar = (props: Props) => {
    const {view: {addons}} = useContext(ApplicationContext);

    if (!addons || addons.size < 1)
        return null;

    return (
        <Drawer variant="permanent" anchor="left" sx={{
            flexShrink: 0,
            width: sidebarWidth,
            [`& .MuiDrawer-paper`]: {width: sidebarWidth, boxSizing: "border-box"}
        }}>
            <Toolbar/>

            {Array.from(addons.keys()).sort().map((key, index) => {
                const child = addons.get(key);
                return child ? (
                    <Box key={`child-${index + 1}`} sx={{p: 1}}>
                        {props.showCaptions === true && child.caption &&
                            <Typography variant="caption" sx={{textTransform: "uppercase"}}>{child.caption}</Typography>
                        }

                        {child.component}

                        {props.showDividers === true && index < addons.size - 1 &&
                            <Divider variant="middle" sx={{mt: 2}}/>
                        }
                    </Box>
                ) : null;
            })}
        </Drawer>
    );
}

export default Sidebar;