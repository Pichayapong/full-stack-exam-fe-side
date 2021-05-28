export const state = () => ({
  menu: [
    {
      icon: 'HomeIcon',
      path: 'side-menu-dashboard',
      title: 'sub menu',
      subMenu: [
        {
          icon: '',
          path: '/sub/sub-test',
          title: 'sub 1',
        },
      ],
    },
    {
      icon: 'InboxIcon',
      path: '/',
      title: 'Index',
    },

    'devider',
    {
      icon: 'InboxIcon',
      path: 'side-menu-components',
      title: 'submenu',
      subMenu: [
        {
          icon: '',
          path: '/sub2/sub2',
          title: 'submenu 2',
        },
      ],
    },
    {
      icon: 'InboxIcon',
      path: 'side-menu-components',
      title: 'Components',
      subMenu: [
        {
          icon: '',
          path: '/components/modal',
          title: 'Modal',
        },
      ],
    },
  ],
})
