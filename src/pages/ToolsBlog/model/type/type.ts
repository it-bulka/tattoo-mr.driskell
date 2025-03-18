export type SubSubSectionType = { title: string, id: string}
export type SubSectionType = { title: string, id: string, subSubSections: SubSubSectionType[] }
export type SectionType = { title: string, id: string, subSections: SubSectionType[] }
type IdListType = string[]

type PType = { type: 'paragraph', content: string }
type TitleType = { type: 'title', content: string }
type ImgType = { type: 'img', content: string, alt: string | undefined }
type  ListType = { type: 'list', content: string[] }
export type Paragraph = {
  id: string
  link?: string // connection to section, subsection or subSubSection id
} & (PType | TitleType | ImgType | ListType)

export type ArticleType = {
  title: string,
  prologue: string,
  content: {
    sections: (Omit<SectionType, 'subSections'> & { subSections: IdListType})[],
    subSections: Record<string, (Omit<SubSectionType, 'subSubSections'> & { subSubSections: IdListType})>,
    subSubSections: Record<string, SubSubSectionType>,
  },
  paragraphs: Paragraph[]
}