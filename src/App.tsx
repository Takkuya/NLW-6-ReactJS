import { createContext, useState, useEffect } from 'react'
import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { auth, firebase } from './services/firebase'

import { BrowserRouter, Route } from 'react-router-dom'

type User = {
  id: String
  name: String
  avatar: String
}

type AuthContextType = {
  user: User | undefined

  // Isso porque essa função é async, logo ela retorna uma promise
  signInWithGoogle: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

function App() {
  //no useState especificamos que o user é o User com <USer>
  const [user, setUser] = useState<User>()

  //recuperar o estado de autenticação
  // useEffect recebe 2 parâmetros, a função que eu quero executar e quando que quero executar essa função, o segundo parâmetro sempre vai ser um []
  //se o onAuthStateChanged detectar que um usuário já se logou na aplicação ele vai retornar o usuário
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        //pegando alguns dados do user
        const { displayName, photoURL, uid } = user

        //verificação
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        // se ele tiver vamos preeencher o setUser com os dados do usuário
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    })
  }, [])

  async function signInWithGoogle() {
    //autenticação do usuário
    //fazer a autenticação com o google
    const provider = new firebase.auth.GoogleAuthProvider()

    // janela de autenticação ser um popup ao invés de ficar redirecionando o usuário para outras páginas
    const result = await auth.signInWithPopup(provider)

    //se retornou um usuário dessa autenticação então:
    if (result.user) {
      //pegando alguns dados do result.user
      const { displayName, photoURL, uid } = result.user

      //verificação
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }

      // se ele tiver vamos preeencher o setUser com os dados do usuário
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    }
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Route path='/' exact component={Home} />
        <Route path='/rooms/new' component={NewRoom} />
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App
