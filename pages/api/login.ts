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