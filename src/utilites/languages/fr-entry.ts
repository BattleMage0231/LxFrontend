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

export type FRNounEntry = BaseEntry & {
    MainGender?: FRGender,
    MainNumber?: FRNumber,
    MainForms: { [gender in FRGender]: { [numb in FRNumber]: FRForm | undefined } | undefined }
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

export type FRVerbEntry = BaseEntry & {
    Transitivity?: FRVerbTransitivity,
    MainForms: { [type in FRVerbConjugationType]: { [person in FRPerson]: FRForm | undefined } | undefined }
}

export type FRAdjectiveEntry = BaseEntry & {
    MainForms: { [gender in FRGender]: { [numb in FRNumber]: FRForm | undefined } | undefined }
}

export type FRArticleEntry = BaseEntry

export type FRConjunctionEntry = BaseEntry

export type FRPrepositionEntry = BaseEntry

export type FRPronounEntry = BaseEntry

export type FRAdverbEntry = BaseEntry

export type FROtherEntry = BaseEntry

export type FREntry = FRNounEntry 
    | FRVerbEntry
    | FRAdjectiveEntry
    | BaseEntry

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
