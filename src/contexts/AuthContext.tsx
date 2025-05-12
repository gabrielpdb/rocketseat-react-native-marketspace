import { UserDTO } from "@dtos/UserDTO"
import { api } from "@services/api"
import { createContext, ReactNode, useState } from "react"

export type AuthContextDataProps = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password })
    } catch (error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
