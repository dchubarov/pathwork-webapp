import React, {useContext, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";

import {ApplicationContext} from "@utils/context";
import {MAX_YEAR, MIN_YEAR} from "../reducers/calendar";
import YearSelector from "./YearSelector";

const Calendar: React.FC = () => {
    const {configureAddon, ejectView} = useContext(ApplicationContext);
    const navigate = useNavigate();
    const {year} = useParams();

    useEffect(() => {
        return () => ejectView();
    }, [ejectView]);

    useEffect(() => {
        let showYear: number = (year === undefined || !year.match(/^\d{4}$/)) ? NaN : parseInt(year);
        if (isNaN(showYear) || showYear < MIN_YEAR || showYear > MAX_YEAR) {
            const presentYear = moment().year();
            if (year !== undefined) {
                console.warn(`Expected year in range [${MIN_YEAR}..${MAX_YEAR}], got invalid value '${year}', will redirect to /${presentYear}`);
            }

            navigate(`../${presentYear}`, {replace: true});
            return;
        }

        configureAddon(<YearSelector year={showYear}/>);
    }, [year, navigate, configureAddon]);

    return null;
}

export default Calendar;
