import React from 'react';

function Settings({ isOpen, onClose }) {
  const buttons = [
    { label: 'Account', action: () => console.log('account') },
    {
      label: 'Content and display',
      action: () => console.log('content and display'),
    },
    { label: 'Playback', action: () => console.log('playback') },
    {
      label: 'Privacy and social',
      action: () => console.log('privacy and social'),
    },
    { label: 'Notifications', action: () => console.log('notifications') },
    {
      label: 'Apps and devices',
      action: () => console.log('apps and devices'),
    },
    {
      label: 'Data-saving and offline',
      action: () => console.log('data saving and offline'),
    },
    { label: 'Media quality', action: () => console.log('media quality') },
    { label: 'Advertisements', action: () => console.log('advertisements') },
    { label: 'About', action: () => console.log('about') },
  ];

  if (!isOpen) return null; // Don't render anything if not open

  return (
    <>
      <div
        className='fixed inset-0 bg-black bg-opacity-50 z-40'
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-64 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50`}
      >
        <div className='p-4'>
          <button
            onClick={onClose}
            className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
          >
            ×
          </button>

          <div className='pt-8'>
            <h2 className='text-xl font-semibold mb-6 text-gray-800'>
              Settings
            </h2>
            <nav>
              <ul className='space-y-2'>
                {buttons.map((button, index) => (
                  <li key={index}>
                    <button
                      onClick={button.action}
                      className='w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors'
                    >
                      {button.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
