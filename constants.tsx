import {
  ShieldCheck,
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
  }
];