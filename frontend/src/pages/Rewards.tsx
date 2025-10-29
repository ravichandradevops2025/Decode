// Rewards redemption page
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Gift, Package, Award } from 'lucide-react';
import toast from 'react-hot-toast';

// Sample reward items
const REWARD_ITEMS = [
  { name: 'Decode T-Shirt', points: 500, icon: '👕', description: 'Premium cotton t-shirt' },
  { name: 'Laptop Stickers Pack', points: 200, icon: '🎨', description: '10 cool stickers' },
  { name: 'Coffee Mug', points: 300, icon: '☕', description: 'Ceramic 12oz mug' },
  { name: 'Wireless Mouse', points: 1000, icon: '🖱️', description: 'Ergonomic design' },
  { name: 'Backpack', points: 1500, icon: '🎒', description: 'Laptop-friendly backpack' },
  { name: 'Gift Card $25', points: 2000, icon: '💳', description: 'Amazon gift card' },
];

export const Rewards: React.FC = () => {
  const { user, profile } = useAuth();
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [shippingAddress, setShippingAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
    setShowRedeemModal(true);
  };

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedItem) return;

    if ((profile?.total_points || 0) < selectedItem.points) {
      toast.error('Insufficient points');
      return;
    }

    setLoading(true);

    // Create redemption request
    const { error: redemptionError } = await supabase.from('redemptions').insert({
      user_id: user.id,
      item_name: selectedItem.name,
      points_cost: selectedItem.points,
      shipping_address: shippingAddress,
      status: 'pending',
    });

    if (redemptionError) {
      toast.error('Failed to create redemption');
      setLoading(false);
      return;
    }

    // Deduct points
    const { error: pointsError } = await supabase.from('points_transactions').insert({
      user_id: user.id,
      amount: -selectedItem.points,
      transaction_type: 'redeemed',
      reference_type: 'redemption',
      description: `Redeemed: ${selectedItem.name}`,
    });

    setLoading(false);

    if (pointsError) {
      toast.error('Failed to deduct points');
    } else {
      toast.success('Redemption request submitted successfully!');
      setShowRedeemModal(false);
      setShippingAddress('');
      // Refresh profile to update points
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Rewards Store</h1>
        <p className="text-gray-600">
          Redeem your points for awesome goodies. You have{' '}
          <span className="font-bold text-primary-600">{profile?.total_points || 0} points</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REWARD_ITEMS.map((item, index) => {
          const canAfford = (profile?.total_points || 0) >= item.points;

          return (
            <Card key={index}>
              <div className="text-center">
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Award size={20} className="text-primary-600" />
                  <span className="text-2xl font-bold text-primary-600">{item.points}</span>
                  <span className="text-gray-600">points</span>
                </div>
                <Button
                  onClick={() => handleSelectItem(item)}
                  disabled={!canAfford}
                  className="w-full"
                  variant={canAfford ? 'primary' : 'secondary'}
                >
                  {canAfford ? 'Redeem' : 'Not Enough Points'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Redeem Modal */}
      <Modal
        isOpen={showRedeemModal}
        onClose={() => setShowRedeemModal(false)}
        title={`Redeem ${selectedItem?.name}`}
        size="md"
      >
        <form onSubmit={handleRedeem} className="space-y-4">
          <div className="text-center mb-4">
            <div className="text-6xl mb-2">{selectedItem?.icon}</div>
            <p className="text-gray-600">
              This will cost <span className="font-bold">{selectedItem?.points} points</span>
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shipping Address
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={4}
              required
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Enter your complete shipping address"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Processing...' : 'Confirm Redemption'}
          </Button>
        </form>
      </Modal>
    </div>
  );
};