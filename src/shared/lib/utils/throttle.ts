export const throttle = (callback: (...args: unknown[]) => void, timeout: number) => {
  let timer: Nullable<ReturnType<typeof setTimeout>> = null;

  return function perform(...args: unknown[]) {
    if (timer) {
      return;
    }

    timer = setTimeout(() => {
      callback(...args);

      clearTimeout(timer!);
      timer = null;
    }, timeout);
  };
};
