# useInputs

This is a React [hook](https://reactjs.org/docs/hooks-custom.html#using-a-custom-hook) for working with HTML input elements

## Requirement

To use `@andrewbgm/use-inputs`, you must use `react@16.13.1` or greater which includes hooks.

## Installation

This package is distributed via [npm](https://www.npmjs.com/package/@andrewbgm/use-inputs).

```sh
$ yarn add @andrewbgm/use-inputs
# or
$ npm install --save @andrewbgm/use-inputs
```

## Usage

Common use case.

```js
import React from 'react'
import { useInputs, wrapInput } from '@andrewbgm/use-inputs'

const Form = () => {
  const [{ email, displayName }, { reset }] = useInputs({
    email: '',
    displayName: '',
  })

  const handleSubmit = () => {
    console.log({
      email: email.value,
      displayName: displayName.value,
    })
  }

  return (
    <div>
      <label htmlFor={email.id}>Email address</label>
      <input type='email' {...wrapInput(email)} />
      <label htmlFor={displayName.id}>Display Name</label>
      <input type='displayName' {...wrapInput(displayName)} />
      <button type='button' onClick={handleSubmit}>
        Submit
      </button>
      <button type='button' onClick={reset}>
        Reset
      </button>
    </div>
  )
}
```
