export const partialize = (fn, ...params) => 
    fn.bind(null, ...params);

export const pipe = (...fns) => value => fns.reduce((res,fn) => fn(res), value);

export const takeUntil = (times, fn) => () => times-- > 0 && fn();

export const debounceTime = (miliseconds, fn) => {
    let timer = 0;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn,miliseconds);
    };
};