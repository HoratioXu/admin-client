import ajax from "./ajax";

export const login = (username, password) => ajax('/login', {username, password}, 'POST');
export const addUser = (user) => ajax('/manage/user/add', user, 'POST');
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
