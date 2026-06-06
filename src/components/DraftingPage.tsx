import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Maximize2, RotateCcw, Zap, Copy, Download, BookOpen, 
  ChevronRight, AlertTriangle, AlertCircle, Check, Info, Send, X, Minimize2
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface DraftingPageProps {
  draftFacts: string;
  setDraftFacts: (facts: string) => void;
  draftModel: string;
  setDraftModel: (model: string) => void;
  isDrafting: boolean;
  handleAIDrafting: () => void;
  draftEditorMode: 'interactive' | 'edit';
  setDraftEditorMode: (mode: 'interactive' | 'edit') => void;
  draftPages: string[];
  setDraftPages: (pages: string[]) => void;
  isSearchingCitations: boolean;
  draftCitations: any[];
  citationSearchError: string;
  showCitationsDropdown: boolean;
  setShowCitationsDropdown: (show: boolean) => void;
  toggleCitationSelected: (id: string) => void;
  highlightedCitationId: string | null;
  handleRewriteWithCitations: () => void;
  isRewritingDraft: boolean;
  renderDraftWithQuickLinks: (text: string) => React.ReactNode;
  draftSuggestions: string;
  showCustomPromptPage: boolean;
  setShowCustomPromptPage: (show: boolean) => void;
  handleDownloadSuggestions: () => void;
  deskChatHistory: any[];
  deskInput: string;
  setDeskInput: (input: string) => void;
  sendDeskChat: () => void;
  handleCopy: (text: string) => void;
  handleDownloadDraft: (text: string) => void;
  activePanel: number;
  scrollToPanel: (index: number) => void;
  draftingContainerRef: React.RefObject<HTMLDivElement | null>;
  handleDraftingScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  enlargedElement: 'facts' | 'model' | 'pad' | 'suggestions' | null;
  setEnlargedElement: (element: 'facts' | 'model' | 'pad' | 'suggestions' | null) => void;
  
  // Unused props kept for full App.tsx compatibility
  isGeneratingAnalysis?: boolean;
  draftAnalysisReport?: any;
  handleGenerateCaseAnalysis?: (facts: string) => void;
}

