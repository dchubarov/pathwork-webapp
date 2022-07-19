import {Avatar, styled} from "@mui/material";

const AppbarLogo = styled(Avatar)(({theme}) => ({
    transition: theme.transitions.create("opacity"),
    opacity: 0.85,
    "&:hover": {
        opacity: 1,
    },
}));

export default AppbarLogo;