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
            pageDescription={isLogInPage ? 'Log In to see your favorite recipes' : 'Sign Up to see your favorite recipes'}>
            <div>
                <LogInForm
                    isLogInPage={isLogInPage} />
                <div class='center'>{isLogInPage ? 'Don\'t have an account? ' : 'Already have an account? '}<span onClick={switchPages} className='link'>{isLogInPage ? 'Sign Up' : 'Log In'}</span></div>
            </div>
        </Layout>
    );
}
