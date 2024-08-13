import { useEffect, useState } from "react";
import { BaseEntry, Language } from "../../utilites/base-entry";
import FREntryService from "../../services/languages/fr-entry-service";
import { useLanguage } from "../../contexts/language-context";
import FREntryCell from "./languages/FREntryCell";
import { FREntry } from "../../utilites/languages/fr-entry";

type EntryListProps = {
    key: string
}

export default function EntryList({ key }: EntryListProps) {
    const language = useLanguage();
    const [searchResults, setSearchResults] = useState<BaseEntry[]>([]);
    useEffect(() => {
        performSearch(key).catch(err => console.log(err));
    }, [key]);
    function setSearchResult(index: number, newResult: BaseEntry | null) {
        let targetId = null;
        if(newResult === null) {
            setSearchResults(searchResults.filter((res, idx) => {
                if(index == idx) {
                    targetId = res.Id!;
                    return false;
                }
                return true;
            }));
            if(targetId) {
                FREntryService.deleteEntry(targetId);
            }
        } else {
            setSearchResults(searchResults.map((res, idx) => {
                if(index == idx) {
                    targetId = res.Id!;
                    return newResult;
                } else {
                    return res;
                }
            }));
            if(targetId) {
                FREntryService.updateEntry(targetId, newResult as FREntry);
            }
        }
    }
    async function performSearch(key: string) {
        console.log(key);
        const results = await FREntryService.getAllEntries();
        setSearchResults(results ?? []);
    }
    const searchResultsRendered = searchResults.map((result, idx) => 
        <div key={result.Id}>
            {
                language == Language.FR &&
                <FREntryCell
                    data={result as FREntry}
                    setData={(res: FREntry | null) => setSearchResult(idx, res)}
                />
            }
        </div>
    );
    return (
        <div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <ul className="list-disc list-inside">{searchResultsRendered}</ul>
        </div>
    );
}
