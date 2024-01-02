const { defineConfig } = require('cypress')

module.exports = defineConfig({
    // video: true,
    e2e: {
        baseUrl: 'http://localhost:8080',
        testIsolation: false,
        experimentalRunAllSpecs:true
    }
})
