import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiBookOpen, FiCalendar, FiShield, FiArrowLeft } from 'react-icons/fi';
import api from '../services/api';
import PageTransition from '../components/common/PageTransition';

const CertificateDetails = () => {
  const { code } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await api.get(`/certificates/view/${code}`);
        setCertificate(res.data);
      } catch {
        setError('Certificate not found or invalid.');
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, [code]);

  return (
    <PageTransition>
      <Helmet>
        <title>{certificate ? `${certificate.studentName} | Pacific Barista Academy` : 'Student Profile | Pacific Barista Academy'}</title>
        <meta name="description" content={certificate ? `Meet ${certificate.studentName}, a certified barista from Pacific Barista Academy.` : 'View Pacific Barista Academy student profile.'} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #FAF7F3 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative z-10 pt-28 pb-20">
          <div className="container-custom max-w-md mx-auto px-4">

            <Link to="/verify" className="inline-flex items-center gap-2 text-cream/40 hover:text-cream/70 font-body text-sm mb-6 transition-colors">
              <FiArrowLeft className="w-4 h-4" /> Back to Verify
            </Link>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            ) : error ? (
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="bg-cream rounded-3xl overflow-hidden shadow-2xl shadow-black/40 text-center py-12 px-8">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <FiShield className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="font-heading text-xl font-bold text-primary mb-2">Not Found</h2>
                <p className="font-body text-sm text-text/50 mb-6">{error}</p>
                <Link to="/verify" className="font-body text-sm text-accent hover:text-accent/70 font-medium transition-colors">Try another →</Link>
              </motion.div>
            ) : certificate && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-cream rounded-3xl overflow-hidden shadow-2xl shadow-black/40"
              >
                {/* banner */}
                <div className="h-28 bg-gradient-to-r from-primary via-primary/90 to-primary relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #C8A97E 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                </div>

                {/* profile photo */}
                <div className="relative flex justify-center -mt-14">
                  {certificate.photo?.url ? (
                    <img
                      src={certificate.photo.url}
                      alt={certificate.studentName}
                      className="w-28 h-28 rounded-full border-4 border-cream object-cover shadow-lg"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full border-4 border-cream bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-lg">
                      <span className="font-heading text-3xl font-bold text-primary">
                        {certificate.studentName?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* name + badge */}
                <div className="text-center px-8 pt-4 pb-2">
                  <h1 className="font-heading text-2xl font-bold text-primary leading-tight">
                    {certificate.studentName}
                  </h1>
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="font-body text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                      Verified Graduate
                    </span>
                  </div>
                </div>

                {/* info chips */}
                <div className="flex flex-wrap justify-center gap-2 px-8 pt-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent font-body text-xs font-medium">
                    <FiBookOpen className="w-3.5 h-3.5" /> {certificate.courseName}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 text-text/50 font-body text-xs font-medium">
                    <FiCalendar className="w-3.5 h-3.5" />
                    {new Date(certificate.issueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                {/* description */}
                {certificate.description && (
                  <div className="px-8 pt-5">
                    <div className="bg-primary/[0.03] rounded-2xl p-5">
                      <p className="font-body text-sm text-text/60 leading-relaxed text-center italic">
                        "{certificate.description}"
                      </p>
                    </div>
                  </div>
                )}

                {/* divider */}
                <div className="mx-8 mt-5 border-t border-primary/5" />

                {/* certificate ID + verify link */}
                <div className="px-8 py-5 flex items-center justify-between">
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.15em] text-text/30 mb-0.5">Certificate ID</p>
                    <p className="font-mono text-sm text-accent font-semibold tracking-wide">{certificate.certificateId}</p>
                  </div>
                  <Link
                    to="/verify"
                    className="px-4 py-2 rounded-xl bg-primary text-cream font-body text-xs font-medium hover:bg-primary/90 transition-colors"
                  >
                    Verify
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CertificateDetails;
