import {GenericApi} from "@api/base";
import {CardResponseDto} from "../model";

class RecordsApi extends GenericApi {

    async allCards(page?: number) {
        return this.getForObject<CardResponseDto>("/records/cards", {p: page || 1});
    }
}

// const RecordsApi = {
//
//     getCards: (page?: number) => Api.get<CardResponseDto>("/records/cards", {p: page || 1}),
//
// }

export default RecordsApi;
