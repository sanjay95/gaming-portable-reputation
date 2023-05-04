import { nanoid } from 'nanoid'
import { BattleNetProfileCredentialSubject } from 'types/data-providers'
import { StudioProfileCredentialSubject } from 'types/studioProfile'
import { VerifiableCredential } from 'types/vc'

const VC_JSON_SCHEMA_URL = 'https://schema.affinidi.com/AffinidiStudioProfileV1-2.json'
const VC_JSON_LD_CONTEXT_URL = 'https://schema.affinidi.com/AffinidiStudioProfileV1-2.jsonld'

export function generateStudioProfileVc(holderDid: string, credentialSubject: StudioProfileCredentialSubject): VerifiableCredential {
  return {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      VC_JSON_LD_CONTEXT_URL,
    ],
    id: `claimId:${nanoid()}`,
    type: ['VerifiableCredential', 'AffinidiStudioProfileVC'],
    holder: {
      id: holderDid,
    },
    issuanceDate: new Date().toISOString(),
    credentialSubject,
    credentialSchema: {
      type: 'JsonSchemaValidator2018',
      id: VC_JSON_SCHEMA_URL,
    }
  }
}
