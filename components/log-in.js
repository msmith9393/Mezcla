import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './log-in.module.css';

export default function LogInForm({ isLogInPage }) {
    return (
        <form onSubmit={null} className={styles.container}>
            <h2 className="headingLg center">
                {isLogInPage ? 'Log In' : 'Sign Up'}
            </h2>
            {!isLogInPage && (
                <div className={styles.nameContainer}>
                    <div className={classNames(styles.inputContainer, styles.inputHalfDesktop)}>
                        <label htmlFor="fname">
                            First Name
                        </label>
                        <input type="text" name="fname" className={styles.input} />
                    </div>
                    <div className={classNames(styles.inputContainer, styles.inputHalfDesktop)}>
                        <label htmlFor="lname">
                            Last Name
                        </label>
                        <input type="text" name="lname" className={styles.input} />
                    </div>
                </div>
            )}
            <div className={styles.inputContainer}>
                <label htmlFor="email">
                    Email Address
                </label>
                <input type="email" name="email" className={styles.input} />
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="password">
                    Password
                </label>
                <input type="password" name="password" className={styles.input} />
            </div>
            <button className="button button-filled button-center" type="submit">
                {isLogInPage ? 'Log In' : 'Sign Up'}
            </button>
        </form>
    );
}

LogInForm.propTypes = {
    isLogInPage: PropTypes.bool.isRequired,
};
