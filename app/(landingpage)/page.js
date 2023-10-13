"use client"
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'

export default function Home() {
    const [ inputValue, setInputValue ] = useState('')
    const [ chatLog, setChatLog ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();

        setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }])

        sendMessage(inputValue);
        
        setInputValue('');
    }

    const sendMessage = (message) => {
      const url = 'https://api.openai.com/v1/chat/completions';
      const headers = {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAPI_API_KEY}`
      };
      const data = {
        model: "gpt-3.5-turbo-0301",
        messages: [{"role": "user", "content": message}]
      };

      setIsLoading(true)

      axios.post(url, data, {headers: headers}).then((response) => {
        console.log(response);
        setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: response.data.choices[0].message.content }])
        setIsLoading(false);
      }).catch((error) => {
        setIsLoading(false);
        console.log(error);
      })
    }
  return (
    <div>
      <Head>
        <title>Brytatutors official website</title>
        <meta property="og:title" content="Brytatutors official website" key="title" />
      </Head>
      {
        chatLog.map((message, index) => (
            <div key="index">{message.message}</div>
        ))
      }
      <h1>ChatGPT</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Type your message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}
