import Head from 'next/head'
import MainNav from '../components/main-nav'
import Layout from '../components/layout'

export default function Create() {
    return (
        <Layout>
            <Head>
                <title>Create Recipe</title>
            </Head>
            <div>
                Create Recipe!
            </div>
        </Layout>
    );
}
