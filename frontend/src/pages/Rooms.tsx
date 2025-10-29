// Decode Rooms listing page
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Room } from '@/types';
import { Users, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export const Rooms: React.FC = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: '',
    description: '',
    project_type: 'fullstack',
    max_participants: 6,
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const { data, error } = await supabase
      .from('rooms')
      .select('*, room_participants(count)')
      .in('status', ['open', 'in_progress'])
      .order('created_at', { ascending: false });

    if (!error && data) {
      setRooms(data);
    }
    setLoading(false);
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { data: roomData, error: roomError } = await supabase
      .from('rooms')
      .insert({
        ...newRoom,
        created_by: user.id,
      })
      .select()
      .single();

    if (roomError) {
      toast.error('Failed to create room');
      return;
    }

    // Add creator as owner
    await supabase.from('room_participants').insert({
      room_id: roomData.id,
      user_id: user.id,
      role: 'owner',
    });

    toast.success('Room created successfully!');
    setShowCreateModal(false);
    fetchRooms();
    setNewRoom({ name: '', description: '', project_type: 'fullstack', max_participants: 6 });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading rooms...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Decode Rooms</h1>
          <p className="text-gray-600">Join project collaboration spaces and build together</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus size={20} className="mr-2" />
          Create Room
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room: any) => (
          <Card key={room.id}>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                    room.status
                  )}`}
                >
                  {room.status.replace('_', ' ')}
                </span>
                <span className="text-sm text-gray-600 capitalize">{room.project_type}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{room.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {room.description || 'No description'}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <Users size={16} className="mr-1" />
                {room.room_participants?.[0]?.count || 0} / {room.max_participants}
              </div>
              <Link to={`/rooms/${room.id}`}>
                <Button size="sm">Join Room</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {rooms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No rooms available yet.</p>
          <Button onClick={() => setShowCreateModal(true)}>Create the First Room</Button>
        </div>
      )}

      {/* Create Room Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Room"
        size="md"
      >
        <form onSubmit={handleCreateRoom} className="space-y-4">
          <Input
            label="Room Name"
            required
            value={newRoom.name}
            onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
            placeholder="e.g., E-commerce Platform Build"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={3}
              value={newRoom.description}
              onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
              placeholder="Describe the project and goals"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Type
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={newRoom.project_type}
              onChange={(e) => setNewRoom({ ...newRoom, project_type: e.target.value })}
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Full Stack</option>
              <option value="design">Design</option>
            </select>
          </div>
          <Input
            label="Max Participants"
            type="number"
            min={2}
            max={20}
            value={newRoom.max_participants}
            onChange={(e) =>
              setNewRoom({ ...newRoom, max_participants: parseInt(e.target.value) })
            }
          />
          <Button type="submit" className="w-full">
            Create Room
          </Button>
        </form>
      </Modal>
    </div>
  );
};