import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()

    handleLogin({
      username,
      password
    })
  }

  return (
    <form onSubmit={login}>
      <div>
        <label>
                    username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}

          />
        </label>
      </div>

      <div>
        <label>
                    password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>

      <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm