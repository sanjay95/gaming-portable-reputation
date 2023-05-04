
import { stringify } from 'querystring'
import { StudioProfileCredentialSubject } from 'types/studioProfile'
import { any, string } from 'zod'


export async function gatherStudioProfile(data: any): Promise<StudioProfileCredentialSubject> {

  const { useremail, usermobile, userName, userage, usercountry, usercity } = data
  return {
    email:useremail,
    phone:usermobile,
    Name:userName,
    age:userage,
    country:usercountry,
    city:usercity
  }
}


