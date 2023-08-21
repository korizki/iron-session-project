This is a [Next.js](https://nextjs.org/) project, with Session Management using [`iron-session`](https://github.com/vvo/iron-session).

## Step by Step

1. Prepare a Next.js Project or you can use your existing Next.js project

2. Create a session configuration, by creating new file on `root-project-folder/lib/config/session-config.js`
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

3. Create a wrapper function, we will using this function when interact with session. This file may created at `root-project-folder/lib/config/useSession.js`

```bash
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import { sessionConfig } from "./session-config"

export function withSessionRoute(handler) {
   return withIronSessionApiRoute(handler, sessionConfig)
}

export function withSessionSsr(handler) {
   return withIronSessionSsr(handler, sessionConfig)
}
```

4. Create an api handle our request to create `(on Log In)`  or delete `(on Log Out)` session. First create new file handling log in process on `root-project-folder/pages/api/login.ts`
```bash
import { NextApiResponse } from "next"
import { withSessionRoute } from '../../lib/config/useSession'

interface RequestBody {
   email: string,
   name: string
}
interface NextApiRequest {
   body: string,
   user: object,
   method: string,
   session: any
}

export default withSessionRoute(login)

async function login(req: NextApiRequest, res: NextApiResponse) {
   if (req.method == 'POST') {
      const userInfo: RequestBody = JSON.parse(req.body)
      req.session.user = userInfo
      await req.session.save()
      res.send(
         {
            status: 'ok',
            message: "Successfully adding new session",
            sessionInfo: userInfo
         }
      )
   } else {
      res.send({
         status: 'failed',
         message: 'no route available'
      })
   }
}
```

5. Then we create a new file on existing folder for handling log out process (clear session) `root-project-folder/pages/api/logout.ts`
```bash
import { withSessionRoute } from "@/lib/config/useSession";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(logout)

async function logout(req: NextApiRequest, res: NextApiResponse) {
   req.session.destroy()
   res.send({ status: 'ok', message: 'Successfully clear session' })
}
```

6. Now on login form we need to add this process 
```bash
const handleLogin = async (e: React.SyntheticEvent, email: string, name: string) => {
   e.preventDefault()
   const body = { email, name }
   const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application-json" }
   })
   if (response.ok) {
      sessionStorage.setItem('session', '')
      # your code like ==> router.push("/home") to redirect to homepage
   }
}
```

7. For getting the value on saved session, example in home page, we can adding this process 
```bash
export const getServerSideProps = withSessionSsr(
   async ({ req, res }: any) => {
      if (req.session.user) {
         const user = req.session.user
         return {
            props: { user }
         }
      } else {
         return {
            props: { user: null }
         }
      }
   }
)

#then pass the value on props
export default function Home(props: PropsUser) {
   # your code ...
}
```