export const state = () => ({
  menu: [
    {
      icon: 'ShoppingBagIcon',
      path: '/shop/ShopManage',
      title: 'ร้านค้า',
      isSubMenu: false,
    },
    {
      icon: 'BoxIcon',
      path: '/product/ProductManage',
      title: 'สินค้า',
      isSubMenu: false,
    },
    {
      icon: 'ListIcon',
      path: '/category/CategoryManage',
      title: 'หมวดหมู่สินค้า',
      isSubMenu: false,
    },
  ],
})
