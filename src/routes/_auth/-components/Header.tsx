import { LogOut } from "lucide-react";
import { useTransition } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const Header = () => {
  const { data } = useSession();
  const navigate = useNavigate();

  const [logoutLoading, startLogout] = useTransition();

  function logout() {
    startLogout(async () => {
      const { data } = await signOut();

      if (data) {
        navigate({
          to: "/",
        });
      }
    });
  }

  return (
    <Card className="w-full border rounded-lg p-4 flex flex-row items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarFallback>{data?.user.name.substring(0, 2)}</AvatarFallback>
          <AvatarImage src={data?.user.image || ""} alt={data?.user.name} />
        </Avatar>

        {!data ? (
          <Skeleton className="w-28 h-6"/>
        ) : (
          <p className="font-semibold">{data?.user.name}</p>
        )}
      </div>

      <Button
        size="icon"
        variant="outline"
        isLoading={logoutLoading}
        onClick={logout}
      >
        <LogOut />
      </Button>
    </Card>
  );
};

export default Header;
