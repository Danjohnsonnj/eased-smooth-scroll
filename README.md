TODO:
- figure out why commented Jest test `expect`s fail
- split out Jest config for code paths which do not require a browser (https://github.com/facebook-atom/jest-electron-runner#tips)
- the delay on the return Promise resolver should account for very small distance over a very long duration, as the browser may report the x,y has not xchanged in some of the tweens