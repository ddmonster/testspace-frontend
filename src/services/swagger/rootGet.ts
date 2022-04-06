// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Root GET / */
export async function root_get(options?: { [key: string]: any }) {
  return request<any>('/', {
    method: 'GET',
    ...(options || {}),
  });
}
