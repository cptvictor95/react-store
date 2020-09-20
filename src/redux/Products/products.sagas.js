import { auth } from './../../firebase/utils';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { setProducts, getProductsStart } from './products.actions';
import { handleAddProduct, handleGetProducts, handleDeleteProduct } from './products.helpers';
import productTypes from './products.types';

export function* addProduct({ payload: {
  productCategory,
  productName,
  productThumbnail,
  productPrice
}}) {

  try {
    const timestamp = new Date();
    yield handleAddProduct({
      productCategory,
      productName,
      productThumbnail,
      productPrice,
      productAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp
    });
    yield put(
        getProductsStart()
    );


  } catch (err) {
    // console.log(err);
  }

}

export function* onAddProductStart() {
  yield takeLatest(productTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts({ payload }) {
  try {
    const products = yield handleGetProducts(payload);
    yield put(
      setProducts(products)
    );

  } catch (err) {
    // console.log(err);
  }
}

export function* onGetProductsStart() {
  yield takeLatest(productTypes.GET_PRODUCTS_START, fetchProducts);
}

export function* deleteProduct({ payload }) {
  try {
    yield handleDeleteProduct(payload);
    yield put (
        getProductsStart()
    );

  } catch (err) {
    // console.log(err);
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productTypes.DELETE_PRODUCT_START, deleteProduct);
}

export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onGetProductsStart),
    call(onDeleteProductStart),
  ])
}