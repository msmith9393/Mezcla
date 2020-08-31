import Head from 'next/head';
import MainNav from '../components/main-nav';
import Footer from '../components/footer';

function Layout({ children, pageTitle = '', pageDescription = '', image = null }) {
    return (
        <div>
            <Head>
                <title>{pageTitle}</title>
                <meta name='og:title' content={pageTitle} />
                <meta
                    name='description'
                    content={pageDescription}
                />
                <meta
                    property='og:image'
                    content={image}
                />
            </Head>
            <MainNav />
            <main>{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;
