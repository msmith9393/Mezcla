import Head from 'next/head'
import MainNav from '../components/main-nav'
import Layout from '../components/layout'

export default function Favorites() {
    return (
        <Layout>
            <Head>
                <title>Favorites</title>
            </Head>
            <div>
                Favorites!
            </div>
        </Layout>
    );
}
