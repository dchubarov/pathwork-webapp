import React from "react";
import {useTranslation} from "react-i18next";
import {Box, Divider, IconButton, Link, Paper, styled, SxProps} from "@mui/material";
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon
} from "@mui/icons-material";
import LinkBehavior from "@components/LinkBehavior";

export interface NavigatorProps {
    page: number;
    total: number;
    position?: "top" | "bottom";
    sticky?: boolean;
    scrollToTopButton?: boolean;
    children?: React.ReactNode;
    onPageChange?: (page: number) => void;
}

const NavigatorPaper = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.utility.background,
    color: theme.palette.utility.text,
    ...theme.typography.body2
}));

const Navigator = React.forwardRef<any, NavigatorProps>(({
                                                             page,
                                                             total,
                                                             position = "top",
                                                             sticky = false,
                                                             scrollToTopButton = false,
                                                             children,
                                                             onPageChange
                                                         }, ref) => {
    const {t} = useTranslation();
    const stickySxProps: Partial<SxProps> = {
        bottom: sticky && position === "bottom" ? "1ch" : undefined,
        top: sticky && position === "top" ? "1ch" : undefined,
        position: sticky ? "sticky" : "relative",
    };

    const itemSxProps: Partial<SxProps> = {
        ml: 1
    };

    return (
        <NavigatorPaper ref={ref}
                        elevation={1}
                        sx={{p: 1, display: "flex", alignItems: "center", borderRadius: 2, ...stickySxProps}}>
            {/* Pagination controls */}
            <IconButton size="small"
                        disabled={page <= 1}
                        onClick={() => onPageChange && onPageChange(page - 1)}>
                <ChevronLeftIcon fontSize="inherit"/>
            </IconButton>

            <IconButton size="small"
                        disabled={page >= total}
                        onClick={() => onPageChange && onPageChange(page + 1)}>
                <ChevronRightIcon fontSize="inherit"/>
            </IconButton>

            <Link href="#"
                  component={LinkBehavior}
                  variant="inherit"
                  underline="always"
                  sx={{
                      textDecorationStyle: "dotted",
                      flexWrap: "nowrap",
                      ...itemSxProps
                  }}>{t("navigator.page", {page, total})}</Link>

            {/* Extra child components */}
            {children && <Divider orientation="vertical" variant="middle" flexItem sx={{...itemSxProps}}/>}
            <Box component="span" sx={{display: "flex", alignItems: "center", flexGrow: 1, ...itemSxProps}}>
                {children}
            </Box>

            {/* Scroll to top button */}
            {scrollToTopButton &&
                <IconButton size="small"
                            onClick={() => window.scrollTo({behavior: "smooth", top: 0})}
                            sx={{...itemSxProps}}>
                    <KeyboardArrowUpIcon fontSize="inherit"/>
                </IconButton>}
        </NavigatorPaper>
    );
});

export default Navigator;
