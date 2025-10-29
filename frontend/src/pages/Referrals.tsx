// Referrals page
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Referral } from '@/types';
import { UserPlus, CheckCircle, Clock, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const Referrals: React.FC = () => {
  const { user } = useAuth();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newReferral, setNewReferral] = useState({
    candidate_name: '',
    candidate_email: '',
    candidate_phone: '',
    job_title: '',
    company_name: '',
    notes: '',
  });

  useEffect(() => {
    fetchReferrals();
  }, [user]);

  const fetchReferrals = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('referrals')
      .select('*')
      .eq('referrer_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setReferrals(data);
    }
    setLoading(false);
  };

  const handleCreateReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Generate referral code
    const referralCode = `REF-${Date.now().toString(36).toUpperCase()}`;

    const { error } = await supabase.from('referrals').insert({
      referrer_id: user.id,
      ...newReferral,
      referral_code: referralCode,
    });

    if (error) {
      toast.error('Failed to create referral');
    } else {
      toast.success('Referral created successfully!');
      setShowCreateModal(false);
      setNewReferral({
        candidate_name: '',
        candidate_email: '',
        candidate_phone: '',
        job_title: '',
        company_name: '',
        notes: '',
      });
      fetchReferrals();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'hired':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'rejected':
        return <XCircle className="text-red-600" size={20} />;
      case 'interviewing':
        return <Clock className="text-blue-600" size={20} />;
      default:
        return <Clock className="text-yellow-600" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hired':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'interviewing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading referrals...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Referrals</h1>
          <p className="text-gray-600">
            Recommend candidates for jobs and earn bonus points when they get hired
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <UserPlus size={20} className="mr-2" />
          New Referral
        </Button>
      </div>

      {referrals.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <UserPlus size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No referrals yet</h3>
            <p className="text-gray-600 mb-6">
              Start referring candidates to earn bonus points
            </p>
            <Button onClick={() => setShowCreateModal(true)}>Create Your First Referral</Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {referrals.map((referral) => (
            <Card key={referral.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {referral.candidate_name}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                        referral.status
                      )}`}
                    >
                      {referral.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Email:</span> {referral.candidate_email}
                    </p>
                    {referral.job_title && (
                      <p>
                        <span className="font-medium">Position:</span> {referral.job_title}
                      </p>
                    )}
                    {referral.company_name && (
                      <p>
                        <span className="font-medium">Company:</span> {referral.company_name}
                      </p>
                    )}
                    <p>
                      <span className="font-medium">Referral Code:</span> {referral.referral_code}
                    </p>
                    <p>
                      <span className="font-medium">Created:</span>{' '}
                      {new Date(referral.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {referral.notes && (
                    <p className="mt-2 text-sm text-gray-700 italic">{referral.notes}</p>
                  )}
                </div>
                <div className="text-right">
                  {getStatusIcon(referral.status)}
                  {referral.points_awarded > 0 && (
                    <div className="mt-2 text-sm text-green-600 font-medium">
                      +{referral.points_awarded} pts
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Referral Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Referral"
        size="md"
      >
        <form onSubmit={handleCreateReferral} className="space-y-4">
          <Input
            label="Candidate Name"
            required
            value={newReferral.candidate_name}
            onChange={(e) =>
              setNewReferral({ ...newReferral, candidate_name: e.target.value })
            }
          />
          <Input
            label="Candidate Email"
            type="email"
            required
            value={newReferral.candidate_email}
            onChange={(e) =>
              setNewReferral({ ...newReferral, candidate_email: e.target.value })
            }
          />
          <Input
            label="Phone Number"
            value={newReferral.candidate_phone}
            onChange={(e) =>
              setNewReferral({ ...newReferral, candidate_phone: e.target.value })
            }
          />
          <Input
            label="Job Title"
            value={newReferral.job_title}
            onChange={(e) => setNewReferral({ ...newReferral, job_title: e.target.value })}
          />
          <Input
            label="Company Name"
            value={newReferral.company_name}
            onChange={(e) => setNewReferral({ ...newReferral, company_name: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={3}
              value={newReferral.notes}
              onChange={(e) => setNewReferral({ ...newReferral, notes: e.target.value })}
              placeholder="Any additional information about the candidate"
            />
          </div>
          <Button type="submit" className="w-full">
            Create Referral
          </Button>
        </form>
      </Modal>
    </div>
  );
};