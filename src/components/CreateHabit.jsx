import React, { useState } from 'react';
import { X } from 'lucide-react';
import VibeDropDown from './VibeDropDown';

function CreateHabit({ seeds, setVibe, onClose, userId }) {
  const [habitName, setHabitName] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!habitName || !selectedMood) {
      alert('Please enter both a habit name and select a mood');
      return;
    }

    try {
      // Get the spotify parameters by calling the selected mood function
      const moodParameters = seeds[selectedMood]();

      // Create the habit object with the habitName as key and mood parameters as value
      const newHabit = { [habitName]: moodParameters };

      const response = await fetch('http://localhost:3000/api/addNewHabit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          newHabit: newHabit,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add new habit');
      }

      const data = await response.json();
      console.log('Habit added successfully:', data);

      // Clear form and close modal on success
      setHabitName('');
      setSelectedMood('');
      onClose();
    } catch (error) {
      console.error('Error adding new habit:', error);
      alert('Failed to add new habit. Please try again.');
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-3xl w-11/12 max-w-lg flex flex-col gap-5 relative'
      >
        <button
          type='button'
          onClick={onClose}
          className='absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors'
          aria-label='Close'
        >
          <X size={24} />
        </button>

        <h2 className='text-2xl text-center text-gray-800 mb-6'>
          What would we like to do today?
        </h2>

        <input
          type='text'
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder='Enter activity...'
          className='w-full p-4 border border-gray-200 rounded-xl text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400'
        />

        <h2 className='text-2xl text-center text-gray-800 mb-6'>
          What is the mood?
        </h2>

        <div className='w-full'>
          <VibeDropDown
            options={seeds}
            updateVibe={(mood) => setSelectedMood(mood)}
            className='w-full p-4 border border-gray-200 rounded-xl text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400'
          />
        </div>

        <button
          type='submit'
          className='w-full py-4 bg-indigo-400 text-white rounded-full text-base hover:bg-indigo-500 transition-colors mt-6'
        >
          submit
        </button>
      </form>
    </div>
  );
}

export default CreateHabit;
