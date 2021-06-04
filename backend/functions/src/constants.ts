export const FUNCTION_BASE_URL = process.env.FUNCTIONS_EMULATOR === 'true' ?
  `http://localhost:5001/${process.env.GCLOUD_PROJECT}/${process.env.GCF_REGION}/api` :
  `https://${process.env.GCF_REGION}-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/api`;
