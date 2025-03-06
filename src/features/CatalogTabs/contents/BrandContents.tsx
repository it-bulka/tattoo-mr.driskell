import cls from './contents.module.scss'
import classNames from 'classnames'
import { catalogContent } from '../data.ts'

export const BrandContents = () => {
  return (
    <ul className={classNames(cls.contents, cls.brands)}>
      {catalogContent.brands.map((brand) => (
        <li>{brand}</li>
      ))}
    </ul>
  )
}