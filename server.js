import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
  // res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "script-src 'self' 'sha256-8ZgGo/nOlaDknQkDUYiedLuFRSGJwIz6LAzsOrNxhmU=' https://www.goftino.com https://cdn.goftino.com https://www.googletagmanager.com; " +
      "style-src 'self' 'unsafe-inline' https://www.goftino.com https://cdn.goftino.com; " +
      "img-src 'self' data: https: https://*.google.com https://*.googleapis.com; " +
      "connect-src 'self' https: wss: https://*.google.com https://*.googleapis.com; " +
      "font-src 'self' https: data:; " +
      "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; block-all-mixed-content;"
  );

  res.removeHeader("X-Powered-By");
  res.removeHeader("Last-Modified");

  next();
});

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
