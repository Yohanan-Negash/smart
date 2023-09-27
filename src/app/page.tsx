'use client';

import { useState } from 'react';

export default function Home() {
  const [regularGoal, setRegularGoal] = useState('');
  const [smartGoal, setSmartGoal] = useState('');

  const convertGoal = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goal: regularGoal }),
      });

      if (response.ok) {
        const data = await response.json();
        setSmartGoal(data);
      } else {
        console.log('response: ', response);
        console.error('No response');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-semibold mb-4'>Goal Conversion</h1>
        <input
          type='text'
          className='w-full border rounded p-2 mb-4'
          placeholder='Enter your Goal'
          onChange={(e) => setRegularGoal(e.target.value)}
        />
        <button
          className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
          onClick={convertGoal}
        >
          Convert to S.M.A.R.T Goal
        </button>
        <div>
          <h2 className='text-xl font-semibold'>Converted Goal:</h2>
          <p className='mt-2'>{smartGoal}</p>
        </div>
      </div>
    </div>
  );
}
