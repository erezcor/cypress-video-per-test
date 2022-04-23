export const CYPRESS_DIDNT_RECORD_VIDEOS_EXCEPTION = "The `video` configuration in cypress.json is set to false"
export const CYPRESS_RUN_ERROR_EXCEPTION = "Due to failure, Cypress did not start the run for spec "
export const VIDEO_WAS_NOT_RECORDED_FOR_SPEC_EXCEPTION = "Due to failure, Cypress did not record video for spec "

export function FFMPEG_EXCEPTION(error, originalVideoPath, testVideoTimestamp): string {
    return "Exception was thrown during the cutting of the specific test video" + '\n' +
        'You can watch the test at ' + testVideoTimestamp + ' in the spec video: `' + originalVideoPath + '`\n' +
        'The stack trace: ' + '\n' +
        error
}