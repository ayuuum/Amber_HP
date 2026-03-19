'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

type BreadcrumbItem = {
    label: string
    href?: string
}

type BreadcrumbsProps = {
    items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="mb-8 flex items-center space-x-2 text-sm text-sequoia-black/65" aria-label="Breadcrumb">
            <Link
                href="/"
                className="rounded-sm p-1.5 transition-[background-color,color] duration-200 hover:bg-sequoia-black/5 hover:text-sequoia-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sequoia-black/25"
            >
                <Home className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only">Home</span>
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <ChevronRight className="w-4 h-4 text-sequoia-black/30" aria-hidden="true" />
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="rounded-sm px-1.5 py-1 transition-[background-color,color] duration-200 hover:bg-sequoia-black/5 hover:text-sequoia-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sequoia-black/25"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-sequoia-black font-medium" aria-current="page">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    )
}
