import Api from "@api/base";
import {BlogPageDto} from "../model";

const BlogApi = {

    getRecentEntries: (page?: number) => Api.get<BlogPageDto>("/blog/recent", {p: page || 1}),
}

export default BlogApi;
