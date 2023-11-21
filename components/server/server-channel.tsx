'use client';

import { Channel, ChannelType, MemberRole, Server } from '@prisma/client';
import { Edit, Hash, Lock, Mic, Trash, Video } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { ActionTooltip } from '@/components/action-tooltip';
import { useModal } from '@/hooks/modal-store';

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

const ServerChannel: React.FC<ServerChannelProps> = ({ channel, server, role }) => {
  const router = useRouter();
  const params = useParams();

  const { onOpen } = useModal();

  const Icon = iconMap[channel.type];

  return (
    <button
      className={cn(
        'group',
        'p-2',
        'rounded-md',
        'flex items-center gap-x-2',
        'w-full',
        'hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50',
        'transition',
        'mb-1',
        params?.id === channel.id && 'bg-zinc-700/20 dark:bg-zinc-700',
      )}
    >
      <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      <p
        className={cn(
          'line-clamp-1',
          'font-semibold',
          'text-sm',
          'text-zinc-500 dark:text-zinc-400',
          'group-hover:text-zinc-600 dark:group-hover:text-zinc-300',
          'transition',
          params?.channelId === channel.id && 'text-primary dark:text-zinc-200 dark:group-hover:text-white',
        )}
      >
        {channel.name}
      </p>
      {channel.name !== 'general' && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit
              onClick={() => onOpen('editChannel', { server, channel })}
              className={cn(
                'hidden group-hover:block',
                'w-4 h-4',
                'text-zinc-500 dark:text-zinc-400',
                'hover:text-zinc-600 dark:hover:text-zinc-300',
                'transition',
              )}
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              onClick={() => onOpen('deleteChannel', { server, channel })}
              className={cn(
                'hidden group-hover:block',
                'w-4 h-4',
                'text-zinc-500 dark:text-zinc-400',
                'hover:text-zinc-600 dark:hover:text-zinc-300',
                'transition',
              )}
            />
          </ActionTooltip>
        </div>
      )}
      {channel.name === 'general' && role !== MemberRole.GUEST && (
        <ActionTooltip label="Locked Channel">
          <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        </ActionTooltip>
      )}
    </button>
  );
};

export default ServerChannel;
