import { cocoGothic, cormorantGaramond, nunito } from '@/styles/fonts';
import { ContentWrapper } from '../components/content-wrapper/content-wrapper';
import './pricing.css';

export default function Pricing() {
  const manicure = [
    {
      label: 'Manicure donna | uomo',
      price: '25 CHF'
    },
    {
      label: 'Semipermanente',
      price: '50 CHF'
    },
    {
      label: 'Rinforzo',
      subLabel: 'Lunghezza S|M',
      price: '65 | 75 CHF'
    },
    {
      label: 'Ricostruzione unghie acrilico | gel',
      subLabel: 'Lunghezza S|M|L',
      price: '110 | 125 | 135 CHF'
    },
    {
      label: 'Refill gel',
      price: '75 - 85 CHF'
    },
    {
      label: 'Paraffina idratante',
      price: '40 CHF'
    },
    {
      label: 'Spa | coccole',
      price: '40 CHF'
    },
  ]
  const pedicure = [
    {
      label: 'Pedicure estetico donna | uomo',
      price: '45 CHF'
    },
    {
      label: 'Semipermanente',
      price: '55 CHF'
    },
    {
      label: 'Semipermanente + Paraffina idratante',
      price: '75 CHF'
    },
    {
      label: 'Paraffina idratante',
      price: '45 CHF'
    },
  ]
  return (
    <ContentWrapper className={`pricing ${cormorantGaramond.className}`}>
      <h1 className="pricing__title">Prezzi</h1>
      <div className="pricing__sub-title">Manibelle</div>
      <div className="pricing-section">
        <div className="pricing-section__title">
          <p className='primary-title'>Mani</p>
          <p className='secondary-title'>Entro 4 settimane (5 settimane + 10 CHF)</p>
        </div>
        {manicure.map(item => (
          <div key={item.label} className={`pricing-section__row ${!item.subLabel ? 'flex' : ''}`}>
            <p className={`label ${cocoGothic.className}`}>{item.label}</p>
            {item.subLabel && (
              <div className="sub-label-row">
                <p className={`sub-label ${cocoGothic.className}`}>{item.subLabel}</p>
                <p className="price">{item.price}</p>
              </div>
            )}
            {!item.subLabel && <p className="price">{item.price}</p>}
          </div>
        ))}
      </div>
      <div className="pricing-section">
        <div className="pricing-section__title">
          <p className='primary-title'>Piedi</p>
        </div>
        {pedicure.map(item => (
          <div key={item.label} className="pricing-section__row">
            <p className={`label ${cocoGothic.className}`}>{item.label}</p>
            <p className="price">{item.price}</p>
          </div>
        ))}
      </div>
      <div className="pricing-section">
        <div className="pricing-section__title">
          <p className='primary-title'>Rimozione</p>
        </div>
          <div className="pricing-section__row">
            <p className={`label ${cocoGothic.className}`}>Rimozione <span className='lowercase'>tutti i tipi di materiale</span></p>
            <div className="sub-label-row">
              <p className={`sub-label ${cocoGothic.className}`}>Mani | Piedi</p>
              <p className="price">25 CHF</p>
            </div>
          </div>
      </div>
    </ContentWrapper>
  )
}
