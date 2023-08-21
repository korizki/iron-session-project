This is a [Next.js](https://nextjs.org/) project, with Session Management using [`iron-session`](https://github.com/vvo/iron-session).

## Step by Step

1. Prepare a Next.js Project or you can use your existing Next.js project

2. Create a session configuration, by creating new file on [root-project-filter/lib/config], named [`session-config.js`]
```bash
export const ironOptions = {
   cookieName: "your_app_session",
   password: "thisisyourpasswordwithminlength32char",
   cookieOptions: {
      # if your production page using https, set this to true.
      secure: false,
      maxAge: 150
   }
}
```

3. Create a wrapper function, we will using this function when interact with session. This file may created at [root-project-filter/lib/config], named [`useSession.js`]
````bash
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import { sessionConfig } from "./session-config"

export function withSessionRoute(handler) {
   return withIronSessionApiRoute(handler, sessionConfig)
}

export function withSessionSsr(handler) {
   return withIronSessionSsr(handler, sessionConfig)
}
```

4. 

