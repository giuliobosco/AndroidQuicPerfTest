# Android QUIC Performance Test

Small project for test QUIC's performances on Android. 

## Test performance:

Process to test performances:

- start 2 instances of caddy:
    - port 2016 -> with quic
    - port 2017 -> normal
- edit your address in the `App.js` at line 15
- build your app, with `expo build:android`
- download and install your APK
- test performance with tcp and quic
