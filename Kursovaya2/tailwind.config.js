/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      'Rubik':['Rubik'],
      'Roboto':['Roboto'],
      'Chakra-Petch':['Chakra-Petch'],
    },
    colors: {
      'orange': '#f3ab38',
      'back': '#000000',
      'white': 'rgb(255 255 255)',
      'purple-500': 'rgb(168 85 247)',
      'pink-600': 'rgb(219 39 119)',
      'red-600': 'rgb(220 38 38)',
      'red-800': 'rgb(153 27 27)',
      'gray-700': 'rgb(55 65 81)',
      'gray-500': 'rgb(107 114 128)',
      'gray-200': 'rgb(229 231 235)',
      'gray-50': 'rgb(249 250 251)',
      'fiolet': '#5E47B3',
      'gray-900': 'rgb(17 24 39)',
      'transparent':  'transparent',
      'background':  '#242529',
    },
  },
  plugins: [],
}

