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
    name: 'TestCaseManagement',
    icon: 'smile',
    path: '/tescase',
    component: './TestCase',
  },
  {
    component: './404',
  },
];
