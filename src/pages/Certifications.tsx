import React, { useState } from 'react';
import { Award, Shield, ExternalLink, Download, Share2, CheckCircle, Clock, Star } from 'lucide-react';
import AlgorandCertificate from '../components/AlgorandCertificate';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  status: 'earned' | 'in_progress' | 'available';
  blockchainHash?: string;
  description: string;
  skills: string[];
  credentialUrl?: string;
}

const Certifications: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'earned' | 'in_progress' | 'available'>('all');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const certifications: Certification[] = [
    {
      id: '1',
      title: 'Data Science Fundamentals',
      issuer: 'CareerPath AI',
      date: '2024-01-15',
      status: 'earned',
      blockchainHash: 'ALGO_TX_1A2B3C4D5E6F7890ABCDEF1234567890',
      description: 'Comprehensive foundation in data science concepts and practical applications.',
      skills: ['Python', 'Statistics', 'Data Analysis', 'Machine Learning Basics'],
      credentialUrl: 'https://verify.careerpath.ai/cert/1'
    },
    {
      id: '2',
      title: 'Advanced Python Programming',
      issuer: 'CareerPath AI',
      date: '2024-02-20',
      status: 'earned',
      blockchainHash: 'ALGO_TX_2B3C4D5E6F7A8901BCDEF2345678901A',
      description: 'Advanced Python concepts for professional software development.',
      skills: ['Python', 'OOP', 'Data Structures', 'Algorithms'],
      credentialUrl: 'https://verify.careerpath.ai/cert/2'
    },
    {
      id: '3',
      title: 'Machine Learning Specialist',
      issuer: 'CareerPath AI',
      date: '2024-03-10',
      status: 'in_progress',
      description: 'Deep dive into machine learning algorithms and real-world applications.',
      skills: ['Scikit-learn', 'Deep Learning', 'Model Deployment', 'MLOps']
    },
    {
      id: '4',
      title: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2024-04-01',
      status: 'available',
      description: 'Foundation-level understanding of AWS Cloud services and architecture.',
      skills: ['AWS', 'Cloud Computing', 'Infrastructure', 'Security']
    },
    {
      id: '5',
      title: 'Business Intelligence Analytics',
      issuer: 'CareerPath AI',
      date: '2024-04-15',
      status: 'available',
      description: 'Transform data into actionable business insights and strategies.',
      skills: ['SQL', 'Tableau', 'Business Analysis', 'KPI Development']
    }
  ];

  const filteredCertifications = filter === 'all' 
    ? certifications 
    : certifications.filter(cert => cert.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'earned': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'available': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'earned': return <CheckCircle className="w-5 h-5" />;
      case 'in_progress': return <Clock className="w-5 h-5" />;
      case 'available': return <Star className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const handleVerifyBlockchain = (cert: Certification) => {
    if (cert.blockchainHash) {
      setSelectedCert(cert);
    }
  };

  const handleShareCertification = (cert: Certification) => {
    const shareText = `I just earned the "${cert.title}" certification from ${cert.issuer}! 🎉 Verified on Algorand blockchain. #careergoals #certification #blockchain`;
    
    if (navigator.share) {
      navigator.share({
        title: `${cert.title} Certification`,
        text: shareText,
        url: cert.credentialUrl || window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${cert.credentialUrl || window.location.href}`);
      alert('Certification link copied to clipboard! Share on your social media.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-secondary-900">Blockchain Certifications</h1>
          </div>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            Earn verifiable, blockchain-secured certifications that employers trust. 
            All certificates are permanently recorded on the Algorand blockchain.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { key: 'all', label: 'All Certifications', count: certifications.length },
            { key: 'earned', label: 'Earned', count: certifications.filter(c => c.status === 'earned').length },
            { key: 'in_progress', label: 'In Progress', count: certifications.filter(c => c.status === 'in_progress').length },
            { key: 'available', label: 'Available', count: certifications.filter(c => c.status === 'available').length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === tab.key
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-secondary-700 hover:bg-primary-50 border border-secondary-200'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCertifications.map((cert) => (
            <div key={cert.id} className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden hover:shadow-md transition-shadow">
              {/* Certificate Header */}
              <div className="bg-gradient-to-r from-primary-600 to-blue-700 p-6 text-white">
                <div className="flex items-start justify-between mb-3">
                  <Award className="w-8 h-8" />
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(cert.status)}
                      <span className="capitalize">{cert.status.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                <p className="text-primary-100 text-sm">{cert.issuer}</p>
                {cert.date && (
                  <p className="text-primary-100 text-sm">
                    {cert.status === 'earned' ? 'Earned: ' : 'Target: '}{new Date(cert.date).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Certificate Body */}
              <div className="p-6">
                <p className="text-secondary-700 mb-4 text-sm leading-relaxed">
                  {cert.description}
                </p>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-secondary-900 mb-2">Skills Covered:</h4>
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {cert.status === 'earned' && (
                    <>
                      <button
                        onClick={() => handleVerifyBlockchain(cert)}
                        className="flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-2 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
                      >
                        <Shield className="w-3 h-3" />
                        <span>Verify on Algorand</span>
                      </button>
                      <button
                        onClick={() => handleShareCertification(cert)}
                        className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-xs font-medium hover:bg-blue-200 transition-colors"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>Share</span>
                      </button>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-3 py-2 rounded-lg text-xs font-medium hover:bg-purple-200 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>View</span>
                        </a>
                      )}
                    </>
                  )}
                  {cert.status === 'in_progress' && (
                    <button className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-xs font-medium hover:bg-blue-200 transition-colors">
                      <Clock className="w-3 h-3" />
                      <span>Continue</span>
                    </button>
                  )}
                  {cert.status === 'available' && (
                    <button className="flex items-center space-x-1 bg-primary-100 text-primary-700 px-3 py-2 rounded-lg text-xs font-medium hover:bg-primary-200 transition-colors">
                      <Star className="w-3 h-3" />
                      <span>Start</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Blockchain Info */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Algorand Blockchain-Verified Credentials
              </h3>
              <p className="text-secondary-700 mb-3">
                All CareerPath AI certifications are permanently recorded on the Algorand blockchain, 
                ensuring they cannot be forged or tampered with. Employers can instantly verify 
                your credentials using the blockchain transaction hash.
              </p>
              <div className="flex items-center space-x-4 text-sm text-secondary-600">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Tamper-proof</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Instantly verifiable</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Globally recognized</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Eco-friendly blockchain</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Verification Modal */}
        {selectedCert && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Certificate Verification</h2>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="text-gray-500 hover:text-gray-700 p-2"
                  >
                    ×
                  </button>
                </div>
                
                <AlgorandCertificate
                  certificate={{
                    id: selectedCert.id,
                    title: selectedCert.title,
                    recipient: 'John Doe', // This would come from user context
                    issuer: selectedCert.issuer,
                    completionDate: selectedCert.date,
                    blockchainHash: selectedCert.blockchainHash,
                    explorerUrl: `https://testnet.algoexplorer.io/tx/${selectedCert.blockchainHash}`
                  }}
                  onVerify={(isValid) => {
                    console.log('Certificate verification result:', isValid);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certifications;