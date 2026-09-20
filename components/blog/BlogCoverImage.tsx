import Image from 'next/image'
import { cn } from '@/lib/utils'

type Props = {
  src: string
  alt: string
  priority?: boolean
  className?: string
  sizes?: string
}

export default function BlogCoverImage({
  src,
  alt,
  priority = false,
  className,
  sizes = '(max-width: 768px) 100vw, 640px',
}: Props) {
  return (
    <div className={cn('relative overflow-hidden bg-off-white', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
    </div>
  )
}
