import dotenv from 'dotenv';
import { createModuleAlias } from './config';

dotenv.config();
createModuleAlias();

import * as functions from 'firebase-functions';
import { createApiServer } from '@/apiServer';

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });

exports.api = functions.https.onRequest(createApiServer());
