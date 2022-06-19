import {IconButton, styled} from "@mui/material";

const RoundedIconButton = styled(IconButton)(({theme}) => ({
    borderRadius: theme.shape.borderRadius,
}));

export default RoundedIconButton;
