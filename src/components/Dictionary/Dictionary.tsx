import { useParams } from "react-router-dom"
import SearchBar from "./SearchBar"
import EntryList from "./entries/EntryList"
import { useTranslation } from "react-i18next"

export default function Dictionary() {
    const params = useParams()
    const { t } = useTranslation()
    return (
        <div className="mx-auto px-20">
            <div className="bg-base-200 px-4 pt-5">
                <div className="relative flex">
                    <div className="w-full absolute left-1/2 -translate-x-1/2 pointer-events-none">
                        <SearchBar />
                    </div>
                    <div className="ml-auto">
                        <button className="btn btn-primary" onClick={() => {}}>{t('dictionary.create')}</button>
                    </div>
                </div>
                <EntryList searchString={params.key ?? ""} />
            </div>
        </div>
    )
}
