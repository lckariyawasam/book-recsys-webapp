import CustomButton from "@/app/_components/Button";
import BookCardGrid from "@/app/_components/users/BookCardGrid/BookCardGrid";
import MatchOfTheDay from "@/app/_components/users/MatchOfTheDay/MatchOfTheDay";
import Link from "next/link";

const mockBook = {
  title: 'Fire and Blood',
  author: 'George R. R. Martin',
  genres: ['Fantasy', 'Adventure'],
  coverUrl: 'https://www.sttammanylibrary.org/wp-content/uploads/sites/44/2019/08/Fire_And_Blood-670x803.png',
  description: 'Fire and Blood begins their tale with the legendary Aegon the Conqueror, creator of the Iron Throne, and goes on to recount the generations of Targaryens who fought to hold that iconic seat, all the way up to the civil war that nearly tore their dynasty apart.',
  previewLink: 'https://www.goodreads.com/book/show/36504081-fire-blood',
  score: 4.5
}

const page = () => {
  return (
    <div className="space-y-10">
      <div className="flex space-x-3">
              <Link href="/find-similar">
                <CustomButton
                  minwidth="w-30"
                  size="small"
                  is_square="rounded-sm"
                >
                  Find Similar
                </CustomButton>
              </Link>
              <Link href="/input-read-books">
                <CustomButton
                  minwidth="w-30"
                  variant="outline"
                  size="small"
                  is_square="rounded-sm"
                >
                  Add Books
                </CustomButton>
              </Link>
            </div>
      {/* Match of the day */}
      <MatchOfTheDay {...mockBook}/>

      {/* Books List */}
      <BookCardGrid />
    </div>
  );
};

export default page;
