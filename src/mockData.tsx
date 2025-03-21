import ProductImg from '@/shared/assets/toDelete/product.png';
import ProductImg2 from '@/shared/assets/toDelete/product-2.png';
import ProductImg3 from '@/shared/assets/toDelete/product-3.png';
import ProductImg4 from '@/shared/assets/toDelete/product-4.png';
import MachineImg1 from '@/shared/assets/toDelete/tattoo-machine/machine-1.png';
import MachineImg2 from '@/shared/assets/toDelete/tattoo-machine/machine-2.png';
import MachineImg3 from '@/shared/assets/toDelete/tattoo-machine/machine-3.png';
import MachineImg4 from '@/shared/assets/toDelete/tattoo-machine/machine-4.png';
import { type Product } from '@/entities/ProductCard/ProductCard.tsx'
import { CartItemType } from '@/entities/Cart/ui/Cart/CartItem.tsx'
import Manager from '@/shared/assets/toDelete/manager.png'
//PromoCodes
import PromoCodeImg from '@/shared/assets/toDelete/promocode.png'
// blog article
import BlogImg from '@/shared/assets/toDelete/blog.png'
import { ArticleType } from '@/pages/ToolsBlog/model/type/type.ts'
import i18next from '@/shared/config/i18n/i18n.tsx'
// tattoo works
import Work1 from '@/shared/assets/toDelete/tattoo-works/work-1.png'
import Work2 from '@/shared/assets/toDelete/tattoo-works/work-2.png'
import Work3 from '@/shared/assets/toDelete/tattoo-works/work-3.png'
import Work4 from '@/shared/assets/toDelete/tattoo-works/work-4.png'
import Work5 from '@/shared/assets/toDelete/tattoo-works/work-5.png'
import Work6 from '@/shared/assets/toDelete/tattoo-works/work-6.png'
import Work7 from '@/shared/assets/toDelete/tattoo-works/work-7.png'

export const companyData = {
  tel: {
    link: '+380676276433'
  },
  email: {
    link: 'i.it.bulka@gmail.com',
    text: 'Mr.Driskell@gmail.com'
  },
  whatsapp: {
    link: '%2B380676276433'
  },
  viber: {
    link: '380676276433'
  },
  telegram: {
    link: 'iva147iva147'
  },
}

// TODO:connect to back
export const productsList: Product[] = Array.from({ length: 10 }, (_, index) => ({
  imgs: [ProductImg, ProductImg2, ProductImg3, ProductImg4],
  title: 'Foxxx Kitsune Mini Black Vintage RCA',
  price: 6000,
  id: index,
  tags: ['new', 'absent']
}))


export const cartList: CartItemType[] = Array.from({ length: 2 }, (_, index) => ({
  img: ProductImg,
  title: 'Foxxx Kitsune Mini Black Vintage RCA',
  price: 6000,
  amount: 4,
  totalPrice: 12000,
  id: index
}))

export const tattooMachineDetails = {
  description: [
    'Viper is a machine built on a powerful motor, with the frame of this model made from durable and lightweight aluminum alloy. As a result, the weight of the machine is only 120g.',
    'This model is equipped with an adjustable eccentric. To adjust the needle stroke you need, simply move your holder in the clamp forward or backward. The eccentric is also designed so that the machine lacks centrifugal force, which eliminates vibration during operation. There is a small and convenient pin at the bottom for attaching the bandage rubber.',
    'The diameter of the clamping bolt is larger than on similar models, so the holder is fixed without any issues or extra effort. This model easily pushes any needles and cartridges.\n' +
    'All necessary recommendations are provided in the instruction manual included in the box with the product.',
    'The machine is suitable for both tattoos and permanent makeup.'
  ],
  slides: [
    {
      img: MachineImg1,
      tags: ['new'],
      id: '1'
    },
    {
      img: MachineImg2,
      tags: ['new', 'discount'],
      id: '2'
    },
    {
      img: MachineImg3,
      tags: ['new'],
      id: '3'
    },
    {
      img: MachineImg4,
      tags: ['new'],
      id: '4'
    }
  ]
}

export const promoCodes = Array.from({ length: 10 }, (_, index) => ({
  img: PromoCodeImg,
  title: 'Package "Summer"',
  description: [
    'The hottest summer of the century doesn\'t want to leave and is bringing you new colors until the end of the season.',
    'With a purchase of 5500 or more, you will receive a 1% discount on absolutely any product! Hurry and paint your life with the colors of summer!'
  ],
  id: index
}))

