export class Comment {
  constructor(
    public uid: string | undefined,
    public username: string,
    public comment: string,
    public rating: number
    ) {}
}
