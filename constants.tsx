import {
  BarChart3,
} from 'lucide-react';
import { NavItem } from './types';

export const NAV_STRUCTURE: NavItem[] = [
  {
    id: 'cust-success',
    label: 'CUSTOMER SUCCESS',
    children: [
      {
        id: 'seller-domain-shooter',
        label: 'Seller Domain Shooter',
        path: '/',
        icon: BarChart3
      }
    ]
  }
];