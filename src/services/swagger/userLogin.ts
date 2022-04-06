// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Login POST /login */
export async function loginLoginPost(body: API.LoginArgs, options?: { [key: string]: any }) {
  return request<API.Token>('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
