import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiCheckCircle, FiXCircle, FiAward, FiCalendar, FiUser, FiBookOpen } from 'react-icons/fi';
import api from '../services/api';
import PageTransition from '../components/common/PageTransition';
import { fadeIn } from '../animations/index';

const VerifyCertificate = () => {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setResult(null);
    setError('');
    try {
      const res = await api.post('/certificates/verify', { certificateId: code.trim() });
      setResult(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setResult({ valid: false, message: err.response.data.message });
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Verify Certificate | Pacific Barista Academy</title>
        <meta name="description" content="Verify the authenticity of Pacific Barista Academy certificates. Enter your certificate code to verify." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative z-10 pt-32 pb-20">
          <div className="container-custom">
            <motion.div variants={fadeIn('up')} initial="hidden" animate="show" className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block text-accent font-body font-semibold text-sm uppercase tracking-[0.2em] mb-4">Certificate Verification</span>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-cream leading-tight mb-6">
                Verify a <span className="text-accent">Certificate</span>
              </h1>
              <p className="font-body text-cream/80 text-lg md:text-xl leading-relaxed">
                Enter the certificate ID to verify its authenticity. Employers and recruiters can use this to confirm a candidate's credentials.
              </p>
            </motion.div>

            <motion.div variants={fadeIn('up', 0.2)} initial="hidden" animate="show" className="max-w-xl mx-auto">
              <form onSubmit={handleVerify} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="Enter certificate ID (e.g. PBC-XXXX-XXXX)"
                    className="flex-1 px-4 py-3 bg-cream border border-primary/10 rounded-xl text-text font-body text-sm outline-none focus:border-accent transition-colors uppercase tracking-wider"
                  />
                  <button
                    type="submit"
                    disabled={loading || !code.trim()}
                    className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors font-body font-medium disabled:opacity-60 flex items-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <><FiSearch className="w-4 h-4" /> Verify</>
                    )}
                  </button>
                </div>
              </form>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-center"
                  >
                    <p className="font-body text-red-600 text-sm">{error}</p>
                  </motion.div>
                )}

                {result && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mt-6"
                  >
                    {result.valid ? (
                      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-emerald-400">
                        <div className="text-center mb-6">
                          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <FiCheckCircle className="w-8 h-8 text-emerald-500" />
                          </div>
                          <h2 className="font-heading text-2xl font-bold text-emerald-600">Valid Certificate</h2>
                          <p className="font-body text-emerald-600/60 text-sm mt-1">This certificate is authentic and verified</p>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl">
                            <FiAward className="w-5 h-5 text-emerald-500 shrink-0" />
                            <div>
                              <p className="font-body text-xs text-emerald-600/60 uppercase tracking-wider">Certificate ID</p>
                              <p className="font-body font-semibold text-emerald-700">{result.certificate.certificateId}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl">
                            <FiUser className="w-5 h-5 text-emerald-500 shrink-0" />
                            <div>
                              <p className="font-body text-xs text-emerald-600/60 uppercase tracking-wider">Student Name</p>
                              <p className="font-body font-semibold text-emerald-700">{result.certificate.studentName}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl">
                            <FiBookOpen className="w-5 h-5 text-emerald-500 shrink-0" />
                            <div>
                              <p className="font-body text-xs text-emerald-600/60 uppercase tracking-wider">Course</p>
                              <p className="font-body font-semibold text-emerald-700">{result.certificate.courseName}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl">
                            <FiCalendar className="w-5 h-5 text-emerald-500 shrink-0" />
                            <div>
                              <p className="font-body text-xs text-emerald-600/60 uppercase tracking-wider">Issue Date</p>
                              <p className="font-body font-semibold text-emerald-700">
                                {new Date(result.certificate.issueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                              </p>
                            </div>
                          </div>
                          {result.certificate.grade && (
                            <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl">
                              <FiAward className="w-5 h-5 text-emerald-500 shrink-0" />
                              <div>
                                <p className="font-body text-xs text-emerald-600/60 uppercase tracking-wider">Grade</p>
                                <p className="font-body font-semibold text-emerald-700">{result.certificate.grade}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mt-6 pt-4 border-t border-emerald-200 text-center">
                          <p className="font-body text-xs text-emerald-600/40">
                            Issued by Pacific Barista Academy
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 ${result.certificate?.status === 'Revoked' ? 'border-red-400' : 'border-red-400'}`}>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <FiXCircle className="w-8 h-8 text-red-500" />
                          </div>
                          <h2 className="font-heading text-2xl font-bold text-red-600">
                            {result.certificate?.status === 'Revoked' ? 'Certificate Revoked' : 'Not Found'}
                          </h2>
                          <p className="font-body text-red-600/60 text-sm mt-2">
                            {result.certificate?.status === 'Revoked'
                              ? 'This certificate has been revoked and is no longer valid.'
                              : result.message || 'No certificate matches this ID.'}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default VerifyCertificate;
