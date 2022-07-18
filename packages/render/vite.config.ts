import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import resolve, { lib2esm } from 'vite-plugin-resolve'
import electron from 'vite-plugin-electron/renderer'
import pkg from '../../package.json'
import path from 'path'
import {alias} from "./vite/alias";
import {build} from "./vite/build";
import {server} from "./vite/server";


export default defineConfig({
  base: "./",
  mode: process.env.NODE_ENV,
  root: __dirname,
  resolve: {
    alias
  },
  plugins: [
    vue(),
    electron(),
  ],
  build,
  server
})
