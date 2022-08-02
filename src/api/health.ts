import {GenericApi} from "./base";
import {HealthCheckDto} from "@model/health";

/**
 * Health API methods.
 */
export class HealthApi extends GenericApi {

    /**
     * Performs a health check.
     */
    async checkHealth(): Promise<true> {
        const response = await this.getForObject<HealthCheckDto>("health");
        return response.status === "OK" ? true : Promise.reject(response.status);
    }
}

/** Default health API instance */
export default new HealthApi();
