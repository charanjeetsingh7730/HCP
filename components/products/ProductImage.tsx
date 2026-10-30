import React from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { ProductRecord } from '@/data/products';
import { getFormula } from '@/lib/products';

// Catalog photos that already fill their frame (drums in plants, sacks, lab shots) — shown edge to edge.
const SCENE_IMAGES = new Set([
  'aos-38-drum',
  'glycerin-dropper',
  'glycerin-ip-drum',
  'labsa-90-drum',
  'labsa-96-drum',
  'sles-28-drum',
  'sles-70-drum',
  'sles-liquid',
  'sles-paste',
  'sls-liquid',
  'sorbitol-70-drum',
  'magnesium-sulphate',
  'boric-acid-bag',
  'heavy-liquid-paraffin',
  'light-liquid-paraffin',
]);

// Source thumbnails under ~300px wide; kept small on a specimen tray so they stay crisp.
const LOW_RES_IMAGES = new Set([
  'castor-oil',
  'copper-sulphate',
  'iodine-bottle',
  'linseed-oil',
  'maize-starch',
  'petroleum-jelly',
  'potassium-iodate',
  'potassium-iodide',
  'povidone-iodine',
  'rosin-colophony',
  'sls-powder',
  'starch-ip',
  'talcum-powder',
  'turpentine-oil',
  'zinc-oxide-ip',
  'zinc-oxide-tech',
  'zinc-sulphate',
]);

function imageKey(src: string) {
  return src.split('/').pop()?.replace(/\.\w+$/, '') ?? '';
}

interface ProductImageProps {
  product: ProductRecord;
  size?: 'thumb' | 'card' | 'detail';
  priority?: boolean;
  className?: string;
}

export function ProductImage({ product, size = 'card', priority, className }: ProductImageProps) {
  const sizes = size === 'detail' ? '(min-width: 1024px) 40vw, 100vw' : size === 'thumb' ? '96px' : '(min-width: 1024px) 25vw, 50vw';

  if (!product.image) {
    const formula = getFormula(product);
    return (
      <div
        className={clsx(
          'bg-hex relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-brand-50 via-white to-leaf-50 text-center',
          className
        )}
        role="img"
        aria-label={`${product.name}${formula ? ` (${formula})` : ''}`}
      >
        <span
          className={clsx(
            'font-display font-bold tracking-tight text-navy-700',
            size === 'thumb' ? 'text-sm' : size === 'detail' ? 'text-5xl sm:text-6xl' : 'text-3xl'
          )}
        >
          {formula ?? product.name.split(' ')[0]}
        </span>
        {size !== 'thumb' && (
          <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
            {product.name}
          </span>
        )}
      </div>
    );
  }

  const key = imageKey(product.image);

  if (SCENE_IMAGES.has(key)) {
    return (
      <div className={clsx('relative h-full w-full overflow-hidden bg-mist', className)}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  const lowRes = LOW_RES_IMAGES.has(key);
  return (
    <div
      className={clsx(
        'relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-white to-[#EEF2F6]',
        className
      )}
    >
      <div
        className={clsx(
          'relative transition-transform duration-500 group-hover:scale-105',
          lowRes
            ? size === 'detail'
              ? 'h-[62%] w-[62%] max-w-[300px]'
              : 'h-[72%] w-[72%] max-w-[220px]'
            : 'h-[86%] w-[86%]'
        )}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes={sizes}
          className="object-contain mix-blend-multiply"
        />
      </div>
    </div>
  );
}
