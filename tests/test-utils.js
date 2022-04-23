import {ffmpegErrorText} from "./constants.js";
import fs from 'fs'
import {expect} from 'chai';

export function doesFileExist(path) {
    return fs.existsSync(path)
}

export function getNumberOfFilesInDirectory(path) {
    return fs.readdirSync(path).length
}

export function getFileContent(path) {
    return fs.readFileSync(path, {encoding: 'utf-8'})
}

export function deleteDirectory(path) {
    fs.rmSync(path, {recursive: true, force: true});
}

// TODO: Add check for how many videos there are
export function expectMultipleVideosToBeCutSuccessfully(paths) {
    paths.forEach(path => {
        expectVideoToBeCutSuccessfully(path)
    })
}

export function expectVideoToBeCutSuccessfully(path) {
    expect(doesFileExist(path)).to.be.true
    expect(getFileContent(path)).to.not.include(ffmpegErrorText)
}