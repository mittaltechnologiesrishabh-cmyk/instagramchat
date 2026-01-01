// import React, { useState, useRef, useEffect } from 'react';
// import { Send, Phone, Video, Info, Mic, Image, Smile, X, Play, Pause } from 'lucide-react';
// import chatsData from "../data/chats";

// const InstagramChat = () => {
//     const [selectedChat, setSelectedChat] = useState(null);
//     const [messageInput, setMessageInput] = useState('');
//     const [selectedImages, setSelectedImages] = useState([]);
//     const [isRecording, setIsRecording] = useState(false);
//     const [recordingTime, setRecordingTime] = useState(0);
//     const fileInputRef = useRef(null);
//     const messagesEndRef = useRef(null);
//     const recordingIntervalRef = useRef(null);

//     const [chats, setChats] = useState(chatsData);

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     };

//     useEffect(() => {
//         scrollToBottom();
//     }, [selectedChat?.messages]);

//     const handleImageSelect = (e) => {
//         const files = Array.from(e.target.files);
//         const imageUrls = files.map(file => URL.createObjectURL(file));
//         setSelectedImages(prev => [...prev, ...imageUrls]);
//     };

//     const removeImage = (index) => {
//         setSelectedImages(prev => prev.filter((_, i) => i !== index));
//     };

//     const formatTime = (seconds) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${mins}:${secs.toString().padStart(2, '0')}`;
//     };

//     const handleStartRecording = () => {
//         setIsRecording(true);
//         setRecordingTime(0);
//         recordingIntervalRef.current = setInterval(() => {
//             setRecordingTime(prev => prev + 1);
//         }, 1000);
//     };

//     const handleStopRecording = () => {
//         setIsRecording(false);
//         clearInterval(recordingIntervalRef.current);

//         if (recordingTime > 0) {
//             const voiceMessage = {
//                 id: Date.now(),
//                 duration: recordingTime,
//                 sender: 'me',
//                 time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
//                 type: 'voice'
//             };

//             setChats(chats.map(chat =>
//                 chat.id === selectedChat.id
//                     ? {
//                         ...chat,
//                         messages: [...chat.messages, voiceMessage],
//                         lastMessage: '🎤 Voice message',
//                         time: 'now'
//                     }
//                     : chat
//             ));

//             setSelectedChat({
//                 ...selectedChat,
//                 messages: [...selectedChat.messages, voiceMessage]
//             });
//         }

//         setRecordingTime(0);
//     };

//     const handleSendMessage = () => {
//         if (!selectedChat) return;

//         const hasContent = messageInput.trim() || selectedImages.length > 0;
//         if (!hasContent) return;

//         const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

//         if (selectedImages.length > 0) {
//             const imageMessage = {
//                 id: Date.now(),
//                 images: selectedImages,
//                 text: messageInput.trim(),
//                 sender: 'me',
//                 time: time,
//                 type: 'image'
//             };

//             setChats(chats.map(chat =>
//                 chat.id === selectedChat.id
//                     ? {
//                         ...chat,
//                         messages: [...chat.messages, imageMessage],
//                         lastMessage: messageInput.trim() || '📷 Photo',
//                         time: 'now'
//                     }
//                     : chat
//             ));

//             setSelectedChat({
//                 ...selectedChat,
//                 messages: [...selectedChat.messages, imageMessage]
//             });

//             setSelectedImages([]);
//         }
//         else if (messageInput.trim()) {
//             const textMessage = {
//                 id: Date.now(),
//                 text: messageInput,
//                 sender: 'me',
//                 time: time,
//                 type: 'text'
//             };

//             setChats(chats.map(chat =>
//                 chat.id === selectedChat.id
//                     ? {
//                         ...chat,
//                         messages: [...chat.messages, textMessage],
//                         lastMessage: messageInput,
//                         time: 'now'
//                     }
//                     : chat
//             ));

