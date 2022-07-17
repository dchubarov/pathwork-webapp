import React from "react";
import {alpha, InputBase, styled} from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material";
import {SearchHandler} from "@utils/context";

const SearchContainer = styled("div")(({theme}) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: "1ch",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const SearchInput = styled(InputBase)(({theme}) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

export interface SearchFieldProps {
    onSearch: SearchHandler;
    placeholder?: string;
}

const SearchField = ({placeholder, onSearch}: SearchFieldProps) => {
    return (
        <SearchContainer>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <SearchInput
                placeholder={placeholder || "Search..."}
                inputProps={{"aria-label": "search"}}
                onKeyDown={event => {
                    if (event.key === 'Enter') {
                        event.currentTarget.blur();
                        const s = event.currentTarget.value;
                        event.currentTarget.value = "";
                        onSearch(s);
                    }
                }}
            />
        </SearchContainer>
    )
}

export default SearchField;
