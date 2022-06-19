import React from "react";
import {Box, Divider, Drawer, Toolbar, Typography} from "@mui/material";

const sidebarWidth = 240;

export interface SidebarChild {
    component: JSX.Element;
    caption?: string;
}

export interface SidebarProps {
    children?: Map<number, SidebarChild>;
    showCaptions?: boolean;
    showDividers?: boolean;
}

const Sidebar = (props: SidebarProps) => {
    if (!props.children || props.children.size < 1)
        return null;

    return (
        <Drawer variant="permanent" anchor="left" sx={{
            flexShrink: 0,
            width: sidebarWidth,
            [`& .MuiDrawer-paper`]: {width: sidebarWidth, boxSizing: "border-box"}
        }}>
            <Toolbar/>

            {Array.from(props.children.keys()).sort().map((key, index) => {
                const child = props.children?.get(key);
                return child ? (
                    <Box key={`child-${index + 1}`} sx={{p: 1}}>
                        {props.showCaptions === true && child.caption &&
                            <Typography variant="caption" sx={{textTransform: "uppercase"}}>{child.caption}</Typography>
                        }

                        {child.component}

                        {props.showDividers === true && index < props.children!.size - 1 &&
                            <Divider variant="middle" sx={{mt: 2}}/>
                        }
                    </Box>
                ) : null;
            })}
        </Drawer>
    );
}

export default Sidebar;