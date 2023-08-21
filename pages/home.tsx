import { withSessionSsr } from "@/lib/config/useSession"
import { useEffect, useState } from 'react'
import { useRouter } from "next/router"

type PropsUser = {
   user: {
      name: string,
      email: string
   }
}

export default function Home(props: PropsUser) {
   const router = useRouter()
   const [userInfo, setUserInfo] = useState<{ name: string, email: string }>({ name: '', email: '' })
   // logout and clear session
   const handleLogOut = async () => {
      const response = await fetch("/api/logout")
      if (response.ok) {
         router.push("/")
         sessionStorage.setItem('session', 'expired')
      }
   }
   // validasi jika ada user login 
   useEffect(() => {
      if (props.user == null) {
         router.push("/")
      } else {
         setUserInfo(props.user)
      }
   }, [])
   return (
      <main className="absolute w-full h-full justify-center items-center flex ">
         <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-[1.5em] text-purple-600">Welcome, <strong>{userInfo.name}</strong></h1>
            <p>You're logged in as <span className="italic text-slate-400 ml-2">{userInfo.email}</span></p>
            <button
               className="w-full bg-purple-600 p-3 text-white rounded-lg cursor-pointer mb-1 hover:bg-purple-800 mt-5"
               onClick={handleLogOut}
            >Log Out</button>
         </div>
      </main>
   )
}

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