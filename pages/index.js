import Layout from '../components/layout';
import Link from 'next/link';

export default function Home() {
    return (
        <Layout
            pageTitle='Mezcla Recipe'
            pageDescription='Homepage for Mezcla recipes'>
            <div className='container'>
                <img src='profile-picture.png' alt='Megans Profile Picture' className='image' />
                <div>
                    <h2 className='headingLg center'>Hello, I'm Megan!</h2>
                    <p>I am a Software Engineer in the Bay Area. The last 4 years I have worked at <a className='link' href='https://tile.com' target='_blank'>Tile</a>, the perfect gift for people who misplace their keys! Now, I am enjoying a transition stage, where I am focused on developing new skills through personal projects.</p>
                    <p>I love cooking and I love Spanish, so I decided to create this site to showcase my development skills and delicious recipes in English and Spanish. <Link href='/spanish'><a className='link'>Click Here to change to Spanish.</a></Link> Also, feel free to checkout my <a className='link' href='https://youtube.com' target='_blank'>YouTube Channel</a> and <a className='link' href='https://instagram.com' target='_blank'>Instagram!</a></p>
                </div>
            </div>
            <div className='line-break' />
            <div className='center'>
                <div className='header-container'>
                    <h2 className='headingLg'>About Mezcla!</h2>
                    <img src='lemon.png' alt='Mezcla Logo' className='logo' />
                </div>
                <p>Mezcla is  a site to share your favorite recipes in English or Spanish! <Link href='/spanish'><a className='link'>Log in to get started.</a></Link></p>
                <h4 className='headingMd'>About the tech stack:</h4>
                <ul>
                    <li>Next.js - React Framework</li>
                    <li>GraphQL</li>
                </ul>
                <p><a className='link' href='https://github.com' target='_blank'>Checkout the Repo!</a></p>
            </div>
            <div className='line-break' />
            <div className='center'>
                <h2 className='headingLg center'>I'm looking for a job!</h2>
                <p>Please to reach out to me by <a className='link' href='https://linkedin.com' target='_blank'>LinkedIn</a> or <a className='link' href='https://email.com'>Email.</a></p>
                <button class='button button-center'>Resume</button>
            </div>
            <style jsx>{`
                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding-left: 64px;
                    padding-right: 64px;
                }

                .image {
                    width: 150px;
                    height: 150px;
                    margin-left: 32px;
                    order: 1;
                }

                @media (max-width: 768px) {
                    .container {
                        flex-direction: column;
                        padding-left: 0;
                        padding-right: 0;
                    }

                    .image {
                        order: 0;
                        margin-left: 0;
                    }
                }

                .header-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding-left: 64px;
                    padding-right: 64px;
                }

                .logo {
                    width: 32px;
                    padding-left: 8px;
                    transform: rotate(25deg);
                }
            `}</style>
        </Layout>
    );
}
