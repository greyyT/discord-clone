'use client';

import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { UserAvatar } from '../user-avatar';

interface ServerSearchProps {
  data: {
    label: string;
    type: 'channel' | 'member';
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
          imageUrl?: string;
        }[]
      | undefined;
  }[];
}

const ServerSearch: React.FC<ServerSearchProps> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, []);

  const onSearchSelect = ({ id, type }: { id: string; type: 'channel' | 'member' }) => {
    setOpen(false);

    if (type === 'member') {
      return router.push(`/servers/${params?.serverId}/conversations/${id}`);
    }

    if (type === 'channel') {
      return router.push(`/servers/${params?.serverId}/channels/${id}`);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'group',
          'p-2',
          'rounded-md',
          'flex items-center gap-x-2',
          'w-full',
          'hover:bg-zinc-700/10',
          'dark:hover:bg-zinc-700/50',
          'transition',
        )}
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p
          className={cn(
            'font-semibold text-xs',
            'text-zinc-500 dark:text-zinc-400',
            'group-hover:text-zinc-600 dark:group-hover:text-zinc-300',
            'transition',
          )}
        >
          Search
        </p>
        <kbd
          className={cn(
            'pointer-events-none',
            'inline-flex items-center gap-1',
            'h-5',
            'select-none',
            'rounded',
            'border',
            'bg-muted',
            'px-1.5',
            'font-mono font-medium',
            'text-[10px] text-muted-foreground',
            'ml-auto',
          )}
        >
          <span className="text-xs mt-1">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members" />
        <CommandList>
          <CommandEmpty>No Results found</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ id, icon, name, imageUrl }) => (
                  <CommandItem key={id} className="cursor-pointer" onSelect={() => onSearchSelect({ id, type })}>
                    {type === 'channel' && (
                      <>
                        {icon}
                        <span>{name}</span>
                      </>
                    )}
                    {type === 'member' && (
                      <>
                        <UserAvatar src={imageUrl} className="w-6 h-6 md:w-6 md:h-6" />
                        <span className="ml-2">{name}</span>
                        <span className="ml-2">{icon}</span>
                      </>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default ServerSearch;
