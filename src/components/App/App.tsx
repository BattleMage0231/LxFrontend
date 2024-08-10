import { Routes, Route, Outlet } from 'react-router-dom';
import Dictionary from '../Dictionary/Dictionary.tsx';

export default function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Dictionary />}></Route>
                    <Route path='search' element={<Dictionary />}></Route>
                    <Route path='search/:key' element={<Dictionary />}></Route>
                    <Route path='test' element={<h1>Test</h1>}></Route>
                </Route>
            </Routes>
        </>
    );
}

function Layout() {
    return (
        <>
            <h1>Lx</h1>
            <Outlet />
        </>
    );
}
