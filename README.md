## Usage

Requires Cypress version 5 or up

```sh
npm install cypress-video-per-test
```

Then add in your Cypress plugins file:

```js
module.exports = (on, config) => {
    on('after:run', (results) => {
        return require('cypress-video-per-test')(results, config)
    })
}
```

# Where will the videos be created?

Your videos will be created in your Cypress videos folder, with a name that is consisted of the mocha `describe` and `it` names.

If you want to access the file path within the test, for example for Mochawesome integration, you can use the following snippet:

```js
const addContext = require('mochawesome/addContext');
const getTestVideoPath = require('cypress-video-per-test/name-generator')

Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
        const video = getTestVideoPath(test.title)
        addContext({ test }, video);
    }
});
```

## Options

|             name             |   type    | Default Value |                                                                                            Explanation                                                                                            |
|:----------------------------:|:---------:|:-------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| `createVideoForPassingTests` | `boolean` |    `false`    |                                                                If set to `true`, the plugin will create videos for passing tests.                                                                 |
| `createVideoForAllAttempts`  | `boolean`  |    `true`     | If set to `true`, when `retries` in Cypress config is set to more than one - the new video will include all of the attempts.<br/>If set to `false` the video will include only the first attempt. |

If you want to use an option, just add the additional options object:

```js
module.exports = (on, config) => {
    on('after:run', results => {
        return require('cypress-video-per-test')(results, config, {
            createVideoForPassingTests: true,
            createVideoForAllAttempts: false
        })
    })
}
```

# Feedback

If you have ideas in what directions this could go - please open an issue in this repo. I would love to hear them.
