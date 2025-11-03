import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { Request, Response } from 'express';

export const proxyHelper = (req: Request, res: Response, target: string) => {
  const proxyOptions: Options = {
    target,
    changeOrigin: true,
    pathRewrite: {},
  };

  const proxy = createProxyMiddleware(proxyOptions);
  proxy(req, res, (err) => {
    if (err) {
      console.error('Proxy error:', err);
    }
  });
};