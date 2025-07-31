'use client';

import React from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { 
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton
} from './ui/sidebar';
import { Icon } from '@/components/ui/icon'
import { useQueryState } from 'nuqs'

interface Props {
    data: {
        navMain: {
            title: string;
            items: { title: string; url: string }[];
        }[];
    };
};

const SidebarData = ({ data }: Props) => {
  const [search] = useQueryState('search', { defaultValue: '' })

  const filteredData = data.navMain.filter((item) => {
    const notebookMatches = item.title.toLowerCase().includes(search.toLowerCase());
    const noteMatches = item.items.some((note) => note.title.toLowerCase().includes(search.toLowerCase()));

    return notebookMatches || noteMatches;
  });

  return (
    <>
        {filteredData.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className='group/collapsible'
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className='group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm'
              >
                <CollapsibleTrigger>
                  {item.title}{' '}
                  {item.items.length > 0 && <Icon name='ChevronRight' className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />}
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url}><Icon name='StickyNote' />{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
    </>
  )
}

export default SidebarData