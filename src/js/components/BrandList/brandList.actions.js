import axios from 'axios';

function getBrandList(tid) {
  return ((dispatch) => {
    dispatch({ type: 'FETCH_BRAND_LIST' });

    axios.get(`api/v1/brands?_format=json`)
      .then((response) => {
        dispatch({ type: 'FETCH_BRAND_LIST_SUCCESS', payload: response });
      })
      .catch((error) => {
        dispatch({ type: 'FETCH_BRAND_LIST_FAILURE', payload: error.response });
        dispatch({ type: "ADD_ERROR", payload: error });
      });
  });
}

const getBrandListActions = {
  getBrandList,
};

export default getBrandListActions;
