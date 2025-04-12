import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
import { NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ChevronRight } from 'lucide-react';
import useRolePermission from '@/hooks/use-role-permission';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    const { hasRole, hasPermission } = useRolePermission();

    const filteredItems = items.filter((item) => {
        const roleOk = item.role ? hasRole(item.role) : true;
        const permissionOk = item.permission ? hasPermission(item.permission) : true;
        return roleOk && permissionOk;
    });

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {filteredItems.map((item) => (
                    item.subItems ? (
                        <Collapsible key={item.title} asChild defaultOpen={item.isActive} className='group/collapsible'>
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.subItems
                                            .filter((subItem) => {
                                                const roleOk = subItem.role ? hasRole(subItem.role) : true;
                                                const permissionOk = subItem.permission ? hasPermission(subItem.permission) : true;
                                                return roleOk && permissionOk;
                                            })
                                            .map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton asChild isActive={page.url === subItem.url}>
                                                        <Link href={subItem.url} prefetch>
                                                            <span>{subItem.title}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ) : (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild tooltip={item.title} isActive={item.href === page.url}>
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon className="w-4 h-4" />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
