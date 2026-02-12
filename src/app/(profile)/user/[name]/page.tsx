"use client";

import { useParams } from "next/navigation";

export default function ProfilePage() {
  const params = useParams();
  const name = params.name as string;

  return <div>Profile Page</div>;
}
