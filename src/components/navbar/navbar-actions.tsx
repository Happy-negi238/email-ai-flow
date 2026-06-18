import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

type NavbarActionsProps = {
  userId: string | null;
};

export default function NavbarActions({
  userId,
}: NavbarActionsProps) {
  if (!userId) {
    return null; // show nothing if user is not logged in
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/dashboard"
        className="text-sm font-medium text-stone-600 hover:text-stone-900"
      >
        Dashboard
      </Link>

      <UserButton />
    </div>
  );
}
