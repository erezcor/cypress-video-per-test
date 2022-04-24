export type VideoCutterOptions = {
    createVideoOfPassingTests: boolean,
    createVideoOfMultipleAttempts: boolean
}

const DEFAULT_VIDEO_CUTTER_OPTIONS: VideoCutterOptions = {
    createVideoOfPassingTests: false,
    createVideoOfMultipleAttempts: true
}

export function getOptionsOrDefaults(options: VideoCutterOptions): VideoCutterOptions {
    return Object.assign(DEFAULT_VIDEO_CUTTER_OPTIONS, options)
}