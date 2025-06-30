import React, { useState } from 'react';
import { Shield, Check, ExternalLink, Copy, AlertCircle, Loader } from 'lucide-react';
import { algorandService } from '../utils/algorand';

interface Certificate {
  id: string;
  title: string;
  recipient: string;
  issuer: string;
  completionDate: string;
  blockchainHash?: string;
  explorerUrl?: string;
}

interface AlgorandCertificateProps {
  certificate: Certificate;
  onVerify?: (isValid: boolean) => void;
}

const AlgorandCertificate: React.FC<AlgorandCertificateProps> = ({ certificate, onVerify }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    blockHeight?: number;
    timestamp?: number;
  } | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleVerify = async () => {
    if (!certificate.blockchainHash) return;

    setIsVerifying(true);
    try {
      const result = await algorandService.verifyCertificate(certificate.blockchainHash);
      setVerificationResult(result);
      onVerify?.(result.isValid);
    } catch (error) {
      console.error('Verification failed:', error);
      setVerificationResult({ isValid: false });
      onVerify?.(false);
    } finally {
      setIsVerifying(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border-2 border-blue-200 overflow-hidden">
      {/* Certificate Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Blockchain Certificate</h3>
              <p className="text-blue-100">Verified on Algorand</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-2">{certificate.title}</h2>
          <p className="text-blue-100">Awarded to {certificate.recipient}</p>
        </div>
      </div>

      {/* Certificate Body */}
      <div className="p-6 space-y-4">
        {/* Certificate Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Issued By</label>
            <p className="text-gray-900 font-semibold">{certificate.issuer}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Completion Date</label>
            <p className="text-gray-900 font-semibold">{formatDate(certificate.completionDate)}</p>
          </div>
        </div>

        {/* Blockchain Information */}
        {certificate.blockchainHash && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Blockchain Verification</span>
              </h4>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {showDetails ? 'Hide' : 'Show'} Details
              </button>
            </div>

            {showDetails && (
              <div className="space-y-2">
                <div>
                  <label className="text-xs font-medium text-gray-500">Transaction Hash</label>
                  <div className="flex items-center space-x-2">
                    <code className="text-xs bg-white px-2 py-1 rounded border font-mono">
                      {certificate.blockchainHash.substring(0, 20)}...
                    </code>
                    <button
                      onClick={() => copyToClipboard(certificate.blockchainHash!)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Copy className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                </div>

                {verificationResult && (
                  <div className="space-y-1">
                    <div>
                      <label className="text-xs font-medium text-gray-500">Block Height</label>
                      <p className="text-xs text-gray-700">{verificationResult.blockHeight}</p>
                    </div>
                    {verificationResult.timestamp && (
                      <div>
                        <label className="text-xs font-medium text-gray-500">Block Timestamp</label>
                        <p className="text-xs text-gray-700">
                          {new Date(verificationResult.timestamp * 1000).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Verification Status */}
        {verificationResult && (
          <div className={`p-4 rounded-lg border-2 ${
            verificationResult.isValid 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center space-x-2">
              {verificationResult.isValid ? (
                <>
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Certificate Verified</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-800">Verification Failed</span>
                </>
              )}
            </div>
            <p className={`text-sm mt-1 ${
              verificationResult.isValid ? 'text-green-700' : 'text-red-700'
            }`}>
              {verificationResult.isValid 
                ? 'This certificate is authentic and has been verified on the Algorand blockchain.'
                : 'This certificate could not be verified. It may be invalid or the blockchain data is unavailable.'
              }
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {certificate.blockchainHash && (
            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {isVerifying ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Verify on Blockchain</span>
                </>
              )}
            </button>
          )}

          {certificate.explorerUrl && (
            <a
              href={certificate.explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View on Explorer</span>
            </a>
          )}

          <button
            onClick={() => copyToClipboard(window.location.href)}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Copy className="w-4 h-4" />
            <span>Share Certificate</span>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h5 className="font-semibold text-blue-900 mb-2">Why Blockchain Verification Matters</h5>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Tamper-proof: Cannot be altered or forged</li>
            <li>• Permanent: Stored forever on the blockchain</li>
            <li>• Transparent: Publicly verifiable by anyone</li>
            <li>• Instant: Real-time verification worldwide</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlgorandCertificate;