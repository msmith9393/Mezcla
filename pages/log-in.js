import React, { useState } from 'react';
import Layout from '../components/layout';
import LogInForm from '../components/log-in';

export default function LogIn() {
    const [isLogInPage, setLogInPage] = useState(true);

    const switchPages = () => {
        setLogInPage(!isLogInPage);
    };

    return (
        <Layout
            pageTitle={isLogInPage ? 'Log In' : 'Sign Up'}
            pageDescription={isLogInPage ? 'Log In to see your favorite recipes' : 'Sign Up to see your favorite recipes'}
            image=""
        >
            <div>
                <LogInForm isLogInPage={isLogInPage} />
                <div className="center">
                    {isLogInPage ? 'Don\'t have an account? ' : 'Already have an account? '}
                    <span
                        role="button"
                        tabIndex="0"
                        onClick={switchPages}
                        onKeyPress={(event) => {
                            if (event.keycode === 13) {
                                switchPages();
                            }
                        }}
                        className="link"
                    >
                        {isLogInPage ? 'Sign Up' : 'Log In'}
                    </span>
                </div>
            </div>
        </Layout>
    );
}
