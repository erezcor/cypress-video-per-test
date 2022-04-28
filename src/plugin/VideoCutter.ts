import * as ffmpeg from "fluent-ffmpeg";
import {path as ffmpegPath} from "@ffmpeg-installer/ffmpeg";
import {FFMPEG_EXCEPTION} from "./Exceptions";

export function cutVideoWithFfmpeg(originalVideoPath: string, newVideoStartTimeInSeconds: number, newVideoDurationInSeconds: number, newVideoPath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        ffmpeg()
            .input(originalVideoPath)
            .setFfmpegPath(ffmpegPath)
            .setDuration(newVideoDurationInSeconds)
            .setStartTime(newVideoStartTimeInSeconds)
            .saveToFile(newVideoPath)
            .on('start', (command) => {
                console.log("Start making video with command: " + command)
            })
            .on('error', (error, stdout, stderr) => {
                const exception = FFMPEG_EXCEPTION(error, originalVideoPath, newVideoStartTimeInSeconds)
                console.error(exception)
                reject(exception)
            })
            .on('end', (stdout, stderr) => {
                console.log('Success making video')
                console.log(stdout)
                resolve()
            })
    })
}