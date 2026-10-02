import gulp from "gulp";
import shell from "gulp-shell";

// Builds and serves the application with Parcel on http://localhost:1234
gulp.task("parcel", shell.task("parcel index.html"));

// Runs the Mocha unit tests
gulp.task("test", shell.task("mocha test/"));

// Runs the Cypress end-to-end tests
// Note: the Parcel dev server must be running for these tests to pass
gulp.task("e2e", shell.task("npx cypress run"));

// Default task builds and serves the project with Parcel
gulp.task("default", gulp.series("parcel"));
