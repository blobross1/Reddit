import React from 'react'
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Article from "./Components/Article.jsx"

function App() {
  const [articles, setArticles] = useState([]);
  const [subreddit, setSubreddit] = useState('webdev')

  useEffect(() => {
    fetch("https://www.reddit.com/r/" + subreddit + ".json").then(res => {
      if (res.status != 200) {
        console.log('Error')
        return;
      }
      res.json().then(data => {
        if (data != null) {
          setArticles(data.data.children)
        }
      })
    })
  }, [subreddit])

  return (
    <>
      <header className='App-header'>
        <input type="text" className='input' value={subreddit} onChange={e => setSubreddit(e.target.value)} />
      </header>
      <div className='articles'>
        {
          (articles != null) ? articles.map((article, index) => <Article key={index} article={article.data} />) : ''
        }
      </div>
    </>
  )
}

export default App
