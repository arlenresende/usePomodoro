import {
  Pagination as PaginationShad,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationPros {
  setCurrentPage: (fn: (prev: number) => number) => void
  totalPages: number
  currentPage: number
}

export default function Pagination({
  setCurrentPage,
  totalPages,
  currentPage,
}: PaginationPros) {
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  return (
    <PaginationShad>
      <PaginationContent>
        <PaginationItem onClick={handlePreviousPage}>
          <PaginationPrevious
            className={`${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>
            {currentPage} de {totalPages}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={handleNextPage}
            className={`${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationShad>
  )
}
