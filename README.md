# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

### NOTES

npm create vite@latest ./

### for tailwind setup

-> npm install -D tailwindcss postcss autoprefixer
-> npx tailwindcss init -p
-> npm i -D tailwindcss-animate

### ShadCN

-> npm i -D @types/node
-> npx shadcn-ui@latest init

-> npx shadcn-ui@latest add form
->npx shadcn-ui@latest add textarea

for localhost url configuration
-> npm i @vitejs/plugin-react-swc

npm run dev

## Reactdropzone for file upload

-> npm install --save react-dropzone

## End of page

-> npm install react-intersection-observer

## for deployment in firebase(terminal code)

->> create project in firebase and create you web app

npm install firebase
1- npm i -g firebase-tools
2- firebase login (logging to your browser from terminal with browser)
""""-> error enconter(
open powershell as admin
-> Get-ExecutionPolicy
-> Set-ExecutionPolicy RemoteSigned
-> Set-ExecutionPolicy Unrestricted

            after completion
               -> Set-ExecutionPolicy Restricted

            )""""

3- firebase config and json create
4- firebase init(yes, hoasting,...)

6- npm run build (development branch) (as vite has dist folder instead of build file)
7- firebase deploy

app deployed link in firebase(https://sociogram-c6ecb.web.app) -> this does not work as appwrite only allows localhost and its url is not local host so it is block and thorws cors error.
