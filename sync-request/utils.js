function tryStringify(data) {
  try {
    return JSON.stringify(data);
  } catch(error) {
    console.log(error);
    return '';
  }
}

function tryParse(data) {
  try {
    return JSON.parse(data);
  } catch(error) {
    console.log(error)
    return data;
  }
}

function findBody(argvs) {
  const body = argvs.find((i) => i.includes('--body='))
  const bodyString = body.replace('--body=');
  return tryParse(bodyString);
}

function findUrl(argvs) {
  const body = argvs.find((i) => i.includes('--url='))
  const bodyString = body.replace('--url=');
  return tryParse(bodyString);
}

function findHeaders(argvs) {
  const headers = argvs.find((i) => i.includes('--headers='))
  const headersString = headers.replace('--headers=');
  return tryParse(headersString);
}

function findMethod(argvs) {
  const method = argvs.find((i) => i.includes('--method='))
  const methodString = method.replace('--method=');
  return tryParse(methodString);
}

module.exports = {
  tryStringify,
  tryParse,
  findBody,
  findUrl,
  findHeaders,
  findMethod
}
