/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.css", "./views/*.ejs","./views/*.css"],
  theme: {
    extend: {
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"},
        'custom-grey': {
          "200":"#EFEFEF",
          "500":"#B6B6B6"
        },
        'custom-brown':{
          "400":"#982943cc",
          "500":"#982943",
        },
        'whatsapp-color':{
          "600": "#25D366",
          "400": "#bef4d2",
        },
        'telegram-color':{
          "600":"#0088cc",
          "400":"#b3e6ff",
        },
        'twitter-color':{
          "600":"#46C1F6",
          "400":"#b6e7fc",
        },
        'linkedin-color':{
          "600":"#0077B5",
          "400":"#6bcafe",
        },
        'facebook-color':{
          "600":"#1877F2",
          "400":"#b7d4fb",
        },
        // 'custom-'
      }
    },
    fontFamily: {
      'body': [
    'Inter', 
    'ui-sans-serif', 
    'system-ui', 
    '-apple-system', 
    'system-ui', 
    'Segoe UI', 
    'Roboto', 
    'Helvetica Neue', 
    'Arial', 
    'Noto Sans', 
    'sans-serif', 
    'Apple Color Emoji', 
    'Segoe UI Emoji', 
    'Segoe UI Symbol', 
    'Noto Color Emoji'
  ],
      'sans': [
    'Inter', 
    'ui-sans-serif', 
    'system-ui', 
    '-apple-system', 
    'system-ui', 
    'Segoe UI', 
    'Roboto', 
    'Helvetica Neue', 
    'Arial', 
    'Noto Sans', 
    'sans-serif', 
    'Apple Color Emoji', 
    'Segoe UI Emoji', 
    'Segoe UI Symbol', 
    'Noto Color Emoji'
  ]
    },

    boxShadow:{
      'custom-box-shadow' : '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);'
    }
  },
  plugins: [],
}

