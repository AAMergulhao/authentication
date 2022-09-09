import { Request, Response, Router } from "express";
import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../../swagger.json';

const router = Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, { customSiteTitle: "Authentication API Docs" }));

router.get('/docs.json', (req: Request, res: Response) => {
  res.json(swaggerFile);
});

export default router;