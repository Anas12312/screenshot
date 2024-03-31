import { useRef } from 'react';
import { useState } from 'react'
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import { Suspense } from 'react';
import Loading from './Components/Loading';
import ErrorBoundry from './Components/ErrorBoundry';
import { createElement } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  const iframeRef = useRef(null);

  const run = () => {

    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      setIframeUrl('https://' + url);
      return;
    }
    setIframeUrl(url);
  }
  async function takeScreenshot() {
    const response = await fetch('/ss')
    const result = await response.text()
    alert(result)
  }

  const onInputChange = (e) => {
    const value = e.target.value;
    setUrl(value)
  }


  return (
    <div className='w-screen h-screen container' onKeyDown={(e) => {
      if(e.key === "F3") {
        run()
      }
    }}>
      <div className='w-full h-[90%] flex justify-center items-center bg-slate-800'>

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
