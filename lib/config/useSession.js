import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import { sessionConfig } from "./session-config"

export function withSessionRoute(handler) {
   return withIronSessionApiRoute(handler, sessionConfig)
}

export function withSessionSsr(handler) {
   return withIronSessionSsr(handler, sessionConfig)
}