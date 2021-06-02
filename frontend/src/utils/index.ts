/**
 * A throttling guard to avoid repeated function calls within a short period of time
 * 
 * @param fn callback function
 * @param wait debounce delay (ms)
 */
 export function debounce<T> (fn: T, wait: number): (event: Event) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (event: Event) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (typeof fn === 'function') {
        fn(event);
      }
    }, wait);
  };
}
