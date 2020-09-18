import React from 'react';
import styles from './footer.module.css';
import {
    LinkedinIcon,
    EmailIcon,
    GithubIcon,
    YouTubeIcon,
    InstagramIcon,
} from './icons';

export default function Footer() {
    return (
        <footer className={styles.container}>
            <a href="https://www.linkedin.com/in/msmith93/" target="_blank" rel="noreferrer">
                <LinkedinIcon className={styles.connectIcon} />
            </a>
            <a href="mailto:megan@tokaypress.com">
                <EmailIcon
                    className={styles.connectIcon}
                    emailClassStroke={styles.emailClassStroke}
                />
            </a>
            <a href="https://github.com/msmith9393/Mezcla" target="_blank" rel="noreferrer">
                <GithubIcon className={styles.connectIcon} />
            </a>

            {false && <YouTubeIcon className={styles.connectIcon} />}
            {false && <InstagramIcon className={styles.connectIcon} />}
        </footer>
    );
}
