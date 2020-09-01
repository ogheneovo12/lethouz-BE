import { createServer } from "http";
import * as config from "./config";
import app from "./loaders";

app.loadAll(app).then(() => {
  const server = createServer(app);

  server.listen(config.port, () => {
    console.log(`server running on port ${config.port}`);
  });
});
