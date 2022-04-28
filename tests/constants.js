export const ffmpegErrorText = ""

// video folders paths
export const defaultVideoFolderPath = "cypress/videos"
export const alternativeVideoFolderPath = "cypress/more-videos"

// specs paths
const integrationFolderPrefix = "cypress/integration/"
export const singleFailingTestSpecPath = integrationFolderPrefix + "failing-test.spec.js"
export const passingTestSpecPath = integrationFolderPrefix + "passing-test.spec.js"
export const multipleFailingTestsSpecPath = integrationFolderPrefix + "sanity.spec.js"
export const skippingTestSpecPath = integrationFolderPrefix + "skipping-test.spec.js"
export const sameNameTestSpecPath = integrationFolderPrefix + "same-name-twice.spec.js"
export const badCharactersSpecPath = integrationFolderPrefix + "invalid-characters.spec.js"
export const ffmpegErrorSpecPath = integrationFolderPrefix + "ffmpeg-error.spec.js"

// original videos paths
export const passingSpecOriginalVideoPath = ""
export const failingSpecOriginalVideoPath =""

// cut videos paths
export const passingTestVideoPath = ""
export const skippingTestVideoPath = ""
export const firstFailingTestVideoPath = defaultVideoFolderPath + "/test try should fail.mp4"
export const secondFailingTestVideoPath = ""
export const thirdFailingTestVideoPath = ""
export const ffmpegErrorTestVideoPath = ""
export const badCharactersTestVideoPath = ""