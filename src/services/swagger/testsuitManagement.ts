// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Get Page Description GET /api/testsuit/page/description */
export async function getPageDescriptionApiTestsuitPageDescriptionGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPageDescriptionApiTestsuitPageDescriptionGetParams,
  options?: { [key: string]: any },
) {
  return request<API.PageDescription>('/api/testsuit/page/description', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Get Page GET /api/testsuit/page/${param0} */
export async function getPageApiTestsuitPage_index_get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPageApiTestsuitPage_index_getParams,
  options?: { [key: string]: any },
) {
  const { index: param0, ...queryParams } = params;
  return request<API.TestSuitProps[]>(`/api/testsuit/page/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** Create Testsuit POST /api/testsuit/ */
export async function createTestsuitApiTestsuit_post(
  body: API.TestSuitCreate,
  options?: { [key: string]: any },
) {
  return request<API.TestSuitProps>('/api/testsuit/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get Testsuit GET /api/testsuit/${param0} */
export async function getTestsuitApiTestsuit_uuid_get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTestsuitApiTestsuit_uuid_getParams,
  options?: { [key: string]: any },
) {
  const { uuid: param0, ...queryParams } = params;
  return request<API.TestSuitProps>(`/api/testsuit/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Delete Testsuit DELETE /api/testsuit/${param0} */
export async function deleteTestsuitApiTestsuit_uuid_delete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteTestsuitApiTestsuit_uuid_deleteParams,
  options?: { [key: string]: any },
) {
  const { uuid: param0, ...queryParams } = params;
  return request<any>(`/api/testsuit/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update Testsuit PATCH /api/testsuit/${param0} */
export async function updateTestsuitApiTestsuit_uuid_patch(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateTestsuitApiTestsuit_uuid_patchParams,
  body: API.TestSuitUpdate,
  options?: { [key: string]: any },
) {
  const { uuid: param0, ...queryParams } = params;
  return request<API.TestSuitProps>(`/api/testsuit/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
