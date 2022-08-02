import {GenericApi} from "@api/base";
import {BlogPageDto} from "../model";

/**
 * Blog API methods.
 */
class BlogApi extends GenericApi {

    /**
     * Loads blog posts chronologically.
     * @param page page number
     */
    async recentEntries(page?: number) {
        return this.getForObject<BlogPageDto>("/blog/recent", {p: page || 1})
    }
}

export default BlogApi;
