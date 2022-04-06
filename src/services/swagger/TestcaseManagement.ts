// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Get Page Description GET /api/testcase/page/description */
export async function getPageDescriptionApiTestcasePageDescriptionGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPageDescriptionApiTestcasePageDescriptionGetParams,
  options?: { [key: string]: any },
) {
  return request<API.PageDescription>('/api/testcase/page/description', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Get Page GET /api/testcase/page/${param0} */
export async function getPageApiTestcasePage_index_get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPageApiTestcasePage_index_getParams,
  options?: { [key: string]: any },
) {
  const { index: param0, ...queryParams } = params;
  return request<API.TestcaseProps[]>(`/api/testcase/page/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** Create Testcase POST /api/testcase/ */
export async function createTestcaseApiTestcase_post(
  body: API.TestcaseCreate,
  options?: { [key: string]: any },
) {
  return request<API.TestcaseProps>('/api/testcase/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get Testcase GET /api/testcase/${param0} */
export async function getTestcaseApiTestcase_uuid_get(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTestcaseApiTestcase_uuid_getParams,
  options?: { [key: string]: any },
) {
  const { uuid: param0, ...queryParams } = params;
  return request<API.TestcaseProps>(`/api/testcase/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Delete Testcase DELETE /api/testcase/${param0} */
export async function deleteTestcaseApiTestcase_uuid_delete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteTestcaseApiTestcase_uuid_deleteParams,
  options?: { [key: string]: any },
) {
  const { uuid: param0, ...queryParams } = params;
  return request<any>(`/api/testcase/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update Case PATCH /api/testcase/${param0} */
export async function updateCaseApiTestcase_uuid_patch(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateCaseApiTestcase_uuid_patchParams,
  body: API.TestcaseUpdate,
  options?: { [key: string]: any },
) {
  const { uuid: param0, ...queryParams } = params;
  return request<API.TestcaseProps>(`/api/testcase/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
