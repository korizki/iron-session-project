import { withSessionRoute } from "@/lib/config/useSession";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(logout)

async function logout(req: NextApiRequest, res: NextApiResponse) {
   req.session.destroy()
   res.send({ status: 'ok', message: 'Successfully clear session' })
}