import Api from "@api/base";
import {CardResponseDto} from "../model";

const RecordsApi = {

    getCards: (page?: number) => Api.get<CardResponseDto>("/records/cards", {p: page || 1}),

}

export default RecordsApi;
