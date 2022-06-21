/* eslint-disable @typescript-eslint/no-var-requires */
import { NextServer } from 'next/dist/server/next';

import { NextServerOptions, ProxyConfig } from '@nrwl/next';
import express from 'express';

import {obj} from '@my-org/buildable-lib'


const path = require('path');

export default async function nextWatchServer(
  app: NextServer,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: NextServerOptions & { [prop: string]: any },
  proxyConfig: ProxyConfig
) {
  const handle = app.getRequestHandler();
  await app.prepare();
  const server = express();

  server.disable('x-powered-by');

  // Serve shared assets copied to `public` folder
  server.use(
    express.static(path.resolve(settings.dir, settings.conf.outdir, 'public'))
  );

  // Set up the proxy.
  if (proxyConfig) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const proxyMiddleware = require('http-proxy-middleware');
    Object.keys(proxyConfig).forEach((context) => {
      server.use(proxyMiddleware(context, proxyConfig[context]));
    });
  }

  // Allow /status or /health_check
  server.get('/status', (req, res) => {
    res.sendStatus(200);
  });
  server.get('/health_check', (req, res) => {
    res.sendStatus(200);
  });

  // Default catch-all handler to allow Next.js to handle all other routes
  server.all('*', async (req: express.Request, res: express.Response) => {
    console.log(obj)
    handle(req, res);
  });

  server.listen(settings.port, settings.hostname);
}
