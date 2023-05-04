export interface GameSettings {
  gamename: string
  publisher: string
  company: string
  genere: string
  totalPlayedhours: number
  gameLevel: number
  score: number
  purchaseditems: {
    name: string
    id: string
    price: string
  }
}
