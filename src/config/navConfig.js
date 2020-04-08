import {HomeOutlined, UnorderedListOutlined, ShopOutlined, ShoppingOutlined,
    UserOutlined,
    TeamOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined}
    from '@ant-design/icons';

const navList = [
    {
        title: 'Home',
        key: '/home',
        icon: HomeOutlined,
        isPublic: true
    },
    {
        title: 'Management',
        key: '/products',
        icon: ShoppingOutlined,
        children: [
            {
                title: 'Category',
                key: '/category',
                icon: UnorderedListOutlined
            },
            {
                title: 'Product',
                key: '/product',
                icon: ShopOutlined
            },
        ]
    },
    {
        title: 'User',
        key: '/user',
        icon: UserOutlined
    },
    {
        title: 'Admin',
        key: '/role',
        icon: TeamOutlined
    },
    {title: 'Charts',
        key: '/charts',
        icon: AreaChartOutlined,
        children: [
            {
                title: 'Bar',
                key: '/charts/bar',
                icon: BarChartOutlined
            },
            {
                title: 'Line',
                key: '/charts/line',
                icon: LineChartOutlined
            },
            {
                title: 'Pie',
                key: '/charts/pie',
                icon: PieChartOutlined
            },

        ]
    },
];
export default navList
