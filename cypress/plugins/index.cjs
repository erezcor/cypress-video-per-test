import {main} from "../../src/plugin/index.ts";

export default (on, config) => {
    on('after:run', results => {
        return main(results, config, {
            cutPassingTestsVideos: config.env.cutPassingTestsVideos,
            createVideoOfMultipleAttempts: config.env.createVideoOfMultipleAttempts
        })
    })
}
