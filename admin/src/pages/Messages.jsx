import { format } from 'date-fns';
import { useEffect, useState } from 'react';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedMessages, setExpandedMessages] = useState({});

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('https://realestate-fa0y.onrender.com/api/forms/all', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const toggleMessage = (id) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Form Messages</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
        {messages.map((message) => {
          const isExpanded = expandedMessages[message._id];
          const shouldTruncate = message.message.length > 200;

          return (
            <div
              key={message._id}
              className="bg-white shadow-lg rounded-xl p-6 transition transform hover:scale-[1.02] hover:shadow-xl border border-gray-200"
            >
              <div className="mb-3">
                <h2 className="text-xl font-semibold text-gray-800 break-words">{message.name}</h2>
                <p className="text-sm text-gray-500">
                  {format(new Date(message.createdAt), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
              <div className="mb-2">
                <p className="text-gray-600 break-words">
                  <span className="font-medium">Email:</span> {message.email}
                </p>
                <p className="text-gray-600 break-words">
                  <span className="font-medium">Phone:</span> {message.phone || 'N/A'}
                </p>
              </div>

              <div className="mt-4">
                <div
                  className={`text-gray-700 whitespace-pre-line break-words transition-all duration-300 ease-in-out ${
                    isExpanded ? 'max-h-[1000px]' : 'max-h-[96px] overflow-hidden'
                  }`}
                >
                  {message.message}
                </div>

                {shouldTruncate && (
                  <button
                    onClick={() => toggleMessage(message._id)}
                    className="mt-2 text-blue-600 hover:underline text-sm font-medium"
                  >
                    {isExpanded ? 'See less' : 'See more'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Messages;
