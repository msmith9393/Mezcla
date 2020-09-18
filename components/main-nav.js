import React, { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import styles from './main-nav.module.css';
import Search from './search';

export const mainNavLinks = [
    { pathname: '/recipes', title: 'All Recipes' },
    { pathname: '/favorites', title: 'Favorites' },
    { pathname: '/my-recipes', title: 'My Recipes' },
    { pathname: '/create', title: 'Create' },
];

export default function MainNav() {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    React.useEffect(() => {
        if (open) {
            document.getElementById('html').classList.add('no-scroll');
        } else {
            document.getElementById('html').classList.remove('no-scroll');
        }

        function closeMainNav() {
            if (open && window.innerWidth >= 769) {
                setOpen(false);
            }
        }

        window.addEventListener('resize', closeMainNav);

        return () => {
            document.body.classList.remove('no-scroll');
            window.removeEventListener('resize', closeMainNav);
        };
    });

    return (
        <header>
            <nav id="main-nav" aria-label="Main">
                <div className={styles.mainNav}>
                    <div
                        role="button"
                        tabIndex="0"
                        aria-pressed={open ? 'true' : 'false'}
                        className={styles.mainNavIconMobile}
                        onClick={() => setOpen(!open)}
                        onKeyDown={(event) => {
                            if (event.keycode === 13) {
                                setOpen(!open);
                            }
                        }}
                    >
                        <img
                            src={open ? '/close.svg' : '/hamburger.svg'}
                            alt={open ? 'Close Icon' : 'Open Icon'}
                        />
                    </div>
                    <Link href="/">
                        <a className={styles.logo}>
                            <img
                                src="/logo.png"
                                alt="Mezcla Logo"
                            />
                        </a>
                    </Link>
                    <div className={styles.mainNavLinksDesktop}>
                        {mainNavLinks.map(({ pathname, title }) => (
                            <Link key={title} href={pathname}>
                                <a className={classNames(styles.mainNavLinkDesktop, {
                                    [styles.mainNavLinkDesktopActive]: router.pathname === pathname,
                                })}
                                >
                                    {title}
                                </a>
                            </Link>
                        ))}
                        <a className={styles.mainNavLinkDesktop}>Log Out</a>
                    </div>
                </div>
                <div className={classNames(styles.mainNavLinksMobileContainer, {
                    [styles.mainNavLinksMobileContainerOpen]: open,
                })}
                >
                    <div className={styles.mainNavLinksMobile}>
                        <Search />
                        {mainNavLinks.map(({ pathname, title }) => (
                            <Link key={title} href={pathname}>
                                <a className={classNames(styles.mainNavLinkMobile, {
                                    [styles.mainNavLinkMobileActive]: router.pathname === pathname,
                                })}
                                >
                                    {title}
                                </a>
                            </Link>
                        ))}
                        <a className={styles.mainNavLogOutLinkMobile}>Log Out</a>
                    </div>
                </div>
            </nav>
        </header>
    );
}
