// import config from '@/config';
// const URL = config.BASE_URL;

export type dataType<T> = Record<string, T>;
export type methodType = 'POST' | 'GET';
export interface urlProps {
  url: string;
  method: methodType;
}

const data: dataType<urlProps> = {
  demo: {
    url: 'https://defiprime.com/defiprime.tokenlist.json',
    method: 'GET',
  },
};
export default data;
