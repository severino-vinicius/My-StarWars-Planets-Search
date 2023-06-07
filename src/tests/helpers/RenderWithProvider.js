import React from 'react'
import MyProvider from '../../context/myProvider'
import { render } from '@testing-library/react'

export default function RenderWithProvider(component) {
  render (
    <MyProvider>{component}</MyProvider>
  )
}
