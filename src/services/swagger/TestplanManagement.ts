// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Get Page Description GET /api/testplan/page/description */
export async function getPageDescriptionApiTestplanPageDescriptionGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPageDescriptionApiTestplanPageDescriptionGetParams,
  options?: { [key: string]: any },
) {
  return request<API.PageDescription>('/api/testplan/page/description', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Get Page GET /api/testplan/page/${param0} */
export async function getPageApiTestplanPage_index_get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPageApiTestplanPage_index_getParams,
  options?: { [key: string]: any },
) {
  const { index: param0, ...queryParams } = params;
  return request<API.TestPlanProps[]>(`/api/testplan/page/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** Create Testplan POST /api/testplan/ */
export async function createTestplanApiTestplan_post(
  body: API.TestPlanCreate,
  options?: { [key: string]: any },
) {
  return request<API.TestPlanProps>('/api/testplan/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get Testplan GET /api/testplan/${param0} */
export async function getTestplanApiTestplan_uuid_get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTestplanApiTestplan_uuid_getParams,
  options?: { [key: string]: any },
) {
  const { uuid: param0, ...queryParams } = params;
  return request<API.TestPlanProps>(`/api/testplan/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Delete Testplan DELETE /api/testplan/${param0} */
export async function deleteTestplanApiTestplan_uuid_delete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteTestplanApiTestplan_uuid_deleteParams,
  options?: { [key: string]: any },
) {
  const { uuid: param0, ...queryParams } = params;
  return request<any>(`/api/testplan/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update Testplan PATCH /api/testplan/${param0} */
export async function updateTestplanApiTestplan_uuid_patch(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateTestplanApiTestplan_uuid_patchParams,
  body: API.TestPlanUpdate,
  options?: { [key: string]: any },
) {
  const { uuid: param0, ...queryParams } = params;
  return request<API.TestPlanProps>(`/api/testplan/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Get Cache GET /api/testplan/cache/${param0} */
export async function getCacheApiTestplanCache_key_get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCacheApiTestplanCache_key_getParams,
  options?: { [key: string]: any },
) {
  const { key: param0, ...queryParams } = params;
  return request<any>(`/api/testplan/cache/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Create Key POST /api/testplan/cache/${param0} */
export async function createKeyApiTestplanCache_key_post(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.createKeyApiTestplanCache_key_postParams,
  options?: { [key: string]: any },
) {
  const { key: param0, ...queryParams } = params;
  return request<any>(`/api/testplan/cache/${param0}`, {
    method: 'POST',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}
