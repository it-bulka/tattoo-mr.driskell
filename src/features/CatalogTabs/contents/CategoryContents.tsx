import cls from './contents.module.scss'
import classNames from 'classnames'
import { catalogContent } from '../data.ts'

export const CategoryContents = () => {
  return (
    <ul className={classNames(cls.contents, cls.categories)}>
      {catalogContent.category.map((brand) => (
        <li>{brand}</li>
      ))}
    </ul>
  )
}