import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  buttons?: { label: string }[];
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'assistant',
    content: "Hello! I'm your AI assistant. I can help you with questions about documents, work permits, and the application process. How can I help you today?",
    buttons: [
      { label: 'How do I upload documents?' },
      { label: 'What documents do I need?' },
      { label: 'Tell me about the visa process' }
    ]
  }
];

export default function AIAssistantContent() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getAIResponse(newMessage),
        buttons: [
          { label: 'Tell me more' },
          { label: 'I have another question' }
        ]
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setNewMessage(question);
    handleSend();
  };

  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('document')) {
      return "To complete your application, you'll need: 1) A valid passport, 2) Your CV/resume, and 3) Any relevant certifications. You can upload these in the Documents section.";
    }
    
    if (lowerMessage.includes('visa')) {
      return "The visa process typically takes 2-4 weeks. We'll guide you through each step once your initial application is approved.";
    }
    
    if (lowerMessage.includes('interview')) {
      return "You can schedule your consultation through the system. Choose between a video call (Zoom) or phone call at a time that works for you.";
    }
    
    return "I understand your question. Let me help you with that. Could you please provide more specific details about what you'd like to know?";
  };

  return (
    <div className="h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)] flex flex-col">
      {/* Header */}
      <div className="py-2">
        <h1 className="text-xl font-bold text-gray-900">AI Assistant 🤖</h1>
      </div>

      <div className="flex-1 flex gap-4 h-full max-h-full">
        {/* Chat Section */}
        <div className="flex-1 bg-white rounded-lg shadow-lg flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-coral-500 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  {message.type === 'assistant' && (
                    <div className="flex items-center mb-1">
                      <Bot className="h-4 w-4 text-coral-500 mr-1" />
                      <span className="font-medium text-sm">AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  {message.buttons && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {message.buttons.map((button, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickQuestion(button.label)}
                          className="px-2 py-1 bg-white text-coral-500 rounded-full text-xs hover:bg-coral-50 transition-colors"
                        >
                          {button.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center text-gray-500 text-xs">
                <Bot className="h-4 w-4 mr-1 text-coral-500" />
                AI is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border-gray-300 focus:ring-coral-500 focus:border-coral-500 text-sm py-2"
              />
              <button
                onClick={handleSend}
                className="p-2 text-coral-500 hover:text-coral-600"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Questions Section - Hidden on mobile */}
        <div className="hidden md:block w-64 bg-white rounded-lg shadow-lg p-3">
          <h2 className="font-medium text-gray-900 mb-3 text-sm">Quick Questions</h2>
          <div className="space-y-3">
            <div className="space-y-1">
              <button
                onClick={() => handleQuickQuestion("How do I upload documents?")}
                className="block w-full text-left text-xs text-gray-600 hover:text-coral-500 py-0.5"
              >
                How do I upload documents?
              </button>
              <button
                onClick={() => handleQuickQuestion("What documents do I need?")}
                className="block w-full text-left text-xs text-gray-600 hover:text-coral-500 py-0.5"
              >
                What documents do I need?
              </button>
              <button
                onClick={() => handleQuickQuestion("Tell me about the visa process")}
                className="block w-full text-left text-xs text-gray-600 hover:text-coral-500 py-0.5"
              >
                Tell me about the visa process
              </button>
              <button
                onClick={() => handleQuickQuestion("How do I schedule an interview?")}
                className="block w-full text-left text-xs text-gray-600 hover:text-coral-500 py-0.5"
              >
                How do I schedule an interview?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}