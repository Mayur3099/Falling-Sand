import React, { useState } from 'react';
import './App.css';

import { CustomCanvas, P5Canvas } from './Components';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div
        className='flex flex-col justify-center items-center p-4 bg-slate-800 min-h-screen'
      >
        <div className='font-bold font-sans text-teal-700 text-5xl mt-6 mb-8'>
          Falling Sand
        </div>
        {/* <CustomCanvas /> */}
        <P5Canvas />
      </div>
    </>
  )
}

export default App
