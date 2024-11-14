import React, { useState } from 'react';
import { X, Plus, Activity, HeartHandshake } from 'lucide-react';
import VibeDropDown from './VibeDropDown';

function CreateHabit({ seeds, setVibe, onClose, userId, onHabitCreated }) {
  const [habitName, setHabitName] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!habitName || !selectedMood) {
      alert('Please enter both a habit name and select a mood');
      return;
    }

    try {
      const moodParameters = seeds[selectedMood]();
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
      setHabitName('');
      setSelectedMood('');
      onHabitCreated();
    } catch (error) {
      console.error('Error adding new habit:', error);
      alert('Failed to add new habit. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl w-11/12 max-w-lg flex flex-col gap-6 relative shadow-xl animate-in slide-in-from-bottom duration-300"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create New Activity
          </h2>
          <p className="text-gray-500 text-sm">
            Set up your activity and choose its vibe
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="activity" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Activity size={16} />
            Activity Name
          </label>
          <input
            id="activity"
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            placeholder="What would you like to do?"
            className="w-full p-4 border border-gray-200 rounded-xl text-base bg-gray-50 
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                     placeholder:text-gray-400 transition-all duration-200"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="mood" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <HeartHandshake size={16} />
            Select Mood
          </label>
          <VibeDropDown
            id="mood"
            options={seeds}
            updateVibe={(mood) => setSelectedMood(mood)}
            className="w-full p-4 border border-gray-200 rounded-xl text-base bg-gray-50 
                      focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
                      transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-indigo-500 text-white rounded-xl text-base font-medium
                   hover:bg-indigo-600 active:bg-indigo-700 transition-colors mt-4
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                   flex items-center justify-center gap-2 shadow-sm"
        >
          <Plus size={20} />
          Create Activity
        </button>
      </form>
    </div>
  );
};

export default CreateHabit;