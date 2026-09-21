import React, { useState, useEffect, useRef } from 'react';
import { Search, Paperclip, Smile, Send, Check, CheckCheck, ArrowLeft, MoreVertical } from 'lucide-react';
import { conversations as initialConversations } from '../../data/messages';

export default function AdminMessagesPage() {
  const [conversations, setConversations] = useState(initialConversations || []);
  const [activeConversationId, setActiveConversationId] = useState(conversations[0]?.id || null);
  const [isMobileListVisible, setIsMobileListVisible] = useState(true);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  const filteredConversations = conversations.filter(c => 
    c.contactName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleSelectConversation = (id) => {
    setActiveConversationId(id);
    setIsMobileListVisible(false);
  };

  const handleBackToList = () => {
    setIsMobileListVisible(true);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeConversation) return;

    const newMessage = {
      id: Date.now(),
      sender: 'admin',
      text: messageInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered'
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === activeConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessageTime: 'Just now'
          };
        }
        return conv;
      })
    );

    setMessageInput('');

    // Simulate reply
    setTimeout(() => {
      const replyMessage = {
        id: Date.now() + 1,
        sender: 'user',
        text: 'Got it, thank you.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      };

      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === activeConversationId) {
            // update admin messages to read
            const updatedMessages = conv.messages.map(m => m.sender === 'admin' ? { ...m, status: 'read' } : m);
            return {
              ...conv,
              messages: [...updatedMessages, replyMessage],
              lastMessageTime: 'Just now'
            };
          }
          return conv;
        })
      );
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] bg-white dark:bg-gray-900 rounded-lg shadow-card overflow-hidden">
      {/* Left Sidebar - Conversation List */}
      <div
        className={`${
          isMobileListVisible ? 'flex' : 'hidden'
        } md:flex flex-col w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 dark:border-gray-800`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Customer Chats</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => handleSelectConversation(conv.id)}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  activeConversationId === conv.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                }`}
              >
                <div className="relative">
                  <img
                    src={conv.avatar}
                    alt={conv.contactName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conv.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-primary-600 text-white text-xs font-bold rounded-full">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {conv.contactName}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                      {conv.lastMessageTime}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {conv.messages[conv.messages.length - 1]?.text}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              No conversations found.
            </div>
          )}
        </div>
      </div>

      {/* Right Area - Active Chat */}
      <div
        className={`${
          !isMobileListVisible ? 'flex' : 'hidden'
        } md:flex flex-col flex-1 bg-gray-50/50 dark:bg-gray-900/50`}
      >
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={handleBackToList}
                className="md:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <img
                src={activeConversation.avatar}
                alt={activeConversation.contactName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {activeConversation.contactName}
                </h3>
                <p className="text-xs text-green-500 font-medium">Customer</p>
              </div>
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeConversation.messages.map((msg) => {
                const isAdmin = msg.sender === 'admin';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                        isAdmin
                          ? 'bg-primary-600 text-white rounded-br-sm'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm shadow-sm border border-gray-100 dark:border-gray-700'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <div
                        className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                          isAdmin ? 'text-primary-100' : 'text-gray-400'
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {isAdmin && (
                          <span>
                            {msg.status === 'read' ? (
                              <CheckCheck className="w-3 h-3 text-blue-300" />
                            ) : msg.status === 'delivered' ? (
                              <CheckCheck className="w-3 h-3" />
                            ) : (
                              <Check className="w-3 h-3" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Area */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2"
              >
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <Smile className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <Paperclip className="w-6 h-6" />
                </button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a response..."
                  className="flex-1 bg-gray-100 dark:bg-gray-900 border-transparent focus:bg-white dark:focus:bg-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 rounded-full px-4 py-2 text-sm text-gray-900 dark:text-white transition-all"
                />
                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="p-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-full transition-colors flex-shrink-0"
                >
                  <Send className="w-5 h-5 -ml-0.5 mt-0.5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Send className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-lg font-medium">Select a conversation</p>
            <p className="text-sm">Choose a customer to assist</p>
          </div>
        )}
      </div>
    </div>
  );
}
