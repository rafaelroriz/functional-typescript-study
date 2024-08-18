
export const handleStatus = res => 
res.ok ? res.json() : Promise.reject(res.statusText);

export const log = res => {
    console.log(res);
    return res;
}

export const timeoutPromise = (milliseconds, promise) => {
    const message = `Limite da promise excedido (limite: ${milliseconds} ms)`
    const timeout =  new Promise((resolve, reject) =>
        setTimeout(() => reject(message),milliseconds));

    return Promise.race([promise,timeout])
};

export const delay = milliseconds => data => 
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(data), milliseconds)
    }
);

export const retry = (retries, milliseconds, fn) =>
    fn().catch(async err => {
        console.log(retries);
        await delay(milliseconds)();
        return retries > 1
            ? retry(retries - 1, milliseconds, fn)
            : Promise.reject(err);
    }); 