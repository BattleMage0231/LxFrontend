export default function Navbar() {
    return (
        <nav className="bg-white bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3">
                    <img src="/language.svg" className="h-10" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">Lx</span>
                </a>
                <div className="w-full md:block md:w-auto">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                        <li className="navbar-item">
                            <a href="#">Dictionary</a>
                        </li>
                        <li className="navbar-item">
                            <a href="#">Export</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
