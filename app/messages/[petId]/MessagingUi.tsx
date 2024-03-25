// "use client";
// import React, { useEffect, useState } from "react";
// import MessageList from "./MessageList";
// import { supabase } from "@/utils/supabase/client";
// import { Message } from "@/types/messages";

// interface PageParams {
//   params: {
//     petId: string;
//   };
// }

// const RealtimeMessages: React.FC<PageParams> = ({ params }) => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessageContent, setNewMessageContent] = useState("");
//   const [senderId, setSenderId] = useState(""); // Assuming static senderId for example; replace as needed
//   const [receiverId, setReceiverId] = useState("");

//   useEffect(() => {
//   //   const fetchPetProvider = async () => {
//   //     const { data, error } = await supabase
//   //       .from("pets")
//   //       .select("provider_user_id")
//   //       .eq("pet_id", params.petId)
//   //       .single();

//   //     if (error) {
//   //       console.error("Error fetching pet provider:", error.message);
//   //       return;
//   //     }

//   //     if (data) {
//   //       setReceiverId(data.provider_user_id);
//   //     }
//   //   };

//   //   fetchUser();
//   //   fetchPetProvider();
//   // }, [params.petId]);

//   useEffect(() => {
//     // const fetchMessages = async () => {
//     //   if (!senderId || !receiverId) return; // Ensure we have all the ids

//     //   const { data, error } = await supabase
//     //     .from("messages")
//     //     .select("*")
//     //     .or(
//     //       `and(sender_id.eq.${senderId},receiver_id.eq.${receiverId},pet_id.eq.${params.petId})`
//     //     )
//     //     .order("created_at", { ascending: true });

//     //   if (error) {
//     //     console.error("Error fetching messages:", error.message);
//     //     return;
//     //   }

//     //   setMessages(data || []);
//     // };

//     const fetchMessages = async () => {
//       alert(senderId);
//       alert(receiverId);
//       alert(params.petId);
//       const { data, error } = await supabase
//         .from("messages")
//         .select("*")
//         .eq("pet_id", params.petId)
//         .order("created_at", { ascending: true });

//       if (error) {
//         console.error("Error fetching messages:", error);
//         return;
//       }
//       alert("Hi");
//       setMessages(data || []);
//     };

//     fetchMessages();

//     const subscription = supabase
//       .channel("messages")
//       .on("postgres_changes", { event: "*", schema: "public" }, (payload) => {
//         fetchMessages(); // Refetch messages on any change
//       })
//       .subscribe();

//     return () => {
//       subscription
//         .unsubscribe()
//         .then(() => console.log("Unsubscribed from the messages channel."))
//         .catch((error) => console.error("Error unsubscribing:", error));
//     };
//   }, [senderId, receiverId, params.petId]);

//   const sendMessage = async () => {
//     if (!newMessageContent.trim()) return;

//     const { error } = await supabase.from("messages").insert([
//       {
//         sender_id: senderId,
//         receiver_id: receiverId,
//         pet_id: params.petId,
//         content: newMessageContent,
//       },
//     ]);

//     if (error) {
//       console.error("Error sending message:", error);
//       return;
//     }

//     setNewMessageContent("");
//   };

//   return (
//     <div className="p-4">
//       <MessageList messages={messages} />
//       <div className="flex mt-4">
//         <input
//           type="text"
//           value={newMessageContent}
//           onChange={(e) => setNewMessageContent(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
//         />
//         <button
//           onClick={sendMessage}
//           className="ml-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RealtimeMessages;
