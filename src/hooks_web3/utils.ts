import { ethers, type Contract } from 'ethers';
import { type BigNumber } from 'bignumber.js';
import { BigNumber as BigNumberJs } from 'bignumber.js';

import config from '@/config';

// 判断地址是否正确
export function isAddress(value: any, isAddress = true): string | false {
  try {
    if (isAddress) {
      return ethers.utils.getAddress(value);
    } else {
      return ethers.utils.getContractAddress(value);
    }
  } catch {
    return false;
  }
}

const ETHERSCAN_PREFIXES: Record<number, string> = {
  1230: 'scan.fibochain.org',
};

export function getEthScanPath(
  chainId: number,
  data: string,
  type: 'transaction' | 'token' | 'address',
): string {
  const prefix = `https://${
    ETHERSCAN_PREFIXES[chainId] || ETHERSCAN_PREFIXES[config.CHAIN_ID]
  }`;
  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'token': {
      return `${prefix}/token/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}
export function address_formatter(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function hash_formatter(hash: string) {
  if (hash.length <= 12) return hash;
  return `${hash.slice(0, 8)}...${hash.slice(-4)}`;
}

export const digitalPrecision = (
  num: string | number,
  decimals: number,
  isDiv?: boolean, // 默认乘
) => {
  // 除法。 高精度小数转换阿拉伯数字
  if (!num) {
    return '';
  }
  if (isDiv) {
    return BigNumberJs(num.toString())
      .div(Math.pow(10, decimals))
      .toFixed(config.precision)
      .toString();
  } else {
    // 默认转高精度小数
    return BigNumberJs(num.toString()).times(Math.pow(10, decimals)).toFixed();
  }
};

// 处理对象BigNumber数据
export const analysisBigNumber = (
  data = {},
  fn = (e: any) => {
    return e;
  },
) => {
  return Object.entries(data)
    .map((item: any) => ({
      [item[0]]: fn(item[1].toString()),
    }))
    .reduce(
      (acc: any, cur: any) => ({
        ...acc,
        ...cur,
      }),
      {},
    );
};

// interface Result extends ReadonlyArray<any> {
//    readonly [key: string]: any;
// }
type dataType = Record<string, any>;
export type MethodArg = dataType | string | number | BigNumber;
export interface ReturnState {
  readonly value: any; // MethodArg | undefined;
  readonly loading: boolean;
  readonly error: boolean;
  [key: string]: any;
}

const INVALID_CALL_STATE: ReturnState = {
  value: undefined,
  loading: false,
  error: false,
};
// 状态
export function toReturnState(
  value: MethodArg | undefined = undefined,
  methodName?: string,
): ReturnState {
  if (!value) return INVALID_CALL_STATE;

  const obj_data = Object.entries(value)
    .map((item) => item[1])
    .some((item) => (item ?? '') !== ''); // (item ?? '') !== '' // 判断是否是对象，并且属性是否有值[兼容字符串等]

  if (value) {
    const data: ReturnState = {
      loading: obj_data,
      error: false,
      value: ethers.BigNumber.isBigNumber(value) ? value.toString() : value,
    };
    if (methodName) {
      data[methodName] = data.value;
    }
    return data;
  }

  return {
    ...INVALID_CALL_STATE,
    error: true,
  };
}
