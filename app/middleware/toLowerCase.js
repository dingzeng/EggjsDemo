
function convert(value) {
  const type = Object.prototype.toString.call(value)
  if(type === '[object Array]') {
    const newArr = []
    for (let index = 0; index < value.length; index++) {
      newArr.push(convert(value[index]))
    }
    return newArr
  }else if(type === '[object Object]') {
    const newObj = {}
    for (const key in value) {
      const newKey = key[0].toLowerCase() + key.substring(1)
      newObj[newKey] = convert(value[key])
    }
    return newObj
  } else {
    return value
  }
}

module.exports = options => {
    return async function toLowerCase(ctx, next) {
        await next()
        ctx.response.body = convert(ctx.response.body)
    }
}