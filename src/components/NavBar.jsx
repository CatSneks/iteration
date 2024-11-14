import React from 'react';

const NavBar = ({
  isOpen,
  onClose,
  onLogout,
  onEdit,
  isEditMode,
  userProfile,
  onSettingsClick,
}) => {
  return (
    <>
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40'
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className='p-4'>
          <button
            onClick={onClose}
            className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
          >
            ×
          </button>

          {/* User Profile Section */}
          <div className='pt-8 pb-6 border-b border-gray-200'>
            <div className='flex flex-col items-center'>
              {userProfile?.images?.[0]?.url ? (
                <img
                  src={userProfile.images[0].url}
                  alt='Profile'
                  className='w-20 h-20 rounded-full border-2 border-blue-600 mb-3'
                />
              ) : (
                <div className='w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl mb-3'>
                  {userProfile?.display_name?.[0]?.toUpperCase() || '?'}
                </div>
              )}
              <h3 className='text-lg font-semibold text-gray-800'>
                {userProfile?.display_name}
              </h3>
              <p className='text-sm text-gray-500'>{userProfile?.email}</p>
            </div>
          </div>

          <nav className='mt-6'>
            <ul className='space-y-4'>
              <li>
                <a
                  href='/'
                  className='block py-2 text-gray-700 hover:text-blue-600 transition-colors'
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href='/profile'
                  className='block py-2 text-gray-700 hover:text-blue-600 transition-colors'
                >
                  Profile
                </a>
              </li>
              <li>
                <button
                  onClick={onSettingsClick}
                  className='w-full text-left py-2 text-gray-700 hover:text-blue-600 transition-colors'
                >
                  Settings
                </button>
              </li>
              <li>
                <button
                  onClick={onEdit}
                  className={`w-full text-left py-2 ${
                    isEditMode ? 'text-blue-600' : 'text-gray-700'
                  } hover:text-blue-600 transition-colors`}
                >
                  {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
                </button>
              </li>
              <li>
                <button
                  onClick={onLogout}
                  className='w-full text-left py-2 text-red-600 hover:text-red-700 transition-colors'
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;
