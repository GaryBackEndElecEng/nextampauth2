import type { GrayMatterFile } from "gray-matter"
type dataType = {
    data: {
        id: string,
        title: string,
        date: string
    }
}

type GraymatterType = {
    data: { [key: string]: any },
    content: string,
    excerpt?: string,
    orig: Buffer,
    language: string,
    matter: string,
    stringify(lang: string): string,
}
export interface BlogpostType {
    id: string,
    title: string,
    date: string
}
export interface BlogpostDataType {
    id: string,
    title: string,
    date: string,
    contentHTML: string
}