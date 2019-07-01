import * as Cookies from 'js-cookie'

class CookiesStorage {
  setItem(key: string, data: object): void {
    Cookies.set(key, data)
  }

  getItem(key: string): object | null {
    return Cookies.getJSON(key)
  }

  removeItem(key: string): void {
    Cookies.remove(key)
  }
}

export default CookiesStorage
