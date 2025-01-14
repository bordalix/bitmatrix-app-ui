import { toaster } from 'rsuite';
import { CustomNotify } from '../CustomNotify/CustomNotify';
import { MessageType } from 'rsuite/esm/Notification/Notification';
import { PlacementType } from 'rsuite/esm/toaster/ToastContainer';
import { ChartData } from '../AreaChart/AreaChart';
import { BmChart, Pool } from '@bitmatrix/models';
import { PREFERRED_UNIT_VALUE } from '../../enum/PREFERRED_UNIT_VALUE';
import ArrowUpIcon from '../base/Svg/Icons/ArrowUp';
import ArrowDownIcon from '../base/Svg/Icons/ArrowDown';

export const notify = (
  content: JSX.Element | string,
  header?: string,
  type?: MessageType,
  placement: PlacementType = 'topEnd',
  duration = 10000,
): any => {
  toaster.push(
    <CustomNotify header={header} type={type}>
      {content}
    </CustomNotify>,
    { placement },
  );

  setTimeout(() => {
    toaster.clear();
  }, duration);
};

export const groupBydailyPrice = (chartData: BmChart[]): ChartData[] => {
  if (chartData.length === 0) return [{ date: '', close: 0 }];

  const res = chartData.map((d) => {
    const datetime = new Date(d.time * 1000);
    const date =
      datetime.getUTCFullYear() +
      '-' +
      (datetime.getUTCMonth() + 1).toString().padStart(2, '0') +
      '-' +
      datetime.getUTCDate().toString().padStart(2, '0');
    return { price: d.price, date };
  });

  const result = [];

  let currentDate = res[0].date;
  let lastPrice = res[0].price;

  for (let i = 1; i < res.length; i++) {
    const r = res[i];

    if (currentDate === r.date) {
      lastPrice = r.price;
    } else {
      result.push({ date: res[i - 1].date, close: Math.floor(lastPrice) });
      currentDate = r.date;
    }
  }

  result.push({ date: res[res.length - 1].date, close: Math.floor(lastPrice) });
  return result;
};

export const groupByDailyTvl = (chartData: BmChart[]): ChartData[] => {
  if (chartData.length === 0) return [{ date: '', close: 0 }];

  const res = chartData.map((d) => {
    const datetime = new Date(d.time * 1000);
    const date =
      datetime.getUTCFullYear() +
      '-' +
      (datetime.getUTCMonth() + 1).toString().padStart(2, '0') +
      '-' +
      datetime.getUTCDate().toString().padStart(2, '0');
    return { close: Math.floor(d.value.token / PREFERRED_UNIT_VALUE.LBTC), date };
  });

  const result = [];

  let currentDate = res[0].date;
  let cumclose = res[0].close;
  let j = 1;

  for (let i = 1; i < res.length; i++) {
    const r = res[i];

    if (currentDate === r.date) {
      cumclose += r.close;
      j++;
    } else {
      result.push({ date: res[i - 1].date, close: Math.floor(cumclose / j) * 2 });

      currentDate = r.date;
      cumclose = r.close;
      j = 1;
    }
  }

  result.push({ date: res[res.length - 1].date, close: Math.floor(cumclose / j) * 2 });

  return result;
};

export const groupBydailyVolume = (chartData: BmChart[]): ChartData[] => {
  if (chartData.length === 0) return [{ date: '', close: 0 }];

  const res = chartData.map((d) => {
    const datetime = new Date(d.time * 1000);
    const date =
      datetime.getUTCFullYear() +
      '-' +
      (datetime.getUTCMonth() + 1).toString().padStart(2, '0') +
      '-' +
      datetime.getUTCDate().toString().padStart(2, '0');
    return { volume: Math.floor(d.volume.token / PREFERRED_UNIT_VALUE.LBTC), date };
  });

  const result = [];

  let currentDate = res[0].date;
  let totalVolume = res[0].volume;

  for (let i = 1; i < res.length; i++) {
    const r = res[i];

    if (currentDate === r.date) {
      totalVolume += r.volume;
    } else {
      result.push({ date: res[i - 1].date, close: totalVolume });

      currentDate = r.date;
      totalVolume = r.volume;
    }
  }

  result.push({ date: res[res.length - 1].date, close: totalVolume });
  return result;
};

export const calculateChartData = (chartData: BmChart[], pool: Pool): any => {
  const allPriceData = groupBydailyPrice(chartData);
  const allVolumeData = groupBydailyVolume(chartData);
  const allTvlData = groupByDailyTvl(chartData);
  const allFeeData = groupBydailyVolume(chartData).map((d) => ({ ...d, close: d.close / 500 }));

  // live current time data
  const todayVolumeData = allVolumeData[allVolumeData.length - 1];
  const todayFeeData = allFeeData[allFeeData.length - 1];
  const todayTvlData = (Number(pool.token.value) * 2) / PREFERRED_UNIT_VALUE.LBTC;
  const todayPrice = Number(pool.token.value) / Number(pool.quote.value);

  // previous data
  let previousVolumeData: ChartData = { date: '', close: 0 };
  let previousFeeData: ChartData = { date: '', close: 0 };
  let previousTvlData: ChartData = { date: '', close: 0 };
  let previousPriceData: ChartData = { date: '', close: 0 };

  let volumeRate = {
    value: '0',
    direction: 'up',
    icon: <ArrowUpIcon />,
  };
  let feeRate = {
    value: '0',
    direction: 'up',
    icon: <ArrowUpIcon />,
  };
  let tvlRate = {
    value: '0',
    direction: 'up',
    icon: <ArrowUpIcon />,
  };
  let priceRate = {
    value: '0',
    direction: 'up',
    icon: <ArrowUpIcon />,
  };

  if (allPriceData.length > 2) {
    previousPriceData = allPriceData[allPriceData.length - 2];
    priceRate = {
      value: (todayPrice / previousPriceData.close).toFixed(2),
      direction: todayPrice > previousPriceData.close ? 'up' : 'down',
      icon: todayPrice > previousPriceData.close ? <ArrowUpIcon /> : <ArrowDownIcon />,
    };
  }

  if (allVolumeData.length > 2) {
    previousVolumeData = allVolumeData[allVolumeData.length - 2];

    volumeRate = {
      value: (todayVolumeData.close / previousVolumeData.close).toFixed(2),
      direction: todayVolumeData.close > previousVolumeData.close ? 'up' : 'down',
      icon: todayVolumeData.close > previousVolumeData.close ? <ArrowUpIcon /> : <ArrowDownIcon />,
    };
  }

  if (allFeeData.length > 2) {
    previousFeeData = allFeeData[allFeeData.length - 2];

    feeRate = {
      value: (todayFeeData.close / previousFeeData.close).toFixed(2),
      direction: todayFeeData.close > previousFeeData.close ? 'up' : 'down',
      icon: todayFeeData.close > previousFeeData.close ? <ArrowUpIcon /> : <ArrowDownIcon />,
    };
  }

  if (allTvlData.length > 2) {
    previousTvlData = allTvlData[allTvlData.length - 2];
    tvlRate = {
      value: (todayTvlData / previousTvlData.close).toFixed(2),
      direction: todayTvlData > previousTvlData.close ? 'up' : 'down',
      icon: todayTvlData > previousTvlData.close ? <ArrowUpIcon /> : <ArrowDownIcon />,
    };
  }

  return {
    allPriceData,
    allVolumeData,
    allTvlData,
    allFeeData,
    todayVolumeData,
    todayFeeData,
    todayTvlData,
    todayPrice,
    volumeRate,
    feeRate,
    tvlRate,
    priceRate,
  };
};
