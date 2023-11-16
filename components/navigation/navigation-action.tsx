'use client';

import { Plus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ActionTooltip } from '@/components/action-tooltip';

const NavigationAction = () => {
  return (
    <div className="">
      <ActionTooltip side="right" align="center" label="Add a server">
        <button className="group flex items-center">
          <div
            className={cn(
              'flex items-center justify-center',
              'mx-3',
              'h-12 w-12',
              'rounded-3xl group-hover:rounded-2xl',
              'overflow-hidden',
              'bg-background dark:bg-neutral-700 group-hover:bg-emerald-500',
              'transition-all',
            )}
          >
            <Plus className="group-hover:text-white transition text-emerald-500" size={25} />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
