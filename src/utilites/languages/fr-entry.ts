import { BaseEntry, BaseForm } from "../base-entry";

export enum FRGender {
    Masculine = "Masculine",
    Feminine = "Feminine"
}

export enum FRNumber {
    Singular = "Singular",
    Plural = "Plural"
}

export type FRNounForm = BaseForm & {
    Gender?: FRGender,
    Number?: FRNumber
}

export type FRNounEntry = BaseEntry & {
    MainGender?: FRGender,
    MainNumber?: FRNumber,
    Forms: FRNounForm[]
}

export enum FRPerson {
    FirstSingular = "FirstSingular",
    SecondSingular = "SecondSingular",
    ThirdSingular = "ThirdSingular",
    FirstPlural = "FirstPlural",
    SecondPlural = "SecondPlural",
    ThirdPlural = "ThirdPlural"
}

export enum FRVerbConjugationType {
    IndicativePresent = "IndicativePresent",
    Imperfect = "Imperfect",
    CompoundPast = "CompoundPast",
    SimplePast = "SimplePast",
    PerfectPast = "PerfectPast", 
    SimpleFuture = "SimpleFuture",
    PerfectFuture = "PerfectFuture",
    SubjunctivePresent = "SubjunctivePresent",
    SubjunctivePast = "SubjunctivePast",
    ConditionalPresent = "ConditionalPresent",
    ConditionalPast = "ConditionalPast",
    ImperativePresent = "ImperativePresent",
    Infinitive = "Infinitive",
    PresentParticiple = "PresentParticiple",
    PastParticiple = "PastParticiple"
}

export enum FRVerbTransitivity {
    Transitive = "Transitive",
    Intransitive = "Intransitive"
}

export type FRVerbForm = BaseForm & {
    Person?: FRPerson,
    Type?: FRVerbConjugationType
}

export type FRVerbEntry = BaseEntry & {
    Transitivity?: FRVerbTransitivity,
    Forms: FRVerbForm[]
}

export type FRAdjectiveForm = BaseForm & {
    Gender?: FRGender,
    Number?: FRNumber
}

export type FRAdjectiveEntry = BaseEntry & {
    Forms: FRAdjectiveForm[]
}

export type FRArticleForm = BaseForm

export type FRArticleEntry = BaseEntry & {
    Forms: FRArticleForm[]
}

export type FRConjunctionForm = BaseForm

export type FRConjunctionEntry = BaseEntry & {
    Forms: FRConjunctionForm[]
}

export type FRPrepositionForm = BaseForm

export type FRPrepositionEntry = BaseEntry & {
    Forms: FRPrepositionForm[]
}

export type FRPronounForm = BaseForm

export type FRPronounEntry = BaseEntry & {
    Forms: FRPronounForm[]
}

export type FRAdverbForm = BaseForm

export type FRAdverbEntry = BaseEntry & {
    Forms: FRAdverbForm[]
}

export type FROtherForm = BaseForm

export type FROtherEntry = BaseEntry & {
    Forms: FROtherForm[]
}

export type FREntry = FRNounEntry 
    | FRVerbEntry
    | FRAdjectiveEntry
    | FRAdverbEntry
    | FRArticleEntry
    | FRConjunctionEntry
    | FRPrepositionEntry
    | FRPronounEntry
    | FROtherEntry
