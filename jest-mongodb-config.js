module.exports = {
    mongodbMemoryServerOptions: {
      binary: {
        version: '6.0.6',
        skipMD5: true,
      },
      instance: {
        dbName: process.env.DB_NAME,
      },
      autoStart: false,
    },
};