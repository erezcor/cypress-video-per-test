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
import * as _ from "lodash";
import {getOptionsOrDefaults, VideoCutterOptions} from "./PluginOptions";
import * as fs from 'fs'

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
                if (shouldCreateVideoForTest(test, options)) {
                    let newVideoDurationInMillis: number
                    const newVideoPath: string = getNewVideoPath(test.title, config)
                    const testStartTimeInSeconds: number = millisToSeconds(test.attempts[0].videoTimestamp)

                    if (options.createVideoForAllAttempts) {
                        const attemptsDurations = test.attempts.map(attempt => attempt.duration)
                        newVideoDurationInMillis = _.sum(attemptsDurations)
                    } else {
                        newVideoDurationInMillis = test.attempts[0].duration
                    }

                    let newVideoDurationInSeconds: number = millisToSeconds(newVideoDurationInMillis)

                    let videoPromise = cutVideoWithFfmpeg(specVideoPath, testStartTimeInSeconds, newVideoDurationInSeconds, newVideoPath)

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
        console.error(CYPRESS_DIDNT_RECORD_VIDEOS_EXCEPTION)
        return false
    } else {
        return true
    }
}

function getNewVideoPath(testTitle: string[], config: ResolvedConfigOptions) {
    return config.videosFolder + "\\" + formatTestTitleToFileName(testTitle) + '.mp4'
}

function shouldCreateVideoForTest(test: TestResult, options: VideoCutterOptions): boolean {
    return (test.displayError != null || options.createVideoForPassingTests) && test.state != 'pending'
}

function formatTestTitleToFileName(testTitle: string[]): string {
    const badCharactersRegex: RegExp = /[/\\?%*:|"<>]/g

    return testTitle.join(' ').replace(badCharactersRegex, '')
}

module.exports = main