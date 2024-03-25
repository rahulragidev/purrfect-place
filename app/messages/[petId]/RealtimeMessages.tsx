import { createClient } from "@/utils/supabase/server";
import { SubmitButton } from "@/components/submit-button";
import { supabase } from "@/utils/supabase/client";
import MessageList from "./MessageList";
import { Message } from "@/types/messages";

export default function RealtimeMessages({
  searchParams,
}: {
  searchParams: {
    petId: string;
    provider_id: string;
    user_id: string;
  };
}) {
  const sendMessage = async (formData: FormData) => {
    "use server";
    let message = formData.get("message") as string;
    const sender_id = searchParams.user_id;
    const provider_user_id = searchParams.provider_id;
    const petId = searchParams.petId;
    console.log("This is a Message : " + message);
    console.log("This is a Sender : " + sender_id);
    console.log("This is a Provider : " + provider_user_id);
    console.log("This is a Pet : " + petId);
    const { error } = await supabase.from("messages").insert([
      {
        sender_id: sender_id,
        receiver_id: provider_user_id,
        pet_id: searchParams.petId,
        content: message,
      },
    ]);

    if (error) {
      console.error("Error sending message:", error);
      return;
    }
    message = "";
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <MessageList searchParams={searchParams} />
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="message"
          placeholder="Type here ..."
          required
        />
        <SubmitButton
          formAction={sendMessage}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Sending Text"
        >
          Send Message
        </SubmitButton>
        {searchParams?.provider_id && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.provider_id}
          </p>
        )}
      </form>
    </div>
  );
}
