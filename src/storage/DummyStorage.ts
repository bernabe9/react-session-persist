class DummyStorage {
  setItem(key: string, data: object): void {}

  getItem(key: string): object | null {
    return null
  }

  removeItem(key: string): void {}
}

export default DummyStorage
