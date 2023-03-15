/* eslint-disable @typescript-eslint/restrict-template-expressions */
import useSWR, { State } from 'swr';
import useSWRMutation, { type SWRMutationResponse } from 'swr/mutation';
import config from '@/config';
import { type urlProps, type dataType, type methodType } from '@/utils/apiList';
import listy from '@/utils/apiList';
const BASE_URL: string = config.BASE_URL;

interface fetcherDataProps extends urlProps {
  data: dataType<any>;
}

// export const fetcher: any = async (...args: any[]) => {
export const fetcher: any = async (args: fetcherDataProps) => {
  let path: string = args.url;
  const params: any = args.data;
  // fetch请求参数
  const fetchOption: dataType<any> = {
    method: args.method,
    // mode: 'cors', // 跨域
    // redirect: 'follow',
    // headers: new Headers({
    //   'Content-Type': 'text/plain',
    // }),
  };

  // // 处理请求方式
  if (fetchOption.method.toLowerCase() === 'get' && params) {
    // get方法将参数拼接在url后面
    const values: any = Object.values(params);
    const keys = Object.keys(params);
    const arr = [];
    for (let i = 0; i < values.length; i++) {
      arr.push(`${keys[i]}=${values[i]}`);
    }
    const str = arr.join('&');
    path += `?${str}`;
  } else if (fetchOption.method.toLowerCase() === 'post' && params) {
    // post请求将参数转为JSON字符串传给body
    fetchOption.body = JSON.stringify(params);
  }
  return await fetch(`${BASE_URL}${path}`, fetchOption).then(
    async (res) => await res.json(),
  );
};

interface useGetRequestProps<Data = any, Error = any> {
  data?: Data;
  error?: Error;
  isValidating?: boolean;
  loading?: boolean;
  // data: 通过 fetcher 用给定的 key 获取的数据（如未完全加载，返回 undefined）
  // error: fetcher 抛出的错误（或者是 undefined）
  // isLoading: 是否有一个正在进行中的请求且当前没有“已加载的数据“。预设数据及之前的数据不会被视为“已加载的数据“
  // isValidating: 是否有请求或重新验证加载
  // mutate(data?, options?): 更改缓存数据的函数 （详情）
}
export function useGetRequest(url: string): useGetRequestProps {
  const { data, error, isLoading, isValidating } = useSWR(url, (url) =>
    fetcher({ ...listy.demo }),
  );
  return {
    data,
    loading: isLoading,
    error,
    isValidating,
  };
}

interface useTriggerRequestProps extends SWRMutationResponse {
  // data：从 fetcher 返回给定 key 的数据
  // error：fetcher 中抛出的错误（或 undefined）
  // trigger(arg, options)：一个用于触发远程数据更改的函数
  // reset：一个用于重置状态的函数（ data, error, isMutating ）
  // isMutating：有一个正在进行中的远程数据变更
}
export function useTriggerRequest(url: string): useTriggerRequestProps {
  const { data, error, trigger, reset, isMutating } = useSWRMutation(
    url,
    fetcher,
  );
  return {
    data,
    error,
    trigger,
    reset,
    isMutating,
  };
}
