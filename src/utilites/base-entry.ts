export enum Language {
    FR = "FR"
}

export enum Class {
    Noun = "Noun",
    Verb = "Verb",
    Adjective = "Adjective",
    Adverb = "Adverb",
    Preposition = "Preposition",
    Article = "Article",
    Conjunction = "Conjunction",
    Pronoun = "Pronoun",
    Other = "Other"
}

export type BaseForm = {
    Key: string,
    Notes?: string
}

export type BaseEntry = {
    Id?: string,
    Class: Class,
    Key: string,
    NormalizedKey?: string,
    Definition?: string,
    Notes?: string,
    Examples: string[],
    Synonyms: string[],
    OtherForms: BaseForm[]
}
