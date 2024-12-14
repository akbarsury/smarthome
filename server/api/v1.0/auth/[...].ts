// import CredentialsProvider from 'next-auth/providers/credentials'
// import { NuxtAuthHandler } from '#auth'

// type AkbarSmarthomeCredential = {
//     csrfToken: string,
//     email: string,
//     password: string
// }

// export default NuxtAuthHandler({
//     secret: useRuntimeConfig().authSecret,
//     providers: [
//         // @ts-expect-error
//         CredentialsProvider.default({
//             id: 'akbarSmarthomeAuthentication',
//             name: 'Akbar Smarthome Authentication',
//             type: 'credentials',
//             credentials: {
//                 email: {
//                     label: 'Email', type: 'text', placeholder: '(hint: admin username)'
//                 },
//                 password: {
//                     label: 'Password', type: 'password', placeholder: '(hint: admin password)'
//                 },
//             },
//             async authorize(credentials: AkbarSmarthomeCredential) {
//                 const authAuthorize = () => {
//                     if (credentials.email === 'kirimkeakbar@gmail.com' && credentials.password === 'MaknaHidup1!') {
//                         return {
//                             statusCode: 200,
//                             message: 'auth success',
//                             data: {
//                                 user: {
//                                     id: credentials.email,
//                                     email: credentials.email
//                                 }
//                             }
//                         }
//                     } else {
//                         return {
//                             statusCode: 401,
//                             message: 'auth failed',
//                             data: {
//                                 user: {
//                                     id: null,
//                                     email: null
//                                 }
//                             }
//                         }

//                     }
//                 }
//                 const { statusCode, message, data } = authAuthorize()
//                 const identifiedUser = {
//                     statusCode,
//                     message,
//                     user: data.user
//                 }
//                 if (statusCode === 200) {
//                     console.log(`User login :${identifiedUser.user?.email}`);
//                     console.log(`user id :${identifiedUser.user?.id}`);
//                 }
//                 return identifiedUser
//             }
//         })
//     ],
//     callbacks: {
//         signIn: async ({ user: identifiedUser }) => {
//             console.log('Signin user : ', { identifiedUser });
//             const { statusCode } = (identifiedUser as any)
//             if (statusCode == 200) {
//                 console.log('callback sign true');
//             } else {
//                 console.log('callback signin false');
//                 (identifiedUser as any).user = null
//             }
//             Promise.resolve(identifiedUser)
//             return true
//         },
//         jwt: async ({ token, user: identifiedUser }) => {
//             const isSignIn = (identifiedUser as any).user
//             if (isSignIn) {
//                 const { id, email } = (identifiedUser as any).user
//                 token.id = id || null;
//                 token.email = email || null;
//             }
//             return Promise.resolve(token)
//         },
//         session: async ({ session, token }) => {
//             if (token) {
//                 const userFromToken = {
//                     id: token.id,
//                     email: token.email,
//                 };
//                 (session as any).user = userFromToken || null;
//             }
//             return Promise.resolve(session)
//         },
//         redirect: async ({ url, baseUrl }) => {
//             console.log('Redirect : ', { redirect: { url, baseUrl } });
//             return baseUrl
//         }
//     },
//     pages: {
//         signIn: '/login',
//         error: '/auth/error',
//     },
//     jwt: {
//         maxAge: 5 * 60
//     },
//     cookies: {
//         sessionToken: {
//             name: `auth.session-token`,
//             options: {
//                 httpOnly: true,
//                 sameSite: 'strict',
//                 path: '/',
//                 secure: false
//             }
//         },
//         callbackUrl: {
//             name: `auth.callback-url`,
//             options: {
//                 httpOnly: true,
//                 sameSite: 'strict',
//                 path: '/',
//                 secure: false
//             }
//         },
//         csrfToken: {
//             name: `auth.csrf-token`,
//             options: {
//                 httpOnly: true,
//                 sameSite: 'strict',
//                 path: '/',
//                 secure: false
//             }
//         },
//     }
// })