import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axios from '../axios';

export const fetchInventoryCount = (BRAND) => {
  return useQuery(['inventory_count'], () => {
    return axios.get(
      `${import.meta.env.VITE_BASE_URL}` +
        `.total_inventory?brand=${encodeURI(BRAND)}`
    );
  });
};

export const fetchLiveStoreCount = (BRAND) => {
  return useQuery(['livestore_count'], () => {
    return axios.get(
      `${import.meta.env.VITE_BASE_URL}` +
        `.total_live_store?brand=${encodeURI(BRAND)}`
    );
  });
};

export const fetchStoreImages = (BRAND) => {
  return useQuery(['carousal_images'], () => {
    return axios.get(
      `${import.meta.env.VITE_BASE_URL}` +
        `.image_api?brand=${encodeURI(BRAND)}`
    );
  });
};