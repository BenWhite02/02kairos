// =============================================================================
// KAIROS FRONTEND - HEROICONS REFERENCE
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: heroicons-reference.md
// Purpose: Reference for correct Heroicons v2 import names
// =============================================================================

# Heroicons v2 Import Reference for Kairos

## Commonly Used Icons (Correct Names):

### Trending/Direction:
- ✅ TrendingUpIcon
- ✅ ArrowTrendingDownIcon (NOT TrendingDownIcon)
- ✅ ArrowUpIcon
- ✅ ArrowDownIcon

### Actions:
- ✅ ArrowUpTrayIcon (NOT ExportIcon)
- ✅ ArrowDownTrayIcon (for downloads)
- ✅ PlusIcon
- ✅ MinusIcon

### Navigation:
- ✅ ChevronUpIcon
- ✅ ChevronDownIcon
- ✅ ChevronLeftIcon
- ✅ ChevronRightIcon

### Interface:
- ✅ Cog6ToothIcon (NOT CogIcon)
- ✅ XMarkIcon (NOT XIcon)
- ✅ Bars3Icon (NOT MenuIcon)

### Status:
- ✅ CheckCircleIcon
- ✅ ExclamationTriangleIcon
- ✅ XCircleIcon
- ✅ InformationCircleIcon

## Import Example:
`	ypescript
import {
  ChartBarIcon,
  BoltIcon,
  TrendingUpIcon,
  ArrowTrendingDownIcon, // Correct for down trend
  ArrowUpTrayIcon,       // Correct for export
  Cog6ToothIcon,         // Correct for settings
  XMarkIcon,             // Correct for close
} from '@heroicons/react/24/outline';
`

## Quick Replacements Made:
- TrendingDownIcon → ArrowTrendingDownIcon
- ExportIcon → ArrowUpTrayIcon
- CogIcon → Cog6ToothIcon
- XIcon → XMarkIcon
- MenuIcon → Bars3Icon

## Resources:
- Heroicons Gallery: https://heroicons.com/
- GitHub: https://github.com/tailwindlabs/heroicons
