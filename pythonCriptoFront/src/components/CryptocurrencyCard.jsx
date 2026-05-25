import { Card } from 'antd';

function CryptocurrencyCard(props) {

    const { currency } = props;
    const price = currency.quote.USD.price
    const volume_change_24h = currency.quote.USD.volume_change_24h
    const market_cap = currency.quote.USD.market_cap;
    const formatMarketCap = (cap) => {
        if (!cap) return 'N/A';
        if (cap >= 1e12) return (cap / 1e12).toFixed(2).replace('.', ',') + 'T';
        if (cap >= 1e9) return (cap / 1e9).toFixed(2).replace('.', ',') + 'B';
        if (cap >= 1e6) return (cap / 1e6).toFixed(2).replace('.', ',') + 'M';
        return cap.toLocaleString('en-US');
    };
    const formatPrice = (price) => {
        if (!price && price !== 0) return 'N/A';
        if (price === 0) return '0';
        if (price < 0.000001) return price.toExponential(6);
        if (price < 0.0001) return price.toFixed(10);
        if (price < 0.01) return price.toFixed(8);
        if (price < 1) return price.toFixed(6);
        if (price < 1000) return price.toFixed(4);
        return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    const iconUrl = `https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`;
    console.log("Полученные данные:", currency);
  return (
    <div>
      <Card
        title={
          <div className="flex items-center gap-3 mt-3 mb-4">
            <img className="w-12 h-12" src={iconUrl}/>
            <span className="font-bold text-2xl">{currency.name}</span>
          </div>
        }
        style={{
          width: 600, height: 270
        }}
      >
        <p className="font-medium text-2xl mb-3 mt-2 ml-2" >Текущая цена: {formatPrice(price)}$</p>
          <p className="font-medium text-2xl mb-3 ml-2">
              Изменение цены за 24 часа:{' '}
              <span className={volume_change_24h >= 0 ? 'text-green-500' : 'text-red-500'}>
    {volume_change_24h > 0 ? '+' : ''}{volume_change_24h.toFixed(2)}%
  </span>
          </p>
        <p className="font-medium text-2xl mb-4 ml-2">Текущая капитализация: %{formatMarketCap(market_cap)}</p>
    </Card>
    </div>
  )
}

export default CryptocurrencyCard