export const personalManager = {
  avatar: Manager,
  name: 'Valeria',
  phone: '+380676276433',
  email: 'i.it.bulka@gmail.com',
  viber: 'viber://contact?number=%2B380676276433',
  whatsup: 'https://wa.me/380676276433',
  telegram: 'https://t.me/iva147iva147'
}

const getTranslation = async (key: string) => {
  if (!i18next.isInitialized) {
    console.error('i18next not initialized');
    return key;  // Return the key if i18next is not initialized
  }

  // Ensure the namespace is loaded before fetching the translation
  await i18next.loadNamespaces('article');

  return i18next.t(key, { ns: 'article' });
};
/**
 * Function to transform normalized data into a single structure.
 * Combines data for subsections and subsubsections from a normalized format into a single nested structure.
 *
 * @param {ArticleType['content']} list - Normalized article data containing sections, subsections, and subsubsections.
 * @returns {Array} Returns an array of sections with nested subsections and subsubsections.
 *
 * @example
 * const normalizedData = {
 *   sections: [
 *     {
 *       id: "section1",
 *       subSections: ["subSection1", "subSection2"]
 *     }
 *   ],
 *   subSections: {
 *     subSection1: { id: "subSection1", subSubSections: ["subSubSection1"] },
 *     subSection2: { id: "subSection2", subSubSections: [] }
 *   },
 *   subSubSections: {
 *     subSubSection1: { id: "subSubSection1" }
 *   }
 * }
 * const result = mapSections(normalizedData);
 * console.log(result);
 */
export const mapSections = async (list: ArticleType['content']) => {
  /**
   * Function to get a subsubsection by its ID.
   *
   * @param {string} id - ID of the subsubsection.
   * @returns {Object} Returns the subsubsection.
   */
  const getSubSubSection = async (id: string) => {
    const subSubSection = list.subSubSections[id]
    return {
      ...subSubSection,
      title: await getTranslation(subSubSection.title),
    }
  }

  /**
   * Function to get a subsection by its ID, with nested subsubsections.
   *
   * @param {string} id - ID of the subsection.
   * @returns {Object} Returns the subsection with nested subsubsections.
   */
  const getSubSection = async (id: string) => {
    const subSection = list.subSections[id]
    return {
      ...subSection,
      title: await getTranslation(subSection.title),
      subSubSections: await Promise.all(subSection.subSubSections.map(getSubSubSection))
    }
  }

  /**
   * Main logic for retrieving sections with nested subsections and subsubsections.
   *
   * @param {Object} section - Section object.
   * @returns {Object} Returns the section with nested subsections.
   */
  const sections = await Promise.all(list.sections.map(async (section) => {
    return {
      ...section,
      title: await getTranslation(section.title),
      subSections: await Promise.all(section.subSections.map(getSubSection))
    }
  }))

  return sections

}

