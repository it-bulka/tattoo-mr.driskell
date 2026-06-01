import { WayForPayFormData } from '@/entities/Order'

const WAYFORPAY_URL = 'https://secure.wayforpay.com/pay'

export const submitWayForPayForm = (data: WayForPayFormData): void => {
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = WAYFORPAY_URL
  form.style.display = 'none'

  const appendField = (name: string, value: string | number) => {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = name
    input.value = String(value)
    form.appendChild(input)
  }

  const appendArrayField = (name: string, values: (string | number)[]) => {
    values.forEach((value) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = name
      input.value = String(value)
      form.appendChild(input)
    })
  }

  appendField('merchantAccount', data.merchantAccount)
  appendField('merchantDomainName', data.merchantDomainName)
  appendField('orderReference', data.orderReference)
  appendField('orderDate', data.orderDate)
  appendField('amount', data.amount)
  appendField('currency', data.currency)
  appendArrayField('productName[]', data.productName)
  appendArrayField('productCount[]', data.productCount)
  appendArrayField('productPrice[]', data.productPrice)
  appendField('merchantSignature', data.merchantSignature)
  appendField('serviceUrl', data.serviceUrl)
  appendField('returnUrl', data.returnUrl)
  appendField('language', data.language)
  appendField('paymentSystems', data.paymentSystems)

  document.body.appendChild(form)
  form.submit()
}
