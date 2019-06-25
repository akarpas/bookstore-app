import toPascalCase from 'to-pascal-case';

const delay = ms => new Promise(res => setTimeout(res, ms));

const actions = {
    loading: (category, isLoading) => ({
        type: `${category}Loading`,
        payload: isLoading
    }),
    set: (category) => ({
        type: `set${toPascalCase(category)}`,
        payload: null
    }),
    create: (category, item) => ({
        type: `create${toPascalCase(category.slice(0, category.length - 1))}`,
        payload: item
    }),
    delete: (category, id) => ({
        type: `delete${toPascalCase(category.slice(0, category.length - 1))}`,
        payload: id
    }),
    update: (category, item) => ({
        type: `update${toPascalCase(category.slice(0, category.length - 1))}`,
        payload: item
    })
};

export const fetchItems = category => {
    return async dispatch => {
        dispatch(actions.loading(category, true));
        await delay(1000);
        dispatch(actions.set(category));
    };
};

export const createItem = (category, item) => {
    return dispatch => {
        dispatch(actions.create(category, item));
    };
};

export const deleteItem = (category, itemId) => {
    return dispatch => {
        dispatch(actions.delete(category, itemId));
    };
};

export const updateItemData = (category, item) => {
    return dispatch => {
        dispatch(actions.update(category, item));
    };
};
