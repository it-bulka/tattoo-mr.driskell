export function ensurePortalRoot(): HTMLElement {
  let portalRoot = document.getElementById('portal-root')
  if (!portalRoot) {
    const root = document.body

    portalRoot = document.createElement('div')
    portalRoot.id = 'portal-root'
    root.appendChild(portalRoot)
  }

  return portalRoot
}