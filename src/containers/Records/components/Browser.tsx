import React, {useContext, useEffect, useState} from "react";
import {ApplicationContext} from "@utils/context";
import BrowserActions from "@feature/Records/components/BrowserActions";
import Navigator from "@components/Navigator";
import BrowserNavigatorItems from "@feature/Records/components/BrowserNavigatorItems";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {CardResponseDto} from "@model/records";
import {Slide} from "@mui/material";
import OnScreen from "@components/OnScreen";
import {useReadonlyPreferences} from "@utils/prefs";
import Debug from "@components/Debug";
import BrowserMasonry from "@feature/Records/components/BrowserMasonry";
import BrowserGrid from "@feature/Records/components/BrowserGrid";
import BrowserList from "@feature/Records/components/BrowserList";

/**
 * Records collection browser container.
 * @constructor
 */
const Browser: React.FC = () => {
    const {configureAddon, configureView, ejectView} = useContext(ApplicationContext);
    const preferences = useReadonlyPreferences("records.browser");
    const [data, setData] = useState<CardResponseDto | null>(null);
    const [scrolledDown, setScrolledDown] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {
        configureView(t("pages.records"));
        configureAddon(<BrowserActions/>);
        return () => {
            ejectView();
        }
    }, [configureAddon, configureView, ejectView, t]);

    useEffect(() => {
        axios.get<CardResponseDto>(process.env.REACT_APP_API_ROOT + "/records/cards?p=1")
            .then(response => setData(response.data))
            .catch(() => setData(null));
    }, []);

    const cards = data?.cards && data.cards.length > 0 ? data.cards : undefined;
    return (
        <>
            <OnScreen onVisibilityChanged={visible => setScrolledDown(!visible)}
                      sx={{position: "relative", top: -20}}/>

            <Navigator page={1} total={3}>
                <BrowserNavigatorItems/>
            </Navigator>

            <Debug>
                {`Preferences: ${JSON.stringify(preferences)}`}
            </Debug>

            {cards && preferences.mode === "masonry" &&
                <BrowserMasonry preferences={preferences} data={cards!}/>}

            {cards && preferences.mode === "grid" &&
                <BrowserGrid preferences={preferences} data={cards}/>}

            {cards && preferences.mode === "list" &&
                <BrowserList data={cards}/>}

            <Slide in={scrolledDown} direction="up" mountOnEnter unmountOnExit>
                <Navigator page={1} total={3} scrollToTopButton position="bottom" sticky>
                    <BrowserNavigatorItems/>
                </Navigator>
            </Slide>
        </>
    );
}

export default Browser;
