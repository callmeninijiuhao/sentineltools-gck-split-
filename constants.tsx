import {
  LayoutDashboard,
  ShieldCheck,
  BarChart3,
  Network
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
    id: 'sol-eng',
    label: 'SOLUTION ENGINEER',
    children: [
      {
        id: 'integration-test',
        label: 'Integration Test',
        path: '/integration-test',
        icon: Network
      }
    ]
  },
  {
    id: 'cust-success',
    label: 'CUSTOMER SUCCESS',
    children: [
      {
        id: 'troubleshooter',
        label: 'Troubleshooter',
        path: '/troubleshooter',
        icon: BarChart3
      }
    ]
  }
];