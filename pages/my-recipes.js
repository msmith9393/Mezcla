import Head from 'next/head'
import MainNav from '../components/main-nav'
import Layout from '../components/layout'

export default function MyRecipes() {
    return (
        <Layout>
            <Head>
                <title>My Recipes</title>
            </Head>
            <div>
                My Recipes!
            </div>
        </Layout>
    );
}
