import puppeteer from "puppeteer";

async function startBroadcast(token, durationInSeconds) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--use-fake-ui-for-media-stream",
      "--use-fake-device-for-media-stream",
      "--use-file-for-fake-video-capture=fake_camera.mjpeg",
      "--disable-web-security",
      "--disable-features=IsolateOrigins",
      "--disable-site-isolation-trials",
    ],
  });

  const page = await browser.newPage();

  // Grant permissions for media devices
  const context = browser.defaultBrowserContext();
  await context.overridePermissions(
    "https://builds.web-broadcast.live-video.net",
    ["camera", "microphone"]
  );

  try {
    await page.goto(
      "https://builds.web-broadcast.live-video.net/main/v2-stages/index.html",
      {
        waitUntil: "networkidle0",
      }
    );

    // Wait for token input and enter token
    await page.waitForSelector("input#token");
    await page.type("input#token", token);

    // Click join button
    await page.click("#join-button");

    // Keep the session alive
    console.log("Successfully joined broadcast");

    // Console output to stdout
    page.on("console", (msg) => console.log("Browser console:", msg.text()));
    page.on("requestfailed", (request) => {
      console.error("Request failed:", request.url());
    });

    // Set timeout to close after specified duration
    setTimeout(async () => {
      console.log("Broadcast duration completed");
      await browser.close();
    }, durationInSeconds * 1000);
  } catch (error) {
    console.error("Error:", error);
    await browser.close();
  }
}

// Replace with your actual token
const token = process.env.STAGE_TOKEN || "YOUR_TOKEN_HERE";
const broadcastDuration = process.env.BROADCAST_DURATION || 120;
startBroadcast(token, broadcastDuration);
