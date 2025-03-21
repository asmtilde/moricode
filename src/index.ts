import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/hw', (req: Request, res: Response) => {
    res.send('Hello, World!');
});
