import ajax from "./ajax";

export const login = (username, password) => ajax('/login', {username, password}, 'POST');


export const getCategoryReq = (parentId) => ajax('/manage/category/list', {parentId});
export const addCategoryReq = (parentId, categoryName) => ajax(
    '/manage/category/add',
    {
        parentId,
        categoryName
    },
    'POST'
);
export const updateCategoryReq = ({categoryId, categoryName}) => ajax(
        '/manage/category/update',
        {
        categoryId,
        categoryName
        },
        'POST'
);

export const reqCategory = (categoryId) => ajax('/manage/category/info', {categoryId});

export const reqProduct = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize});
export const reqSearchProducts = ({pageNum, pageSize, searchType, searchKey}) =>
    ajax('/manage/product/search', {
            pageNum,
            pageSize,
            [searchType]: searchKey,
    });
export const reqAddOrUpdateProduct = (product) => ajax('/manage/product/' +
    (product._id ? 'update' : 'add'), product, 'post');

export const reqUpdateProductStatus = (productId, status) =>
    ajax('/manage/product/updateStatus', {
            productId,
            status
    }, 'POST');

export const addUser = (user) => ajax('/manage/user/add', user, 'POST');
