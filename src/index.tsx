import React, {
  useState,
  useContext,
  FunctionComponent,
  useEffect
} from 'react'

import { SESSION_STORAGE_KEY } from './constants'

// storage
import CookiesStorage from './storage/CookiesStorage'
import StorageInterface from './storage/Interface'

// context
import SessionContext, { SessionContextInterface } from './context'

let sessionInstance: SessionContextInterface = {
  session: {},
  saveSession: () => {
    throw new Error(
      'Save session method was called when <Session /> is not present in the React DOM'
    )
  },
  removeSession: () => {
    throw new Error(
      'Remove session method was called when <Session /> is not present in the React DOM'
    )
  }
}

export interface Props {
  children: React.ReactNode
  initialSession?: object
  storage: StorageInterface
}

const Session: FunctionComponent<Props> = ({
  children,
  initialSession,
  storage = new CookiesStorage()
}) => {
  const getInitialSession = (): object => {
    if (!initialSession) {
      return { authenticated: false }
    }
    return { ...initialSession, authenticated: true }
  }

  const [session, setSession] = useState(getInitialSession())
  const [checked, setChecked] = useState(false)

  const loadSessionFromStorage = async (): Promise<void> => {
    const session = await storage.getItem(SESSION_STORAGE_KEY)
    if (session) {
      setSession({ ...session, authenticated: true })
    }
    setChecked(true)
  }

  useEffect((): void => {
    if (!initialSession) {
      loadSessionFromStorage()
    }
  }, [])

  const saveSession = async (session: object): Promise<void> => {
    // save session in the storage
    storage.setItem(SESSION_STORAGE_KEY, session)
    // save session in component's state
    setSession({
      ...session,
      authenticated: true
    })
  }

  const removeSession = async (): Promise<void> => {
    // remove session from the storage
    storage.removeItem(SESSION_STORAGE_KEY)
    // remove session from the state
    setSession({ authenticated: false })
  }

  // update instance
  sessionInstance = { session, saveSession, removeSession }

  if (!checked) {
    return null
  }

  return (
    <SessionContext.Provider value={{ session, saveSession, removeSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export default Session

// expose methods
export const getSession = () => sessionInstance.session
export const saveSession = (session: object) =>
  sessionInstance.saveSession(session)
export const removeSession = () => sessionInstance.removeSession()
export const useSession = () => useContext(SessionContext)
