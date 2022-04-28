module.exports = (on, config) => {
    on('after:run', results => {
        return require('../../src/plugin/index')(results, config, {
            cutPassingTestsVideos: config.env.cutPassingTestsVideos,
            createVideoOfMultipleAttempts: config.env.createVideoOfMultipleAttempts
        })
    })
}
