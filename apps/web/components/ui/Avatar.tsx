'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AvatarProps {
    src?: string;
    fallback?: string;
    alt?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    status?: 'online' | 'offline' | 'busy' | 'away';
}

const SIZE_CLASSES = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
    xl: 'w-16 h-16 text-xl'
};

const STATUS_COLORS = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-yellow-500'
};

export function Avatar({ src, fallback, alt, size = 'md', className, status }: AvatarProps) {
    return (
        <div className={cn("relative inline-block", className)}>
            <div className={cn(
                "rounded-full overflow-hidden bg-gray-100 flex items-center justify-center ring-2 ring-white relative",
                SIZE_CLASSES[size]
            )}>
                {src ? (
                    <Image
                        src={src}
                        alt={alt || 'Avatar'}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <span className="font-semibold text-gray-500">{fallback || '?'}</span>
                )}
            </div>
            {status && (
                <span className={cn(
                    "absolute bottom-0 right-0 rounded-full border-2 border-white",
                    STATUS_COLORS[status],
                    size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'
                )} />
            )}
        </div>
    );
}
