export interface GameReputationSubject {
  gamename: string
  publisher: string
  company: string
  genere: string
  totalPlayedhours: number
  gameLevel: number
  //LAB4     score: number
  purchaseditems: {
    name: string
    id: string
    price: string
  }
}
