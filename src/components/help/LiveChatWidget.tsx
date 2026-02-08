import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Minus, Send, Paperclip } from 'lucide-react';
import { initialChatMessages, type ChatMessage } from '../../data/help-data';

interface LiveChatWidgetProps {
  open: boolean;
  onToggle: () => void;
}

export function LiveChatWidget({ open, onToggle }: LiveChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, minimized]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputValue.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulate agent typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const agentResponses = [
        "I'd be happy to help! Can you tell me more about what you're trying to do?",
        "Great question! Let me look into that for you. One moment please.",
        "I understand the issue. Here's what I'd recommend...",
        "That's a common question! Here's how to get started...",
        "I can definitely assist with that. Let me walk you through the steps.",
      ];
      const agentMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'agent',
        text: agentResponses[Math.floor(Math.random() * agentResponses.length)],
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        agentName: 'Sarah',
      };
      setMessages(prev => [...prev, agentMsg]);
    }, 1500 + Math.random() * 1500);
  };

  // Floating button (always visible when chat is closed)
  if (!open) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all duration-200 flex items-center justify-center z-50 hover:scale-105"
        aria-label="Open chat"
      >
        <MessageSquare className="h-6 w-6" />
        {/* Online indicator */}
        <span className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white dark:border-gray-950" />
      </button>
    );
  }

  // Minimized state
  if (minimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setMinimized(false)}
          className="bg-primary text-white rounded-full px-4 py-3 shadow-lg hover:bg-primary/90 transition-all duration-200 flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="text-sm font-medium">Chat with Support</span>
          {messages.length > 1 && (
            <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">{messages.length}</span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 sm:w-[340px] h-[480px] bg-card dark:bg-gray-900 rounded-2xl shadow-2xl border border-border dark:border-gray-800 flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-primary text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span className="text-sm font-semibold">Brandshift Support</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMinimized(true)}
            className="p-1 rounded hover:bg-white/20 transition-colors duration-200"
            aria-label="Minimize"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            onClick={onToggle}
            className="p-1 rounded hover:bg-white/20 transition-colors duration-200"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${msg.sender === 'user' ? '' : ''}`}>
              {msg.sender === 'agent' && (
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-6 w-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <span className="text-xs text-primary font-medium">
                      {msg.agentName?.[0] || 'S'}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground dark:text-gray-500">{msg.agentName}</span>
                </div>
              )}
              <div className={`rounded-xl px-3 py-2 ${
                msg.sender === 'user'
                  ? 'bg-primary text-white rounded-br-sm'
                  : 'bg-muted dark:bg-gray-800 text-foreground dark:text-white rounded-bl-sm'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
              <p className={`text-xs text-muted-foreground dark:text-gray-500 mt-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                {msg.sender === 'user' ? 'You' : msg.agentName} {msg.time}
              </p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%]">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-6 w-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <span className="text-xs text-primary font-medium">S</span>
                </div>
                <span className="text-xs text-muted-foreground dark:text-gray-500">Sarah</span>
              </div>
              <div className="bg-muted dark:bg-gray-800 rounded-xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border dark:border-gray-800 px-3 py-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
            placeholder="Type your message..."
            className="flex-1 h-9 bg-transparent border-none outline-none text-sm text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-500"
          />
          <button
            className="p-1.5 text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors duration-200"
            aria-label="Attach file"
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim()}
            className="p-1.5 text-primary hover:text-primary/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
