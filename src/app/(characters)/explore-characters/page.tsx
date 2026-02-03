"use client";

interface ExploreCharactersPageProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function ExploreCharactersPage(props: ExploreCharactersPageProps) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  return <div>Explore Characters Page</div>;
}
