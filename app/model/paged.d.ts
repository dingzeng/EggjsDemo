class Paged<T> {
  constructor(list: Array<T>, totalCount: number) {
    this.list = list;
    this.totalCount = totalCount
  }
  list: Array<T>;
  totalCount: number
}