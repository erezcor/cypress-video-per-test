import CypressRunResult = CypressCommandLine.CypressRunResult;
import ResolvedConfigOptions = Cypress.ResolvedConfigOptions;
import TestResult = CypressCommandLine.TestResult;
import RunResult = CypressCommandLine.RunResult;
import {
    CYPRESS_DIDNT_RECORD_VIDEOS_EXCEPTION,
    CYPRESS_RUN_ERROR_EXCEPTION,
    VIDEO_WAS_NOT_RECORDED_FOR_SPEC_EXCEPTION
} from "./Exceptions";
import {cutVideoWithFfmpeg} from "./VideoCutter";
import {millisToSeconds} from "./TimeUnitConvertor";
import * as lodash from "lodash";
import {getOptionsOrDefaults, VideoCutterOptions} from "./PluginOptions";

export function main(results: CypressRunResult, config: ResolvedConfigOptions, userOptions?: VideoCutterOptions): Promise<any> {
    checkRequirementsToRunPlugin(results, config)

    const options = getOptionsOrDefaults(userOptions)

    const videoPromises = cutVideosOfRun(results, config, options)

    return Promise.all(videoPromises)
}

function cutVideosOfRun(results: CypressRunResult, config: ResolvedConfigOptions, options: VideoCutterOptions) {
    let videoPromises: Promise<void>[] = []

    results.runs.forEach(run => {
        if (checkRequirementsForSpecificRun(run)) {
            const specVideoPath: string = run.video

            run.tests.forEach(test => {
                if (shouldCutVideo(test, options)) {
                    let newVideoDuration: number

                    const newVideoPath: string = getNewVideoPath(test, config)
                    const testStartTimeInSeconds: number = millisToSeconds(test.attempts[0].videoTimestamp)

                    if (options.createVideoOfMultipleAttempts) {
                        const attemptsDurations = test.attempts.map(attempt => attempt.duration)
                        newVideoDuration = lodash.sum(attemptsDurations)
                    } else {
                        newVideoDuration = test.attempts[0].duration
                    }

                    let videoPromise = cutVideoWithFfmpeg(specVideoPath, newVideoDuration, testStartTimeInSeconds, newVideoPath)

                    videoPromises.push(videoPromise)
                }
            })
        }
    })

    return videoPromises
}

function checkRequirementsForSpecificRun(run: RunResult) {
    if (run.error) {
        console.error(CYPRESS_RUN_ERROR_EXCEPTION + run.spec.name)
        return false
    } else if (!run.video) {
        console.error(VIDEO_WAS_NOT_RECORDED_FOR_SPEC_EXCEPTION + run.spec.name)
        return false
    } else {
        return true
    }
}

function checkRequirementsToRunPlugin(results: CypressRunResult, config: ResolvedConfigOptions) {
    if (!config.video) {
        throw CYPRESS_DIDNT_RECORD_VIDEOS_EXCEPTION
    }
}

function getNewVideoPath(test: TestResult, config: ResolvedConfigOptions) {
    return config.videosFolder + "\\" + formatTestTitleToFileName(test) + '.mp4'
}

function shouldCutVideo(test: TestResult, options: VideoCutterOptions): boolean {
    return test.displayError != null || options.cutPassingTestsVideos
}

function formatTestTitleToFileName(test: TestResult): string {
    const space: string = ' '
    const empty: string = ''
    const badCharactersRegex: RegExp = /[<>:"/\|?*]/g
    const signsRegex: RegExp = /[&\/\\#,+()$~%.'":*?<>{}]/g

    return test.title.join(space).replace(badCharactersRegex, empty)
}

module.exports = main