//             setSelectedChat({
//                 ...selectedChat,
//                 messages: [...selectedChat.messages, textMessage]
//             });
//         }

//         setMessageInput('');
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault();
//             handleSendMessage();
//         }
//     };

//     const VoiceMessage = ({ duration, sender }) => {
//         const [isPlaying, setIsPlaying] = useState(false);
//         const [currentTime, setCurrentTime] = useState(0);

//         return (
//             <div className={`flex items-center gap-2 px-3 py-2 rounded-3xl ${sender === 'me' ? 'bg-[#2755ff]' : 'bg-gray-200'
//                 }`}>
//                 <button
//                     onClick={() => setIsPlaying(!isPlaying)}
//                     className={`p-1 rounded-full ${sender === 'me' ? 'bg-white/20' : 'bg-gray-300'
//                         }`}
//                 >
//                     {isPlaying ? (
//                         <Pause className={`w-4 h-4 ${sender === 'me' ? 'text-white' : 'text-gray-700'}`} />
//                     ) : (
//                         <Play className={`w-4 h-4 ${sender === 'me' ? 'text-white' : 'text-gray-700'}`} />
//                     )}
//                 </button>

//                 <div className="flex-1 h-8 flex items-center">
//                     <div className={`flex-1 h-1 rounded-full ${sender === 'me' ? 'bg-white/30' : 'bg-gray-300'
//                         }`}>
//                         <div
//                             className={`h-full rounded-full ${sender === 'me' ? 'bg-white' : 'bg-[#2755ff]'
//                                 }`}
//                             style={{ width: '30%' }}
//                         />
//                     </div>
//                 </div>

//                 <span className={`text-xs ${sender === 'me' ? 'text-white' : 'text-gray-600'}`}>
//                     {formatTime(duration)}
//                 </span>
//             </div>
//         );
//     };

//     return (
//         <div className="flex h-screen bg-white">
//             {/* Sidebar - Chat List */}
//             <div className="w-96 border-r border-gray-200 flex flex-col">
//                 <div className="p-4 border-b border-gray-200">
//                     <h2 className="text-xl font-semibold">Messages</h2>
//                 </div>

//                 <div className="flex-1 overflow-y-auto">
//                     {chats.map(chat => (
//                         <div
//                             key={chat.id}
//                             onClick={() => setSelectedChat(chat)}
//                             className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer transition ${selectedChat?.id === chat.id ? 'bg-gray-100' : ''
//                                 }`}
//                         >
//                             <div className="relative">
//                                 <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2755ff] to-[#4a73ff] flex items-center justify-center text-2xl">
//                                     <img
//                                         src={chat.avatarUrl}
//                                         className="w-14 h-14 rounded-full object-cover"
//                                     />
//                                 </div>
//                                 {chat.online && (
//                                     <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
//                                 )}
//                             </div>

//                             <div className="ml-4 flex-1 min-w-0">
//                                 <div className="flex justify-between items-baseline">
//                                     <h3 className="font-semibold text-sm truncate">{chat.user}</h3>
//                                     <span className="text-xs text-gray-500 ml-2">{chat.time}</span>
//                                 </div>
//                                 <div className="flex items-center justify-between">
//                                     <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
//                                     {chat.unread > 0 && (
//                                         <span className="ml-2 bg-[#2755ff] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                                             {chat.unread}
//                                         </span>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Main Chat Window */}
//             {selectedChat ? (
//                 <>
//                 <div className="flex-1 flex flex-col">
//                     {/* Chat Header */}
//                     <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
//                         <div className="flex items-center">
//                             <div className="relative">
//                                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2755ff] to-[#4a73ff] flex items-center justify-center text-xl">
//                                     <img
//                                         src={selectedChat.avatarUrl}
//                                         className="w-10 h-10 rounded-full object-cover"
//                                     />
//                                 </div>
//                                 {selectedChat.online && (
//                                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
//                                 )}
//                             </div>
//                             <div className="ml-3">
//                                 <h3 className="font-semibold">{selectedChat.user}</h3>
//                                 <p className="text-xs text-gray-500">
//                                     {selectedChat.online ? 'Active now' : 'Offline'}
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="flex gap-4">
//                             <button className="p-2 hover:bg-gray-100 rounded-full transition">
//                                 <Phone className="w-5 h-5 text-[#2755ff]" />
//                             </button>
//                             <button className="p-2 hover:bg-gray-100 rounded-full transition">
//                                 <Video className="w-5 h-5 text-[#2755ff]" />
//                             </button>
//                             <button className="p-2 hover:bg-gray-100 rounded-full transition">
//                                 <Info className="w-5 h-5 text-[#2755ff]" />
//                             </button>
//                         </div>
//                     </div>

