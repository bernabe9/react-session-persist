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

const defaultStorage = new CookiesStorage()

const getDataFromStorage = async (storage = defaultStorage) =>
  await storage.getItem(SESSION_STORAGE_KEY)

let sessionInstance: SessionContextInterface = {
  session: undefined,
  user: undefined,
  authenticated: false,
  loadDataFromStorage: getDataFromStorage,
  saveSession: async () => {
    throw new Error(
      'Save session method was called when <Session /> is not present in the React DOM'
    )
  },
  removeSession: async () => {
    throw new Error(
      'Remove session method was called when <Session /> is not present in the React DOM'
    )
  },
  saveUser: async () => {
    throw new Error(
      'Save user method was called when <Session /> is not present in the React DOM'
    )
  }
}

interface Data {
  session?: object | undefined
  user?: object | undefined
}

export interface Props {
  children: React.ReactNode
  initialData: Data
  storage: StorageInterface
}

const Session: FunctionComponent<Props> = ({
  children,
  initialData,
  storage = defaultStorage
}) => {
  const getInitialData = (): Data => {
    if (!initialData) {
      return {}
    }
    return { ...initialData }
  }

  const [data, setData] = useState(getInitialData())
  const [authenticated, setAuthenticated] = useState(
    !!initialData && !!initialData.session
  )
  const [checked, setChecked] = useState(!!initialData)

  const loadDataFromStorage = (): Promise<object | null> =>
    getDataFromStorage(storage)

  const init = async () => {
    if (!initialData) {
      const data = await loadDataFromStorage()
      if (data) {
        setData({ ...data })
      }
      setAuthenticated(!!data)
    }
    setChecked(true)
  }

  useEffect((): void => {
    init()
  }, [])

  const saveSession = async (session: object): Promise<void> => {
    const newData = { ...data, session }
    // save session in the storage
    storage.setItem(SESSION_STORAGE_KEY, newData)
    // save session in component's state
    setData(newData)
    setAuthenticated(true)
  }

  const removeSession = async (): Promise<void> => {
    // remove session from the storage
    storage.removeItem(SESSION_STORAGE_KEY)
    // remove session from the state
    setData({})
    setAuthenticated(false)
  }

  const saveUser = async (user: object): Promise<void> => {
    const newData = { ...data, user }
    // save user in the storage
    storage.setItem(SESSION_STORAGE_KEY, newData)
    // save user in component's state
    setData(newData)
  }

  // update instance
  sessionInstance = {
    session: data.session,
    user: data.user,
    saveSession,
    removeSession,
    saveUser,
    authenticated,
    loadDataFromStorage
  }

  if (!checked) {
    return null
  }

  return (
    <SessionContext.Provider value={sessionInstance}>
      {children}
    </SessionContext.Provider>
  )
}

export default Session

// expose methods
export const getSession = () => sessionInstance.session
export const getUser = () => sessionInstance.user
export const getAuthenticated = () => sessionInstance.authenticated
export const loadDataFromStorage = () => sessionInstance.loadDataFromStorage
export const saveSession = (session: object): Promise<void> =>
  sessionInstance.saveSession(session)
export const removeSession = (): Promise<void> =>
  sessionInstance.removeSession()
export const saveUser = (user: object): Promise<void> =>
  sessionInstance.saveUser(user)
export const useSession = () => useContext(SessionContext)
