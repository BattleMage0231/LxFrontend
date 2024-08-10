import { useLanguage } from "../../contexts/language-context";
import { BaseEntry, Class } from "../../utilites/base-entry"
import { FRNounEntry } from "../../utilites/languages/fr-entry";

type EntryProps = {
    data: BaseEntry,
    setData: (res: BaseEntry) => void
}

export default function Entry({ data, setData }: EntryProps) {
    const language = useLanguage();
    return (
        <ul>
            <div>
                <p>Word: {data.Key}</p>
                <p>Class: {data.Class}</p>
                {data.Definition && <p>Definition: {data.Definition}</p>}
                {
                    data.Class == Class.Noun && ((data as FRNounEntry)!.MainGender !== undefined) &&
                    <p>MainGender: {(data as FRNounEntry).MainGender}</p>
                }
                <button onClick={() => {
                    data.Key = "unga bunga";
                    setData(data);
                }}>Update</button>
            </div>
        </ul>
    );
}
