import {useContext, useMemo} from "react";
import {ApplicationContext} from "@utils/context";
import {GenericApi} from "@api/base";

/**
 * Returns a memorized instance of API class
 * @param t an API class type
 */
export function useApiClient<T extends GenericApi>(t: new (...args: ConstructorParameters<typeof GenericApi>) => T): T {
    const {auth, preferences} = useContext(ApplicationContext);
    return useMemo(() => new t({
        headers: {
            "Authorization": auth.status === "authenticated" ? `Session ${auth.session}` : false,
            "Accept-Language": preferences.language
        }
    }), [t, auth, preferences.language]);
}
