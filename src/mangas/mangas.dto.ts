export class MangasDTO {
  constructor(
    public _id: number,
    public title: string,
    public canonicalTitle: string,
    public averageRating: string,
    public synopsis: string,
  ) { }
}