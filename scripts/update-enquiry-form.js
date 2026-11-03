const fs = require('fs');

let code = fs.readFileSync('components/enquiry/EnquiryForm.tsx', 'utf8');

// 1. Add ProductImage import if not present
if (!code.includes("import { ProductImage }")) {
  code = code.replace(
    "import { displayGrade, displayMakes, getProductBySlug } from '@/lib/products';",
    "import { displayGrade, displayMakes, getProductBySlug } from '@/lib/products';\r\nimport { ProductImage } from '@/components/products/ProductImage';"
  );
  console.log('✓ Added ProductImage import');
}

// 2. Replace the fields.map block
const oldFieldsMapStart = "{fields.map((field, index) => {";
const oldFieldsMapEnd = "          </div>\r\n\r\n          {errors.items?.message && <FieldError message={errors.items.message} />}";

const newFieldsMap = `{fields.map((field, index) => {
              const current = itemsWatch?.[index];
              const isCustom = current?.productId === CUSTOM_PRODUCT_ID;
              const product = PRODUCTS.find((p) => p.id === current?.productId);
              const itemErrors = errors.items?.[index];
              return (
                <div
                  key={field.id}
                  className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all duration-200 hover:border-brand-200 hover:shadow-card"
                >
                  {/* Product Header Banner with Image & Metadata */}
                  <div className="flex flex-col gap-3.5 border-b border-line/60 bg-gradient-to-r from-mist/80 via-mist/30 to-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative h-20 w-20 sm:h-22 sm:w-22 shrink-0 overflow-hidden rounded-xl border border-line/80 bg-white shadow-soft">
                        {product ? (
                          <ProductImage product={product} size="thumb" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-mist text-brand">
                            <PackageCheck className="h-8 w-8 text-brand/60" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <span className="rounded-md bg-navy-900 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                            Product #{index + 1}
                          </span>
                          {product?.catalogNumber && (
                            <span className="rounded-md border border-line bg-white px-2 py-0.5 text-[11px] font-semibold text-muted">
                              Cat #{product.catalogNumber}
                            </span>
                          )}
                          {product && (
                            <span className="rounded-full bg-leaf-50 px-2 py-0.5 text-[11px] font-semibold text-leaf-dark ring-1 ring-leaf/20">
                              {displayGrade(product)}
                            </span>
                          )}
                        </div>

                        <h3 className="truncate font-display text-base font-bold text-ink sm:text-lg">
                          {product ? product.name : (current?.productName || 'Custom Product')}
                        </h3>

                        {product && (
                          <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-muted">
                            <span>
                              Make: <strong className="font-semibold text-body">{displayMakes(product)}</strong>
                            </span>
                            {product.packagingType && <span>· {product.packagingType}</span>}
                          </p>
                        )}
                      </div>
                    </div>

                    {fields.length > 1 && (
                      <div className="flex justify-end shrink-0">
                        <button
                          type="button"
                          onClick={() => onRemove(index)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-transparent px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          title="Remove this product"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Remove</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Form Inputs Grid */}
                  <div className="space-y-4 p-4 sm:p-5">
                    <div>
                      <label className="label flex items-center justify-between text-xs font-semibold text-body" htmlFor={\`item-\${index}-product\`}>
                        <span>Select Product / Chemical *</span>
                        <span className="text-[11px] font-normal text-muted">Click to change product</span>
                      </label>
                      <select
                        id={\`item-\${index}-product\`}
                        value={current?.productId ?? ''}
                        onChange={(e) => onProductChange(index, e.target.value)}
                        className="field cursor-pointer bg-white font-medium text-ink"
                      >
                        {PRODUCTS.map((p) => (
                          <option key={p.id} value={p.id} disabled={usedIds.has(p.id) && current?.productId !== p.id}>
                            {p.name} — {displayGrade(p)} ({displayMakes(p)})
                          </option>
                        ))}
                        <option value={CUSTOM_PRODUCT_ID}>+ Other product (not in catalogue)</option>
                      </select>
                    </div>

                    {isCustom && (
                      <div>
                        <label className="label text-xs font-semibold text-body" htmlFor={\`item-\${index}-name\`}>
                          Product name *
                        </label>
                        <input
                          id={\`item-\${index}-name\`}
                          {...register(\`items.\${index}.productName\`)}
                          placeholder="Name of the chemical / raw material"
                          className={clsx('field', itemErrors?.productName && 'field-error')}
                        />
                        <FieldError message={itemErrors?.productName?.message} />
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div>
                        <label className="label text-xs font-semibold text-body" htmlFor={\`item-\${index}-qty\`}>
                          Required Quantity *
                        </label>
                        <input
                          id={\`item-\${index}-qty\`}
                          inputMode="decimal"
                          {...register(\`items.\${index}.quantity\`)}
                          placeholder="e.g. 500"
                          className={clsx('field font-semibold text-navy', itemErrors?.quantity && 'field-error')}
                        />
                        <FieldError message={itemErrors?.quantity?.message} />
                      </div>

                      <div>
                        <label className="label text-xs font-semibold text-body" htmlFor={\`item-\${index}-unit\`}>
                          Packaging Unit *
                        </label>
                        <select id={\`item-\${index}-unit\`} {...register(\`items.\${index}.unit\`)} className="field cursor-pointer bg-white">
                          {QUANTITY_UNITS.map((u) => (
                            <option key={u} value={u}>
                              {u}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="label text-xs font-semibold text-body" htmlFor={\`item-\${index}-grade\`}>
                          Grade Required *
                        </label>
                        <input
                          id={\`item-\${index}-grade\`}
                          {...register(\`items.\${index}.grade\`)}
                          placeholder="IP / BP / USP / Technical"
                          className={clsx('field', itemErrors?.grade && 'field-error')}
                        />
                        <FieldError message={itemErrors?.grade?.message} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="label text-xs font-semibold text-body" htmlFor={\`item-\${index}-make\`}>
                          Preferred Manufacturer / Make
                        </label>
                        <input
                          id={\`item-\${index}-make\`}
                          {...register(\`items.\${index}.preferredMake\`)}
                          placeholder="e.g. Godrej, Savita, Indo Borex"
                          className="field text-sm"
                        />
                      </div>

                      <div>
                        <label className="label text-xs font-semibold text-body" htmlFor={\`item-\${index}-use\`}>
                          End Application / Intended Use
                        </label>
                        <input
                          id={\`item-\${index}-use\`}
                          {...register(\`items.\${index}.intendedApplication\`)}
                          placeholder="e.g. ointment base, hand wash"
                          className="field text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}`;

