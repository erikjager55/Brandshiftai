import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  HelpCircle, Search, X, ArrowRight, ChevronRight,
  GraduationCap, BookOpen, MessageSquare, Mail,
  Rocket, Sparkles, FileText, Users, Settings,
  Play, Video, ExternalLink, Zap, Lightbulb, Star, Send,
  CheckCircle2, Clock, AlertCircle, ThumbsUp, ThumbsDown,
  ChevronDown, Plus, Minus, Headphones,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  helpCategories, helpVideos, helpFAQs, featureRequests as initialFeatureRequests,
  systemServices, helpResources, popularSearches, helpArticles,
  contactSubjects, searchHelpContent,
  type FeatureRequest,
} from '../../data/help-data';
import { HelpArticlePage } from './HelpArticlePage';
import { LiveChatWidget } from './LiveChatWidget';
import { OnboardingChecklist } from './OnboardingChecklist';

// Icon mapping helper
const iconMap: Record<string, React.ReactNode> = {
  Rocket: <Rocket className="h-4 w-4" />,
  Sparkles: <Sparkles className="h-4 w-4" />,
  BookOpen: <BookOpen className="h-4 w-4" />,
  Users: <Users className="h-4 w-4" />,
  FileText: <FileText className="h-4 w-4" />,
  Settings: <Settings className="h-4 w-4" />,
  Zap: <Zap className="h-4 w-4" />,
  GraduationCap: <GraduationCap className="h-4 w-4" />,
  Video: <Video className="h-4 w-4" />,
};

const iconMapLarge: Record<string, React.ReactNode> = {
  Rocket: <Rocket className="h-8 w-8" />,
  Sparkles: <Sparkles className="h-8 w-8" />,
  BookOpen: <BookOpen className="h-8 w-8" />,
  Users: <Users className="h-8 w-8" />,
  FileText: <FileText className="h-8 w-8" />,
  Settings: <Settings className="h-8 w-8" />,
  Zap: <Zap className="h-8 w-8" />,
  GraduationCap: <GraduationCap className="h-8 w-8" />,
  Video: <Video className="h-8 w-8" />,
};

