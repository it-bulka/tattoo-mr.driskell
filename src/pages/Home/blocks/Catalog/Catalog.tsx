import cls from './Catalog.module.scss'
import { useTranslation } from 'react-i18next'
import CatalogLeft from '@/shared/assets/pages/catalog/catalog-left.png'
import CatalogRight from '@/shared/assets/pages/catalog/catalog-right.png'
import TattooSetsImg from '@/shared/assets/pages/catalog/tattoo-sets.png'
import InksImg from '@/shared/assets/pages/catalog/inks.png'
import TipsImg from '@/shared/assets/pages/catalog/tips.png'
import NeedlesImg from '@/shared/assets/pages/catalog/needles.png'
import HoldersImg from '@/shared/assets/pages/catalog/holders.png'
import AccessoriesImg from '@/shared/assets/pages/catalog/accessories.png'
import WiresImg from '@/shared/assets/pages/catalog/wires.png'
import ProtectionImg from '@/shared/assets/pages/catalog/protection.png'
import PrintersImg from '@/shared/assets/pages/catalog/printers.png'
import TattooMachinesImg from '@/shared/assets/pages/catalog/tattoo-machines.png'
import PowerSuppliesImg from '@/shared/assets/pages/catalog/power-supplies.png'
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { DecoratedLink } from '@/shared/ui/DecoratedLink/DecoratedLink';
import { getCatalogDetailsPage } from '@/shared/config/routeConfig/routeConfig';
import classNames from 'classnames';

const down = [
  {
    img: CatalogLeft,
    name: 'Фарби Lip Nitn'
  },
  {
    img: CatalogRight,
    name: 'Foxx viper - хіт 2021 року'
  }
]

const upper = [
  { name: 'tattoo sets', slug: 'tattoo-sets', img: TattooSetsImg },
  { name: 'holders', slug: 'tattoo-holders', img: HoldersImg },
  { name: 'tattoo machines', slug: 'tattoo-machines', img: TattooMachinesImg },
  { name: 'pedals and wires', slug: 'pedals-and-wires', img: WiresImg },
  { name: 'inks', slug: 'tattoo-inks', img: InksImg },
  { name: 'power supplies', slug: 'power-supplies', img: PowerSuppliesImg },
  { name: 'tips', slug: 'tattoo-tips', img: TipsImg },
  { name: 'tattoo needles', slug: 'tattoo-needles', img: NeedlesImg },
  { name: 'protection, containers, consumables', slug: 'protection-containers-consumables', img: ProtectionImg },
  { name: 'accessories', slug: 'accessories', img: AccessoriesImg },
  { name: 'printers and tablets', slug: 'printers-and-tablets', img: PrintersImg },
]

export const Catalog = () => {
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.catalog)}>
      <div className='container'>
        <h3 className={classNames(cls.title, 'pageTitle')}>{t('catalog')}</h3>
        <div className={cls.grid}>
          {upper.map((item) => (
            <AppLink key={item.slug} to={getCatalogDetailsPage(item.slug)} state={{ type: 'category' }}>
              <div style={{ backgroundImage: `url(${item.img})`}} className={cls.img}/>
              <p className={cls.cardTitle}>{item.name}</p>
            </AppLink>
          ))}
        </div>
      </div>

      <div className={cls.addition}>
        {down.map((item) => (
          <div style={{ backgroundImage: `url(${item.img})`}} key={item.name}>
            <p className={cls.additionTitle}>{item.name}</p>
            <DecoratedLink to="/" className={cls.link}>{t('show in catalog')}</DecoratedLink>
          </div>
        ))}
      </div>
    </div>
  )
}