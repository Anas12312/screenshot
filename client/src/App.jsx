import { useState } from 'react'

function App() {
  const [url, setUrl] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-slate-800'>

      <div className='w-11/12 h-full flex flex-col justify-start items-center'>

        <input
          className='w-1/3 my-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono'
          placeholder='www.example.com'
          onChange={(e) => setUrl(e.target.value)}
        />

        <iframe src={iframeUrl}
          className='w-full h-full'
          loading='lazy'
          title='Custom title'
          credentialless='false'
        />

        <button 
          className='my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => { setIframeUrl(url) }} 
        >Run</button>
      </div>

    </div>
  )
}

export default App
