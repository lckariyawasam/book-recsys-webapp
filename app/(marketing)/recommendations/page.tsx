// app/recommendations/page.tsx

import { notFound } from 'next/navigation';

interface RecommendationsPageProps {
  searchParams: {
    recommendations: string;
  };
}

export default async function RecommendationsPage({ searchParams }: RecommendationsPageProps) {
  const recommendations = searchParams.recommendations ? JSON.parse(searchParams.recommendations) : {};

  if (!recommendations) {
    notFound();
  }

  const sortedRecommendations = Object.entries(recommendations)
    .map(([title, score]) => ({ title, score }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="px-5 md:px-10 mt-5 md:mt-10">
      <section className="h-full min-h-[80vh] flex flex-col justify-start items-center space-y-16 py-10 md:py-20">
        <div className="flex flex-col justify-center items-center space-y-5">
          <h1 className="text-gray-700 text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            Recommended Books
          </h1>
        </div>

        {/* Display Recommendations */}
        <div className="flex flex-col gap-8 items-center justify-center">
          {sortedRecommendations.map((rec) => (
            <div key={rec.title} className="bg-white p-4 rounded-md shadow-md w-full max-w-md">
              <h2 className="text-xl font-semibold">{rec.title}</h2>
              <p className="text-gray-500">Score: {rec.score.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
