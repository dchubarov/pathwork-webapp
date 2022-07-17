import React, {useState} from "react";
import {Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography} from "@mui/material";
import {Check as CheckIcon, MoreVert as MoreVertIcon} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import {usePreference} from "@utils/prefs";

/**
 * Record browser navigator child controls.
 * @constructor
 */
const BrowserNavigatorItems: React.FC = () => {
    const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
    const [preferredMode, setPreferredMode] = usePreference("records.browser.mode");
    const [preferredSize, setPreferredSize] = usePreference("records.browser.size");
    const [preferredSortBy, setPreferredSortBy] = usePreference("records.browser.sort.by");
    const [preferredSortReverse, setPreferredSortReverse] = usePreference("records.browser.sort.reverse");
    const {t} = useTranslation("records");

    const handleMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setMenuAnchor(event.currentTarget);
    }

    const handleClickViewMode = (mode: string) => {
        setPreferredMode(mode);
        handleMenuClose();
    }

    const handleClickCardSize = (size: string) => {
        setPreferredSize(size);
        handleMenuClose();
    }

    const handleClickSortBy = (by: string) => {
        setPreferredSortBy(by);
        handleMenuClose();
    }

    const handleClickSortReverse = () => {
        setPreferredSortReverse(!preferredSortReverse);
        handleMenuClose();
    }

    const handleMenuClose = () => {
        setMenuAnchor(null);
    }

    const showSizeMenu = preferredMode === "masonry" || preferredMode === "grid";
    return (
        <>
            <Typography variant="inherit" sx={{flexGrow: 1}}>
                <i>Filters off</i>
            </Typography>

            <IconButton id="menu-button" size="small" onClick={handleMenu}>
                <MoreVertIcon fontSize="inherit"/>
            </IconButton>

            <Menu anchorEl={menuAnchor} open={menuAnchor?.id === "menu-button"} onClose={handleMenuClose}>
                <MenuItem disabled>
                    <ListItemText>{t("options.view.hint")}</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleClickViewMode("masonry")}>
                    {preferredMode === "masonry" && <ListItemIcon><CheckIcon/></ListItemIcon>}
                    <ListItemText inset={preferredMode !== "masonry"}>{t("options.view.masonry")}</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleClickViewMode("grid")}>
                    {preferredMode === "grid" && <ListItemIcon><CheckIcon/></ListItemIcon>}
                    <ListItemText inset={preferredMode !== "grid"}>{t("options.view.grid")}</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleClickViewMode("list")}>
                    {preferredMode === "list" && <ListItemIcon><CheckIcon/></ListItemIcon>}
                    <ListItemText inset={preferredMode !== "list"}>{t("options.view.list")}</ListItemText>
                </MenuItem>

                <Divider variant="middle"/>

                {showSizeMenu && <MenuItem disabled>
                    <ListItemText>{t("options.size.hint")}</ListItemText>
                </MenuItem>}
                {showSizeMenu && <MenuItem onClick={() => handleClickCardSize("small")}>
                    {preferredSize === "small" && <ListItemIcon><CheckIcon/></ListItemIcon>}
                    <ListItemText inset={preferredSize !== "small"}>{t("options.size.small")}</ListItemText>
                </MenuItem>}
                {showSizeMenu && <MenuItem onClick={() => handleClickCardSize("medium")}>
                    {preferredSize === "medium" && <ListItemIcon><CheckIcon/></ListItemIcon>}
                    <ListItemText inset={preferredSize !== "medium"}>{t("options.size.medium")}</ListItemText>
                </MenuItem>}
                {showSizeMenu && <MenuItem onClick={() => handleClickCardSize("large")}>
                    {preferredSize === "large" && <ListItemIcon><CheckIcon/></ListItemIcon>}
                    <ListItemText inset={preferredSize !== "large"}>{t("options.size.large")}</ListItemText>
                </MenuItem>}

                {showSizeMenu && <Divider variant="middle"/>}

                <MenuItem disabled>
                    <ListItemText>{t("options.sort.hint")}</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleClickSortBy("updated")}>
                    {preferredSortBy === "updated" && <ListItemIcon><CheckIcon/></ListItemIcon>}
                    <ListItemText inset={preferredSortBy !== "updated"}>{t("options.sort.updated")}</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleClickSortBy("created")}>
                    {preferredSortBy === "created" && <ListItemIcon><CheckIcon/></ListItemIcon>}
                    <ListItemText inset={preferredSortBy !== "created"}>{t("options.sort.created")}</ListItemText>
                </MenuItem>

                <Divider variant="middle"/>

                <MenuItem onClick={handleClickSortReverse}>
                    {preferredSortReverse && <ListItemIcon><CheckIcon/></ListItemIcon>}
                    <ListItemText inset={!preferredSortReverse}>{t("options.sort.reverse")}</ListItemText>
                </MenuItem>
            </Menu>
        </>
    )
}

export default BrowserNavigatorItems;
