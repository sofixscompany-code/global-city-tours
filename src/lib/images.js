/** Swaps in the emoji fallback tile when a photo fails to load. */
export function imageFallback(event) {
  const card = event.currentTarget.closest('.dest')
  if (card) card.classList.add('is-fallback')
}

export function hideBrokenImage(event) {
  event.currentTarget.style.visibility = 'hidden'
}
