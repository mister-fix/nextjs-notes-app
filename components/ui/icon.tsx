"use client";

import { icons } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
    name: string;
    size?: string | number;
    color?: string;
    className?: string;
}

export const Icon = ({ name, size, color, className}: Props) => {
    const LucideIcon = icons[name as keyof typeof icons];
    return <LucideIcon size={size} color={color} className={cn(className)} />
} 