import RealtimeMessages from "./RealtimeMessages";

const MessagesPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <RealtimeMessages />
    </div>
  );
};

export default MessagesPage;
