import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEntryService } from '../../services/apiService'
import { useTranslation } from 'react-i18next'

export default function SearchBar() {
    const navigate = useNavigate()
    const entryService = useEntryService()
    const { t } = useTranslation()
    const [searchInput, setSearchInput] = useState('')
    const searchInputRef = useRef(searchInput)
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [suggestions, setSuggestions] = useState<string[]>([])
    useEffect(() => { searchInputRef.current = searchInput }, [searchInput])
    useEffect(() => {
        const interval = setInterval(() => {
            if(searchInputRef.current) {
                entryService.suggestSearch(searchInputRef.current)
                    .then(res => setSuggestions(res ?? [])).catch(console.log)
            }
        }, 2000)
        return () => clearInterval(interval)
    }, [entryService])
    const suggestionsRendered = suggestions.map(data => (
        <li key={`${data}`}>
            <a onClick={() => {
                setSearchInput(data);
                (document.activeElement as HTMLElement).blur()
                navigate(`/search/${data}`)
            }}>{data}</a>
        </li>
    ))
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchInput(e.target.value.trim())
    };
    function handleSubmit() {
        navigate(`/search/${searchInput}`)
    }
    return (
        <div className="inline-flex">
            <input
                className="input input-bordered w-80"
                onChange={handleChange}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                value={searchInput}
            />
            <button
                className="btn btn-primary ml-2"
                onClick={handleSubmit}
            >
                {t('searchBar.search')}
            </button>
            {
                isInputFocused && suggestions.length > 0 &&
                <div className="absolute top-full bg-base-100 shadow rounded-box w-80">
                    <ul className="menu" onMouseDown={e => e.preventDefault()}>
                        {suggestionsRendered}
                    </ul>
                </div>
            }
        </div>
    )
}
