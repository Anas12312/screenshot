import { useEffect, useRef } from 'react';
import { useState } from 'react'
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';

function App() {
  const [url, setUrl] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  const iframeRef = useRef(null);

  const run = () => {
    setIframeUrl(url);
  }
  async function takeScreenshot() {
    const response = await fetch('/ss')
    const result = await response.text()
    alert(result)
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log('Key pressed inside iframe:', event.key);
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.contentWindow.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (iframe) {
        iframe.contentWindow.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [])


  return (
    <div className='w-screen h-screen container'>
      <div className='w-full h-[90%] flex justify-center items-center bg-slate-800' >

        <div className='w-11/12 h-full flex flex-col justify-start items-center'>

          <div className='w-full flex justify-center items-center space-x-3'
          >
            <input
              id='n'
              className='w-1/3 my-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono'
              placeholder='www.example.com'
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              className='my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded'
              onClick={() => {
                run()

              }
              }
            >Run</button>
          </div>

          <iframe src={iframeUrl}
            id='frame'
            ref={iframeRef}
            className='w-full h-full'
            loading='lazy'
            title='Custom title'
            credentialless='false'
            onLoad={() => {
              const handleKeyDown = (event) => {
                console.log('Key pressed inside iframe:', event.key);
              };
              const iframe = iframeRef.current;
              if (iframe) {
                iframe.contentWindow.addEventListener('keydown', handleKeyDown);
              }
            }}
          />
          <button
            id='screenshotButton'
            className='my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={takeScreenshot}
          >Screenshot</button>
        </div>

      </div>
    </div>
  )
}

export default App
