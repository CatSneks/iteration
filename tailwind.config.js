/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // delcares the index.html as the entrypoint and main HTML file
    './src/**/*.{js,jsx}', // applies tailwind to all React components that contain tailwind classes for styling
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
