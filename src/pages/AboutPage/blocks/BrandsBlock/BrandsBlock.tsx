import cls from './BrandsBlock.module.scss'
import { useTranslation } from 'react-i18next'
import hanafy from '@/shared/assets/pages/brands/hanafy.png'
import tattooRevive from '@/shared/assets/pages/brands/tattoo-revive.png'
import tattooAloe from '@/shared/assets/pages/brands/tattoo-aloe.png'
import dermalize from '@/shared/assets/pages/brands/dermalize.png'
import faceBody from '@/shared/assets/pages/brands/face-body.png'
import ocean from '@/shared/assets/pages/brands/ocean.png'
import inkMachines from '@/shared/assets/pages/brands/ink-machines.png'
import cheyenne from '@/shared/assets/pages/brands/cheyenne.png'
import kwadron from '@/shared/assets/pages/brands/kwadron.png'
import kuroSumi from '@/shared/assets/pages/brands/kuro-sumi.png'

const brands = [
  { src: cheyenne, name: 'Cheyenne' },
  { src: kwadron, name: 'Kwadron' },
  { src: kuroSumi, name: 'Kuro Sumi' },
  { src: inkMachines, name: 'Ink Machines' },
  { src: dermalize, name: 'Dermalize' },
  { src: tattooRevive, name: 'Tattoo Revive' },
  { src: tattooAloe, name: 'Tattoo Aloe' },
  { src: hanafy, name: 'Hanafy' },
  { src: ocean, name: 'Ocean' },
  { src: faceBody, name: 'Face & Body' },
]

export const BrandsBlock = () => {
  const { t } = useTranslation()

  return (
    <section className={cls.brands}>
      <div className="container">
        <h4 className="blockTitle">{t('about_page.brands_title')}</h4>
        <div className={cls.grid}>
          {brands.map((b) => (
            <div key={b.name} className={cls.brandItem}>
              <img src={b.src} alt={b.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
