// ProductContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Initial state for products
const initialState = {
  products: [],
};

// Actions
const ActionTypes = {
  ADD_PRODUCT: 'ADD_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
};

// Reducer function to handle state changes
const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case ActionTypes.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? { ...product, ...action.payload.data } : product
        ),
      };
    case ActionTypes.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      };
    default:
      return state;
  }
};

// Create context
const ProductContext = createContext();

// Custom hook to use product context
export const useProductContext = () => useContext(ProductContext);

// Provider component to wrap the application
export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
