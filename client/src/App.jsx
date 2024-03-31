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

  const run = (e) => {
    e.preventDefault();

    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      setIframeUrl('https://' + url);
      return;
    }
    setIframeUrl(url);
  }

  const onInputChange = (e) => {
    const value = e.target.value;
    setUrl(value)
  }

  const takeScreenShot = () => {
    // html2canvas(iframeRef).then((canvas) => {
    //   iframeRef.appendChild(canvas);
    // })

    // document.getElementById('frame').contentWindow.document.body
    html2canvas(document.getElementById('frame')).then(function (canvas) {
      const dataUrl = canvas.toDataURL('image/png')

      const link = document.createElement('a');
      link.download = 'my-image-name.png';
      link.href = dataUrl;
      link.click();
    })

    // console.log(iframeRef);
    // domtoimage.toPng(document.getElementById('frame')).then((dataUrl) => {
    //   var img = new Image();
    //     img.src = dataUrl;
    //     document.body.appendChild(img);
    // })

    // domtoimage.toJpeg(document.getElementById('frame').ifr .iframe[0]?.contentDocument?.body, { quality: 0.95 })
    // .then(function (dataUrl) {
    //     var link = document.createElement('a');
    //     link.download = 'my-image-name.jpeg';
    //     link.href = dataUrl;
    //     link.click();
    // });
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-slate-800'>

      <div className='w-11/12 h-full flex flex-col justify-start items-center'>

        <form className='w-full flex justify-center items-center space-x-3'
          onSubmit={run}
        >
          <input
            id='n'
            className='w-1/3 my-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono'
            placeholder='www.example.com'
            onChange={onInputChange}
          />
          <button
            className='my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded'
          >Run</button>
        </form>

        <iframe
          src={iframeUrl}
          id='frame'
          ref={iframeRef}
          className='w-full h-full'
          loading='lazy'
          title='Custom title'
          credentialless='false'
        />

        <button
          className='my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={takeScreenShot}
        >Screenshot</button>
      </div>

    </div>
  )
}

export default App
