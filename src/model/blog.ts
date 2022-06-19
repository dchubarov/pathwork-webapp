import {TagName, TagUsageDto} from "./tag";

export interface BlogPostDto {
    id: string;
    title: string;
    text: string;
    author: string;
    created: string;
    tags: Array<TagName>;
}

export interface BlogPageDto {
    pageSize: number;
    pageNumber: number;
    totalPages: number;
    posts?: Array<BlogPostDto>;
    availableTags?: Array<TagUsageDto | TagName>;
}
