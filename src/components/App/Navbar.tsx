import { useTranslation } from 'react-i18next'

export default function Navbar() {
    const { t } = useTranslation()
    return (
        <div className="navbar sticky top-0 z-50 bg-base-100 py-1">
            <div className="flex-1">
                <a className="btn btn-ghost">
                    <img src="/language.svg" className="h-10" />
                    <span className="text-2xl">Lx</span>
                </a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><a href="/">{t('navbar.dictionary')}</a></li>
                    <li><a>{t('navbar.export')}</a></li>
                </ul>
            </div>
        </div>
    );
}
