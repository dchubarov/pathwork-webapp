import React from "react";
import {usePreference} from "@utils/prefs";
import {Badge, IconButton} from "@mui/material";
import {Language as LanguageIcon} from "@mui/icons-material";
import {i18n} from "i18next";

interface Props {
    i18n: i18n;
    mode?: "cycle" | "menu" | "auto";
}

/**
 * Language switcher button.
 *
 * @param i18n i18next instance
 * @param mode button operation mode
 * @constructor
 */
const AppbarLanguageButton: React.FC<Props> = ({i18n, mode = "auto"}) => {
    const [preferredLanguage, setPreferredLanguage] = usePreference("language");
    const availableLanguageCount = i18n.languages.length;

    const handleClick = () => {
        if (mode === "cycle" || (mode === "auto" && availableLanguageCount < 3)) {
            const i = i18n.languages.findIndex(l => preferredLanguage === l);
            if (i !== -1) {
                const nextLanguage = i18n.languages[i < i18n.languages.length - 1 ? i + 1 : 0];
                setPreferredLanguage(nextLanguage);
            }
        } else {
            // TODO show language menu
        }
    }

    return (
        <IconButton color="inherit" onClick={handleClick} disabled={availableLanguageCount < 2}>
            <Badge badgeContent={i18n.t("language.label").toString().toLowerCase()}
                   anchorOrigin={{horizontal: "right", vertical: "bottom"}}
                   color="success">
                <LanguageIcon/>
            </Badge>
        </IconButton>
    );
}

export default AppbarLanguageButton;
