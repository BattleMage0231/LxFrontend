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
            } else {
                setSuggestions([])
            }
        }, 2000)
        return () => clearInterval(interval)
    }, [entryService])
    const suggestionsRendered = suggestions.map(data => (
        <li key={data}>
            <a onClick={() => {
                setSearchInput(data);
                (document.activeElement as HTMLElement).blur()
                navigate(`/search/${data}`)
            }}>{data}</a>
        </li>
    ))
    return (
        <div className="relative inline-flex w-full">
            <input
                className="input input-bordered w-full max-w-md"
                onChange={e => setSearchInput(e.target.value.trim())}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                onKeyDown={e => e.key == 'Enter' && navigate(`/search/${searchInput}`)}
                value={searchInput}
            />
            <button
                className="btn btn-primary ml-2"
                onClick={() => navigate(`/search/${searchInput}`)}
            >
                <img
                    src="/magnifying-glass.svg"
                    className="h-6" 
                    alt={t('searchBar.search')}
                />
            </button>
            {
                isInputFocused && suggestions.length > 0 &&
                <div className="absolute top-full bg-base-100 shadow rounded-box">
                    <ul className="menu" onMouseDown={e => e.preventDefault()}>
                        {suggestionsRendered}
                    </ul>
                </div>
            }
        </div>
    )
}
