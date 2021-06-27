import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { database } from '../services/firebase'

import { useAuth } from '../hooks/useAuth'
import '../style/auth.scss'

export function NewRoom() {
  const { user } = useAuth()

  const [newRoom, setNewRoom] = useState('')

  //criação da sala
  async function handleCreateNewRoom(event: FormEvent) {
    //previne o comportamento padrão dos formulários
    event.preventDefault()

    //verificando se há algum texto, o trim serve para remover os espaços
    if (newRoom.trim() === '') {
      return
    }

    //procuro uma referencia no meu database chamado rooms
    const roomRef = database.ref('rooms')

    //dentro do roomRef realizamos um push, jogamos uma sala dentro de rooms
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      // id do usuário que criou a sala, pegamos ele do useAuth
      authorId: user?.id,
    })
  }

  return (
    <div id='page-auth'>
      <aside>
        <img
          src={illustrationImg}
          alt='Ilustração simbolizando perguntas e respostas'
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt='Letmeask' />

          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleCreateNewRoom}>
            {/* no onChange sempre que o usuário digita alguma coisa no Input ele atualiza o valor do estado */}
            <input
              type='text'
              placeholder='Nome da sala'
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type='submit'>Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to='/'>Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
