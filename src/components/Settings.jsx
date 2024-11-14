import React from 'react';

function Settings() {
  const account = () => {
    console.log('account');
  }
  const contentAndDisplay = () => {
    console.log('content and display');
  }
  const playback = () => {
    console.log('playback');
  }
  const privacyAndSocial = () => {
    console.log('privacy and social');
  }
  const notifications = () => {
    console.log('notifications');
  }
  const appsAndDevices = () => {
    console.log('apps and devices');
  }
  const dataSavingAndOffline = () => {
    console.log('data saving and offline');
  }
  const mediaQuality = () => {
    console.log('media quality');
  }
  const advertisements = () => {
    console.log('advertisements');
  }
  const about = () => {
    console.log('about');
  }

  const buttons = [
    { label: 'Account', action: account },
    { label: 'Content and display', action: contentAndDisplay },
    { label: 'Playback', action: playback },
    { label: 'Privacy and social', action: privacyAndSocial },
    { label: 'Notifications', action: notifications },
    { label: 'Apps and devices', action: appsAndDevices },
    { label: 'Data-saving and offline', action: dataSavingAndOffline },
    { label: 'Media quality', action: mediaQuality },
    { label: 'Advertisements', action: advertisements },
    { label: 'About', action: about },
  ];

  return (
    <div className="relative p-4">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.action}
          className="absolute top-0 right-0 mt-2 mr-2 bg-indigo-400 text-white px-4 py-2 rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default Settings;
