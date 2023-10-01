import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { GrayMatterFile } from "gray-matter"
import { remark } from "remark";
import html from "remark-html";
import type { BlogpostType } from "@context/blogTypes";

const root = process.cwd();
const postDirectory = path.join(root, "/src/blogs");

export function getSortedPostDate() {
    const filenames = fs.readdirSync(postDirectory);
    const allPostsdata = filenames.map((filename) => {
        const id = filename.replace(/\.mdx$/, "");
        const fullPath = path.join(postDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        const blogPost: BlogpostType = {
            id: id,
            title: matterResult.data.title,
            date: matterResult.data.date
        }
        return blogPost
    });
    return allPostsdata.sort((a, b) => a.date < b.date ? 1 : -1);
}

export async function getPostdata(id: string) {
    const fullPath = path.join(postDirectory, `${id}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    //use gray-matter to parse metadata
    const matterResult = matter(fileContents);
    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHTML = processedContent.toString()
    const blogPostWithHTML: BlogpostType & { contentHTML: string } = {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        contentHTML
    }
    return blogPostWithHTML;

}
export async function getSingleFileMdx(fileName: string) {
    const fullPath = path.join(postDirectory, `${fileName}`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    //use gray-matter to parse metadata
    const matterResult = matter(fileContents);
    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHTML = processedContent.toString()
    const blogPostWithHTML: BlogpostType & { contentHTML: string } = {
        id: fileName.replace(/\.mdx$/, ""),
        title: matterResult.data.title,
        date: matterResult.data.date,
        contentHTML
    }
    return blogPostWithHTML;

}

export async function generateMetaData({ params }: { params: { postid: string } }) {
    const posts = getSortedPostDate() //deduped- info was already pulled( its stored in cache)
    const { postid } = params;
    const post = posts.find(post => post.id === postid);
    if (!post) {
        return {
            title: "post not found"
        }
    } else {
        return {
            title: post.title
        }
    }
}