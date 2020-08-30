import Head from 'next/head'
import MainNav from '../components/main-nav'

export const siteTitle = 'Mezcla Recipes';

function Layout({ children }) {
    return (
        <div>
            <Head>
                <link rel='icon' href='/favicon.ico' />
                <meta
                    name='description'
                    content='Site where everyone share and enjoy their favorite recipes together'
                />
                <meta
                    property='og:image'
                    content={'Image To Go Here'}
                />
                <meta name='og:title' content={siteTitle} />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            </Head>
            <MainNav />
            <main>{children}</main>
        </div>
    );
}

export default Layout;
