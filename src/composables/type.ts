export interface msfile {
    name?: string,
    isDirectory?: boolean,
    children?: msfile[] | null,
}