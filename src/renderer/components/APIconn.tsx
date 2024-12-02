import { Box } from '@mui/material';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';

export interface Event {
  id: number;
  total_price: number;
  order_length_days: number;
  payment_resolved: number;
  order_created_at: string;
  order_start_date: string;
  order_end_date: string;
  payment_due_date: string;
  customer_name: string;
  customer_phone_number: string;
  customer_email: string;
  order_status: string;
  message: string;
  contents: [];
}

const BASE_URL = window.env.REACT_APP_API_URL;

const APIconn = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Content-Type': 'application/json; charset=UTF-8',
    //'Access-Control-Allow-Headers': 'Content-Type'
  },
});

// Perus API metodit, kalenterissa näkyy callaaminen.
const _get = (url: string, config = {}) => {
  return APIconn.get(url, config);
};

const _delete = (url: string, config = {}) => {
  return APIconn.delete(url, config);

};const _put = (url: string, config = {}) => {
  return APIconn.put(url, config);

};const _post = (url: string, config = {}) => {
  return APIconn.post(url, config);
};

// export API methods
export { _get, _delete, _put, _post };