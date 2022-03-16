import React from 'react'
import { Container, Form, SubmitBtn } from './styles'
import { FaGithub, FaPlus } from 'react-icons/fa'

function Main() {
  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Main
      </h1>

      <Form onSubmit={() => { }}>
        <input type="text" placeholder="Adicionar repositórios" />

        <SubmitBtn>
          <FaPlus color='#fff' size={16} />

        </SubmitBtn>
      </Form>
    </Container>
  )
}

export default Main;