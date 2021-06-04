import dotenv from 'dotenv';
import { createModuleAlias } from './config';

dotenv.config();
createModuleAlias();

import * as functions from 'firebase-functions';
import { createApiServer } from '@/apiServer';

exports.api = functions.https.onRequest(createApiServer());
