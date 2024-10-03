import { TableReviews } from "@/app/_components/users/TableReviews/TableReviews"

const TopBooksPage = () => {
  return (
    <div className="space-y-5">
    <div className="text-3xl font-medium text-gray-600">Top Books</div>
    <div className="border-l-2 border-t-2 p-3 rounded-md"><TableReviews /></div>
</div>
  )
}

export default TopBooksPage