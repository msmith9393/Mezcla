import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
    site: process.env.BASE_URL,
    // Configure one or more authentication providers
    providers: [
        Providers.Email({
            server: process.env.MAIL_SERVER,
            from: 'megan@tokaypress.com'
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET
        }),
    ],
    database: process.env.MONGO_DB_URI,
    debug: process.env.ENVIRONMENT === 'local',
}

export default (req, res) => NextAuth(req, res, options);
