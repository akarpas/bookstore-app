import toPascalCase from 'to-pascal-case';

const delay = ms => new Promise(res => setTimeout(res, ms));

const actions = {
    loading: (category, isLoading) => ({
        category,
        type: `${category}Loading`,
        payload: isLoading
    }),
    set: (category) => ({
        category,
        type: `set${toPascalCase(category)}`,
        payload: null
    }),
    create: (category, item) => ({
        category,
        type: `create${toPascalCase(category.slice(0, category.length - 1))}`,
        payload: item
    }),
    delete: (category, id) => ({
        category,
        type: `delete${toPascalCase(category.slice(0, category.length - 1))}`,
        payload: id
    }),
    update: (category, item) => ({
        category,
        type: `update${toPascalCase(category.slice(0, category.length - 1))}`,
        payload: item
    })
};

export const fetchItems = category => async dispatch => {
    dispatch(actions.loading(category, true));
    await delay(1000);
    dispatch(actions.set(category));
};

export const createItem = (category, item) => dispatch => {
    dispatch(actions.create(category, item));
};

export const deleteItem = (category, itemId) => dispatch => {
    dispatch(actions.delete(category, itemId));
};

export const updateItem = (category, item) => dispatch => {
    dispatch(actions.update(category, item));
};

export const setLoading = () => dispatch => {
    dispatch(actions.loading('books', true));
    dispatch(actions.loading('genres', true));
}
