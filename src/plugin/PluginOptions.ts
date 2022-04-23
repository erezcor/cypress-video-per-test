export type VideoCutterOptions = {
    cutPassingTestsVideos: boolean,
    createVideoOfMultipleAttempts: boolean
}

const DEFAULT_VIDEO_CUTTER_OPTIONS: VideoCutterOptions = {
    cutPassingTestsVideos: false,
    createVideoOfMultipleAttempts: false
}

export function getOptionsOrDefaults(options: VideoCutterOptions): VideoCutterOptions {
    return Object.assign({}, options, DEFAULT_VIDEO_CUTTER_OPTIONS)
}