import { useParams } from "react-router-dom"
import SearchBar from "./SearchBar"
import EntryList from "./entries/EntryList"
import { useTranslation } from "react-i18next"

export default function Dictionary() {
    const params = useParams()
    const { t } = useTranslation()
    return (
        <div className="container mx-auto px-6">
            <div className="bg-gray-100 px-4 pt-5 rounded-lg">
                <div className="relative w-full flex items-center">
                    <div className="absolute w-full">
                        <SearchBar />
                    </div>
                    <div className="ml-auto">
                        <button type="button" className="text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer" onClick={() => {}}>{t('dictionary.create')}</button>
                    </div>
                </div>
                <EntryList searchString={params.key ?? ""} />
            </div>
        </div>
    )
}
