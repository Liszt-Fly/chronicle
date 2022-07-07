export default {
  // eslint
  '*.{js,ts,tsx,vue}': 'eslint --cache --fix',
  // typecheck
  'packages/render/**/{*.ts,*.tsx,*.vue,tsconfig.json}': ({ filenames }) =>
    'npm run typecheck',
}
