import { BaseEntry, BaseForm, Class } from "../base-entry"

export type FRForm = BaseForm

export enum FRGender {
    Masculine = "Masculine",
    Feminine = "Feminine"
}

export enum FRNumber {
    Singular = "Singular",
    Plural = "Plural"
}

export type FRNounEntryForms = { [gender in FRGender]: { [numb in FRNumber]: FRForm | undefined } | undefined }

export type FRNounEntry = BaseEntry & {
    MainGender?: FRGender,
    MainNumber?: FRNumber,
    MainForms: FRNounEntryForms,
    Class: Class.Noun
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

export type FRVerbEntryForms = { [type in FRVerbConjugationType]: { [person in FRPerson]: FRForm | undefined } | undefined }

export type FRVerbEntry = BaseEntry & {
    Transitivity?: FRVerbTransitivity,
    MainForms: FRVerbEntryForms,
    Class: Class.Verb
}

export type FRAdjectiveEntryForms = { [gender in FRGender]: { [numb in FRNumber]: FRForm | undefined } | undefined }

export type FRAdjectiveEntry = BaseEntry & {
    MainForms: FRAdjectiveEntryForms,
    Class: Class.Adjective
}

export type FRArticleEntry = BaseEntry & { Class: Class.Article }

export type FRConjunctionEntry = BaseEntry & { Class: Class.Conjunction }

export type FRPrepositionEntry = BaseEntry & { Class: Class.Preposition }

export type FRPronounEntry = BaseEntry & { Class: Class.Pronoun }

export type FRAdverbEntry = BaseEntry & { Class: Class.Adverb }

export type FROtherEntry = BaseEntry & { Class: Class.Other }

export type FREntryWithMainForms = FRNounEntry
    | FRVerbEntry
    | FRAdjectiveEntry

export type FREntryWithoutMainForms = FRArticleEntry
    | FRConjunctionEntry
    | FRPrepositionEntry
    | FRPronounEntry
    | FRAdverbEntry
    | FROtherEntry

export type FREntry = FREntryWithMainForms | FREntryWithoutMainForms
