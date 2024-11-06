import express from 'express';

export const getDeviceInfo = async (
  req: express.Request,
  res: express.Response
) => {
  console.log('i am here');
  const url = 'https://192.168.0.198:8000/api/v1/system-information';
  const response = await fetch(url, {
    headers: {
      Authorization: 'ySXfLyw9OO7qkcxKKce5nft7A5vYlb',
    },
  });
  const data = await response.json();
  console.log(data);
  return res.json(data);
};

export const getAlarms = async (
  req: express.Request,
  res: express.Response
) => {
  console.log('i am here');
  const url = 'https://192.168.0.198:8000/api/v1/alarms';
  const response = await fetch(url, {
    headers: {
      Authorization: 'ySXfLyw9OO7qkcxKKce5nft7A5vYlb',
    },
  });
  const data = await response.text();
  console.log(data);
  return res.json(data);
};

export const getMetaData = async (
  req: express.Request,
  res: express.Response
) => {
  console.log('i am here');
  const url = 'https://192.168.0.198:8000/api/v1/metadata';
  const response = await fetch(url, {
    headers: {
      Authorization: 'ySXfLyw9OO7qkcxKKce5nft7A5vYlb',
    },
  });
  const data = await response.json();
  console.log(data);
  return res.json(data);
};

export const sendData = async (req: express.Request, res: express.Response) => {
  console.log('i am here');
  // const requestBody = req.body;
  // let dataObject : object[] = [];
  // requestBody.data.map((item: Record<string, any>) => dataObject.push(item))
  // console.log(dataObject)

  // const requestData = req.body;

  // // Ensure the data is correctly structured
  // if (requestData && Array.isArray(requestData.data)) {
  //   requestData.data.forEach((item: any) => {
  //     if (item.values && typeof item.values === 'object') {
  //       Object.keys(item.values).forEach((key) => {
  //         if (!Array.isArray(item.values[key])) {
  //           item.values[key] = [item.values[key]];
  //         }
  //       });
  //     }
  //   });
  // }

  // // Convert to a JSON string with proper indentation
  // const formattedJSON = JSON.stringify(requestData, null, 2);

  const requestData = {
    data: [
      {
        type: 'online',
        values: {
          '415': ['currentTrms', 'currentAc', 'currentDc'],
          '389': ['voltageL1'],
        },
      },
    ],
  };

  console.log('Request Data:', JSON.stringify(requestData, null, 2));
  // Convert the data object to a JSON string
  const jsonString = JSON.stringify(requestData, null, 2);
  console.log(jsonString);
  const url = 'https://192.168.0.198:8000/api/v1/data';
  const response = await fetch(url, {
    headers: {
      Authorization: 'ySXfLyw9OO7qkcxKKce5nft7A5vYlb',
    },
    body: jsonString,
    method: 'POST',
  });

  const data = await response.json();
  console.log(data);
  return res.json(data);
};
