import { BaseEntry, BaseForm, Class } from "../base-entry";

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

export function getFRFormCode(gender?: FRGender, number?: FRNumber) {
    let typeId = "";
    if(gender == FRGender.Masculine) {
        typeId += "m";
    } else if(gender == FRGender.Feminine) {
        typeId += "f";
    }
    if(number == FRNumber.Plural) {
        typeId += "pl";
    }
    return typeId;
}

export function getFRTypeCode(entry: FREntry) {
    switch(entry.Class) {
        case Class.Noun: {
            const nounEntry = entry as FRNounEntry;
            return `n${getFRFormCode(nounEntry.MainGender, nounEntry.MainNumber)}`;
        }
        case Class.Verb: {
            const verbEntry = entry as FRVerbEntry;
            switch(verbEntry.Transitivity) {
                case FRVerbTransitivity.Intransitive:
                    return "vi"
                case FRVerbTransitivity.Transitive:
                    return "vtr"
                default:
                    return "v"
            }
        }
        case Class.Adjective:
            return "adj"
        case Class.Adverb:
            return "adv"
        case Class.Preposition:
            return "prep"
        case Class.Article:
            return "article"
        case Class.Conjunction:
            return "conj"
        case Class.Pronoun:
            return "pron"
        case Class.Other:
            return ""
    }
}
