module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: "src/preload.js",
      // Or, for multiple preload files:
      preload: { preload: "src/preload.js" },
    },
  },
};