const startIdx = code.indexOf(oldFieldsMapStart);
const endIdx = code.indexOf(oldFieldsMapEnd);

if (startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + newFieldsMap + "\r\n          </div>\r\n\r\n          {errors.items?.message && <FieldError message={errors.items.message} />}" + code.substring(endIdx + oldFieldsMapEnd.length);
  console.log('✓ Successfully upgraded product item cards layout with product images');
} else {
  console.error('Could not find fields.map indices:', startIdx, endIdx);
}

// 3. Update Enquiry Summary sidebar to also show product thumbnails
const oldSummary = `<ul className="max-h-64 divide-y divide-line overflow-y-auto px-6">
            {itemsWatch?.map((it, i) => (
              <li key={fields[i]?.id ?? i} className="py-3 text-sm">
                <p className="font-semibold text-ink">{it.productName || 'Unnamed product'}</p>
                <p className="text-xs text-muted">
                  {it.quantity || '—'} {it.unit} · {it.grade}
                </p>
              </li>
            ))}
          </ul>`;

const newSummary = `<ul className="max-h-72 divide-y divide-line overflow-y-auto px-6">
            {itemsWatch?.map((it, i) => {
              const prod = PRODUCTS.find((p) => p.id === it.productId);
              return (
                <li key={fields[i]?.id ?? i} className="flex items-center gap-3 py-3 text-sm">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-line bg-white shadow-soft">
                    {prod ? (
                      <ProductImage product={prod} size="thumb" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-mist text-brand">
                        <PackageCheck className="h-5 w-5 text-brand/60" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink">{it.productName || 'Unnamed product'}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      <span className="font-medium text-body">{it.quantity || '—'} {it.unit}</span> · {it.grade}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>`;

// Normalize \r\n for summary matching
const normalizedCode = code.replace(/\r\n/g, '\n');
const normalizedOld = oldSummary.replace(/\r\n/g, '\n');
if (normalizedCode.includes(normalizedOld)) {
  const normNew = newSummary.replace(/\r\n/g, '\n');
  code = normalizedCode.replace(normalizedOld, normNew);
  console.log('✓ Successfully upgraded summary sidebar with product thumbnails');
} else {
  console.warn('Could not find summary sidebar block');
}

fs.writeFileSync('components/enquiry/EnquiryForm.tsx', code, 'utf8');
console.log('Finished updating EnquiryForm.tsx');

