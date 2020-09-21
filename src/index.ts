interface Invoke {
  targetFunc: string;
  data?: any;
  success?: () => void;
  fail?: () => void;
  complete?: () => void;
}

(function() {
  let promiseChain = Promise.resolve();
  let promises: any = {};
  let callbacks: any = {};

  const guid = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  }

  window.webViewBridge = {
    invoke: ({
      targetFunc,
      data = {},
      success = () => {},
      fail = () => {},
      complete = () => {},
    }: Invoke): void => {
      const requestId = guid();
      const requestData = {
        request_id: requestId,
        target_func: targetFunc,
        data,
      };

      promiseChain
        .then(() => {
          return new Promise((resolve: any, reject: any) => {
            promises[requestData.request_id] = {
              resolve: resolve,
              reject: reject
            };
            callbacks[requestData.request_id] = {
              success,
              fail,
              complete,
            };

            window.ReactNativeWebView.postMessage(JSON.stringify(requestData));
          })
        })
        .catch((_: any) => {
          console.error(_.message);
        });
    },
  };

  window.addEventListener('message', ({data}: any) => {
    let responseData;
    try {
      responseData = JSON.parse(data)
    } catch(_: any) {
      console.error(_.message);
      return;
    }

    if (promises[responseData.request_id]) {
      promises[responseData.request_id].resolve();
      delete promises[responseData.request_id];
    }

    if (callbacks[responseData.request_id]) {
      if (responseData.status === 200) {
        callbacks[responseData.request_id].success.call(null, responseData.data);
      } else {
        callbacks[responseData.request_id].fail.call(null, responseData.data);
      }
      callbacks[responseData.request_id].complete.call(null, responseData.data);
      delete callbacks[responseData.request_id];
    }
  }, false);
}());
