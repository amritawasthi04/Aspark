import { useState, useMemo } from 'react'
import { motion } from 'motion/react'
import { Search, ChevronUp, ChevronDown, ChevronsUpDown, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'

export interface Column<T> {
  key: keyof T & string
  label: string
  sortable?: boolean
  render?: (value: any, row: T) => React.ReactNode
}

interface DataTableProps<T extends { id: string }> {
  data: T[]
  columns: Column<T>[]
  searchable?: boolean
  searchPlaceholder?: string
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  perPage?: number
  filterElement?: React.ReactNode
}

export function DataTable<T extends { id: string }>({
  data, columns, searchable = true, searchPlaceholder = 'Search...', onEdit, onDelete, perPage = 10, filterElement,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(0)

  const filtered = useMemo(() => {
    let items = [...data]
    if (search) {
      const q = search.toLowerCase()
      items = items.filter(row =>
        columns.some(col => String((row as any)[col.key] ?? '').toLowerCase().includes(q))
      )
    }
    if (sortKey) {
      items.sort((a, b) => {
        const av = String((a as any)[sortKey] ?? '')
        const bv = String((b as any)[sortKey] ?? '')
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      })
    }
    return items
  }, [data, search, sortKey, sortDir, columns])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const paged = filtered.slice(page * perPage, (page + 1) * perPage)

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const hasActions = onEdit || onDelete

  return (
    <div>
      {/* Toolbar */}
      {(searchable || filterElement) && (
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {searchable && (
            <div className="relative flex-1 max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(0) }}
                placeholder={searchPlaceholder}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-cyan-400/50 focus:outline-none transition-colors"
              />
            </div>
          )}
          {filterElement}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/5">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/[0.02]">
              {columns.map(col => (
                <th key={col.key} className="px-4 py-3 text-[11px] text-gray-500 uppercase tracking-wider">
                  {col.sortable !== false ? (
                    <button onClick={() => toggleSort(col.key)} className="flex items-center gap-1 hover:text-gray-300 transition-colors">
                      {col.label}
                      {sortKey === col.key ? (sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />) : <ChevronsUpDown size={12} className="text-gray-600" />}
                    </button>
                  ) : col.label}
                </th>
              ))}
              {hasActions && <th className="px-4 py-3 text-[11px] text-gray-500 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr><td colSpan={columns.length + (hasActions ? 1 : 0)} className="px-4 py-12 text-center text-gray-500 text-sm">No results found</td></tr>
            ) : paged.map((row, i) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                className="border-t border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3 text-sm text-gray-300">
                    {col.render ? col.render((row as any)[col.key], row) : String((row as any)[col.key] ?? '')}
                  </td>
                ))}
                {hasActions && (
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {onEdit && (
                        <button onClick={() => onEdit(row)} className="p-1.5 rounded-lg text-gray-500 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all" aria-label="Edit">
                          <Pencil size={14} />
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(row)} className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all" aria-label="Delete">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filtered.length > perPage && (
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
          <span>{page * perPage + 1}–{Math.min((page + 1) * perPage, filtered.length)} of {filtered.length}</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="p-1.5 rounded-lg hover:bg-white/5 disabled:opacity-30 transition-all">
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPage(i)} className={`w-7 h-7 rounded-lg text-xs transition-all ${page === i ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-white/5'}`}>
                {i + 1}
              </button>
            )).slice(Math.max(0, page - 2), page + 3)}
            <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} className="p-1.5 rounded-lg hover:bg-white/5 disabled:opacity-30 transition-all">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
