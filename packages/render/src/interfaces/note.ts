export interface note {
    //* 笔记名称
    name: string,
    //* 创建笔记的日期
    createdDate: string,
    //* 上一次更新笔记的日期
    lastUpdateDate: string,
    //* 笔记具有的标签
    tag: string[]
    //* 是否是重点收藏笔记
    bStar: boolean
}