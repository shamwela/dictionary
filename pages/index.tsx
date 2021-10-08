import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [word, setWord] = useState('mouse')
  const [language, setLanguage] = useState('en')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [definition, setDefinition] = useState('')
  const [audioSource, setAudioSource] = useState('')

  const handleSearch = async () => {
    setDefinition('')
    setError(false)
    setLoading(true)

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/${language}/${word}`
      )
      const responseJSON = await response.json()

      const definition = responseJSON[0].meanings[0].definitions[0].definition
      setDefinition(definition)

      const audioSource = responseJSON[0].phonetics[0].audio
      setAudioSource(audioSource)

      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  }

  return (
    <>
      <Head>
        <title>Dictionary by Sha Mwe La</title>
        <meta name='description' content='Dictionary by Sha Mwe La' />
      </Head>

      <main className='p-4 max-w-md min-h-screen mx-auto flex flex-col gap-y-4'>
        <h1>Dictionary</h1>

        <label htmlFor='word'>Word</label>
        <input
          value={word}
          onChange={(event) => setWord(event.currentTarget.value)}
          id='word'
          type='search'
          placeholder='Search for a word'
        />

        <label htmlFor='language'>Language</label>
        <select
          onChange={(event) => setLanguage(event.currentTarget.value)}
          id='language'
        >
          <option value='en'>English</option>
          <option value='hi'>Hindi</option>
          <option value='es'>Spanish</option>
          <option value='fr'>French</option>
          <option value='ja'>Japanese</option>
          <option value='ru'>Russian</option>
          <option value='de'>German</option>
          <option value='it'>Italian</option>
          <option value='ko'>Korean</option>
          <option value='pt-BR'>Brazilian Portuguese</option>
          <option value='ar'>Arabic</option>
          <option value='tr'>Turkish</option>
        </select>

        <button onClick={handleSearch} className='focus:ring-0'>
          Search
        </button>

        {loading && <p>Loading, please wait.</p>}

        {error && (
          <p>Can't find the word. Please check for spelling mistakes.</p>
        )}

        {definition && (
          <>
            <h2>{word}</h2>

            {audioSource && (
              <audio controls={true} className='w-full'>
                <source src={'http:' + audioSource} type='audio/mpeg' />
                Your browser does not support the audio element.
              </audio>
            )}

            <p>{definition}</p>
          </>
        )}
      </main>
    </>
  )
}
