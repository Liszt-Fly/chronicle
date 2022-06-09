export interface Iconfig {
    [key: string]: string
}
export interface Emoji {
    name: string,
    content: string
}

export interface qFile {
    //* 笔记名称
    name: string,
    //* 创建笔记的日期
    createdDate: Date,
    //* 上一次更新笔记的日期
    lastUpdateDate: Date,
    //* 笔记具有的标签
    tag?: string[]
    //* 是否是重点收藏笔记
    bStar?: boolean
    children?: qFile[],
    path: string
}

export interface cFile {
    name: string,
    tag: string,
    file: qFile,
    children: cFile[] | null
}
