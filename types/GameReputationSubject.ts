export interface GameReputationSubject {
  gamename: string
  publisher: string
  company: string
  genere: string
  totalPlayedhours: number
  gameLevel: number
  //LAB2     score: number
  purchaseditems: {
    name: string
    id: string
    price: string
  }
}
