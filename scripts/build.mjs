import { build } from 'vite'

await build({ configFile: 'packages/main/vite.config.ts' })
await build({ configFile: 'packages/preload/vite.config.ts' })
await build({ configFile: 'packages/render/vite.config.ts' })
