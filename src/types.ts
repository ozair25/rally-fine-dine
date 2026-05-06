/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: { en: string; de: string };
  description: { en: string; de: string };
  price: number;
  category:
    | 'Biryani Rice Dishes'
    | 'Indian Specialities'
    | 'Burger Menu'
    | 'Pizza'
    | 'Vegetarian Pizza'
    | 'Vegan Pizza'
    | 'Pasta & Casseroles'
    | 'Salads'
    | 'Burger Deals'
    | 'Indian Vegan Dishes'
    | 'Chicken Dishes'
    | 'Vegetarian Dishes'
    | 'Desserts'
    | 'Drinks'
    | 'Sides'
    | 'Special';
  image?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface OrderDetails {
  type: 'delivery' | 'pickup';
  name: string;
  phone: string;
  address?: string;
  pincode?: string;
  pickupTime?: string;
}
