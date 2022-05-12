export type VideoCutterOptions = {
    createVideoForPassingTests: boolean,
    createVideoForAllAttempts: boolean
}

const DEFAULT_VIDEO_CUTTER_OPTIONS: VideoCutterOptions = {
    createVideoForPassingTests: false,
    createVideoForAllAttempts: true
}

export function getOptionsOrDefaults(options: VideoCutterOptions): VideoCutterOptions {
    return Object.assign(DEFAULT_VIDEO_CUTTER_OPTIONS, options)
}