import fs from 'fs'
import {expect} from 'chai';

export function doesFileExist(path) {
    return fs.existsSync(path)
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
}