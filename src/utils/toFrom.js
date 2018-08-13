function toFrom(history) {
  var from = urlQuery(history.location.search)['from'];
  if (from === undefined) {
    from = '/';
  }
  return () => {
    history.replace(from);
  }
}

function urlQuery(search) {
  let hashes = search.slice(search.indexOf('?') + 1).split('&');
  return hashes.reduce((params, hash) => {
    let [key, val] = hash.split('=');
    return Object.assign(params, { [key]: decodeURIComponent(val) });
  }, {});
}

export default toFrom;
