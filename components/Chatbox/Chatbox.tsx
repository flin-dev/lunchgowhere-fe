"use client"
import { Button } from "@/components/ui/button"
import { useStompClient, useSubscription } from 'react-stomp-hooks';
import React, { useState, useEffect, use, useCallback, useMemo } from 'react';
import { Send } from 'lucide-react';

type UserMessageData = { message: string, sender: string, sendTime: string };

export const Chatbox = ({ roomId }: { roomId: string }) => {

  const [message, setMessage] = useState('');
  const stompClient = useStompClient();
  //create me a message list that to keep track of messages that sent from the server
  const [messageList, setMessageList] = useState<UserMessageData[]>([]);
  const [showScrollButton, setShowScrollButton] = useState(false);


  // Subscribe to the room chat topic
  useSubscription(`/room/${roomId}/chat`, (message) => {
    // console.log(message.body);
    setMessageList((messageList: UserMessageData[]) => [...messageList, JSON.parse(message.body)])
  });

  //quick fix for triggerring the SubscribeMapping while getting messages, this supposed to work but it doesn't,
  //so added another useSubscription above to get the message from the server, this just work as a trigger to SubscribeMapping
  useEffect(() => {
    let subscription = stompClient?.subscribe(`/app/room/${roomId}/chat`, (message) => { console.log("client subcribe to app/room/${roomId}/chat") });

    return () => { subscription?.unsubscribe() }
  }, [stompClient, roomId]);

  // Function to handle the scrolling logic
  const checkForScroll = useCallback(() => {
    // console.log("checking for scroll", showScrollButton)
    const messagesContainer = document.getElementById("messagesContainer");
    const isScrollable = messagesContainer?.scrollHeight !== undefined && messagesContainer?.clientHeight !== undefined && messagesContainer.scrollHeight > messagesContainer.clientHeight;
    const isNotScrolledToBottom = messagesContainer?.scrollTop !== undefined && messagesContainer.scrollTop < messagesContainer.scrollHeight - messagesContainer.clientHeight;

    setShowScrollButton(isScrollable && isNotScrolledToBottom);
  }, []);

  const scrollToBottom = useCallback(() => {
    // console.log("scrolling to bottom");
    const messagesContainer = document.getElementById("messagesContainer");
    messagesContainer!.scrollTop = messagesContainer!.scrollHeight;

  }, []);

  useEffect(() => {
    checkForScroll();
    // Add the event listener for the scroll event
    const messagesContainer = document.getElementById("messagesContainer");

    messagesContainer?.addEventListener('scroll', checkForScroll);

    // Clean up the event listener
    return () => messagesContainer?.removeEventListener('scroll', checkForScroll);
  }, [messageList]);


  const sendMessage = useCallback(() => {
    if (message.trim() !== '') {
      // console.log("sending message", message)
      stompClient?.publish({
        destination: `/app/room/${roomId}/chat`,
        body: JSON.stringify({ message: message, sender: localStorage.getItem("username"), sendTime: new Date().toLocaleTimeString() }),
      });
      setMessage('');
      //currently do not handle local messages cache, all messages are sent to the server
      //so message sent from the user will once send to the server and back to the user
      //then only we scroll to the bottom
      setTimeout(scrollToBottom, 300);
    }
  }, [message, roomId, stompClient]);

  const handleKeyPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }, [sendMessage]);

  return (
    <>
      {/* Chatbox area */}
      <aside
        aria-label="Discussion Chatbox"
        className="w-full h-[300px] border rounded shadow-md overflow-hidden bg-white dark:bg-gray-950 flex flex-col justify-between p-4"
      >
        <div id="messagesContainer" className="space-y-4 overflow-auto">
          {/* Messages */}
          {messageList.map((userMessageData, index) => (
            <UserMessage key={index} payload={userMessageData} />
          ))}
        </div>


        {/* Input area */}
        <div className="mt-4 flex items-center space-x-2">
          <input
            aria-label="Type a message"
            className="flex-grow border rounded p-2"
            placeholder="Type a message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button className="text-white" onClick={sendMessage}>
            Send
            &nbsp;
            <Send size={18} />
          </Button>
        </div>

      </aside>
    </>
  )
}

const UserMessage = React.memo(({ payload }: { payload: UserMessageData }) => {
  return (
    <div className="flex items-start space-x-2">
      <UserIcon className="w-4 h-4" />
      <div>
        <p className="font-semibold">{payload.message}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{payload.sender}</p>
        <p className="text-xs text-gray-400">Sent at {payload.sendTime}</p>
      </div>
    </div>
  )
});

const UserIcon = (props: any) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}