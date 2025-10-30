'use client';
import { useState, useRef } from 'react';

export default function ChatGeminiTyping() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const aiRef = useRef('');
  const typingTimeout = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);
    aiRef.current = '';

    // เพิ่ม assistant ว่างไว้ก่อน
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    const typeChar = () => {
      if (buffer.length === 0) {
        typingTimeout.current = setTimeout(typeChar, 30); // รอข้อมูลใหม่
        return;
      }

      aiRef.current += buffer[0];
      buffer = buffer.slice(1);

      setMessages((prev) => {
        const others = prev.filter((m) => m.role !== 'assistant');
        return [...others, { role: 'assistant', content: aiRef.current }];
      });

      typingTimeout.current = setTimeout(typeChar, 10); // ปรับความเร็วตรงนี้ (ms)
    };

    typeChar(); // เริ่มแสดงผล

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      buffer += chunk;
    }

    setIsStreaming(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto text-black">
      <div className="space-y-3 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded ${
              msg.role === 'user'
                ? 'bg-blue-100 text-blue-900'
                : 'bg-green-100 text-green-900'
            } shadow`}
          >
            <strong>{msg.role === 'user' ? 'You' : 'Gemini'}:</strong> {msg.content}
          </div>
        ))}
        {isStreaming && <div className="text-sm italic text-gray-400">Gemini กำลังพิมพ์...</div>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="พิมพ์ข้อความ..."
          disabled={isStreaming}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
          disabled={isStreaming}
        >
          ส่ง
        </button>
      </form>
    </div>
  );
}
