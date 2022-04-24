import {deleteDirectory, doesFileExist, expectVideoToBeCutSuccessfully} from "./test-utils.js";
import {
    alternativeVideoFolderPath,
    badCharactersTestVideoPath,
    defaultVideoFolderPath,
    failingSpecOriginalVideoPath,
    ffmpegErrorTestVideoPath,
    firstFailingTestVideoPath,
    passingSpecOriginalVideoPath,
    passingTestSpecPath,
    passingTestVideoPath,
    singleFailingTestSpecPath,
    skippingTestVideoPath
} from "./constants.js";

import cypress from 'cypress'
import {expect} from 'chai';


describe('cypress video cutter plugin tests', function () {
    before(() => {
        deleteDirectory(defaultVideoFolderPath)
        deleteDirectory(alternativeVideoFolderPath)
    })

    describe('all in one run tests', function () {
        before(async function () {
            this.timeout(1000000);
            await cypress.run({
                spec: [singleFailingTestSpecPath
                    // , multipleFailingTestsSpecPath, passingTestSpecPath,
                    // skippingTestSpecPath, badCharactersSpecPath, sameNameTestSpecPath, ffmpegErrorSpecPath,
                    // "cypress/integration/flaky-test.spec.js"
                ]
                    .join(','),
                browser: "chrome"
                })
        })

        it('should create video for failing test', () => {
            // expectMultipleVideosToBeCutSuccessfully([firstFailingTestVideoPath, secondFailingTestVideoPath, thirdFailingTestVideoPath])
            expectVideoToBeCutSuccessfully(firstFailingTestVideoPath)
        })

        it('should create video for flaky test', () => {
            expectVideoToBeCutSuccessfully("")
        });

        it('should not create video for passing test', () => {
            expect(doesFileExist(passingTestVideoPath)).to.be.false
        });

        it('should not create video for skipping test', () => {
            expect(doesFileExist(skippingTestVideoPath)).to.be.false
        });

        it('should not create file, when ffmpeg fails', () => {
            expect(doesFileExist(ffmpegErrorTestVideoPath)).to.be.false
        });

        it('should remove bad characters from video path', () => {
            expectVideoToBeCutSuccessfully(badCharactersTestVideoPath)
        });

        it('should present file in mochawesome', () => {
            // how should I test this shit?
        });

        it('should fail when video name already exists', () => {
            expectVideoToBeCutSuccessfully("")
            // but not override the file! what should it do?
        });

        it('should not edit the original spec videos', () => {
            expectVideoToBeCutSuccessfully(passingSpecOriginalVideoPath)
            expectVideoToBeCutSuccessfully(failingSpecOriginalVideoPath)
        });

        it('should not create a corrupted files', () => {

        });

        it('should make a video according to timestamp and length', () => {

        });
    })

    describe('individual runs tests', () => {
        it('should cut video only once, when there are multiple failed attempts', async() => {
            await cypress.run({
                spec: singleFailingTestSpecPath,
                config: {retries: 2}
            })

            expectVideoToBeCutSuccessfully(firstFailingTestVideoPath)
        });

        it('should cut a flaky test', async function () {
            await cypress.run({
                spec: "cypress/integration/flaky-test.spec.js"
            })
        });

        it('should not try to cut videos when cypress run fails to start', async() => {
            await cypress.run({
                spec: "cypress/integration/test-that-doesnt-exist.spec.js"
            })

            // what should I expect?
        });

        it('should save video in other place when videos folder is given in run', async() => {
            await cypress.run({
                spec: singleFailingTestSpecPath,
                config: {videosFolder: alternativeVideoFolderPath}
            })

            expectVideoToBeCutSuccessfully("")
        });

        it('should cut a passing/skipping test video, when config is set to it', async () => {
            await cypress.run({
                spec: [passingTestSpecPath, skippingTestVideoPath].join(','),
                config: {videoUploadOnPasses: true}
            })

            expectVideoToBeCutSuccessfully(passingTestVideoPath)
            expectVideoToBeCutSuccessfully(skippingTestVideoPath)
        });
    })
})