import React, { useState, useMemo } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  FolderOpen,
  Upload,
  Download,
  Trash2,
  Search,
  Filter,
  File,
  FileAudio,
  FileImage,
  FileVideo,
  FileText,
  Play,
  Pause,
  Volume2,
  Eye,
  Edit3,
  Tag,
  User,
  Calendar,
  Clock,
  HardDrive,
  BarChart3,
  Grid3x3,
  List,
  Plus,
  X
} from 'lucide-react';

export const AuditStorageView = () => {
  const { clients, openClient360, ADVISORS, showToast } = useCrm();
  
  // Mock audit files - in production, this would come from backend/cloud storage
  const [auditFiles, setAuditFiles] = useState([
    {
      id: 'AUD-001',
      fileName: 'client_consultation_maya_sharma.m4a',
      fileType: 'audio',
      fileSize: '2.4 MB',
      duration: '5:32',
      uploadDate: '2026-10-01',
      uploadTime: '10:30 AM',
      uploadedBy: 'Anisha Rai',
      linkedClientId: '26-BLW-001-NS',
      linkedClientName: 'Maya Sharma',
      linkedExecutive: 'Anisha Rai',
      tags: ['consultation', 'diamond-ring', 'budget-discussion'],
      description: 'Initial consultation about solitaire diamond engagement ring',
      transcription: 'Client expressed interest in 1-carat solitaire diamond ring, budget NPR 300,000...',
      qaStatus: 'pending', // 'pending' | 'reviewed' | 'flagged'
      qaReviewedBy: null,
      qaReviewDate: null,
      qaNotes: '',
      url: '#'
    },
    {
      id: 'AUD-002',
      fileName: 'product_presentation_video.mp4',
      fileType: 'video',
      fileSize: '15.8 MB',
      duration: '3:45',
      uploadDate: '2026-10-02',
      uploadTime: '02:15 PM',
      uploadedBy: 'Rohan Shrestha',
      linkedClientId: '26-BLW-005-AD',
      linkedClientName: 'Anjali Dahal',
      linkedExecutive: 'Rohan Shrestha',
      tags: ['product-demo', 'necklace', 'video-call'],
      description: 'Video call product presentation of gold necklace designs',
      qaStatus: 'reviewed',
      qaReviewedBy: 'Branch Manager',
      qaReviewDate: '2026-10-03',
      qaNotes: 'Excellent presentation, client engagement positive',
      url: '#'
    },
    {
      id: 'AUD-003',
      fileName: 'store_visit_recording_bijay.m4a',
      fileType: 'audio',
      fileSize: '3.1 MB',
      duration: '7:15',
      uploadDate: '2026-10-03',
      uploadTime: '11:00 AM',
      uploadedBy: 'Priya Gurung',
      linkedClientId: '26-LBM-002-BK',
      linkedClientName: 'Bijay KC',
      linkedExecutive: 'Priya Gurung',
      tags: ['store-visit', 'follow-up', 'pricing-negotiation'],
      description: 'Store visit follow-up discussion and pricing negotiation',
      qaStatus: 'flagged',
      qaReviewedBy: 'QA Team',
      qaReviewDate: '2026-10-04',
      qaNotes: 'Flagged for review: Pricing discussion needs manager approval',
      url: '#'
    },
    {
      id: 'AUD-004',
      fileName: 'client_feedback_survey.pdf',
      fileType: 'document',
      fileSize: '0.5 MB',
      duration: null,
      uploadDate: '2026-10-04',
      uploadTime: '09:30 AM',
      uploadedBy: 'Anisha Rai',
      linkedClientId: '26-BLW-001-NS',
      linkedClientName: 'Maya Sharma',
      linkedExecutive: 'Anisha Rai',
      tags: ['feedback', 'survey', 'satisfaction'],
      description: 'Post-purchase satisfaction survey filled by client',
      qaStatus: 'reviewed',
      qaReviewedBy: 'Branch Manager',
      qaReviewDate: '2026-10-04',
      qaNotes: 'Positive feedback, 5-star rating',
      url: '#'
    },
    {
      id: 'AUD-005',
      fileName: 'whatsapp_voice_note_priya.ogg',
      fileType: 'audio',
      fileSize: '1.8 MB',
      duration: '4:20',
      uploadDate: '2026-10-05',
      uploadTime: '03:45 PM',
      uploadedBy: 'Rohan Shrestha',
      linkedClientId: '26-BLW-003-PG',
      linkedClientName: 'Priya Gurung',
      linkedExecutive: 'Rohan Shrestha',
      tags: ['whatsapp', 'voice-note', 'customization-query'],
      description: 'WhatsApp voice note discussing customization options',
      qaStatus: 'pending',
      qaReviewedBy: null,
      qaReviewDate: null,
      qaNotes: '',
      url: '#'
    }
  ]);

  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'audio' | 'video' | 'image' | 'document'
  const [filterQA, setFilterQA] = useState('all'); // 'all' | 'pending' | 'reviewed' | 'flagged'
  const [filterExecutive, setFilterExecutive] = useState('all');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    files: [],
    linkedClientId: '',
    linkedExecutive: '',
    description: '',
    tags: '',
    qaStatus: 'pending'
  });
  
  // Audio player state
  const [playingAudioId, setPlayingAudioId] = useState(null);

  // Filtered files
  const filteredFiles = useMemo(() => {
    return auditFiles.filter(file => {
      if (filterType !== 'all' && file.fileType !== filterType) return false;
      if (filterQA !== 'all' && file.qaStatus !== filterQA) return false;
      if (filterExecutive !== 'all' && file.linkedExecutive !== filterExecutive) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          file.fileName.toLowerCase().includes(q) ||
          file.linkedClientName.toLowerCase().includes(q) ||
          file.description.toLowerCase().includes(q) ||
          file.tags.some(tag => tag.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [auditFiles, filterType, filterQA, filterExecutive, searchTerm]);

  // Stats
  const totalFiles = auditFiles.length;
  const totalStorage = auditFiles.reduce((acc, file) => {
    const size = parseFloat(file.fileSize);
    return acc + size;
  }, 0);
  const pendingQA = auditFiles.filter(f => f.qaStatus === 'pending').length;
  const flaggedFiles = auditFiles.filter(f => f.qaStatus === 'flagged').length;

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'audio': return <FileAudio size={20} color="#FF6B6B" />;
      case 'video': return <FileVideo size={20} color="#4ECDC4" />;
      case 'image': return <FileImage size={20} color="#95E1D3" />;
      case 'document': return <FileText size={20} color="#F38181" />;
      default: return <File size={20} />;
    }
  };

  const getQABadgeColor = (status) => {
    switch (status) {
      case 'pending': return '#FFA726';
      case 'reviewed': return '#66BB6A';
      case 'flagged': return '#EF5350';
      default: return 'var(--text-tertiary)';
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadForm(prev => ({ ...prev, files }));
  };

  const handleSubmitUpload = () => {
    if (uploadForm.files.length === 0) {
      showToast('Please select at least one file', 'error');
      return;
    }
    if (!uploadForm.linkedClientId) {
      showToast('Please select a client', 'error');
      return;
    }
    if (!uploadForm.linkedExecutive) {
      showToast('Please select a sales executive', 'error');
      return;
    }

    // In production: upload to cloud storage, create audit records
    console.log('Uploading files:', uploadForm);
    
    // Mock creating new audit records
    const newFiles = uploadForm.files.map((file, idx) => {
      const selectedClient = clients.find(c => c.id === uploadForm.linkedClientId);
      return {
        id: `AUD-${String(auditFiles.length + idx + 1).padStart(3, '0')}`,
        fileName: file.name,
        fileType: file.type.startsWith('audio') ? 'audio' : 
                  file.type.startsWith('video') ? 'video' : 
                  file.type.startsWith('image') ? 'image' : 'document',
        fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        duration: null,
        uploadDate: new Date().toISOString().split('T')[0],
        uploadTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        uploadedBy: 'Current User',
        linkedClientId: uploadForm.linkedClientId,
        linkedClientName: selectedClient?.name || 'Unknown',
        linkedExecutive: uploadForm.linkedExecutive,
        tags: uploadForm.tags.split(',').map(t => t.trim()).filter(Boolean),
        description: uploadForm.description,
        qaStatus: uploadForm.qaStatus,
        qaReviewedBy: null,
        qaReviewDate: null,
        qaNotes: '',
        url: '#'
      };
    });

    setAuditFiles(prev => [...prev, ...newFiles]);
    showToast(`${uploadForm.files.length} file(s) uploaded successfully`);
    
    // Reset form
    setUploadForm({
      files: [],
      linkedClientId: '',
      linkedExecutive: '',
      description: '',
      tags: '',
      qaStatus: 'pending'
    });
    setShowUploadModal(false);
  };

  const handleDeleteFile = (fileId) => {
    if (confirm('Are you sure you want to delete this audit file? This action cannot be undone.')) {
      setAuditFiles(prev => prev.filter(f => f.id !== fileId));
      setSelectedFile(null);
      showToast('Audit file deleted successfully');
    }
  };

  const handleUpdateQAStatus = (fileId, status, notes) => {
    setAuditFiles(prev => prev.map(f => {
      if (f.id !== fileId) return f;
      return {
        ...f,
        qaStatus: status,
        qaReviewedBy: 'Current User',
        qaReviewDate: new Date().toISOString().split('T')[0],
        qaNotes: notes
      };
    }));
    showToast(`QA status updated to "${status}"`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--text-primary)' }}>Audit Storage & Quality Assurance</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '2px' }}>
            Centralized repository for audio recordings, images, videos, and documents linked to sales executives and clients
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowUploadModal(true)}
            className="btn btn-gold"
          >
            <Upload size={15} />
            <span>Upload Files</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
        <div className="luxury-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <HardDrive size={18} color="var(--gold-primary)" />
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>
              Total Files
            </span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--gold-dark)' }}>
            {totalFiles}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {totalStorage.toFixed(1)} MB stored
          </div>
        </div>

        <div className="luxury-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Clock size={18} color="#FFA726" />
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>
              Pending QA Review
            </span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: '#FFA726' }}>
            {pendingQA}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Awaiting quality check
          </div>
        </div>

        <div className="luxury-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Tag size={18} color="#EF5350" />
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>
              Flagged for Review
            </span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: '#EF5350' }}>
            {flaggedFiles}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Needs manager attention
          </div>
        </div>

        <div className="luxury-card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <FileAudio size={18} color="#4ECDC4" />
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: 600 }}>
              Audio Recordings
            </span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: '#4ECDC4' }}>
            {auditFiles.filter(f => f.fileType === 'audio').length}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Call & consultation logs
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="luxury-card" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-tertiary)' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search files, clients, descriptions, tags..."
              className="form-control"
              style={{ paddingLeft: '32px' }}
            />
          </div>

          {/* File Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="form-select"
            style={{ width: '150px' }}
          >
            <option value="all">All Types</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
            <option value="image">Images</option>
            <option value="document">Documents</option>
          </select>

          {/* QA Status Filter */}
          <select
            value={filterQA}
            onChange={(e) => setFilterQA(e.target.value)}
            className="form-select"
            style={{ width: '150px' }}
          >
            <option value="all">All QA Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="flagged">Flagged</option>
          </select>

          {/* Executive Filter */}
          <select
            value={filterExecutive}
            onChange={(e) => setFilterExecutive(e.target.value)}
            className="form-select"
            style={{ width: '160px' }}
          >
            <option value="all">All Executives</option>
            {ADVISORS.map((advisor) => (
              <option key={advisor.id} value={advisor.name}>{advisor.name}</option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div style={{
            display: 'flex',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-sm)',
            padding: '3px'
          }}>
            <button
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'btn btn-gold btn-sm' : 'btn btn-ghost btn-sm'}
              style={{ padding: '6px 10px' }}
            >
              <Grid3x3 size={14} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'btn btn-gold btn-sm' : 'btn btn-ghost btn-sm'}
              style={{ padding: '6px 10px' }}
            >
              <List size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Files Display */}
      {viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {filteredFiles.map(file => (
            <div
              key={file.id}
              className="luxury-card"
              style={{
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative'
              }}
              onClick={() => setSelectedFile(file)}
            >
              {/* QA Status Badge */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                padding: '4px 8px',
                borderRadius: '12px',
                backgroundColor: getQABadgeColor(file.qaStatus),
                color: 'white',
                fontSize: '10px',
                fontWeight: 600,
                textTransform: 'uppercase'
              }}>
                {file.qaStatus}
              </div>

              {/* File Icon & Type */}
              <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                {getFileIcon(file.fileType)}
                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 600 }}>
                  {file.fileType}
                </span>
              </div>

              {/* File Name */}
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px', wordBreak: 'break-word' }}>
                {file.fileName}
              </div>

              {/* Client & Executive */}
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                <div style={{ marginBottom: '4px' }}>
                  <strong>Client:</strong> {file.linkedClientName}
                </div>
                <div>
                  <strong>Executive:</strong> {file.linkedExecutive}
                </div>
              </div>

              {/* Metadata */}
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
                <span>{file.fileSize}</span>
                {file.duration && <span>{file.duration}</span>}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '8px' }}>
                {file.tags.slice(0, 2).map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '9px',
                      padding: '2px 6px',
                      backgroundColor: 'var(--bg-subtle)',
                      color: 'var(--text-secondary)',
                      borderRadius: '4px',
                      fontWeight: 500
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="crm-table-container">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>File Name</th>
                <th>Client</th>
                <th>Sales Executive</th>
                <th>Upload Date</th>
                <th>Size / Duration</th>
                <th>QA Status</th>
                <th>Tags</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map(file => (
                <tr key={file.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {getFileIcon(file.fileType)}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, fontSize: '12px' }}>{file.fileName}</span>
                    <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                      {file.id}
                    </div>
                  </td>
                  <td>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        openClient360(file.linkedClientId);
                      }}
                      style={{ fontWeight: 600, cursor: 'pointer', color: 'var(--gold-dark)' }}
                    >
                      {file.linkedClientName}
                    </span>
                  </td>
                  <td>{file.linkedExecutive}</td>
                  <td>
                    <div>{file.uploadDate}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>{file.uploadTime}</div>
                  </td>
                  <td>
                    <div>{file.fileSize}</div>
                    {file.duration && <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>{file.duration}</div>}
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        backgroundColor: getQABadgeColor(file.qaStatus),
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: 600,
                        textTransform: 'uppercase'
                      }}
                    >
                      {file.qaStatus}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {file.tags.slice(0, 2).map(tag => (
                        <span
                          key={tag}
                          style={{
                            fontSize: '9px',
                            padding: '2px 6px',
                            backgroundColor: 'var(--bg-subtle)',
                            color: 'var(--text-secondary)',
                            borderRadius: '4px'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(file);
                        }}
                        className="btn btn-ghost btn-sm"
                        title="View Details"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(file.url, '_blank');
                        }}
                        className="btn btn-ghost btn-sm"
                        title="Download"
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* File Detail Modal */}
      {selectedFile && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setSelectedFile(null)}
        >
          <div
            className="luxury-card"
            style={{
              maxWidth: '700px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              padding: '24px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  {getFileIcon(selectedFile.fileType)}
                  <h2 style={{ fontSize: '1.4rem', margin: 0 }}>{selectedFile.fileName}</h2>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                  {selectedFile.id} • Uploaded {selectedFile.uploadDate} at {selectedFile.uploadTime}
                </div>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="btn btn-ghost btn-sm"
              >
                <X size={18} />
              </button>
            </div>

            {/* QA Status Section */}
            <div style={{ padding: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '10px' }}>Quality Assurance Status</div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                {['pending', 'reviewed', 'flagged'].map(status => (
                  <button
                    key={status}
                    onClick={() => handleUpdateQAStatus(selectedFile.id, status, selectedFile.qaNotes)}
                    className={selectedFile.qaStatus === status ? 'btn btn-gold btn-sm' : 'btn btn-secondary btn-sm'}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {status}
                  </button>
                ))}
              </div>
              {selectedFile.qaReviewedBy && (
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  Reviewed by {selectedFile.qaReviewedBy} on {selectedFile.qaReviewDate}
                  {selectedFile.qaNotes && (
                    <div style={{ marginTop: '6px', fontStyle: 'italic' }}>"{selectedFile.qaNotes}"</div>
                  )}
                </div>
              )}
            </div>

            {/* Linked Information */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Linked Client
                </div>
                <div
                  onClick={() => {
                    openClient360(selectedFile.linkedClientId);
                    setSelectedFile(null);
                  }}
                  style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gold-dark)', cursor: 'pointer' }}
                >
                  {selectedFile.linkedClientName}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{selectedFile.linkedClientId}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Sales Executive
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>{selectedFile.linkedExecutive}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Uploaded by {selectedFile.uploadedBy}</div>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '6px', textTransform: 'uppercase' }}>
                Description
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {selectedFile.description}
              </div>
            </div>

            {/* Tags */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '6px', textTransform: 'uppercase' }}>
                Tags
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {selectedFile.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '11px',
                      padding: '4px 10px',
                      backgroundColor: 'var(--gold-light)',
                      color: 'var(--gold-dark)',
                      borderRadius: '12px',
                      fontWeight: 500
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Transcription (for audio files) */}
            {selectedFile.fileType === 'audio' && selectedFile.transcription && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Auto-Generated Transcription
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  padding: '12px',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  lineHeight: 1.6
                }}>
                  {selectedFile.transcription}
                </div>
              </div>
            )}

            {/* File Metadata */}
            <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: 'var(--text-secondary)', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
              <div>
                <strong>Size:</strong> {selectedFile.fileSize}
              </div>
              {selectedFile.duration && (
                <div>
                  <strong>Duration:</strong> {selectedFile.duration}
                </div>
              )}
              <div>
                <strong>Type:</strong> {selectedFile.fileType}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={() => window.open(selectedFile.url, '_blank')}
                className="btn btn-gold"
                style={{ flex: 1 }}
              >
                <Download size={14} />
                <span>Download File</span>
              </button>
              <button
                onClick={() => handleDeleteFile(selectedFile.id)}
                className="btn btn-secondary"
                style={{ color: '#EF5350' }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setShowUploadModal(false)}
        >
          <div
            className="luxury-card"
            style={{
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '28px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.6rem', margin: 0 }}>Upload Audit Files</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="btn btn-ghost btn-sm"
              >
                <X size={18} />
              </button>
            </div>

            {/* File Upload Area */}
            <div style={{
              padding: '32px',
              border: '2px dashed var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
              marginBottom: '24px',
              cursor: 'pointer',
              backgroundColor: uploadForm.files.length > 0 ? '#E8F5E9' : 'var(--bg-subtle)',
              transition: 'all 0.2s'
            }}>
              <Upload size={40} color={uploadForm.files.length > 0 ? '#66BB6A' : 'var(--gold-primary)'} style={{ marginBottom: '12px' }} />
              
              {uploadForm.files.length === 0 ? (
                <>
                  <p style={{ fontSize: '14px', marginBottom: '8px', fontWeight: 600 }}>
                    Drag and drop files here or click to browse
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '12px' }}>
                    Audio (MP3, M4A, OGG), Video (MP4, MOV), Images (JPG, PNG), Documents (PDF)
                  </p>
                </>
              ) : (
                <div style={{ marginBottom: '12px' }}>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#2E7D32', marginBottom: '8px' }}>
                    ✓ {uploadForm.files.length} file(s) selected
                  </p>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {uploadForm.files.map((f, idx) => (
                      <div key={idx} style={{ marginTop: '4px' }}>
                        • {f.name} ({(f.size / 1024 / 1024).toFixed(2)} MB)
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <input
                type="file"
                multiple
                accept="audio/*,video/*,image/*,.pdf"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="file-upload-input"
              />
              <label htmlFor="file-upload-input" className="btn btn-gold btn-sm" style={{ cursor: 'pointer' }}>
                {uploadForm.files.length > 0 ? 'Change Files' : 'Select Files'}
              </label>
            </div>

            {/* Form Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Link to Client - REQUIRED */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Link to Client <span style={{ color: '#EF5350' }}>*</span>
                </label>
                <select
                  value={uploadForm.linkedClientId}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, linkedClientId: e.target.value }))}
                  className="form-select"
                  required
                >
                  <option value="">-- Select Client --</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.name} ({client.id})
                    </option>
                  ))}
                </select>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                  Choose which client this file is related to
                </div>
              </div>

              {/* Link to Sales Executive - REQUIRED */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Sales Executive <span style={{ color: '#EF5350' }}>*</span>
                </label>
                <select
                  value={uploadForm.linkedExecutive}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, linkedExecutive: e.target.value }))}
                  className="form-select"
                  required
                >
                  <option value="">-- Select Executive --</option>
                  {ADVISORS.map(advisor => (
                    <option key={advisor.id} value={advisor.name}>
                      {advisor.name}
                    </option>
                  ))}
                </select>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                  Which sales executive is this file associated with?
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Description
                </label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  className="form-control"
                  rows={3}
                  placeholder="Brief description of the file content (e.g., Client consultation about engagement ring, budget discussion)"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Tags */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={uploadForm.tags}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, tags: e.target.value }))}
                  className="form-control"
                  placeholder="e.g., consultation, diamond-ring, pricing-discussion"
                />
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                  Add tags separated by commas for easier searching
                </div>
              </div>

              {/* QA Status */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Initial QA Status
                </label>
                <select
                  value={uploadForm.qaStatus}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, qaStatus: e.target.value }))}
                  className="form-select"
                >
                  <option value="pending">Pending Review</option>
                  <option value="reviewed">Already Reviewed</option>
                  <option value="flagged">Flag for Review</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => setShowUploadModal(false)}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitUpload}
                className="btn btn-gold"
                style={{ flex: 1 }}
                disabled={uploadForm.files.length === 0 || !uploadForm.linkedClientId || !uploadForm.linkedExecutive}
              >
                <Upload size={16} />
                <span>Upload {uploadForm.files.length > 0 && `(${uploadForm.files.length})`}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
