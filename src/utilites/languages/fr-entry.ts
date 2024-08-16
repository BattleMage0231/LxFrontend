import { Class } from "../base-entry"
import { FRAdjectiveEntryForms, FREntry, FREntryWithMainForms, FREntryWithoutMainForms, FRGender, FRNounEntryForms, FRNumber, FRVerbEntryForms, FRVerbTransitivity } from "./fr-types"

export type { FREntry }

export function isFREntryWithMainForms(entry: FREntry): entry is FREntryWithMainForms {
    return (entry as FREntryWithMainForms).MainForms !== undefined;
}

export function getFRNounAdjectiveCode(gender?: FRGender, number?: FRNumber) {
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
            return `n${getFRNounAdjectiveCode(entry.MainGender, entry.MainNumber)}`;
        }
        case Class.Verb: {
            switch(entry.Transitivity) {
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

export function castFREntryToClass(entry: FREntry, newClass: Class): FREntry {
    if(entry.Class == newClass) {
        return { ...entry }
    }
    const newEntryBase = {
        Id: entry.Id,
        Key: entry.Key,
        Definition: entry.Definition,
        Notes: entry.Notes,
        Examples: entry.Examples,
        Synonyms: entry.Synonyms,
        OtherForms: entry.OtherForms,
    }
    switch(newClass) {
        case Class.Noun: {
            return {
                ...newEntryBase,
                Class: Class.Noun,
                MainForms: entry.Class == Class.Adjective ? entry.MainForms : {} as FRNounEntryForms
            }
        }
        case Class.Adjective: {
            return {
                ...newEntryBase,
                Class: Class.Adjective,
                MainForms: entry.Class == Class.Noun ? entry.MainForms : {} as FRAdjectiveEntryForms
            }
        }
        case Class.Verb: {
            return {
                ...newEntryBase,
                Class: Class.Verb,
                MainForms: {} as FRVerbEntryForms
            }
        }
        default:
            return { ...newEntryBase, Class: newClass } as FREntryWithoutMainForms;
    }
}
