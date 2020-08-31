import React, { useState } from 'react';
import styles from './main-nav.module.css';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import Search from './search';

export const mainNavLinks = [
    { pathname: '/all-recipes', title: 'All Recipes' },
    { pathname: '/favorites', title: 'Favorites' },
    { pathname: '/my-recipes', title: 'My Recipes' },
    { pathname: '/create', title: 'Create' },
];

export default function MainNav() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const isSSR = typeof window === 'undefined';

    React.useEffect(() => {
        function closeMainNav() {
            if (open && window.innerWidth >= 769) {
                setOpen(false);
            }
        }

        window.addEventListener('resize', closeMainNav);

        return () => window.removeEventListener('resize', closeMainNav);
    });

    return (
        <header>
            <nav id='main-nav' aria-label='Main'>
                <div className={styles.mainNav}>
                    <div
                        className={styles.mainNavIconMobile}
                        onClick={() => setOpen(!open)}>
                        <img
                            src={open ? '/close.svg' : '/hamburger.svg'}
                            alt={open ? 'Close Icon' : 'Open Icon'}
                        />
                    </div>
                    <Link href='/'>
                        <a className={styles.logo}>
                            <img
                                src='/logo.png'
                                alt='Mezcla Logo'
                            />
                        </a>
                    </Link>
                    <div className={styles.mainNavLinksDesktop}>
                        {mainNavLinks.map(({ pathname, title }, index) => (
                            <Link key={index} href={pathname}>
                                <a className={classNames(styles.mainNavLinkDesktop, {
                                    [styles.mainNavLinkDesktopActive]: router.pathname === pathname,
                                })}>{title}</a>
                            </Link>
                        ))}
                        <a className={styles.mainNavLinkDesktop}>Log Out</a>
                    </div>
                </div>
                <div className={classNames(styles.mainNavLinksMobile, {
                    [styles.mainNavLinksMobileOpen]: open,
                })}>
                    <Search />
                    {mainNavLinks.map(({ pathname, title }, index) => (
                        <Link key={index} href={pathname}>
                            <a className={classNames(styles.mainNavLinkMobile, {
                                [styles.mainNavLinkMobileActive]: router.pathname === pathname,
                            })}>{title}</a>
                        </Link>
                    ))}
                    <a className={styles.mainNavLogOutLinkMobile}>Log Out</a>
                </div>
            </nav>
        </header>
    );
}
