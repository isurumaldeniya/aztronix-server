import { getDeviceInfo, getAlarms, getMetaData, sendData } from '../controllers/Device';
import express from 'express';

export default (router: express.Router) => {
  router.get('/device/getDeviceInfo', getDeviceInfo);
  router.get('/device/getAlarms', getAlarms);
  router.get('/device/getMetaData', getMetaData);
  router.post('/device/sendData', sendData);
};
