import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import findUsersBasedOnFirstName from "../actions/findUsersBasedOnFirstName";
import SearchInput from "./components/SearchInput";
import { User } from "@clerk/nextjs/server";

export default async function FriendsPage({
  searchParams,
}: {
  searchParams: Promise<{ name: string }>;
}) {
  const { name } = await searchParams;
  const users = await findUsersBasedOnFirstName(name);
  return (
    <div className="flex text-white items-center justify-center h-screen bg-foreground">
      <div className="bg-foreground w-[90%] max-w-[2500px] rounded-lg h-[80%] space-y-8">
        <FriendsPageContent search={name} users={users} />
      </div>
    </div>
  );
}

type User = {
  name: string | null;
  id: string;
  email: string | null;
  favoriteSong: string | null;
  imageUrl: string | null;
};

function FriendsPageContent({ users, search }: { users: User[], search: string }) {
  return (
    <>
      <div className="space-y-4">
        <h1 className="font-bold text-4xl">Friends</h1>
        <SearchInput search={search} placeholder="Search your friends..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {users.map((item) => (
          <FriendCard
            name={item.name!}
            lastTimePlayed={"0"}
            favoriteSong={item.favoriteSong || "no favorite song"}
            profilePicture={item.imageUrl}
            id={item.id}
            key={item.id}
          />
        ))}
      </div>
    </>
  );
}

type FriendCardType = {
  name: string;
  lastTimePlayed: string;
  favoriteSong: string;
  profilePicture: string | null;
  id: string;
};

function FriendCard({name, lastTimePlayed, favoriteSong, profilePicture, id}: FriendCardType) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <div className="bg-black size-12 rounded-full"></div>
          <div>{name}</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 flex-col">
        <div className="font-bold text-xs md:text-sm">
          <div>Last Time Played: {lastTimePlayed}</div>
          <div>Favorite song: {favoriteSong}</div>
        </div>

        <div className="flex gap-2">
          <Button className="text-xs md:text-sm">1v1</Button>
          <Button className="text-xs md:text-sm">Message</Button>
        </div>
      </CardContent>
    </Card>
  );
}
