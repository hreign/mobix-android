const layerStack: symbol[] = []

export function acquireLayer(id: symbol) {
  if (layerStack.includes(id)) return
  layerStack.push(id)
  if (layerStack.length === 1) document.body.style.overflow = 'hidden'
}

export function releaseLayer(id: symbol) {
  const index = layerStack.indexOf(id)
  if (index !== -1) layerStack.splice(index, 1)
  if (layerStack.length === 0) document.body.style.overflow = ''
}

export function isTopLayer(id: symbol) {
  return layerStack[layerStack.length - 1] === id
}