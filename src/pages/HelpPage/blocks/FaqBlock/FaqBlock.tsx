import cls from './FaqBlock.module.scss'
import { useTranslation } from 'react-i18next'
import { Accordion } from '@/shared/ui'

interface FaqGroup {
  label: string
  items: { q: string; a: string }[]
}

export const FaqBlock = () => {
  const { t } = useTranslation()

  const groups: FaqGroup[] = [
    {
      label: t('help_page.faq_group_delivery'),
      items: [
        { q: t('help_page.faq_d1_q'), a: t('help_page.faq_d1_a') },
        { q: t('help_page.faq_d2_q'), a: t('help_page.faq_d2_a') },
        { q: t('help_page.faq_d3_q'), a: t('help_page.faq_d3_a') },
      ],
    },
    {
      label: t('help_page.faq_group_payment'),
      items: [
        { q: t('help_page.faq_p1_q'), a: t('help_page.faq_p1_a') },
        { q: t('help_page.faq_p2_q'), a: t('help_page.faq_p2_a') },
        { q: t('help_page.faq_p3_q'), a: t('help_page.faq_p3_a') },
      ],
    },
    {
      label: t('help_page.faq_group_warranty'),
      items: [
        { q: t('help_page.faq_w1_q'), a: t('help_page.faq_w1_a') },
        { q: t('help_page.faq_w2_q'), a: t('help_page.faq_w2_a') },
        { q: t('help_page.faq_w3_q'), a: t('help_page.faq_w3_a') },
      ],
    },
    {
      label: t('help_page.faq_group_order'),
      items: [
        { q: t('help_page.faq_o1_q'), a: t('help_page.faq_o1_a') },
        { q: t('help_page.faq_o2_q'), a: t('help_page.faq_o2_a') },
      ],
    },
  ]

  return (
    <section className={cls.faq}>
      <div className="container">
        <h4 className="blockTitle">{t('help_page.faq_title')}</h4>
        {groups.map((group) => (
          <div key={group.label}>
            <p className={cls.groupTitle}>{group.label}</p>
            <div className={cls.list}>
              {group.items.map((item) => (
                <Accordion
                  key={item.q}
                  title={item.q}
                  className={cls.item}
                  initialOpen={true}
                >
                  <p className={cls.answer}>{item.a}</p>
                </Accordion>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
