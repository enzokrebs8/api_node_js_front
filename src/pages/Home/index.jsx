import './style.css'
import { useEffect, useState } from 'react'
import Lixeira from '../../assets/lixeira.svg'
import api from '../../services/api'

function Home(){
  // const usuarios =[
  //   {
  //     id: '0001',
  //     nome: 'Enzo',
  //     idade: 17,
  //     email: 'enzo@gmail.com'
  //   },     {
  //     id: '002',
  //     nome: 'Heloysa',
  //     idade: 17,
  //     email: 'heloysa@gmail.com'
  //   }
  // ]

  const [usuarios, setUsuarios] = useState([])

  //let usuarios = []

  async function getUsuarios(){
    const usuariosDaApi = await api.get('/cadastro')
    // usuarios = await usuariosDaApi.data()
    setUsuarios(usuariosDaApi.data)
    console.log(usuarios)
  }
 
  useEffect(() => {
    getUsuarios()
  },[])

  return(
    <div className='container'>
      <form>
        <h1>Cadastro</h1>
        <input id="nome" name='nome' type="text" />
        <label for="nome"></label>
        <input id="idade" name='idade' type="number" />
        <label for="idade"></label>
        <input id='email' name='email' type="email" />
        <label for="email"></label>
        <button type='button'>Cadastrar</button>
      </form>

      {usuarios.map(usuario => (
        <div key={usuario.id} className='card'>
          <div>
            <p>Nome:{usuario.nome}</p>
            <p>Idade: {usuario.idade}</p>
            <p>Email:{usuario.email}</p>
          </div>
          <button>
            <img src={Lixeira}/>
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home