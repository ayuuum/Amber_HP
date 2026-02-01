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
        <nav className="flex items-center space-x-2 text-sm text-deep-forest-green/60 mb-8" aria-label="Breadcrumb">
            <Link
                href="/"
                className="flex items-center hover:text-deep-forest-green transition-colors"
            >
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <ChevronRight className="w-4 h-4" />
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-deep-forest-green transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-deep-forest-green font-medium" aria-current="page">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    )
}
