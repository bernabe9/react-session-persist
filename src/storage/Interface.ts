export default interface Storage {
  setItem(key: string, data: object): void;
  getItem(key: string): object | null;
  removeItem(key: string): void;
}
