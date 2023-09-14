'use client';

import { useState } from 'react';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

export default function Home() {
  const [regularGoal, setRegularGoal] = useState('');
  const [smartGoal, setSmartGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const convertGoal = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('./api/convert.ts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goal: regularGoal }),
      });

      if (response.ok) {
        const data = await response.json();
        setSmartGoal(data.convertedGoal);
      } else {
        console.error('Failed to convert goal');
        setError('An error occured while converting the goal.');
      }
    } catch (err) {
      console.error(error);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
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
          {' '}
          Convert to S.M.A.R.T Goal
        </button>

        <div>
          {Loading ? (
            <Loading />
          ) : (
            <>
              {error && <ErrorMessage message={error} />}
              <h2 className='text-xl font-semibold'>Converted Goal:</h2>
              <p className='mt-2'>{smartGoal}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
