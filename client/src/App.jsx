import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <iframe src='http://www.codegrepper.com'
        width={1000} 
        height={500} 
        loading='lazy'  
        title='Custom title'
        
      >

      </iframe>
    </div>
  )
}

export default App
