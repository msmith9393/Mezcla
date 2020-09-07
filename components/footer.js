import React, { useState } from 'react';
import styles from './footer.module.css';
import Link from 'next/link';
import classNames from 'classnames';
import { LinkedinIcon, EmailIcon, GithubIcon, YouTubeIcon, InstagramIcon } from './icons';

export default function Footer() {
    return (
        <footer className={styles.container}>
            <LinkedinIcon className={styles.connectIcon} />
            <EmailIcon className={styles.connectIcon} emailClassStroke={styles.emailClassStroke} />
            <GithubIcon className={styles.connectIcon} />
            <YouTubeIcon className={styles.connectIcon} />
            <InstagramIcon className={styles.connectIcon} />
        </footer>
    );
}
