const renderFull = (title, html, css, data) => `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <link rel="icon" href="/build/images/favicon.ico" type="image/x-icon">
        ${css}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <script>window.__my_little_pony__='${Buffer.from(JSON.stringify(data)).toString("base64")}'</script>
      </head>
      <body>
        <script async src="build/bundle.js"></script>
        <div id="root">${html}</div>
      </body>
    </html>
  `;

export default renderFull;
