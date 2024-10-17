import TaableRatings from "@/app/_components/users/TableRatings/TableRatings"
// import { TableReviews } from "@/app/_components/users/TableReviews/TableReviews"

const RatedBooksPage = () => {
  return (
    <div className="space-y-5">
    <div className="text-3xl font-semibold text-gray-600">Rated <span className="text-primary-300">Books</span></div>
    
    <div className="border-l-2 border-t-2 p-3 rounded-md"><TaableRatings /></div>
</div>
  )
}

export default RatedBooksPage