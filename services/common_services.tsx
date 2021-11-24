import { CONFIG } from '../constants/index';

export const getUser = () => {
  const jsonValue = localStorage.user;
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

export const setUser = (userData) => {
  localStorage.user = JSON.stringify(userData)
};

export const setConfig = (data) => {
  localStorage.config = JSON.stringify(data)
}

export const getConfig = () => {
  const jsonValue = window.localStorage.config;
  return jsonValue != null ? JSON.parse(jsonValue) : null;
}

export const checkDomain = (email) => {
  for (let i = 0; i < getConfig()?.allowed_domains?.length; i++) {
    if (email.split('@')[1] === getConfig()?.allowed_domains[i]) {
      return true
    }
  }

  return false
}

export const getOrgId = (domain) => {

  var list = getConfig()?.domain_details?.filter(data => data.domain.toLowerCase() === domain)
  if (list.length > 0) {
    return list[0].org_id
  }
}

export const getGpName = (domain) => {
  var list = getConfig()?.domain_details?.filter(data => data.domain.toLowerCase() === domain)
  console.log(list)
  if (list?.length > 0) {
    return list[0].gp_name
  }
}

export const getFormatedCurrency = (amount) => {
    if (amount > 999 && amount < 1000000)
        return (amount / 1000).toFixed(0) + 'K';
    else if (amount > 1000000)
        return (amount / 1000000).toFixed(0) + 'M';
    else
        return amount;
}

export const CURRENCY_SYMBOLS = {
    USD: '$', // US Dollar
    EUR: '€', // Euro
    CRC: '₡', // Costa Rican Colón
    GBP: '£', // British Pound Sterling
    ILS: '₪', // Israeli New Sheqel
    INR: '₹', // Indian Rupee
    JPY: '¥', // Japanese Yen
    KRW: '₩', // South Korean Won
    NGN: '₦', // Nigerian Naira
    PHP: '₱', // Philippine Peso
    PLN: 'zł', // Polish Zloty
    PYG: '₲', // Paraguayan Guarani
    THB: '฿', // Thai Baht
    UAH: '₴', // Ukrainian Hryvnia
    VND: '₫', // Vietnamese Dong
    SEK: 'kr' // Swedish krona
};

export const getFormattedTimeString = (time) => {
    let timeString = time;
    const H = +timeString.substr(0, 2);
    const h = (H % 12) || 12;
    const ampm = H < 12 ? ' AM' : ' PM';
    timeString = h + timeString.substr(2, 3) + ampm;
    return timeString;
}
export const filterDateParams = {
    comparator: function (filterLocalDateAtMidnight, cellValue) {
        const dateAsString = cellValue;
        if (dateAsString == null) return -1;
        const dateParts = dateAsString.split('/');
        const cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
        );
        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime())
            return 0;
        if (cellDate < filterLocalDateAtMidnight)
            return -1;
        if (cellDate > filterLocalDateAtMidnight)
            return 1;
    },
    browserDatePicker: true,
    minValidYear: 2000
};

export const currencyFormatter = (currency, symbol) => {
    if (currency) {
        const sansDec = roundOffDecimal(currency).toString();
        const formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const sign = CURRENCY_SYMBOLS[symbol] || '';
        return sign + `${formatted}`;
    }
}
export const roundOffDecimal = (num) => {
    if (num) {
        const m = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(num);
    }
}
export const signFormatter = (number, symbol) => {
    if (number) {
        const sansDec = roundOffDecimal(number).toString();
        return sansDec + symbol;
    }
}