import { createContext } from 'react'

import StorageInterface from './storage/Interface'

export interface SessionContextInterface {
  session: object | undefined
  user: object | undefined
  authenticated: Boolean
  loadDataFromStorage(storage: StorageInterface): Promise<object | null>
  saveSession(session: object): Promise<void>
  removeSession(): Promise<void>
  saveUser(user: object): Promise<void>
}

const defaults: SessionContextInterface = {
  session: undefined,
  user: undefined,
  authenticated: false,
  loadDataFromStorage: async storage => null,
  saveSession: async () => {},
  removeSession: async () => {},
  saveUser: async () => {}
}

const SessionContext = createContext(defaults)

export default SessionContext
