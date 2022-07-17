import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import Backend from "i18next-http-backend";

i18next
    .use(initReactI18next)
    .use(Backend)
    .init({
        lng: process.env.REACT_APP_DEFAULT_LANG || "en",
        fallbackLng: ["en", "ru"],
        defaultNS: "common"
    })
    .then();
