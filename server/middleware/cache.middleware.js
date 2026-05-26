import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 300 })

export const cacheMiddleware = (key) => (req, res, next) => {
  const cacheKey = `${key}_${JSON.stringify(req.query)}`
  const cached = cache.get(cacheKey)

  if (cached) {
    return res.status(200).json({ success: true, fromCache: true, ...cached })
  }

  res.sendResponse = res.json.bind(res)
  res.json = (body) => {
    cache.set(cacheKey, body)
    res.sendResponse(body)
  }

  next()
}