//                     {/* Messages */}
//                     <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
//                         {selectedChat.messages.map(message => (
//                             <div
//                                 key={message.id}
//                                 className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
//                             >
//                                 {message.type === 'image' ? (
//                                     <div className={`max-w-xs lg:max-w-md ${message.sender === 'me' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
//                                         <div className={`grid ${message.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-1`}>
//                                             {message.images.map((img, idx) => (
//                                                 <img
//                                                     key={idx}
//                                                     src={img}
//                                                     alt="Shared"
//                                                     className="rounded-2xl max-h-64 object-cover"
//                                                 />
//                                             ))}
//                                         </div>
//                                         {message.text && (
//                                             <div className={`px-4 py-2 rounded-3xl ${message.sender === 'me'
//                                                     ? 'bg-[#2755ff] text-white'
//                                                     : 'bg-gray-200 text-gray-900'
//                                                 }`}>
//                                                 <p className="text-sm">{message.text}</p>
//                                             </div>
//                                         )}
//                                         <p className={`text-xs px-2 ${message.sender === 'me' ? 'text-gray-500' : 'text-gray-500'
//                                             }`}>
//                                             {message.time}
//                                         </p>
//                                     </div>
//                                 ) : message.type === 'voice' ? (
//                                     <div className="flex flex-col gap-1">
//                                         <VoiceMessage duration={message.duration} sender={message.sender} />
//                                         <p className={`text-xs px-2 ${message.sender === 'me' ? 'text-gray-500 text-right' : 'text-gray-500'
//                                             }`}>
//                                             {message.time}
//                                         </p>
//                                     </div>
//                                 ) : (
//                                     <div
//                                         className={`max-w-xs lg:max-w-md px-4 py-2 rounded-3xl ${message.sender === 'me'
//                                                 ? 'bg-[#2755ff] text-white'
//                                                 : 'bg-gray-200 text-gray-900'
//                                             }`}
//                                     >
//                                         <p className="text-sm">{message.text}</p>
//                                         <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
//                                             }`}>
//                                             {message.time}
//                                         </p>
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                         <div ref={messagesEndRef} />
//                     </div>

//                     {/* Image Preview Section */}
//                     {selectedImages.length > 0 && (
//                         <div className="p-4 border-t border-gray-200 bg-gray-50">
//                             <div className="flex gap-2 overflow-x-auto pb-2">
//                                 {selectedImages.map((img, index) => (
//                                     <div key={index} className="relative flex-shrink-0">
//                                         <img
//                                             src={img}
//                                             alt={`Selected ${index + 1}`}
//                                             className="w-20 h-20 object-cover rounded-lg"
//                                         />
//                                         <button
//                                             onClick={() => removeImage(index)}
//                                             className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-1 hover:bg-gray-900"
//                                         >
//                                             <X className="w-3 h-3" />
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Recording Indicator */}
//                     {isRecording && (
//                         <div className="p-4 bg-red-50 border-t border-red-200">
//                             <div className="flex items-center justify-center gap-3">
//                                 <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//                                 <span className="text-red-600 font-medium">Recording... {formatTime(recordingTime)}</span>
//                             </div>
//                         </div>
//                     )}

