import { ModalProps as ReactModalProps } from 'react-responsive-modal'

export interface VerifiableCredential {
  '@context': string[]
  id: string
  type: string[]
  holder: { id: string }
  issuanceDate: string
  credentialSubject: any
  credentialSchema: {
    type: string
    id: string
  }
}

export type ModalProps = {
    useLocalContainer?: boolean;
    useRelativePosition?: boolean;
    title?: string;
    footer?: React.ReactElement;
    position?: 'center' | 'rightSide';
} & ReactModalProps;

export type Preferences = {
    gamename?: string
    vcId?: string
    nickname: string
    themecolor: string
    gamevolume: string
}

export type Reputation = {
    vcId?: string
    gamename: string
    publisher: string
    company: string
    genere: string
    totalPlayedhours: number
    //LAB2       score: number
    gameLevel: number
}

export type VCShareStateType = {
  requestToken?: string
  vcTypesFound?: string[]
}