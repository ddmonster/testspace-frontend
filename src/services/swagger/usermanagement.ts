// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Get Page Description GET /api/user/page/description */
export async function getPageDescriptionApiUserPageDescriptionGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPageDescriptionApiUserPageDescriptionGetParams,
  options?: { [key: string]: any },
) {
  return request<API.PageDescription>('/api/user/page/description', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Get Page GET /api/user/page/${param0} */
export async function getPageApiUserPage_index_get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPageApiUserPage_index_getParams,
  options?: { [key: string]: any },
) {
  const { index: param0, ...queryParams } = params;
  return request<API.UserProps[]>(`/api/user/page/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** Create User POST /api/user/ */
export async function createUserApiUser_post(
  body: API.CreateUser,
  options?: { [key: string]: any },
) {
  return request<any>('/api/user/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Read Current User return current login user  GET /api/user/me */
export async function readCurrentUserApiUserMeGet(options?: { [key: string]: any }) {
  return request<API.UserProps>('/api/user/me', {
    method: 'GET',
    ...(options || {}),
  });
}