//                     {/* Message Input */}
//                     <div className="p-4 border-t border-gray-200 bg-white">
//                         <div className="flex items-center gap-2">
//                             <input
//                                 ref={fileInputRef}
//                                 type="file"
//                                 multiple
//                                 accept="image/*"
//                                 onChange={handleImageSelect}
//                                 className="hidden"
//                             />
//                             <button
//                                 onClick={() => fileInputRef.current.click()}
//                                 className="p-2 hover:bg-gray-100 rounded-full transition"
//                             >
//                                 <Image className="w-6 h-6 text-[#2755ff]" />
//                             </button>
//                             <button className="p-2 hover:bg-gray-100 rounded-full transition">
//                                 <Smile className="w-6 h-6 text-[#2755ff]" />
//                             </button>

//                             <input
//                                 type="text"
//                                 value={messageInput}
//                                 onChange={(e) => setMessageInput(e.target.value)}
//                                 onKeyPress={handleKeyPress}
//                                 placeholder="Message..."
//                                 className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#2755ff]"
//                             />

//                             {messageInput.trim() || selectedImages.length > 0 ? (
//                                 <button
//                                     onClick={handleSendMessage}
//                                     className="p-2 hover:bg-[#2755ff]/10 rounded-full transition"
//                                 >
//                                     <Send className="w-6 h-6 text-[#2755ff] fill-[#2755ff]" />
//                                 </button>
//                             ) : (
//                                 <button
//                                     onMouseDown={handleStartRecording}
//                                     onMouseUp={handleStopRecording}
//                                     onMouseLeave={isRecording ? handleStopRecording : undefined}
//                                     className={`p-2 rounded-full transition ${isRecording ? 'bg-red-500' : 'hover:bg-gray-100'
//                                         }`}
//                                 >
//                                     <Mic className={`w-6 h-6 ${isRecording ? 'text-white' : 'text-[#2755ff]'}`} />
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//                 </>
//             ) : (
//                 <div className="flex-1 flex items-center justify-center bg-gray-50">
//                     <div className="text-center">
//                         <div className="text-6xl mb-4">💬</div>
//                         <h3 className="text-2xl font-semibold mb-2">Your Messages</h3>
//                         <p className="text-gray-500">Select a chat to start messaging</p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default InstagramChat;

import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, Info, Mic, Image, Smile, X, Play, Pause } from 'lucide-react';

