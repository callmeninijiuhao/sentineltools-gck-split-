import {
  ShieldCheck,
  BarChart3,
} from 'lucide-react';
import { NavItem } from './types';

export const NAV_STRUCTURE: NavItem[] = [
  {
    id: 'pub-dev',
    label: 'PUB DEV',
    children: [
      {
        id: 'onboarding-validator',
        label: 'Pub Onboarding Validator',
        path: '/',
        icon: ShieldCheck
      }
    ]
  },
  {
    id: 'cust-success',
    label: 'CUSTOMER SUCCESS',
    children: [
      {
        id: 'seller-domain-shooter',
        label: 'Seller Domain Shooter',
        path: '/seller-domain-shooter',
        icon: BarChart3
      }
    ]
  }
];