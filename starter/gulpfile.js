import gulp from "gulp";
import shell from "gulp-shell";
import { spawn } from "node:child_process";
import { once } from "node:events";

const BASE_URL = "http://localhost:1234";

// Builds and serves the application with Parcel on http://localhost:1234
gulp.task("parcel", shell.task("parcel index.html"));

// Runs the Mocha unit tests
gulp.task("test", shell.task("mocha test/"));

// Polls the given URL until the dev server responds or the attempts run out
const waitForServer = async (url, attempts = 30) => {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // Server is not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Timed out waiting for ${url}`);
};

// Runs the Cypress end-to-end tests.
// Starts the Parcel dev server automatically and stops it once the
// tests finish, so this task can be run on its own.
gulp.task("e2e", async () => {
  const server = spawn("npx", ["parcel", "index.html"], {
    stdio: "inherit",
    detached: true,
  });
  try {
    await waitForServer(BASE_URL);
    // ELECTRON_RUN_AS_NODE leaks in from Electron-based terminals and
    // prevents the Cypress binary from launching as an app
    const env = { ...process.env };
    delete env.ELECTRON_RUN_AS_NODE;
    const cypress = spawn("npx", ["cypress", "run"], {
      stdio: "inherit",
      env,
    });
    const [code] = await once(cypress, "exit");
    if (code !== 0) {
      throw new Error(`Cypress run failed with exit code ${code}`);
    }
  } finally {
    try {
      process.kill(-server.pid, "SIGTERM");
    } catch {
      // Server process already exited
    }
  }
});

// Runs Parcel and all tests (unit and end-to-end) in a single task
gulp.task("test-all", gulp.series("test", "e2e"));

// Default task builds and serves the project with Parcel
gulp.task("default", gulp.series("parcel"));
