import React, { useState } from 'react';
import styles from './footer.module.css';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { mainNavLinks } from './main-nav';

export default function Footer() {
    const router = useRouter();

    return (
        <footer className={styles.container}>
            <div className={styles.item}>
                <h4 className='headingMd'>About</h4>
                <p>Hello, my name is Megan Smith and I created this site so that everyone can share and enjoy their favorite recipes together. Please share!</p>
            </div>
            <div className={styles.item}>
                <h4 className='headingMd'>Navigate</h4>
                {mainNavLinks.map(({ pathname, title }, index) => (
                    <Link key={index} href={pathname}>
                        <a className={classNames(styles.footerLink, {
                            [styles.footerLinkActive]: router.pathname === pathname,
                        })}>{title}</a>
                    </Link>
                ))}
                <a className={styles.footerLink}>Log Out</a>
            </div>
            <div className={styles.item}>
                <h4 className='headingMd'>Connect</h4>
                <div className={styles.connectIconContainer}>
                    <img src='/linkedin.png' alt='Linkedin Icon' className={styles.connectIcon} />
                    <img src='/gmail.png' alt='Email Icon' className={styles.connectIcon} />
                    <img src='/github.png' alt='Github Icon' className={styles.connectIcon} />
                </div>
            </div>
        </footer>
    );
}
