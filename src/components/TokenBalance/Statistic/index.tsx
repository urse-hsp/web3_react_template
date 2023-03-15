import React from 'react';
import CountUp from 'react-countup';
import { Statistic, type StatisticProps } from 'antd';
import config from '@/config';

const precision = config.precision;

const formatter: any = (value: number) => (
  <CountUp
    end={value}
    className="custom-count"
    start={0}
    duration={1.5}
    decimals={precision}
    separator="," // 制定千分位的分隔符
    // redraw // 如果为true，则组件将始终在每次重新渲染时进行动画处理。
    // decimal="," // 制定小数字符
    // prefix="EUR " // 动画值前缀
    // suffix=" left"
  />
);

interface StatisticPropsType extends StatisticProps {
  size?: string;
  isFormatter?: boolean;
}

const StatisticView: React.FC<StatisticPropsType> = (props) => {
  const { size = '12px', isFormatter = true } = props;
  return (
    <Statistic
      valueStyle={{ fontSize: size }}
      formatter={isFormatter ? formatter : false}
      precision={precision}
      {...props}
    />
  );
};
export default StatisticView;
