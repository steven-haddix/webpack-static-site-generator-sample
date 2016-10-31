export default function (html, app, manifest, vendor, css) {
    return `
    <html lang="en">
      <head><title>Test Site</title></head>
      <link rel="stylesheet" type="text/css" href="/${css}" />
      <body id="body">
        <div id="content">
          ${html}
        </div>
        <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
        <script src="${manifest}"></script>
        <script src="${vendor}"></script>
        <script src="${app}"></script>
      </body>
    </html>
    `
}