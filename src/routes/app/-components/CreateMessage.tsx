import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { fetchRelationship } from "../-queries/fetchRelationship";
import { useState, useTransition } from "react";
import { api } from "@/lib/utils";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const CreateMessage = () => {
  const { data: relationShip, isLoading } = useQuery({
    queryKey: ["relationShip"],
    queryFn: fetchRelationship,
  });

  const [message, setMessage] = useState("");
  const [isSendLoading, startSendMessage] = useTransition();

  function sendMessage() {
    if (relationShip) {
      startSendMessage(async () => {
        const { data } = await api.post("/messages", {
          userToId: relationShip.relatedUser.id,
          message: message,
        });

        if (data) {
          toast.success("Mensagem enviada com sucesso!");
        }
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={isLoading}
          size="icon"
          variant="outline"
          className="size-11 rounded-full ml-auto"
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <span>
            Enviar Mensagem para{" "}
            <span className="font-bold">{relationShip?.relatedUser.name}</span>
          </span>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Label htmlFor="message">Mensagem</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem aqui..."
            rows={10}
            className="resize-none"
          />
        </div>

        <Button onClick={sendMessage} isLoading={isSendLoading}>
          Enviar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMessage;
