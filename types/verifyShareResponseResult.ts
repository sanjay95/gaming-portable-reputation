import { VerifiableCredential } from 'types/vc'
export interface verifyShareResponseTokenResult {
    jti: string
    errors: string[]
    issuer: string
    isValid: boolean
    suppliedCredentials: VerifiableCredential[]
}
