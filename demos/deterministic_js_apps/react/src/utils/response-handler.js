export function handleResponse(promise) {
  return promise.then(res => res.ok ? res.json() : Promise.reject(res.statusText))
}