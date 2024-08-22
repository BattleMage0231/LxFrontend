import { Routes, Route, Outlet } from 'react-router-dom'
import Dictionary from '../Dictionary/Dictionary'
import Navbar from './Navbar'
import { LanguageProvider } from '../../contexts/languageProvider'

export default function App() {
    return (
        <LanguageProvider>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Dictionary />}></Route>
                    <Route path='search' element={<Dictionary />}></Route>
                    <Route path='search/:key' element={<Dictionary />}></Route>
                </Route>
            </Routes>
        </LanguageProvider>
    )
}

function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}
