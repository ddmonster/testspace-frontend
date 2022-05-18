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
        name: 'Testsuite',
        icon: 'smile',
        path: 'testplan/:planname/:planuuid/testsuite/:suitname/:suituuid',
        component: './TestCase/Testsuite',
        exact: true,
        hideInMenu: true,
      },
      {
        name: 'TestplanDetails',
        path: 'testplan/:planname/:planuuid',
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
