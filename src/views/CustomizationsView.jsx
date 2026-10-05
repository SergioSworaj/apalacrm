import React, { useState, useMemo, useEffect } from 'react';
import { useCrm } from '../context/CrmContext';
import {
  Layers,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Eye,
  Image as ImageIcon,
  Upload,
  ChevronRight,
  Calendar,
  DollarSign,
  History,
  RotateCcw,
  X,
  Plus,
  Search,
  Filter,
  Download,
  Paperclip,
  BarChart3,
  TrendingUp,
  Package
} from 'lucide-react';

export const CustomizationsView = () => {
  const {
    customizations,
    openClient360,
    advanceCustomizationStage,
    revertCustomizationStage,
    setActiveModal,
    selectedBranch,
    CUSTOMIZATION_STAGES,
    showToast
  } = useCrm();

  // UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Keep selectedProject in sync with customizations updates (LIVE UPDATE FIX)
  useEffect(() => {
    if (selectedProject) {
      const updated = customizations.find(c => c.id === selectedProject.id);
      if (updated && JSON.stringify(updated) !== JSON.stringify(selectedProject)) {
        setSelectedProject(updated);
      }
    }
  }, [customizations, selectedProject]);

  // Filter customizations
  const filteredCustomizations = useMemo(() => {
    return customizations.filter(c => {
      if (selectedBranch !== 'All Branches' && c.branch !== selectedBranch) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          c.clientName.toLowerCase().includes(q) ||
          c.productType.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [customizations, selectedBranch, searchTerm]);

  // Group by stage for Kanban
  const stageGroups = useMemo(() => {
    const phases = [
      { name: 'Planning', stages: [0, 1, 2], color: '#E3F2FD', textColor: '#1976D2' },
      { name: 'Design', stages: [3, 4], color: '#F3E5F5', textColor: '#7B1FA2' },
      { name: 'Development', stages: [5, 6, 7], color: '#FFF3E0', textColor: '#F57C00' },
      { name: 'Production', stages: [8, 9], color: '#E8F5E9', textColor: '#388E3C' },
      { name: 'Complete', stages: [10, 11], color: '#E0F2F1', textColor: '#00897B' }
    ];

    return phases.map(phase => ({
      ...phase,
      projects: filteredCustomizations.filter(c => 
        phase.stages.includes(c.currentStageIndex)
      )
    }));
  }, [filteredCustomizations]);

  // Calculate deadline status
  const getDeadlineStatus = (expectedCompletion) => {
    const today = new Date();
    const deadline = new Date(expectedCompletion);
    const daysUntilDeadline = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDeadline < 0) return { status: 'overdue', days: Math.abs(daysUntilDeadline), color: '#EF5350' };
    if (daysUntilDeadline <= 3) return { status: 'dueSoon', days: daysUntilDeadline, color: '#FFA726' };
    return { status: 'onTrack', days: daysUntilDeadline, color: '#66BB6A' };
  };

  // Statistics
  const totalActive = filteredCustomizations.length;
  const overdueCount = filteredCustomizations.filter(c => {
    const deadline = new Date(c.expectedCompletion);
    return deadline < new Date();
  }).length;

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowDetailModal(true);
  };

  const handleStageAdvance = (projectId, currentStageIndex) => {
    if (currentStageIndex < CUSTOMIZATION_STAGES.length - 1) {
      advanceCustomizationStage(projectId, currentStageIndex + 1);
      showToast('Stage advanced successfully');
      // Update selected project if modal is open
      if (selectedProject && selectedProject.id === projectId) {
        const updated = customizations.find(c => c.id === projectId);
        setSelectedProject(updated);
      }
    }
  };

  const handleStageRevert = (projectId, currentStageIndex) => {
    if (currentStageIndex > 0) {
      revertCustomizationStage(projectId, currentStageIndex - 1, 'User reverted stage');
      showToast('Stage reverted');
      // Update selected project if modal is open
      if (selectedProject && selectedProject.id === projectId) {
        const updated = customizations.find(c => c.id === projectId);
        setSelectedProject(updated);
      }
    }
  };

  const handleImageUpload = (projectId, files) => {
    // In production, upload to cloud storage
    console.log('Uploading files for project:', projectId, files);
    showToast(`${files.length} file(s) uploaded successfully`);
    setShowImageUpload(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
      {/* Header */}
      <div style={{ padding: '20px', borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'white', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', margin: 0, marginBottom: '4px' }}>Production Pipeline</h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
              Track bespoke jewelry customizations through production stages
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setShowAnalytics(true)} className="btn btn-secondary">
              <BarChart3 size={16} />
              <span>Analytics</span>
            </button>
            <button onClick={() => setActiveModal('add-customization')} className="btn btn-gold">
              <Plus size={16} />
              <span>New Project</span>
            </button>
          </div>
        </div>

        {/* Stats & Search */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{
              padding: '8px 16px',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Layers size={16} color="var(--gold-primary)" />
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{totalActive} Active</span>
            </div>
            {overdueCount > 0 && (
              <div style={{
                padding: '8px 16px',
                backgroundColor: '#FFEBEE',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <AlertCircle size={16} color="#EF5350" />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#EF5350' }}>{overdueCount} Overdue</span>
              </div>
            )}
          </div>

          <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-tertiary)' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects by client, product, or ID..."
              className="form-control"
              style={{ paddingLeft: '40px' }}
            />
          </div>
        </div>
      </div>

      {/* Kanban Board - FIXED SCROLLING */}
      <div style={{
        flex: 1,
        overflowX: 'auto',
        overflowY: 'auto',
        padding: '20px',
        backgroundColor: '#F8F9FA'
      }}>
        <div style={{
          display: 'flex',
          gap: '16px',
          minHeight: '600px',
          minWidth: 'fit-content',
          paddingBottom: '20px'
        }}>
          {stageGroups.map((phase) => (
            <div
              key={phase.name}
              style={{
                minWidth: '320px',
                width: '320px',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                maxHeight: '100%'
              }}
            >
              {/* Column Header */}
              <div style={{
                padding: '16px',
                backgroundColor: phase.color,
                borderBottom: '2px solid ' + phase.textColor,
                flexShrink: 0
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: phase.textColor }}>
                    {phase.name}
                  </h3>
                  <span style={{
                    padding: '4px 10px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: phase.textColor
                  }}>
                    {phase.projects.length}
                  </span>
                </div>
              </div>

              {/* Cards Container - FIXED SCROLLING */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {phase.projects.length === 0 ? (
                  <div style={{
                    padding: '40px 20px',
                    textAlign: 'center',
                    color: 'var(--text-tertiary)',
                    fontSize: '13px'
                  }}>
                    No projects in {phase.name.toLowerCase()}
                  </div>
                ) : (
                  phase.projects.map(project => {
                    const deadlineStatus = getDeadlineStatus(project.expectedCompletion);

                    return (
                      <div
                        key={project.id}
                        onClick={() => handleProjectClick(project)}
                        style={{
                          padding: '14px',
                          backgroundColor: 'white',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                        }}
                      >
                        {/* Deadline Badge */}
                        {deadlineStatus.status === 'overdue' && (
                          <div style={{
                            marginBottom: '10px',
                            padding: '4px 8px',
                            backgroundColor: '#FFEBEE',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            <AlertCircle size={12} color="#EF5350" />
                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#EF5350' }}>
                              OVERDUE {deadlineStatus.days}D
                            </span>
                          </div>
                        )}
                        {deadlineStatus.status === 'dueSoon' && (
                          <div style={{
                            marginBottom: '10px',
                            padding: '4px 8px',
                            backgroundColor: '#FFF3E0',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            <Clock size={12} color="#FFA726" />
                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#FFA726' }}>
                              DUE IN {deadlineStatus.days}D
                            </span>
                          </div>
                        )}

                        {/* Client Name */}
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                          {project.clientName}
                        </div>

                        {/* Product */}
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                          {project.productType}
                        </div>

                        {/* Stage Badge */}
                        <div style={{
                          padding: '4px 8px',
                          backgroundColor: 'var(--bg-subtle)',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: 'var(--text-secondary)',
                          marginBottom: '12px',
                          display: 'inline-block'
                        }}>
                          {project.currentStage}
                        </div>

                        {/* Progress Bar */}
                        <div style={{ marginBottom: '10px' }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '10px',
                            color: 'var(--text-tertiary)',
                            marginBottom: '4px'
                          }}>
                            <span>Progress</span>
                            <span>{Math.round((project.currentDay / project.totalDays) * 100)}%</span>
                          </div>
                          <div style={{
                            height: '4px',
                            backgroundColor: 'var(--border-subtle)',
                            borderRadius: '2px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${(project.currentDay / project.totalDays) * 100}%`,
                              height: '100%',
                              backgroundColor: deadlineStatus.status === 'overdue' ? '#EF5350' : 'var(--gold-primary)',
                              transition: 'width 0.3s ease'
                            }} />
                          </div>
                        </div>

                        {/* Footer */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingTop: '10px',
                          borderTop: '1px solid var(--border-subtle)'
                        }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>
                            {project.id}
                          </span>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold-dark)' }}>
                            NPR {(project.finalCost / 1000).toFixed(0)}K
                          </span>
                        </div>

                        {/* Quick Actions */}
                        <div style={{
                          display: 'flex',
                          gap: '6px',
                          marginTop: '10px'
                        }}
                        onClick={(e) => e.stopPropagation()}>
                          {project.currentStageIndex > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStageRevert(project.id, project.currentStageIndex);
                              }}
                              className="btn btn-ghost btn-sm"
                              style={{ flex: 1, fontSize: '11px', padding: '4px 8px' }}
                              title="Move back one stage"
                            >
                              <RotateCcw size={12} />
                            </button>
                          )}
                          {project.currentStageIndex < CUSTOMIZATION_STAGES.length - 1 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStageAdvance(project.id, project.currentStageIndex);
                              }}
                              className="btn btn-gold btn-sm"
                              style={{ flex: 1, fontSize: '11px', padding: '4px 8px' }}
                              title="Advance to next stage"
                            >
                              Next <ChevronRight size={12} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedProject && (
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
          onClick={() => setShowDetailModal(false)}
        >
          <div
            className="luxury-card"
            style={{
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', margin: 0, marginBottom: '8px' }}>
                  {selectedProject.productType}
                </h2>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      openClient360(selectedProject.clientId);
                      setShowDetailModal(false);
                    }}
                    style={{ fontWeight: 600, color: 'var(--gold-dark)', cursor: 'pointer' }}
                  >
                    {selectedProject.clientName}
                  </span>
                  {' '} • {selectedProject.id}
                </div>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="btn btn-ghost btn-sm"
              >
                <X size={20} />
              </button>
            </div>

            {/* Deadline Alert */}
            {(() => {
              const deadlineStatus = getDeadlineStatus(selectedProject.expectedCompletion);
              if (deadlineStatus.status === 'overdue') {
                return (
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#FFEBEE',
                    border: '2px solid #EF5350',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <AlertCircle size={24} color="#EF5350" />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#EF5350' }}>
                        OVERDUE by {deadlineStatus.days} days
                      </div>
                      <div style={{ fontSize: '12px', color: '#D32F2F', marginTop: '2px' }}>
                        Expected: {selectedProject.expectedCompletion}
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })()}

            {/* Info Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ padding: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Current Stage</div>
                <div style={{ fontSize: '16px', fontWeight: 700 }}>{selectedProject.currentStage}</div>
              </div>
              <div style={{ padding: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Progress</div>
                <div style={{ fontSize: '16px', fontWeight: 700 }}>
                  Day {selectedProject.currentDay}/{selectedProject.totalDays}
                </div>
              </div>
              <div style={{ padding: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Total Cost</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--gold-dark)' }}>
                  NPR {selectedProject.finalCost.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Stage Timeline */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Production Timeline</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {CUSTOMIZATION_STAGES.map((stage, idx) => {
                  const isPast = idx < selectedProject.currentStageIndex;
                  const isCurrent = idx === selectedProject.currentStageIndex;

                  return (
                    <button
                      key={stage}
                      onClick={() => {
                        advanceCustomizationStage(selectedProject.id, idx);
                        const updated = customizations.find(c => c.id === selectedProject.id);
                        setSelectedProject(updated);
                      }}
                      style={{
                        padding: '8px 12px',
                        fontSize: '11px',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-sm)',
                        border: `2px solid ${isCurrent ? 'var(--gold-primary)' : isPast ? '#66BB6A' : 'var(--border-medium)'}`,
                        backgroundColor: isCurrent ? 'var(--gold-light)' : isPast ? '#E8F5E9' : 'white',
                        color: isCurrent ? 'var(--gold-dark)' : isPast ? '#2E7D32' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {isPast && '✓ '}{stage}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Design Images Section - WORKING UPLOAD */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>Design Images & Files</h3>
                <button
                  onClick={() => setShowImageUpload(true)}
                  className="btn btn-secondary btn-sm"
                >
                  <Upload size={14} />
                  <span>Upload</span>
                </button>
              </div>
              
              <div style={{
                padding: '32px',
                border: '2px dashed var(--border-medium)',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'center',
                backgroundColor: 'var(--bg-subtle)'
              }}>
                <ImageIcon size={32} style={{ opacity: 0.3, marginBottom: '8px' }} />
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                  No images uploaded yet
                </p>
                <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                  CAD renders, design sketches, and progress photos
                </p>
              </div>
            </div>

            {/* Design Brief */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Design Brief</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {selectedProject.designBrief}
              </p>
            </div>

            {/* Stage History */}
            {selectedProject.stageHistory && selectedProject.stageHistory.length > 0 && (
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <History size={16} />
                  Stage History
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedProject.stageHistory.slice(0, 5).map((log) => (
                    <div
                      key={log.id}
                      style={{
                        padding: '12px',
                        backgroundColor: 'var(--bg-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        borderLeft: `3px solid var(--gold-primary)`
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>
                          {log.fromStage ? `${log.fromStage} → ${log.toStage}` : log.toStage}
                        </span>
                        <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>
                          {log.timestamp}
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        By {log.changedBy} • {log.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Image Upload Modal - WORKING FILE INPUT */}
      {showImageUpload && (
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
            zIndex: 1001,
            padding: '20px'
          }}
          onClick={() => setShowImageUpload(false)}
        >
          <div
            className="luxury-card"
            style={{
              maxWidth: '500px',
              width: '100%',
              padding: '24px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Upload Design Files</h3>
            
            <div style={{
              padding: '40px',
              border: '2px dashed var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
              marginBottom: '16px',
              cursor: 'pointer',
              backgroundColor: 'var(--bg-subtle)'
            }}>
              <Upload size={40} color="var(--gold-primary)" style={{ marginBottom: '12px' }} />
              <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                Drag and drop files here or click to browse
              </p>
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                Supported: JPG, PNG, PDF (Max 10MB)
              </p>
              <input
                type="file"
                multiple
                accept="image/*,.pdf"
                style={{ display: 'none' }}
                id="file-upload-input"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleImageUpload(selectedProject?.id, Array.from(e.target.files));
                  }
                }}
              />
              <label htmlFor="file-upload-input" className="btn btn-gold" style={{ marginTop: '12px', cursor: 'pointer' }}>
                Select Files
              </label>
            </div>

            <button
              onClick={() => setShowImageUpload(false)}
              className="btn btn-secondary"
              style={{ width: '100%' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalytics && (
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
            zIndex: 1001,
            padding: '20px'
          }}
          onClick={() => setShowAnalytics(false)}
        >
          <div
            className="luxury-card"
            style={{
              maxWidth: '1000px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Production Analytics</h2>
              <button onClick={() => setShowAnalytics(false)} className="btn btn-ghost btn-sm">
                <X size={20} />
              </button>
            </div>

            {/* Key Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
              <div style={{ padding: '20px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Total Projects
                </div>
                <div style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--gold-dark)' }}>
                  {customizations.length}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  All active customizations
                </div>
              </div>

              <div style={{ padding: '20px', backgroundColor: '#FFEBEE', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', color: '#C62828', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Overdue
                </div>
                <div style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: '#EF5350' }}>
                  {overdueCount}
                </div>
                <div style={{ fontSize: '11px', color: '#D32F2F', marginTop: '4px' }}>
                  Past deadline
                </div>
              </div>

              <div style={{ padding: '20px', backgroundColor: '#E8F5E9', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', color: '#2E7D32', marginBottom: '8px', textTransform: 'uppercase' }}>
                  In Production
                </div>
                <div style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: '#66BB6A' }}>
                  {customizations.filter(c => c.currentStageIndex >= 8 && c.currentStageIndex < 10).length}
                </div>
                <div style={{ fontSize: '11px', color: '#388E3C', marginTop: '4px' }}>
                  Active fabrication
                </div>
              </div>

              <div style={{ padding: '20px', backgroundColor: 'var(--gold-light)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '11px', color: 'var(--gold-dark)', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Total Value
                </div>
                <div style={{ fontSize: '28px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--gold-dark)' }}>
                  {(customizations.reduce((sum, c) => sum + c.finalCost, 0) / 1000000).toFixed(1)}M
                </div>
                <div style={{ fontSize: '11px', color: 'var(--gold-dark)', marginTop: '4px' }}>
                  NPR work-in-progress
                </div>
              </div>
            </div>

            {/* Stage Distribution */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Projects by Stage</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {CUSTOMIZATION_STAGES.map((stage, idx) => {
                  const count = customizations.filter(c => c.currentStageIndex === idx).length;
                  const percentage = customizations.length > 0 ? (count / customizations.length) * 100 : 0;
                  
                  return (
                    <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '140px', fontSize: '12px', fontWeight: 500 }}>{stage}</div>
                      <div style={{ flex: 1, height: '24px', backgroundColor: 'var(--bg-subtle)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                        <div style={{
                          width: `${percentage}%`,
                          height: '100%',
                          backgroundColor: 'var(--gold-primary)',
                          transition: 'width 0.3s ease'
                        }} />
                        <span style={{
                          position: 'absolute',
                          left: '8px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: percentage > 20 ? 'white' : 'var(--text-primary)'
                        }}>
                          {count}
                        </span>
                      </div>
                      <div style={{ width: '50px', textAlign: 'right', fontSize: '12px', color: 'var(--text-tertiary)' }}>
                        {percentage.toFixed(0)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Average Time by Stage */}
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Average Days per Stage</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {[
                  { stage: 'Planning', days: 2 },
                  { stage: 'Design', days: 5 },
                  { stage: 'Development', days: 7 },
                  { stage: 'Production', days: 18 },
                  { stage: 'Complete', days: 1 }
                ].map(item => (
                  <div key={item.stage} style={{ padding: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
                      {item.stage}
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {item.days} days
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
