export type ElPositions = Record<'top' | 'left' | 'width', number>
export const getElementPosition = <T extends HTMLElement>(element: T) => {
  const { width } = element.getBoundingClientRect()
  return {
    top: element.offsetTop + element.offsetHeight,
    left: element.offsetLeft,
    width
  }
}