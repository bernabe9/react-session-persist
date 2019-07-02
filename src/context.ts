import { createContext } from 'react'

export interface SessionContextInterface {
  session: object | null
  saveSession(session: object): Promise<void>
  removeSession(): Promise<void>
}

const defaults: SessionContextInterface = {
  session: {},
  saveSession: async () => {},
  removeSession: async () => {}
}

const SessionContext = createContext(defaults)

export default SessionContext
