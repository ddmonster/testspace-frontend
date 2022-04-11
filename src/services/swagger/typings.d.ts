declare namespace API {
  type CreateUser = {
    /** Username */
    username: string;
    /** Accountname */
    accountname: string;
    /** Email */
    email: string;
    /** Password */
    password: string;
    /** Admin */
    admin?: boolean;
    /** Avatar */
    avatar?: string;
  };

  type HTTPValidationError = {
    /** Detail */
    detail?: ValidationError[];
  };

  type LoginArgs = {
    /** Account */
    account: string;
    /** Password */
    password: string;
    /** Login Type */
    login_type: string;
  };

  type PageDescription = {
    /** Total Items */
    total_items: number;
    /** Page Size */
    page_size: number;
    /** Max Index */
    max_index: number;
  };

  type Steps = {
    /** Type */
    type: string;
    /** Action */
    action: string;
  };

  type TestPlanCreate = {
    /** Name */
    name: string;
    /** Description */
    description?: string;
    /** Create By */
    create_by?: string;
    /** Enums */
    enums?: Record<string, any>;
    /** Labels */
    labels?: string[];
  };

  type TestPlanProps = {
    /** Uuid */
    uuid: string;
    /** Created At */
    created_at: string;
    /** Updated At */
    updated_at: string;
    /** Update By */
    update_by?: string;
    /** Create By */
    create_by?: string;
    /** Name */
    name: string;
    /** Description */
    description: string;
    /** Enums */
    enums: Record<string, any>;
    /** Labels */
    labels: string[];
    /** Testsuits */
    testsuits?: TestSuitProps[];
  };

  type TestPlanUpdate = {
    /** Name */
    name?: string;
    /** Description */
    description?: string;
    /** Update By */
    update_by?: string;
    /** Enums */
    enums?: Record<string, any>;
    /** Labels */
    labels?: string[];
  };

  type TestSuitCreate = {
    /** Name */
    name: string;
    /** Description */
    description: string;
    /** Enums */
    enums?: Record<string, any>;
    /** Create By */
    create_by?: string;
    /** Testplans */
    testplans: string[];
    /** Labels */
    labels?: string[];
  };

  type TestSuitProps = {
    /** Uuid */
    uuid: string;
    /** Created At */
    created_at: string;
    /** Updated At */
    updated_at: string;
    /** Update By */
    update_by?: string;
    /** Create By */
    create_by?: string;
    /** Name */
    name: string;
    /** Description */
    description: string;
    /** Enums */
    enums: Record<string, any>;
    /** Testplans */
    testplans: string[];
    /** Labels */
    labels: string[];
  };

  type TestSuitUpdate = {
    /** Uuid */
    uuid?: string;
    /** Update By */
    update_by?: string;
    /** Name */
    name?: string;
    /** Description */
    description?: string;
    /** Enums */
    enums?: Record<string, any>;
    /** Testplans */
    testplans?: string[];
    /** Labels */
    labels?: string[];
  };

  type TestcaseCreate = {
    /** Name */
    name: string;
    /** Create By */
    create_by?: string;
    /** Update By */
    update_by?: string;
    /** Precondition */
    precondition?: string[];
    /** Steps */
    steps?: Steps[];
    /** Affect */
    affect?: string[];
    /** Component */
    component?: string[];
    /** Suites */
    suites?: string[];
    /** Labels */
    labels?: string[];
  };

  type TestcaseProps = {
    /** Uuid */
    uuid: string;
    /** Created At */
    created_at: string;
    /** Updated At */
    updated_at: string;
    /** Update By */
    update_by?: string;
    /** Create By */
    create_by?: string;
    /** Name */
    name: string;
    /** Precondition */
    precondition: string[];
    /** Steps */
    steps: Steps[];
    /** Affect */
    affect: string[];
    /** Component */
    component: string[];
    /** Suites */
    suites: string[];
    /** Labels */
    labels: string[];
    /** Deleted */
    deleted: boolean;
  };

  type TestcaseUpdate = {
    /** Uuid */
    uuid?: string;
    /** Name */
    name?: string;
    /** Update By */
    update_by?: string;
    /** Precondition */
    precondition?: string[];
    /** Steps */
    steps?: Steps[];
    /** Affect */
    affect?: string[];
    /** Component */
    component?: string[];
    /** Suites */
    suites?: string[];
    /** Labels */
    labels?: string[];
    /** Deleted */
    deleted?: boolean;
  };

  type Token = {
    /** Access Token */
    access_token: string;
    /** Token Type */
    token_type: string;
  };

  type UserProps = {
    /** Uuid */
    uuid: string;
    /** Created At */
    created_at: string;
    /** Updated At */
    updated_at: string;
    /** Update By */
    update_by?: string;
    /** Create By */
    create_by?: string;
    /** Username */
    username: string;
    /** Accountname */
    accountname: string;
    /** Email */
    email: string;
    /** Active */
    active: boolean;
    /** Admin */
    admin: boolean;
    /** Avatar */
    avatar: string;
  };

  type ValidationError = {
    /** Location */
    loc: string[];
    /** Message */
    msg: string;
    /** Error Type */
    type: string;
  };

  type getPageDescriptionApiTestcasePageDescriptionGetParams = {
    page_size?: number;
  };

  type getPageApiTestcasePage_index_getParams = {
    index: number;
    page_size?: number;
  };

  type getTestcaseApiTestcase_uuid_getParams = {
    uuid: string;
  };

  type deleteTestcaseApiTestcase_uuid_deleteParams = {
    uuid: string;
  };

  type updateCaseApiTestcase_uuid_patchParams = {
    uuid: string;
  };

  type getPageDescriptionApiTestplanPageDescriptionGetParams = {
    page_size?: number;
  };

  type getPageApiTestplanPage_index_getParams = {
    index: number;
    page_size?: number;
  };

  type getTestplanApiTestplan_uuid_getParams = {
    uuid: string;
    details?: boolean;
  };

  type deleteTestplanApiTestplan_uuid_deleteParams = {
    uuid: string;
  };

  type updateTestplanApiTestplan_uuid_patchParams = {
    uuid: string;
  };

  type getCacheApiTestplanCache_key_getParams = {
    key: string;
  };

  type createKeyApiTestplanCache_key_postParams = {
    key: string;
    value: string;
  };

  type getPageDescriptionApiTestsuitPageDescriptionGetParams = {
    page_size?: number;
  };

  type getPageApiTestsuitPage_index_getParams = {
    index: number;
    page_size?: number;
  };

  type getTestsuitApiTestsuit_uuid_getParams = {
    uuid: string;
  };

  type deleteTestsuitApiTestsuit_uuid_deleteParams = {
    uuid: string;
  };

  type updateTestsuitApiTestsuit_uuid_patchParams = {
    uuid: string;
  };

  type getPageDescriptionApiUserPageDescriptionGetParams = {
    page_size?: number;
  };

  type getPageApiUserPage_index_getParams = {
    index: number;
    page_size?: number;
  };
}
