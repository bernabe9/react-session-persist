import { createContext } from 'react'

export interface SessionContextInterface {
  session: object | null
  saveSession(session: object): void
  removeSession(): void
}

const defaults: SessionContextInterface = {
  session: {},
  saveSession: () => {},
  removeSession: () => {}
}

const SessionContext = createContext(defaults)

export default SessionContext