const InstagramChat = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);

    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const recordingIntervalRef = useRef(null);
    const emojiPickerRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const [chats, setChats] = useState([
        {
            id: 1,
            user: 'Sarah Johnson',
            avatar: '👩',
            lastMessage: 'See you tomorrow!',
            time: '2m',
            unread: 2,
            online: true,
            messages: [
                { id: 1, text: 'Hey! How are you?', sender: 'them', time: '10:30 AM', type: 'text' },
                { id: 2, text: 'I\'m good! How about you?', sender: 'me', time: '10:32 AM', type: 'text' },
                { id: 3, text: 'Doing great! Want to meet tomorrow?', sender: 'them', time: '10:35 AM', type: 'text' },
                { id: 4, text: 'Sure! What time works for you?', sender: 'me', time: '10:36 AM', type: 'text' },
                { id: 5, text: 'See you tomorrow!', sender: 'them', time: '10:40 AM', type: 'text' }
            ]
        },
        {
            id: 2,
            user: 'Mike Chen',
            avatar: '👨',
            lastMessage: 'Thanks for the help!',
            time: '1h',
            unread: 0,
            online: false,
            messages: [
                { id: 1, text: 'Could you help me with the project?', sender: 'them', time: '9:15 AM', type: 'text' },
                { id: 2, text: 'Of course! What do you need?', sender: 'me', time: '9:20 AM', type: 'text' },
                { id: 3, text: 'Thanks for the help!', sender: 'them', time: '9:45 AM', type: 'text' }
            ]
        },
        {
            id: 3,
            user: 'Emma Wilson',
            avatar: '👩‍🦰',
            lastMessage: 'That sounds amazing!',
            time: '3h',
            unread: 0,
            online: true,
            messages: [
                { id: 1, text: 'Check out this new restaurant', sender: 'me', time: '8:00 AM', type: 'text' },
                { id: 2, text: 'That sounds amazing!', sender: 'them', time: '8:30 AM', type: 'text' }
            ]
        }
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [selectedChat?.messages]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const emojis = [
        '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊',
        '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '🥲', '😋', '😛', '😜',
        '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶',
        '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒',
        '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '😶‍🌫️', '🥴', '😵', '🤯', '🤠', '🥳',
        '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺',
        '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓',
        '👍', '👎', '👊', '✊', '🤛', '🤜', '🤞', '✌️', '🤟', '🤘', '👌', '🤌',
        '🤏', '👈', '👉', '👆', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👏',
        '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵',
        '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❤️‍🔥', '❤️‍🩹',
        '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️',
        '🔥', '💯', '✨', '🌟', '⭐', '💫', '⚡', '💥', '💢', '💨', '💦', '💤'
    ];

    const handleEmojiSelect = (emoji) => {
        setMessageInput(prev => prev + emoji);
        setShowEmojiPicker(false);
    };

    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setSelectedImages(prev => [...prev, ...imageUrls]);
    };

    const removeImage = (index) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStartRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                setAudioBlob(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setRecordingTime(0);

            recordingIntervalRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Please allow microphone access to record voice messages');
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            clearInterval(recordingIntervalRef.current);
        }
    };

    useEffect(() => {
        if (audioBlob && recordingTime > 0) {
            const audioUrl = URL.createObjectURL(audioBlob);
            const voiceMessage = {
                id: Date.now(),
                audioUrl: audioUrl,
                duration: recordingTime,
                sender: 'me',
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                type: 'voice'
            };

            setChats(chats.map(chat =>
                chat.id === selectedChat.id
                    ? {
                        ...chat,
                        messages: [...chat.messages, voiceMessage],
                        lastMessage: '🎤 Voice message',
                        time: 'now'
                    }
                    : chat
            ));

            setSelectedChat({
                ...selectedChat,
                messages: [...selectedChat.messages, voiceMessage]
            });

            setAudioBlob(null);
            setRecordingTime(0);
        }
    }, [audioBlob]);

    const handleSendMessage = () => {
        if (!selectedChat) return;

        const hasContent = messageInput.trim() || selectedImages.length > 0;
        if (!hasContent) return;

        const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        if (selectedImages.length > 0) {
            const imageMessage = {
                id: Date.now(),
                images: selectedImages,
                text: messageInput.trim(),
                sender: 'me',
                time: time,
                type: 'image'
            };

            setChats(chats.map(chat =>
                chat.id === selectedChat.id
                    ? {
                        ...chat,
                        messages: [...chat.messages, imageMessage],
                        lastMessage: messageInput.trim() || '📷 Photo',
                        time: 'now'
                    }
                    : chat
            ));

            setSelectedChat({
                ...selectedChat,
                messages: [...selectedChat.messages, imageMessage]
            });

            setSelectedImages([]);
        }
        else if (messageInput.trim()) {
            const textMessage = {
                id: Date.now(),
                text: messageInput,
                sender: 'me',
                time: time,
                type: 'text'
            };

            setChats(chats.map(chat =>
                chat.id === selectedChat.id
                    ? {
                        ...chat,
                        messages: [...chat.messages, textMessage],
                        lastMessage: messageInput,
                        time: 'now'
                    }
                    : chat
            ));

            setSelectedChat({
                ...selectedChat,
                messages: [...selectedChat.messages, textMessage]
            });
        }

        setMessageInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const VoiceMessage = ({ audioUrl, duration, sender }) => {
        const [isPlaying, setIsPlaying] = useState(false);
        const [currentTime, setCurrentTime] = useState(0);
        const audioRef = useRef(null);

        useEffect(() => {
            if (audioUrl) {
                audioRef.current = new Audio(audioUrl);

                audioRef.current.addEventListener('timeupdate', () => {
                    setCurrentTime(audioRef.current.currentTime);
                });

                audioRef.current.addEventListener('ended', () => {
                    setIsPlaying(false);
                    setCurrentTime(0);
                });

                return () => {
                    if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current = null;
                    }
                };
            }
        }, [audioUrl]);

        const togglePlayPause = () => {
            if (audioRef.current) {
                if (isPlaying) {
                    audioRef.current.pause();
                } else {
                    audioRef.current.play();
                }
                setIsPlaying(!isPlaying);
            }
        };

        const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

        return (
            <div className={`flex items-center gap-2 px-3 py-2 rounded-3xl min-w-[200px] ${sender === 'me' ? 'bg-[#2755ff]' : 'bg-gray-200'
                }`}>
                <button
                    onClick={togglePlayPause}
                    className={`p-1 rounded-full flex-shrink-0 ${sender === 'me' ? 'bg-white/20' : 'bg-gray-300'
                        }`}
                >
                    {isPlaying ? (
                        <Pause className={`w-4 h-4 ${sender === 'me' ? 'text-white' : 'text-gray-700'}`} />
                    ) : (
                        <Play className={`w-4 h-4 ${sender === 'me' ? 'text-white' : 'text-gray-700'}`} />
                    )}
                </button>

                <div className="flex-1 h-8 flex items-center">
                    <div className={`flex-1 h-1 rounded-full ${sender === 'me' ? 'bg-white/30' : 'bg-gray-300'
                        }`}>
                        <div
                            className={`h-full rounded-full transition-all ${sender === 'me' ? 'bg-white' : 'bg-[#2755ff]'
                                }`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <span className={`text-xs flex-shrink-0 ${sender === 'me' ? 'text-white' : 'text-gray-600'}`}>
                    {formatTime(isPlaying ? Math.floor(currentTime) : duration)}
                </span>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Sidebar - Chat List */}
            <div className="w-96 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Messages</h2>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChat(chat)}
                            className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer transition ${selectedChat?.id === chat.id ? 'bg-gray-100' : ''
                                }`}
                        >
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2755ff] to-[#4a73ff] flex items-center justify-center text-2xl">
                                    {chat.avatar}
                                </div>
                                {chat.online && (
                                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                )}
                            </div>

                            <div className="ml-4 flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-semibold text-sm truncate">{chat.user}</h3>
                                    <span className="text-xs text-gray-500 ml-2">{chat.time}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                                    {chat.unread > 0 && (
                                        <span className="ml-2 bg-[#2755ff] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {chat.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
            </div>

            {/* Main Chat Window */}
            {selectedChat ? (
                <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                        <div className="flex items-center">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2755ff] to-[#4a73ff] flex items-center justify-center text-xl">
                                    {selectedChat.avatar}
                                </div>
                                {selectedChat.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                )}
                            </div>
                            <div className="ml-3">
                                <h3 className="font-semibold">{selectedChat.user}</h3>
                                <p className="text-xs text-gray-500">
                                    {selectedChat.online ? 'Active now' : 'Offline'}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="p-2 hover:bg-gray-100 rounded-full transition">
                                <Phone className="w-5 h-5 text-[#2755ff]" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-full transition">
                                <Video className="w-5 h-5 text-[#2755ff]" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-full transition">
                                <Info className="w-5 h-5 text-[#2755ff]" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {selectedChat.messages.map(message => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                            >
                                {message.type === 'image' ? (
                                    <div className={`max-w-xs lg:max-w-md ${message.sender === 'me' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                                        <div className={`grid ${message.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-1`}>
                                            {message.images.map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt="Shared"
                                                    className="rounded-2xl max-h-64 object-cover"
                                                />
                                            ))}
                                        </div>
                                        {message.text && (
                                            <div className={`px-4 py-2 rounded-3xl ${message.sender === 'me'
                                                    ? 'bg-[#2755ff] text-white'
                                                    : 'bg-gray-200 text-gray-900'
                                                }`}>
                                                <p className="text-sm">{message.text}</p>
                                            </div>
                                        )}
                                        <p className={`text-xs px-2 ${message.sender === 'me' ? 'text-gray-500' : 'text-gray-500'
                                            }`}>
                                            {message.time}
                                        </p>
                                    </div>
                                ) : message.type === 'voice' ? (
                                    <div className="flex flex-col gap-1">
                                        <VoiceMessage audioUrl={message.audioUrl} duration={message.duration} sender={message.sender} />
                                        <p className={`text-xs px-2 ${message.sender === 'me' ? 'text-gray-500 text-right' : 'text-gray-500'
                                            }`}>
                                            {message.time}
                                        </p>
                                    </div>
                                ) : (
                                    <div
                                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-3xl ${message.sender === 'me'
                                                ? 'bg-[#2755ff] text-white'
                                                : 'bg-gray-200 text-gray-900'
                                            }`}
                                    >
                                        <p className="text-sm">{message.text}</p>
                                        <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                                            }`}>
                                            {message.time}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Image Preview Section */}
                    {selectedImages.length > 0 && (
                        <div className="p-4 border-t border-gray-200 bg-gray-50">
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {selectedImages.map((img, index) => (
                                    <div key={index} className="relative flex-shrink-0">
                                        <img
                                            src={img}
                                            alt={`Selected ${index + 1}`}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full p-1 hover:bg-gray-900"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recording Indicator */}
                    {isRecording && (
                        <div className="p-4 bg-red-50 border-t border-red-200">
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                <span className="text-red-600 font-medium">Recording... {formatTime(recordingTime)}</span>
                                <button
                                    onClick={handleStopRecording}
                                    className="ml-4 px-4 py-1 bg-red-500 text-white rounded-full text-sm hover:bg-red-600"
                                >
                                    Stop & Send
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-200 bg-white relative">
                        {/* Emoji Picker */}
                        {showEmojiPicker && (
                            <div
                                ref={emojiPickerRef}
                                className="absolute bottom-20 left-4 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-80 h-80 overflow-y-auto z-50"
                            >
                                <div className="grid grid-cols-8 gap-2">
                                    {emojis.map((emoji, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleEmojiSelect(emoji)}
                                            className="text-2xl hover:bg-gray-100 rounded-lg p-2 transition"
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageSelect}
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current.click()}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                <Image className="w-6 h-6 text-[#2755ff]" />
                            </button>
                            <button
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                <Smile className="w-6 h-6 text-[#2755ff]" />
                            </button>

                            <input
                                type="text"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Message..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#2755ff]"
                            />

                            {messageInput.trim() || selectedImages.length > 0 ? (
                                <button
                                    onClick={handleSendMessage}
                                    className="p-2 hover:bg-[#2755ff]/10 rounded-full transition"
                                >
                                    <Send className="w-6 h-6 text-[#2755ff] fill-[#2755ff]" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleStartRecording}
                                    disabled={isRecording}
                                    className={`p-2 rounded-full transition ${isRecording ? 'bg-red-500 cursor-not-allowed' : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <Mic className={`w-6 h-6 ${isRecording ? 'text-white' : 'text-[#2755ff]'}`} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <div className="text-6xl mb-4">💬</div>
                        <h3 className="text-2xl font-semibold mb-2">Your Messages</h3>
                        <p className="text-gray-500">Select a chat to start messaging</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InstagramChat;