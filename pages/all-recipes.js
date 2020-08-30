import Head from 'next/head'
import MainNav from '../components/main-nav'
import Layout from '../components/layout'

export default function AllRecipes() {
    return (
        <Layout>
            <Head>
                <title>All Recipes</title>
            </Head>
            <div>
                All Recipes!
            </div>
        </Layout>
    );
}