export const article: ArticleType = {
  title: 'Основные инструменты для художественной татуировки',
  prologue: 'Итак, вы решили заняться набивкой художественной татуировки. Дикие методы, вроде струны и пасты из ручки вы, как разумный человек, не рассматриваете, и осознаете, что вам потребуется какой-то минимальный набор оборудования. Что в нем должно быть? Этим задаются все начинающие тату-мастера на заре своей деятельности. Попробуем помочь',
  content: {
    sections: [
      {
        title: 'what is a tattoo machine',
        id: 'what-is-a-tattoo-machine',
        subSections: [
          'induction-tattoo-machine',
          'rotary-tattoo-machine',
          'tattoo-machine-manufacturers'
        ]
      },
      {
        title: 'tattoo grips',
        id: 'tattoo-grips',
        subSections: [
          'reusable-and-disposable-grips',
          'holders-for-cartridges-and-needles'
        ]
      },
      {
        title: 'tattoo tips',
        id: 'tattoo-tips',
        subSections: [
          'types-of-tattoo-tips',
          'how-to-choose-a-tattoo-tip',
        ]
      }
    ],
    subSections: {
      'induction-tattoo-machine': {
        title: 'induction tattoo machine',
        id: 'induction-tattoo-machine',
        subSubSections: ['liner', 'shader']
      },
      'rotary-tattoo-machine': {
        title: 'rotary tattoo machine',
        id: 'rotary-tattoo-machine',
        subSubSections: []
      },
      'tattoo-machine-manufacturers': {
        title: 'tattoo machine manufacturers',
        id: 'tattoo-machine-manufacturers',
        subSubSections: ['for-beginners', 'from-builders', 'for-professionals']
      },
      'reusable-and-disposable-grips': {
        title: 'reusable and disposable grips',
        id: 'reusable-and-disposable-grips',
        subSubSections: ['reusable-grips', 'disposable-grips']
      },
      'holders-for-cartridges-and-needles': {
        title: 'holders for cartridges and needles',
        id: 'holders-for-cartridges-and-needles',
        subSubSections: ['holders-for-classic-needles', 'holders-for-cartridges']
      },
      'types-of-tattoo-tips': {
        title: 'types of tattoo tips',
        id: 'types-of-tattoo-tips',
        subSubSections: [
          'disposable-tattoo-tips',
          'reusable-tattoo-tips'
        ]
      },
      'how-to-choose-a-tattoo-tip': {
        title: 'how to choose a tattoo tip',
        id: 'how-to-choose-a-tattoo-tip',
        subSubSections: []
      }
    },
    subSubSections: {
      'liner': {
        title: 'liner',
        id: 'liner',
      },
      'shader': {
        title: 'shader',
        id: 'shader',
      },
      'for-beginners': {
        title: 'for beginners',
        id: 'for-beginners',
      },
      'from-builders': {
        title: 'from builders',
        id: 'from-builders',
      },
      'for-professionals': {
        title: 'for professionals',
        id: 'for-professionals',
      },
      'reusable-grips': {
        title: 'reusable grips',
        id: 'reusable-grips',
      },
      'disposable-grips': {
        title: 'disposable grips',
        id: 'disposable-grips',
      },
      'holders-for-classic-needles': {
        title: 'holders for classic needles',
        id: 'holders-for-classic-needles',
      },
      'holders-for-cartridges': {
        title: 'holders for cartridges',
        id: 'holders-for-cartridges',
      },
      'disposable-tattoo-tips': {
        title: 'disposable tattoo tips',
        id: 'disposable-tattoo-tips',
      },
      'reusable-tattoo-tips': {
        title: 'reusable tattoo tips',
        id: 'reusable-tattoo-tips',
      },
    }
  },
  paragraphs:  [
    {
      id: '0',
      type: 'title',
      content: 'Що таке тату машинка',
      link: 'what-is-a-tattoo-machine'
    },
    {
      id: '1',
      type: 'paragraph',
      content: 'Основний інструмент тату-майстра, з якого, як правило, починають комплектувати свій перший набір тату-обладнання. Не будемо змінювати цей стереотип і розповімо про машинки.'
    },
    {
      id: '2',
      type: 'paragraph',
      content: 'Машинки за принципом роботи поділяються на індукційні та роторні. Індукційні, своєю чергою, поділяються на лайнери та шейдери.'
    },
    {
      id: '3',
      type: 'paragraph',
      content: 'Тату-машинка — це електричний пристрій, який приводить у рух тату-голку. Незалежно від типу, до тату-машинки висуваються такі вимоги:'
    },
    {
      id: '4',
      type: 'list',
      content: [
        'Мала вага — легкою машинкою зручніше працювати.',
        'Мінімум вібрацій — така машинка дозволяє точніше виконувати малюнки.',
        'Потужність — проколювати шкіру з частотою у кілька десятків ударів за секунду не так просто.',
        'Якісне збирання — тату-машинки зазнають значних навантажень і повинні працювати тривалий час.',
        'Надійність — це не лише стійкість до поломок, а й здатність працювати довго без перегріву та втрати характеристик.',
        'Гарний зовнішній вигляд — це не така незначна деталь, як може здаватися.'
      ]
    },
    {
      id: '5',
      type: 'paragraph',
      content: 'Якщо ви знайомі з механікою та розумієте принципи роботи нескладних механізмів, то бачите, що ці вимоги досить суперечливі. Забезпечити мінімум вібрацій і максимум потужності простіше у пристрої з більшою масою, але працювати важкою машинкою значно складніше.'
    },
    {
      id: '6',
      type: 'paragraph',
      content: 'Сюди ж можна віднести якість збирання та конструкцію загалом — вібрація руйнує всі елементи пристрою. Знайти баланс, який сподобається більшості тату-майстрів, — це мистецтво виробника. А знайти моделі, якими легко, зручно та комфортно працювати, — завдання тату-майстра.'
    },
    {
      id: '7',
      type: 'img',
      content: BlogImg,
      alt: 'Picture of tattoo machine'
    }
  ]
}

export const tattooWorks = [
  Work1,
  Work2,
  Work3,
  Work4,
  Work5,
  Work6,
  Work7
]