# IVS Broadcast Bot

Broadcast Bot uses [Puppeteer](https://pptr.dev/) to launch a headless Chrome process to broadcast a test video to an [AWS IVS Stage](https://docs.aws.amazon.com/ivs/latest/RealTimeUserGuide/what-is.html) using the [Web Broadcast SDK](https://docs.aws.amazon.com/ivs/latest/RealTimeUserGuide/getting-started-broadcast-sdk.html).

![BB-8](image.png)

Docker build:

```sh
docker build -t bb .
```

Docker run:

```sh
export STAGE_TOKEN="eyJhbGciOiJL..."
docker run -i --rm --cap-add=SYS_ADMIN -e STAGE_TOKEN=$STAGE_TOKEN -e BROADCAST_DURATION=60 bb
```

You can also run this natively outside of Docker:

```sh
npm i # only the first time
export STAGE_TOKEN="eyJhbGciOiJL..."
export BROADCAST_DURATION=60 # in seconds
npm run start
```

Fake camera source file was created with ffmpeg. Override to create your own.

```sh
ffmpeg -i sample_video_sequence_20s.h264 -pix_fmt yuvj420p -c:v mjpeg -q:v 5 -an fake_camera.mjpeg
```

Demo!

![demo](demo.webp)
