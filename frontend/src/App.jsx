import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function App() {
  const [msg, setMsg] = useState('Loading...')

  useEffect(() => {
    axios
      .get('/api/message')
      .then((res) => setMsg(res.data.message))
      .catch(() => setMsg('Could not reach backend'))
  }, [])

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>Frontend</h1>
      <p>{msg}</p>
    </div>
  )
}
