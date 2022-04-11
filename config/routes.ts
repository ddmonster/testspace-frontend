export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'TestCaseManagment',
    icon: 'smile',
    path: '/testcase',
    // component: './TestCase',
    routes: [
      {
        path: 'testplan',
        name: 'Testplan',
        exact: true,
        component: './TestCase/TestPlan',
      },
      {
        name: 'PlanInfo',
        path: 'testplan/:uuid',
        exact: true,
        component: './Testcase/TestPlanInfo',
        hideInMenu: true,
      },
    ],
  },
  {
    component: './404',
  },
];
