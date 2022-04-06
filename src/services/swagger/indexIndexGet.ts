// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Index GET /index */
export async function indexIndexGet(options?: { [key: string]: any }) {
  return request<string>('/index', {
    method: 'GET',
    ...(options || {}),
  });
}
