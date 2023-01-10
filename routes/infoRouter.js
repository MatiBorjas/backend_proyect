import { Router }from "express";
import parseArgs from "minimist";
import os from "os";

const infoRouter = Router();

infoRouter.get("/", (req, res) => {
  try {
    const args = parseArgs(process.argv.slice(2));
    console.log(args);
    const info = {
      args: JSON.stringify(args),
      directorioActual: process.cwd(),
      idProceso: process.pid,
      vNode: process.version,
      rutaEjecutable: process.execPath,
      OS: process.platform,
      memoria: JSON.stringify(process.memoryUsage().rss, null, 2),
      processNum: os.cpus().length,
    };

    res.render("pages/info", info);
  } catch (error) {
    res.render(error.message);
  }
});

export { infoRouter };