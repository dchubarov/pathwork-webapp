import React, {useContext, useEffect, useState} from "react";

import {useReadonlyPreferences} from "@utils/prefs";
import {useApiClient} from "@api/hook";
import {ApplicationContext} from "@utils/context";
import Navigator from "@components/Navigator";
import {Slide} from "@mui/material";
import OnScreen from "@components/OnScreen";

import Debug from "@components/Debug";
import RecordsApi from "../api";
import {CardResponseDto} from "../model";
import BrowserNavigatorItems from "./BrowserNavigatorItems";
import BrowserActions from "./BrowserActions";
import BrowserMasonry from "./BrowserMasonry";
import BrowserGrid from "./BrowserGrid";
import BrowserList from "./BrowserList";

/**
 * Records collection browser container.
 * @constructor
 */
const Browser: React.FC = () => {
    const {configureAddon, configureView, ejectView} = useContext(ApplicationContext);
    const preferences = useReadonlyPreferences("records.browser");
    const [data, setData] = useState<CardResponseDto | null>(null);
    const [scrolledDown, setScrolledDown] = useState(false);
    const recordsApi = useApiClient(RecordsApi);

    useEffect(() => {
        configureAddon(<BrowserActions/>);
        return () => {
            ejectView();
        }
    }, [configureAddon, configureView, ejectView]);

    useEffect(() => {
        recordsApi.allCards()
            .then(response => setData(response))
            .catch(() => setData(null));
    }, [recordsApi]);

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
