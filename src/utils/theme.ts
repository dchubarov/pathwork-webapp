import {PaletteMode, ThemeOptions} from "@mui/material";
import LinkBehavior from "../components/LinkBehavior";
import {blue, grey} from "@mui/material/colors";

export default function getDesignTokens(mode: PaletteMode): ThemeOptions {
    return ({
        palette: {
            mode,
            ...(mode === "light" ? {
                utility: {
                    background: blue[50],
                    text: grey[700],
                }
            } : {
                utility: {
                    background: grey[900],
                    text: grey[400],
                }
            }),
        },
        components: {
            MuiLink: {
                defaultProps: {
                    underline: "hover",
                }
            },
            MuiButtonBase: {
                defaultProps: {
                    LinkComponent: LinkBehavior,
                    disableRipple: true,
                }
            },
        }
    });
}