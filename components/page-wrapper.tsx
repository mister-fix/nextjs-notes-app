import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SignOut } from '@/components/signout';
import { ModeToggle } from "./ui/mode-toggle";
import { Fragment } from "react";

interface Props {
    children: React.ReactNode
    breadcrumbs: {
        label: string;
        href: string;
    }[]
}

export function PageWrapper({ children, breadcrumbs }: Props) {
    return (
        <div className="flex flex-col">
            <header className="flex items-center p-4 border-b border-muted">
                <div className="flex items-center gap-4">
                    <SidebarTrigger className="cursor-pointer" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbs.map((item, index) => (
                                <Fragment key={item.label}>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                                </Fragment>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <div className="ms-auto flex items-center gap-2">
                    <ModeToggle />
                    <SignOut />
                </div>
            </header>

            <main className="w-full max-w-full p-4">
                {children}
            </main>
        </div>
    )
}