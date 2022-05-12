module.exports = (on, config) => {
    on('before:spec', results => {

    })
    on('after:run', results => {
        return require('../../src/plugin/index')(results, config, {
            createVideoForPassingTests: config.env.createVideoForPassingTests,
            createVideoForAllAttempts: config.env.createVideoForAllAttempts
        })
    })
}
