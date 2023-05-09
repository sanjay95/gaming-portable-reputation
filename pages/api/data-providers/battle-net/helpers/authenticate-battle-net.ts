import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { ApiError } from '../../../api-error'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../auth/[...nextauth].page"


export async function authenticateBattleNet(req: NextApiRequest,
  res: NextApiResponse<any>): Promise<string> {
  //const session = await getSession({ req })
  const session = await getServerSession(req, res, authOptions)
  const battleNetAccessToken = session?.battleNetAccessToken

  if (!battleNetAccessToken) {
    throw new ApiError({
      code: 'BATTLE_NET_NOT_AUTHENTICATED',
      message: 'Battle.net access token is not present in the cookies',
      httpStatusCode: 401,
    })
  }

  return battleNetAccessToken
}
