export function connectEffect(effectFn, successActionFn, failActionFn) {
  return function (...data) {
    return function (dispatch) {
      return effectFn(...data)
        .then((data) => dispatch(successActionFn(data)))
        .catch((err) => dispatch(failActionFn(err)));
    }
  }
}