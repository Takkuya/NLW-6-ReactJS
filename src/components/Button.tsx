import { ButtonHTMLAttributes } from 'react'

import '../style/button.scss'

//fazendo com que esse componente button aceite todas as propriedades do button normal do html
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps) {
  //passando todas as props que o botão recebe através do ...props
  return <button className='button' {...props} />
}
