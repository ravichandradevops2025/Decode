// Decode Room detail with real-time chat
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Room, RoomParticipant, RoomMessage } from '@/types';
import { Send, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { RealtimeChannel } from '@supabase/supabase-js';

export const RoomDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, profile } = useAuth();
  const [room, setRoom] = useState<Room | null>(null);
  const [participants, setParticipants] = useState<RoomParticipant[]>([]);
  const [messages, setMessages] = useState<RoomMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isParticipant, setIsParticipant] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (id) {
      fetchRoomData();
      subscribeToMessages();
    }

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [id, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchRoomData = async () => {
    if (!id) return;

    // Fetch room
    const { data: roomData, error: roomError } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', id)
      .single();

    if (roomError) {
      toast.error('Room not found');
      return;
    }

    setRoom(roomData);

    // Fetch participants
    const { data: participantsData } = await supabase
      .from('room_participants')
      .select('*, profile:profiles(*)')
      .eq('room_id', id);

    setParticipants(participantsData || []);

    // Check if current user is participant
    const userParticipant = participantsData?.find((p) => p.user_id === user?.id);
    setIsParticipant(!!userParticipant);

    // Fetch messages if participant
    if (userParticipant) {
      fetchMessages();
    }

    setLoading(false);
  };

  const fetchMessages = async () => {
    if (!id) return;

    const { data } = await supabase
      .from('room_messages')
      .select('*, profile:profiles(*)')
      .eq('room_id', id)
      .order('created_at', { ascending: true });

    setMessages(data || []);
  };

  const subscribeToMessages = () => {
    if (!id) return;

    // Subscribe to real-time messages
    channelRef.current = supabase
      .channel(`room:${id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'room_messages',
          filter: `room_id=eq.${id}`,
        },
        async (payload) => {
          // Fetch the complete message with profile
          const { data } = await supabase
            .from('room_messages')
            .select('*, profile:profiles(*)')
            .eq('id', payload.new.id)
            .single();

          if (data) {
            setMessages((prev) => [...prev, data]);
          }
        }
      )
      .subscribe();
  };

  const handleJoinRoom = async () => {
    if (!user || !id) return;

    const { error } = await supabase.from('room_participants').insert({
      room_id: id,
      user_id: user.id,
      role: 'member',
    });

    if (error) {
      toast.error('Failed to join room');
    } else {
      toast.success('Joined room successfully!');
      fetchRoomData();
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !id || !newMessage.trim()) return;

    const { error } = await supabase.from('room_messages').insert({
      room_id: id,
      user_id: user.id,
      content: newMessage,
      message_type: 'chat',
    });

    if (error) {
      toast.error('Failed to send message');
    } else {
      setNewMessage('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading || !room) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading room...</p>
      </div>
    );
  }

  if (!isParticipant) {
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <Card>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{room.name}</h2>
            <p className="text-gray-600 mb-6">{room.description}</p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mb-6">
              <div>
                <span className="font-medium">Type:</span> {room.project_type}
              </div>
              <div>
                <span className="font-medium">Participants:</span> {participants.length} /{' '}
                {room.max_participants}
              </div>
            </div>
            <Button
              onClick={handleJoinRoom}
              disabled={participants.length >= room.max_participants}
            >
              {participants.length >= room.max_participants ? 'Room Full' : 'Join Room'}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-4 gap-6">
        {/* Main Chat Area */}
        <div className="md:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{room.name}</h2>
              <p className="text-gray-600 text-sm">{room.description}</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message: any) => {
                const isOwnMessage = message.user_id === user?.id;

                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] ${
                        isOwnMessage ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-900'
                      } rounded-lg p-3`}
                    >
                      {!isOwnMessage && (
                        <div className="text-xs font-medium mb-1">
                          {message.profile?.full_name || message.profile?.username}
                        </div>
                      )}
                      <div className="text-sm">{message.content}</div>
                      <div
                        className={`text-xs mt-1 ${
                          isOwnMessage ? 'text-primary-100' : 'text-gray-500'
                        }`}
                      >
                        {new Date(message.created_at).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button type="submit">
                <Send size={20} />
              </Button>
            </form>
          </Card>
        </div>

        {/* Participants Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <div className="flex items-center space-x-2 mb-4">
              <Users size={20} className="text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Participants ({participants.length})
              </h3>
            </div>
            <div className="space-y-3">
              {participants.map((participant: any) => (
                <div key={participant.id} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium">
                    {participant.profile?.full_name?.[0] ||
                      participant.profile?.username[0].toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">
                      {participant.profile?.full_name || participant.profile?.username}
                      {participant.role === 'owner' && (
                        <span className="ml-1 text-xs text-primary-600">(Owner)</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">
                      @{participant.profile?.username}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};