export function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq-2');
  const [faqFeedback, setFaqFeedback] = useState<Record<string, 'up' | 'down'>>({});
  const [articleFeedback, setArticleFeedback] = useState<'up' | 'down' | null>(null);
  const [featureRequests, setFeatureRequests] = useState<FeatureRequest[]>(initialFeatureRequests);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });
  const [submitting, setSubmitting] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Debounced search
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setShowSearchResults(value.trim().length > 0);
    }, 300);
  }, []);

  // Search results
  const searchResults = searchHelpContent(searchQuery);
  const totalResults = searchResults.articles.length + searchResults.videos.length + searchResults.faqs.length;

  // Handle article click
  const openArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setShowSearchResults(false);
    setSearchQuery('');
    window.scrollTo(0, 0);
  };

  // Handle form submission
  const handleSubmitForm = async () => {
    if (!contactForm.subject || !contactForm.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    toast.success('Support request submitted successfully! We\'ll get back to you shortly.');
    setContactForm({ subject: '', description: '', priority: 'medium' });
  };

  // Handle vote
  const handleVote = (id: string) => {
    setFeatureRequests(prev =>
      prev.map(fr =>
        fr.id === id
          ? { ...fr, votes: fr.hasVoted ? fr.votes - 1 : fr.votes + 1, hasVoted: !fr.hasVoted }
          : fr
      )
    );
  };

  // If viewing an article
  if (selectedArticleId) {
    const article = helpArticles.find(a => a.id === selectedArticleId);
    return (
      <div className="min-h-screen bg-background dark:bg-gray-950">
        <HelpArticlePage
          article={article || null}
          articleId={selectedArticleId}
          onBack={() => {
            setSelectedArticleId(null);
            setArticleFeedback(null);
          }}
          onArticleClick={openArticle}
          feedback={articleFeedback}
          onFeedback={setArticleFeedback}
        />
        <LiveChatWidget open={chatOpen} onToggle={() => setChatOpen(!chatOpen)} />
      </div>
    );
  }

  const statusLabels: Record<string, string> = {
    'planned': 'Planned',
    'under-review': 'Under Review',
    'in-progress': 'In Progress',
    'shipped': 'Shipped',
  };

  const statusColors: Record<string, string> = {
    'planned': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    'under-review': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    'in-progress': 'bg-primary/10 text-primary dark:bg-primary/20',
    'shipped': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  };

  const ratingEmojis = ['😞', '😐', '🙂', '😊', '🤩'];

  return (
    <div className="min-h-screen bg-background dark:bg-gray-950">
      {/* ==================== HEADER ==================== */}
      <div className="bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent py-12 px-6 text-center relative">
        <div className="flex justify-center mb-4">
          <HelpCircle className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-semibold text-foreground dark:text-white mb-6">
          How can we help you?
        </h1>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative">
          <div className={`relative flex items-center h-12 rounded-full border bg-card dark:bg-gray-900 dark:border-gray-700 shadow-sm transition-shadow duration-200 ${showSearchResults ? 'shadow-md rounded-b-none border-b-0' : 'focus-within:shadow-md'}`}>
            <Search className="h-4 w-4 text-muted-foreground dark:text-gray-400 ml-4 flex-shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={e => handleSearchChange(e.target.value)}
              onFocus={() => { if (searchQuery.trim()) setShowSearchResults(true); }}
              placeholder="Search for answers..."
              className="flex-1 h-full bg-transparent border-none outline-none px-3 text-sm text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-500"
              onKeyDown={e => {
                if (e.key === 'Escape') {
                  setShowSearchResults(false);
                  setSearchQuery('');
                  searchInputRef.current?.blur();
                }
              }}
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); setShowSearchResults(false); }}
                className="mr-3 p-1 rounded-full hover:bg-muted dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <X className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && (
            <div className="absolute top-12 left-0 right-0 bg-card dark:bg-gray-900 border dark:border-gray-700 border-t-0 rounded-b-xl shadow-lg z-50 max-h-[400px] overflow-y-auto">
              {totalResults > 0 ? (
                <div className="p-4">
                  <p className="text-xs text-muted-foreground dark:text-gray-400 mb-3">
                    {totalResults} result{totalResults !== 1 ? 's' : ''} for "{searchQuery}"
                  </p>

                  {searchResults.articles.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-muted-foreground dark:text-gray-500 uppercase tracking-wider mb-2">Articles</p>
                      {searchResults.articles.slice(0, 3).map(art => (
                        <button
                          key={art.id}
                          onClick={() => openArticle(art.id)}
                          className="w-full text-left p-3 rounded-lg hover:bg-muted/50 dark:hover:bg-gray-800 transition-colors duration-200 block"
                        >
                          <div className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-foreground dark:text-white">{art.title}</p>
                              <p className="text-xs text-muted-foreground dark:text-gray-400 mt-0.5 line-clamp-1">{art.description}</p>
                              <p className="text-xs text-muted-foreground dark:text-gray-500 mt-1">{art.category}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {searchResults.videos.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-muted-foreground dark:text-gray-500 uppercase tracking-wider mb-2">Videos</p>
                      {searchResults.videos.slice(0, 2).map(vid => (
                        <button
                          key={vid.id}
                          className="w-full text-left p-3 rounded-lg hover:bg-muted/50 dark:hover:bg-gray-800 transition-colors duration-200 block"
                          onClick={() => toast.info('Video player coming soon!')}
                        >
                          <div className="flex items-start gap-2">
                            <Video className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground dark:text-white">{vid.title}</p>
                              <p className="text-xs text-muted-foreground dark:text-gray-400 mt-0.5 line-clamp-1">{vid.description}</p>
                            </div>
                            <span className="text-xs text-muted-foreground dark:text-gray-500">{vid.duration}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {searchResults.faqs.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground dark:text-gray-500 uppercase tracking-wider mb-2">FAQ</p>
                      {searchResults.faqs.slice(0, 2).map(faq => (
                        <button
                          key={faq.id}
                          className="w-full text-left p-3 rounded-lg hover:bg-muted/50 dark:hover:bg-gray-800 transition-colors duration-200 block"
                          onClick={() => {
                            setShowSearchResults(false);
                            setSearchQuery('');
                            setExpandedFaq(faq.id);
                            document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          <div className="flex items-start gap-2">
                            <HelpCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-foreground dark:text-white">{faq.question}</p>
                              <p className="text-xs text-muted-foreground dark:text-gray-400 mt-0.5 line-clamp-1">{faq.answer}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-sm text-foreground dark:text-white">No results found for "{searchQuery}"</p>
                  <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">Try different keywords or browse by topic</p>
                  <button
                    onClick={() => {
                      setShowSearchResults(false);
                      setSearchQuery('');
                      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs text-primary hover:underline mt-2 inline-block"
                  >
                    Contact support
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Popular Searches */}
        <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground dark:text-gray-400">Popular:</span>
          {popularSearches.map((term, i) => (
            <React.Fragment key={term}>
              <button
                onClick={() => { setSearchQuery(term); handleSearchChange(term); searchInputRef.current?.focus(); }}
                className="text-sm text-primary hover:underline transition-colors duration-200"
              >
                {term}
              </button>
              {i < popularSearches.length - 1 && <span className="text-muted-foreground dark:text-gray-600">·</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Click overlay to close search */}
        {showSearchResults && (
          <div className="fixed inset-0 z-40" onClick={() => setShowSearchResults(false)} />
        )}
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-12 space-y-12 relative z-10">
        {/* ==================== QUICK ACTIONS ==================== */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <GraduationCap className="h-8 w-8 text-primary" />, title: 'Getting Started', desc: 'New to Brandshift? Start here.', action: () => openArticle('art-3') },
              { icon: <BookOpen className="h-8 w-8 text-primary" />, title: 'Documentation', desc: 'Detailed guides and tutorials', action: () => toast.info('Opening documentation...') },
              { icon: <MessageSquare className="h-8 w-8 text-primary" />, title: 'Live Chat', desc: 'Chat with our support team', online: true, action: () => setChatOpen(true) },
              { icon: <Mail className="h-8 w-8 text-primary" />, title: 'Contact Support', desc: 'Submit a ticket for complex issues', action: () => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' }) },
            ].map(card => (
              <button
                key={card.title}
                onClick={card.action}
                className="bg-card dark:bg-gray-900 rounded-xl border border-border dark:border-gray-800 p-6 text-left hover:shadow-md hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-200 cursor-pointer group"
              >
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-lg font-semibold text-foreground dark:text-white">{card.title}</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">{card.desc}</p>
                <div className="flex items-center justify-between mt-4">
                  {'online' in card && (
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs text-green-600 dark:text-green-400">Online</span>
                    </div>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground dark:text-gray-500 ml-auto group-hover:text-primary transition-colors duration-200" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ==================== BROWSE BY TOPIC ==================== */}
        <section>
          <h2 className="text-xl font-semibold text-foreground dark:text-white mb-6">Browse by Topic</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {helpCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  if (cat.articles[0]) openArticle(cat.articles[0].id);
                }}
                className="bg-card dark:bg-gray-900 rounded-xl border border-border dark:border-gray-800 p-6 text-left hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${cat.bgColor} ${cat.darkBgColor}`}>
                    <span className={cat.color}>{iconMap[cat.icon]}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground dark:text-white">{cat.title}</h3>
                </div>
                <ul className="space-y-1.5 mb-4">
                  {cat.articles.map(art => (
                    <li key={art.id} className="text-sm text-muted-foreground dark:text-gray-400 flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/40 dark:bg-gray-600 flex-shrink-0" />
                      {art.title}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground dark:text-gray-500">{cat.articleCount} articles</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground dark:text-gray-500 group-hover:text-primary transition-colors duration-200" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ==================== VIDEO TUTORIALS ==================== */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground dark:text-white">Video Tutorials</h2>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">Learn Brandshift with step-by-step videos</p>
            </div>
            <button className="text-sm text-primary hover:underline flex items-center gap-1 transition-colors duration-200">
              View All <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {helpVideos.map(vid => (
              <button
                key={vid.id}
                onClick={() => toast.info('Video player coming soon!')}
                className="bg-card dark:bg-gray-900 rounded-xl border border-border dark:border-gray-800 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group text-left"
              >
                <div className="relative aspect-video bg-muted dark:bg-gray-800 overflow-hidden">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center shadow-lg">
                      <Play className="h-4 w-4 text-foreground dark:text-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {vid.duration}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-foreground dark:text-white">{vid.title}</p>
                  <p className="text-xs text-muted-foreground dark:text-gray-500 mt-1">{vid.category}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ==================== FAQ ==================== */}
        <section id="faq-section">
          <h2 className="text-xl font-semibold text-foreground dark:text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {helpFAQs.map(faq => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-card dark:bg-gray-900 rounded-xl border border-border dark:border-gray-800 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                  >
                    <span className="text-sm font-medium text-foreground dark:text-white pr-4">{faq.question}</span>
                    {isOpen ? (
                      <Minus className="h-4 w-4 text-muted-foreground dark:text-gray-400 flex-shrink-0" />
                    ) : (
                      <Plus className="h-4 w-4 text-muted-foreground dark:text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-200"
                    style={{
                      maxHeight: isOpen ? '500px' : '0px',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="px-4 pb-4">
                      <div className="border-t border-border dark:border-gray-800 pt-3">
                        <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                        {faq.relatedLinks.length > 0 && (
                          <div className="mt-3 flex items-center gap-2 flex-wrap">
                            <span className="text-xs text-muted-foreground dark:text-gray-500">Related:</span>
                            {faq.relatedLinks.map((link, i) => (
                              <React.Fragment key={link.id}>
                                <button
                                  onClick={e => { e.stopPropagation(); openArticle(link.id); }}
                                  className="text-xs text-primary hover:underline transition-colors duration-200"
                                >
                                  {link.title}
                                </button>
                                {i < faq.relatedLinks.length - 1 && <span className="text-xs text-muted-foreground dark:text-gray-600">·</span>}
                              </React.Fragment>
                            ))}
                          </div>
                        )}
                        <div className="mt-3 flex items-center gap-3">
                          <span className="text-xs text-muted-foreground dark:text-gray-500">Was this helpful?</span>
                          <button
                            onClick={e => { e.stopPropagation(); setFaqFeedback(p => ({ ...p, [faq.id]: 'up' })); toast.success('Thanks for your feedback!'); }}
                            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg border transition-all duration-200 ${
                              faqFeedback[faq.id] === 'up'
                                ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400'
                                : 'border-border dark:border-gray-700 text-muted-foreground dark:text-gray-400 hover:bg-muted/50 dark:hover:bg-gray-800'
                            }`}
                          >
                            <ThumbsUp className="h-3 w-3" /> Yes
                          </button>
                          <button
                            onClick={e => { e.stopPropagation(); setFaqFeedback(p => ({ ...p, [faq.id]: 'down' })); toast.info('We\'ll improve this answer. Thank you!'); }}
                            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg border transition-all duration-200 ${
                              faqFeedback[faq.id] === 'down'
                                ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
                                : 'border-border dark:border-gray-700 text-muted-foreground dark:text-gray-400 hover:bg-muted/50 dark:hover:bg-gray-800'
                            }`}
                          >
                            <ThumbsDown className="h-3 w-3" /> No
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-right">
            <button className="text-sm text-primary hover:underline flex items-center gap-1 ml-auto transition-colors duration-200">
              View All FAQs <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* ==================== CONTACT SUPPORT ==================== */}
        <section id="contact-section">
          <h2 className="text-xl font-semibold text-foreground dark:text-white mb-1">Contact Support</h2>
          <p className="text-sm text-muted-foreground dark:text-gray-400 mb-6">Can't find what you're looking for? We're here to help.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Contact Options */}
            <div className="space-y-4">
              {/* Live Chat */}
              <div className="bg-card dark:bg-gray-900 rounded-xl border border-border dark:border-gray-800 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-foreground dark:text-white">Live Chat</h3>
                </div>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mb-3">Chat with our support team in real-time.</p>
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-green-600 dark:text-green-400">Online</span>
                </div>
                <p className="text-xs text-muted-foreground dark:text-gray-500 mb-4">Typical response: &lt; 5 min</p>
                <button
                  onClick={() => setChatOpen(true)}
                  className="w-full bg-primary text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
                >
                  Start Chat
                </button>

                <div className="border-t border-border dark:border-gray-800 my-4" />

                <div className="flex items-center gap-3 mb-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-foreground dark:text-white">Email Us</h3>
                </div>
                <a href="mailto:support@brandshift.ai" className="text-sm text-primary hover:underline transition-colors duration-200">
                  support@brandshift.ai
                </a>
                <p className="text-xs text-muted-foreground dark:text-gray-500 mt-1">Typical response: &lt; 24 hours</p>

                <div className="border-t border-border dark:border-gray-800 my-4" />

                <div className="flex items-center gap-3 mb-2">
                  <Headphones className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-foreground dark:text-white">Schedule a Call</h3>
                </div>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mb-3">Book a 15-min support call</p>
                <button
                  onClick={() => toast.info('Calendar integration coming soon!')}
                  className="text-sm text-primary hover:underline flex items-center gap-1 transition-colors duration-200"
                >
                  Book Call <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right: Support Form */}
            <div className="bg-card dark:bg-gray-900 rounded-xl border border-border dark:border-gray-800 p-6">
              <h3 className="font-semibold text-foreground dark:text-white mb-4">Submit a Request</h3>

              <div className="space-y-4">
                {/* Subject */}
                <div>
                  <label className="text-sm font-medium text-foreground dark:text-gray-300 mb-1.5 block">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={contactForm.subject}
                    onChange={e => setContactForm(p => ({ ...p, subject: e.target.value }))}
                    className="w-full h-10 px-3 rounded-lg border border-border dark:border-gray-700 bg-background dark:bg-gray-800 text-sm text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                  >
                    <option value="">Select a topic...</option>
                    {contactSubjects.map(subj => (
                      <option key={subj} value={subj}>{subj}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-foreground dark:text-gray-300 mb-1.5 block">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={contactForm.description}
                    onChange={e => setContactForm(p => ({ ...p, description: e.target.value }))}
                    rows={4}
                    placeholder="Describe your issue or question in detail..."
                    className="w-full px-3 py-2 rounded-lg border border-border dark:border-gray-700 bg-background dark:bg-gray-800 text-sm text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all duration-200"
                  />
                </div>

                {/* Attachments */}
                <div>
                  <label className="text-sm font-medium text-foreground dark:text-gray-300 mb-1.5 block">
                    Attachments (optional)
                  </label>
                  <div className="border-2 border-dashed border-border dark:border-gray-700 rounded-lg p-4 text-center hover:border-primary/50 dark:hover:border-primary/50 transition-colors duration-200 cursor-pointer">
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      📎 Drop files here or <span className="text-primary">browse</span>
                    </p>
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label className="text-sm font-medium text-foreground dark:text-gray-300 mb-2 block">Priority</label>
                  <div className="flex gap-4">
                    {(['low', 'medium', 'high'] as const).map(p => (
                      <label key={p} className="flex items-center gap-2 cursor-pointer">
                        <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                          contactForm.priority === p
                            ? 'border-primary'
                            : 'border-border dark:border-gray-600'
                        }`}>
                          {contactForm.priority === p && (
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <span className="text-sm text-foreground dark:text-gray-300 capitalize">{p}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSubmitForm}
                  disabled={submitting}
                  className="w-full bg-primary text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Request
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== SYSTEM STATUS ==================== */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground dark:text-white">System Status</h2>
            <button className="text-sm text-primary hover:underline flex items-center gap-1 transition-colors duration-200">
              Status Page <ExternalLink className="h-3 w-3" />
            </button>
          </div>

          {/* Overall Status */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">All Systems Operational</span>
            </div>
            <p className="text-xs text-green-600/70 dark:text-green-400/70 mt-1 ml-[18px]">Last updated: 5 minutes ago</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {systemServices.map(svc => {
              const dotColor = svc.status === 'operational' ? 'bg-green-500' : svc.status === 'degraded' ? 'bg-amber-500' : 'bg-red-500';
              const textColor = svc.status === 'operational' ? 'text-green-600 dark:text-green-400' : svc.status === 'degraded' ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400';
              return (
                <div key={svc.id} className="bg-card dark:bg-gray-900 rounded-xl border border-border dark:border-gray-800 p-4">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${dotColor}`} />
                    <span className="text-sm font-medium text-foreground dark:text-white">{svc.name}</span>
                  </div>
                  <p className={`text-xs mt-1 ml-4 capitalize ${textColor}`}>{svc.status}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==================== FEATURE REQUESTS & FEEDBACK ==================== */}
        <section>
          <h2 className="text-xl font-semibold text-foreground dark:text-white mb-1">Feature Requests & Feedback</h2>
          <p className="text-sm text-muted-foreground dark:text-gray-400 mb-6">Help us improve Brandshift</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Feature Request Card */}
            <div className="bg-card dark:bg-gray-900 rounded-xl border border-border dark:border-gray-800 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                  <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-semibold text-foreground dark:text-white">Request a Feature</h3>
              </div>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
                Have an idea that would make Brandshift better? We'd love to hear it!
              </p>
              <button
                onClick={() => toast.info('Feature request form coming soon!')}
                className="text-sm text-primary hover:underline flex items-center gap-1 transition-colors duration-200"
              >
                Submit Idea <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Rating Widget */}
            <div className="bg-card dark:bg-gray-900 rounded-xl border border-border dark:border-gray-800 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <Star className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-foreground dark:text-white">Rate Your Experience</h3>
              </div>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">How are you enjoying Brandshift?</p>
              <div className="flex gap-2">
                {ratingEmojis.map((emoji, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedRating(i);
                      toast.success(`Thanks for rating us ${emoji}! Your feedback helps us improve.`);
                    }}
                    className={`text-2xl p-2 rounded-lg transition-all duration-200 ${
                      selectedRating === i
                        ? 'bg-primary/10 dark:bg-primary/20 scale-110 ring-2 ring-primary/50'
                        : 'hover:bg-muted/50 dark:hover:bg-gray-800 hover:scale-110'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground dark:text-gray-500 mt-3">Your feedback helps us improve.</p>
            </div>
          </div>

          {/* Popular Feature Requests */}
          <div className="bg-card dark:bg-gray-900 rounded-xl border border-border dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground dark:text-white">Popular Feature Requests</h3>
              <button className="text-sm text-primary hover:underline flex items-center gap-1 transition-colors duration-200">
                View All <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              {featureRequests.map(fr => (
                <div key={fr.id} className="flex items-center gap-4 p-3 rounded-lg border border-border dark:border-gray-800 hover:bg-muted/30 dark:hover:bg-gray-800/50 transition-colors duration-200">
                  <button
                    onClick={() => handleVote(fr.id)}
                    className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all duration-200 ${
                      fr.hasVoted
                        ? 'text-primary bg-primary/10 dark:bg-primary/20'
                        : 'text-muted-foreground dark:text-gray-400 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4 rotate-180" />
                    <span className="text-xs font-medium">{fr.votes}</span>
                  </button>
                  <span className="flex-1 text-sm text-foreground dark:text-white">{fr.title}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColors[fr.status]}`}>
                    {statusLabels[fr.status]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== RESOURCES ==================== */}
        <section>
          <h2 className="text-xl font-semibold text-foreground dark:text-white mb-6">Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {helpResources.map(res => (
              <a
                key={res.id}
                href={res.url}
                target={res.external ? '_blank' : undefined}
                rel={res.external ? 'noopener noreferrer' : undefined}
                className="bg-card dark:bg-gray-900 rounded-xl border border-border dark:border-gray-800 p-4 hover:bg-muted/50 dark:hover:bg-gray-800/50 transition-all duration-200 flex items-center gap-3 group"
              >
                <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                  <span className="text-primary">{iconMap[res.icon]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground dark:text-white">{res.title}</p>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">{res.description}</p>
                </div>
                {res.external && (
                  <ExternalLink className="h-4 w-4 text-muted-foreground dark:text-gray-500 flex-shrink-0 group-hover:text-primary transition-colors duration-200" />
                )}
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* ==================== LIVE CHAT WIDGET ==================== */}
      <LiveChatWidget open={chatOpen} onToggle={() => setChatOpen(!chatOpen)} />

      {/* ==================== ONBOARDING CHECKLIST ==================== */}
      {showOnboarding && (
        <OnboardingChecklist onDismiss={() => setShowOnboarding(false)} />
      )}
    </div>
  );
}