import './style.css'
import { useEffect, useState, useRef } from 'react'
import api from '../../services/api'
import Edit from '../../assets/edit.png'
import Save from '../../assets/save.png'
import Cancel from '../../assets/cancel.png'
import Lixeira from '../../assets/lixeira.svg'

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
  const [editingId, setEditingId] = useState(null)
  const [editedUser , setEditedUser ] = useState({})

  const inputNome = useRef()
  const inputIdade = useRef()
  const inputEmail = useRef()

  //let usuarios = []

  async function getUsuarios(){
    const usuariosDaApi = await api.get('/cadastro')
    // usuarios = await usuariosDaApi.data()
    setUsuarios(usuariosDaApi.data)
    console.log(usuarios)
  }
  
  async function createUsuarios() {
    await api.post('/cadastro', {
      nome: inputNome.current.value,
      idade: inputIdade.current.value,
      email: inputEmail.current.value
    })
    getUsuarios() // Atualizar a lista dinamicamente

    //vai limpar os campos
    inputNome.current.value = ""
    inputIdade.current.value = ""
    inputEmail.current.value = ""
  }

  async function deleteUsuarios(id) {
    await api.delete(`/cadastro/${id}`)
    getUsuarios()
  }

  function handleEdit(id) {
    const user = usuarios.find(u => u.id === id)
    setEditedUser (user)
    setEditingId(id)
  }
  async function handleSave(id) {
    await api.put(`/cadastro/${id}`, editedUser )
    getUsuarios()
    setEditingId(null)
    setEditedUser ({})
  }
  function handleCancel() {
    setEditingId(null)
    setEditedUser ({})
  }

  useEffect(() => {
    getUsuarios()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Digite seu nome:' name='nome' type="text" ref={inputNome} />
        <input placeholder='Digite sua idade:' name='idade' type="number" ref={inputIdade} />
        <input placeholder='Digite seu email:' name='email' type="email" ref={inputEmail} />
        <button onClick={createUsuarios} type='button'>Cadastrar</button>
      </form>

      {usuarios.map(usuario => (
        <div key={usuario.id} className='card'>
          {editingId === usuario.id ? (
            <div className='edit-mode'>
              <div className='card-list'>
                <input className='input-edit'
                value={editedUser .nome || ''} 
                onChange={(e) => setEditedUser ({...editedUser , nome: e.target.value})} 
                placeholder="Nome" 
              />
              <input className='input-edit'
                value={editedUser .idade || ''} 
                onChange={(e) => setEditedUser ({...editedUser , idade: e.target.value})} 
                placeholder="Idade" 
                type="number" 
              />
              <input className='input-edit'
                value={editedUser .email || ''} 
                onChange={(e) => setEditedUser ({...editedUser , email: e.target.value})} 
                placeholder="Email" 
                type="email" 
              />
              </div>
              <div className='card-buttons'>
                <button onClick={() => handleSave(usuario.id)} className='btn-salvar'>
                  <img src={Save} alt="Salvar" />
                </button>
                <button onClick={handleCancel} className='btn-cancelar'>
                  <img src={Cancel} alt="Cancelar" />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p>Nome: {usuario.nome}</p>
              <p>Idade: {usuario.idade}</p>
              <p>Email: {usuario.email}</p>
            </div>
          )}
          {editingId !== usuario.id && (
            <>
              <button onClick={() => deleteUsuarios(usuario.id)} className='btn-deletar'>
                <img src={Lixeira} alt="Deletar" />
              </button>
              <button onClick={() => handleEdit(usuario.id)} className='btn-atualizar'>
                <img src={Edit} alt="Editar" />
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default Home