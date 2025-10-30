import { createProxyMiddleware } from "http-proxy-middleware";
import { Request, Response } from "express";

export const proxyHelper = (req: Request, res: Response, target: string) => {
  const proxy = createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {},
  });
  proxy(req, res);
};
