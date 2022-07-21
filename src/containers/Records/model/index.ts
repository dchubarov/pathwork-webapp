import {MaterialId} from "@model/common";
import {ChangeDto} from "@model/change";

export type CardLayoutElement = "caption" | "detail" | "footer-left" | "footer-right";
/** Field datatype */
export type FieldDatatype = "default" | "flag" | "number" | "date" | "datetime";

export interface TemplateDto {
    /** Display name of the template, e.g. Reminder */
    name: string;
}

export interface FieldTemplateDto {
    label?: string;
    datatype?: FieldDatatype;
}

export interface FieldValueDto {
    single?: string | number | boolean | null;
}

export interface FieldDto {
    name: string;
    template?: FieldTemplateDto;
    value?: FieldValueDto;
}

export interface RecordDto {
    id: MaterialId;
    created: ChangeDto;
    template: TemplateDto;
    tags?: string[];
    tint?: string;
}

export interface CardLayoutDto {
    element: CardLayoutElement;
    field: FieldDto;
}

export interface CardDto {
    record: RecordDto;
    layout: CardLayoutDto[];
}

export interface CardResponseDto {
    page: number;
    total: number;
    cards?: CardDto[];
}