export default function DraftingPage({
  draftFacts,
  setDraftFacts,
  draftModel,
  setDraftModel,
  isDrafting,
  handleAIDrafting,
  draftEditorMode,
  setDraftEditorMode,
  draftPages,
  setDraftPages,
  isSearchingCitations,
  draftCitations,
  citationSearchError,
  showCitationsDropdown,
  setShowCitationsDropdown,
  toggleCitationSelected,
  highlightedCitationId,
  handleRewriteWithCitations,
  isRewritingDraft,
  renderDraftWithQuickLinks,
  draftSuggestions,
  showCustomPromptPage,
  setShowCustomPromptPage,
  handleDownloadSuggestions,
  deskChatHistory,
  deskInput,
  setDeskInput,
  sendDeskChat,
  handleCopy,
  handleDownloadDraft,
  activePanel,
  scrollToPanel,
  draftingContainerRef,
  handleDraftingScroll,
  enlargedElement,
  setEnlargedElement,
}: DraftingPageProps) {
  return (
    <motion.div 
      key="drafting" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="h-full flex flex-col overflow-hidden text-slate-300 w-full"
    >
      {/* Mobile Slider Header-Tabs Navigation */}
      <div className="flex md:hidden bg-[#090e18] border-b border-white/10 p-2.5 justify-around items-center shrink-0 z-30 select-none">
        <button 
          onClick={() => scrollToPanel(0)}
          className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
            activePanel === 0 
              ? 'bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.5)] scale-[1.05]' 
              : 'text-slate-400 hover:text-white bg-white/5'
          }`}
        >
          1. Case Inputs
        </button>
        <div className="text-slate-800 text-[10px] font-bold">•</div>
        <button 
          onClick={() => scrollToPanel(1)}
          className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
            activePanel === 1 
              ? 'bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.5)] scale-[1.05]' 
              : 'text-slate-400 hover:text-white bg-white/5'
          }`}
        >
          2. Draft Pad
        </button>
        <div className="text-slate-800 text-[10px] font-bold">•</div>
        <button 
          onClick={() => scrollToPanel(2)}
          className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
            activePanel === 2 
              ? 'bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.5)] scale-[1.05]' 
              : 'text-slate-400 hover:text-white bg-white/5'
          }`}
        >
          3. AI Advice
        </button>
      </div>

      {/* Sliding panels wrapper (Spans whole-height/flex-1 in modern design) */}
      <div 
        ref={draftingContainerRef}
        onScroll={handleDraftingScroll}
        className="flex-1 flex flex-row overflow-x-auto md:overflow-hidden snap-x snap-mandatory scroll-smooth custom-scrollbar"
      >
        {/* Left Panel: Inputs */}
        <div className="w-[calc(100vw-72px)] md:w-80 flex-shrink-0 snap-center flex flex-col border-r border-white/5 bg-[#070b14]">
          <div className="p-6 border-b border-white/5">
            <div className="text-[10px] font-black text-indigo-500 tracking-widest uppercase">CASE INPUTS</div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block font-sans">Fact of the Case</label>
                <button onClick={() => setEnlargedElement('facts')} className="p-1 text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer" title="Enlarge">
                  <Maximize2 size={12} />
                </button>
              </div>
              <textarea 
                value={draftFacts} 
                onChange={e => setDraftFacts(e.target.value)}
                placeholder="Enter the facts of the case here..."
                className="w-full h-48 bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors resize-none custom-scrollbar"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block font-sans">Model Draft / Template</label>
                <button onClick={() => setEnlargedElement('model')} className="p-1 text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer" title="Enlarge">
                  <Maximize2 size={12} />
                </button>
              </div>
              <textarea 
                value={draftModel} 
                onChange={e => setDraftModel(e.target.value)}
                placeholder="Upload or paste a model draft..."
                className="w-full h-48 bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors resize-none custom-scrollbar"
              />
            </div>
            <button 
              onClick={() => handleAIDrafting()}
              disabled={isDrafting || !draftFacts.trim()}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-xl font-black text-[10px] text-white uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isDrafting ? <RotateCcw size={14} className="animate-spin" /> : <Zap size={14} />}
              {isDrafting ? "GENERATING..." : "GENERATE DRAFT"}
            </button>
          </div>
        </div>

        {/* Middle Panel: Writing Pad */}
        <div className="w-[calc(100vw-72px)] md:w-auto md:flex-1 flex-shrink-0 snap-center flex flex-col border-r border-white/5 bg-slate-950/10">
          <div className="h-12 bg-white/5 border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="text-[10px] font-black text-indigo-400 tracking-widest uppercase mr-4">TEMPORARY WRITING PAD</div>
              
              {/* Mode Toggle Tabs */}
              <div className="flex bg-[#070b14] p-0.5 rounded-lg border border-white/5">
                <button
                  onClick={() => setDraftEditorMode('interactive')}
                  className={`px-2.5 py-1 text-[9px] font-black uppercase rounded-md tracking-wider transition-all cursor-pointer ${
                    draftEditorMode === 'interactive'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Quick-Link View
                </button>
                <button
                  onClick={() => setDraftEditorMode('edit')}
                  className={`px-2.5 py-1 text-[9px] font-black uppercase rounded-md tracking-wider transition-all cursor-pointer ${
                    draftEditorMode === 'edit'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Edit Document
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEnlargedElement('pad')} className="p-1.5 text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer" title="Enlarge"><Maximize2 size={16} /></button>
              <button onClick={() => handleCopy(draftPages[0] || "")} className="p-1.5 text-slate-500 hover:text-white transition-colors cursor-pointer" title="Copy"><Copy size={16} /></button>
              <button onClick={() => handleDownloadDraft(draftPages[0] || "")} className="p-1.5 text-slate-500 hover:text-white transition-colors cursor-pointer" title="Download"><Download size={16} /></button>
            </div>
          </div>

          {/* Case Citations Dropdown / Panel */}
          {(isSearchingCitations || draftCitations.length > 0 || citationSearchError) && (
            <div className="bg-[#090e18] border-b border-white/10 shrink-0">
              {/* Accordion Trigger/Header */}
              <button 
                onClick={() => setShowCitationsDropdown(!showCitationsDropdown)}
                className="w-full px-6 py-3 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <BookOpen size={14} className="text-amber-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 font-sans">
                    Court Precedents & Citations
                  </span>
                  {isSearchingCitations && (
                    <span className="text-[9px] text-indigo-400 font-bold ml-2 animate-pulse flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                      Scanning Cases...
                    </span>
                  )}
                  {!isSearchingCitations && draftCitations.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[9px] font-black font-sans">
                      {draftCitations.length} Precedent{draftCitations.length > 1 ? 's' : ''} Found
                    </span>
                  )}
                  {!isSearchingCitations && draftCitations.length === 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-red-400/10 border border-red-500/20 text-red-400 text-[9px] font-black font-sans">
                      No Precedents Found
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black text-slate-500 uppercase font-sans">
                    {showCitationsDropdown ? 'COLLAPSE' : 'EXPAND'}
                  </span>
                  <ChevronRight 
                    size={16} 
                    className={`text-slate-400 transform transition-transform duration-200 ${showCitationsDropdown ? 'rotate-90' : ''}`} 
                  />
                </div>
              </button>

              {/* Accordion Content */}
              <AnimatePresence>
                {showCitationsDropdown && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-white/5 bg-black/40"
                  >
                    <div className="p-5 space-y-4">
                      {/* Error State */}
                      {citationSearchError && (
                        <div className="p-3 bg-red-500/10 border border-red-500/25 rounded-xl text-red-400 text-xs flex items-center gap-2">
                          <AlertTriangle size={14} />
                          <span>{citationSearchError}</span>
                        </div>
                      )}

                      {/* Loading State */}
                      {isSearchingCitations && (
                        <div className="py-6 flex flex-col items-center justify-center gap-2 text-slate-400">
                          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                          <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase font-sans">ANALYZING LEGAL ARCHIVES & RETRIEVING CITATIONS...</span>
                        </div>
                      )}

                      {/* No citation state */}
                      {!isSearchingCitations && draftCitations.length === 0 && !citationSearchError && (
                        <div className="py-6 flex flex-col items-center justify-center gap-1.5 text-center">
                          <AlertCircle size={20} className="text-amber-500/80 animate-bounce" />
                          <span className="text-xs font-semibold text-amber-500/90 font-sans">No case of interest located.</span>
                          <p className="text-[10px] text-slate-500 max-w-md font-sans">Our indexes failed to retrieve real precedents supporting this claim at this time.</p>
                        </div>
                      )}

                      {/* Citation results */}
                      {!isSearchingCitations && draftCitations.length > 0 && (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {draftCitations.map((cit) => (
                              <div 
                                id={`citation-card-${cit.id}`}
                                key={cit.id}
                                onClick={() => toggleCitationSelected(cit.id)}
                                className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                                  cit.id === highlightedCitationId
                                    ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-[1.02]'
                                    : cit.selected 
                                      ? 'bg-indigo-500/5 border-indigo-500 shadow-md ring-1 ring-indigo-500/50' 
                                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                                }`}
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                                      cit.court === 'Supreme Court' 
                                        ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400 font-sans' 
                                        : 'bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-sans'
                                    }`}>
                                      {cit.court}
                                    </span>
                                    
                                    {/* Tick button */}
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                                      cit.selected 
                                        ? 'bg-indigo-600 border-indigo-500 text-white' 
                                        : 'border-white/20 text-transparent hover:border-white/40'
                                    }`}>
                                      <Check size={10} strokeWidth={3} />
                                    </div>
                                  </div>
                                  <h4 className="text-xs font-black text-slate-200 leading-snug mb-2 font-serif">
                                    {cit.title}
                                  </h4>
                                  <p className="text-[10px] text-slate-400 leading-relaxed font-sans line-clamp-5">
                                    {cit.paragraph}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-white/5">
                            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wide font-sans">
                              Select citations and click run to incorporate precedents and rewrite draft.
                            </div>
                            <button
                              onClick={handleRewriteWithCitations}
                              disabled={isRewritingDraft || draftCitations.filter(c => c.selected).length === 0}
                              className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 rounded-xl font-black text-[10px] text-white uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer"
                            >
                              {isRewritingDraft ? (
                                <RotateCcw size={12} className="animate-spin" />
                              ) : (
                                <Zap size={12} className="text-yellow-400 fill-yellow-400" />
                              )}
                              {isRewritingDraft ? "REWRITING LAWSUIT..." : "ADD SELECTED CITATIONS & REWRITE"}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div className="flex-1 p-10 bg-black/20 overflow-y-auto custom-scrollbar">
            {draftEditorMode === 'interactive' ? (
              <div className="max-w-2xl mx-auto bg-white/5 p-12 rounded-lg shadow-2xl min-h-full font-serif text-slate-100 leading-relaxed outline-none">
                {renderDraftWithQuickLinks(draftPages[0] || "")}
              </div>
            ) : (
              <div 
                className="max-w-2xl mx-auto bg-white/5 p-12 rounded-lg shadow-2xl min-h-full font-serif text-slate-100 leading-relaxed whitespace-pre-wrap outline-none" 
                contentEditable 
                suppressContentEditableWarning 
                onBlur={(e) => setDraftPages([e.currentTarget.innerText])}
              >
                {draftPages[0] || ""}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Suggestions & Chat */}
        <div className="w-[calc(100vw-72px)] md:w-80 flex-shrink-0 snap-center flex flex-col bg-[#070b14] border-l border-white/5">
          <div className="h-12 bg-white/5 border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="text-[10px] font-black text-emerald-500 tracking-widest uppercase">AI SUGGESTIONS</div>
              <button 
                onClick={() => setShowCustomPromptPage(true)}
                className="px-2 py-0.5 bg-indigo-600/20 hover:bg-indigo-600 border border-[#818cf8]/10 text-indigo-400 hover:text-white rounded-md text-[8px] font-black tracking-wider transition-all uppercase cursor-pointer block"
                title="Configure custom drafting & suggestion instruction prompts"
              >
                PROMPT
              </button>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setEnlargedElement('suggestions')} className="p-1 text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer" title="Enlarge"><Maximize2 size={14} /></button>
              <button onClick={() => handleCopy(draftSuggestions)} className="p-1 text-slate-500 hover:text-white transition-colors cursor-pointer" title="Copy" disabled={!draftSuggestions}><Copy size={14} /></button>
              <button onClick={handleDownloadSuggestions} className="p-1 text-slate-500 hover:text-white transition-colors cursor-pointer" title="Download" disabled={!draftSuggestions}><Download size={14} /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {draftSuggestions && (
              <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4">
                <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-3 flex items-center gap-2 font-sans">
                  <InventoryIconWrapper><Info size={12} /></InventoryIconWrapper> Improvement Points
                </div>
                <div className="text-[11px] text-slate-300 leading-relaxed markdown-body">
                  <ReactMarkdown>{draftSuggestions}</ReactMarkdown>
                </div>
              </div>
            )}

            <div className="space-y-4 font-sans">
              <div className="text-[10px] font-black text-slate-500 tracking-widest uppercase">CHAT ASSISTANT</div>
              {deskChatHistory.map((msg, i) => (
                <div key={i} className={`p-4 rounded-2xl text-xs leading-relaxed markdown-body ${msg.role === 'ai' ? 'bg-white/5 border border-white/10' : 'bg-indigo-600/20 border border-indigo-600/30'}`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 border-t border-white/5 bg-[#070b14] pb-24 md:pb-6 flex-shrink-0">
            <div className="flex gap-2">
              <input 
                value={deskInput} 
                onChange={e => setDeskInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && sendDeskChat()} 
                placeholder="Refine draft..." 
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors" 
              />
              <button onClick={sendDeskChat} className="bg-indigo-600 p-2 rounded-xl text-white cursor-pointer hover:bg-indigo-500 transition-colors"><Send size={14} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Enlarged Overlay Modal */}
      <AnimatePresence>
        {enlargedElement && (
          <div className="fixed inset-0 bg-[#02050a]/95 backdrop-blur-md z-[2000] flex flex-col p-6">
            <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col h-full bg-[#090e18] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 flex justify-between items-center shrink-0">
                <div>
                  <h2 className="text-xl font-black italic uppercase tracking-wider text-white font-sans">
                    {enlargedElement === 'facts' && "Case Facts Details"}
                    {enlargedElement === 'model' && "Model Draft template"}
                    {enlargedElement === 'pad' && "Current Draft Pad document"}
                    {enlargedElement === 'suggestions' && "Full View AI Suggestions"}
                  </h2>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 font-sans">Full screen interactive inspection mode</div>
                </div>
                <button onClick={() => setEnlargedElement(null)} className="p-2.5 text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                  <Minimize2 size={18} />
                </button>
              </div>

              <div className="flex-1 p-8 overflow-y-auto custom-scrollbar min-h-[30vh]">
                {enlargedElement === 'facts' && (
                  <textarea 
                    value={draftFacts} 
                    onChange={e => setDraftFacts(e.target.value)}
                    className="w-full h-full bg-transparent border-none focus:outline-none font-sans text-sm text-slate-300 resize-none"
                    placeholder="Facts details..." 
                  />
                )}
                {enlargedElement === 'model' && (
                  <textarea 
                    value={draftModel} 
                    onChange={e => setDraftModel(e.target.value)}
                    className="w-full h-full bg-transparent border-none focus:outline-none font-sans text-sm text-slate-300 resize-none"
                    placeholder="Paste model template here..." 
                  />
                )}
                {enlargedElement === 'pad' && (
                  <div 
                    className="w-full h-full font-serif text-sm text-slate-300 leading-relaxed whitespace-pre-wrap outline-none" 
                    contentEditable 
                    suppressContentEditableWarning 
                    onBlur={(e) => setDraftPages([e.currentTarget.innerText])}
                  >
                    {draftPages[0]}
                  </div>
                )}
                {enlargedElement === 'suggestions' && (
                  <div className="text-sm text-slate-300 leading-relaxed markdown-body">
                    <ReactMarkdown>{draftSuggestions}</ReactMarkdown>
                  </div>
                )}
              </div>

              <div className="p-8 border-t border-white/5 flex justify-end gap-3 shrink-0 bg-[#090e18]">
                {enlargedElement === 'pad' && (
                  <>
                    <button onClick={() => handleCopy(draftPages[0] || "")} className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 font-sans text-slate-300">
                      <Copy size={16} /> Copy Draft
                    </button>
                    <button onClick={() => handleDownloadDraft(draftPages[0] || "")} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 text-white font-sans">
                      <Download size={16} /> Download Draft
                    </button>
                  </>
                )}
                {enlargedElement === 'suggestions' && (
                  <>
                    <button onClick={() => handleCopy(draftSuggestions)} className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 font-sans text-slate-300">
                      <Copy size={16} /> Copy Suggestions
                    </button>
                    <button onClick={handleDownloadSuggestions} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 text-white font-sans">
                      <Download size={16} /> Download Suggestions
                    </button>
                  </>
                )}
                <button onClick={() => setEnlargedElement(null)} className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer font-sans text-slate-300">
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Simple design wrapper component
function InventoryIconWrapper({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center">{children}</span>;
}
