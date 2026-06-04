import { RefObject, useEffect, useRef } from 'react'
import { Portal } from '@/shared/ui/Portal/Portal.tsx'
import { Product } from '@/entities/ProductCard/ProductCard.tsx'
import cls from './SearchDropdown.module.scss'

interface SearchDropdownProps {
  items: Product[]
  anchorRef: RefObject<HTMLDivElement | null>
  isOpen: boolean
  onSelect: (product: Product) => void
  onClose: () => void
  emptyMessage: string
}

export const SearchDropdown = ({
  items,
  anchorRef,
  isOpen,
  onSelect,
  onClose,
  emptyMessage,
}: SearchDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        anchorRef.current &&
        !anchorRef.current.contains(target)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose, anchorRef])

  useEffect(() => {
    if (!isOpen) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const top = anchorRef.current?.getBoundingClientRect().bottom ?? 0

  return (
    <Portal>
      <div ref={dropdownRef} className={`${cls.dropdown} scrollbar-dark`} style={{ top }}>
        {items.length === 0 ? (
          <div className={cls.empty}>{emptyMessage}</div>
        ) : (
          <ul className={cls.list}>
            {items.map((product) => (
              <li key={String(product.id)} className={cls.item}>
                <button
                  type="button"
                  className={cls.btn}
                  onClick={() => onSelect(product)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className={cls.img}
                  />
                  <span className={cls.title}>{product.title}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Portal>
  )
}
