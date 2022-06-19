import * as createPalette from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
    interface Palette {
        utility: {
            background: string;
            text: string;
        }
    }

    interface PaletteOptions {
        utility?: {
            background?: string;
            text?: string;
        }
    }
}
