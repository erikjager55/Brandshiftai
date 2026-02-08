import React from 'react';
import {
  ArrowLeft, Clock, FileText, ThumbsUp, ThumbsDown,
  ChevronRight, Mail,
} from 'lucide-react';
import { helpArticles, helpCategories } from '../../data/help-data';

interface HelpArticlePageProps {
  article: typeof helpArticles[0] | null;
  articleId: string;
  onBack: () => void;
  onArticleClick: (id: string) => void;
  feedback: 'up' | 'down' | null;
  onFeedback: (value: 'up' | 'down') => void;
}

export function HelpArticlePage({ article, articleId, onBack, onArticleClick, feedback, onFeedback }: HelpArticlePageProps) {
  // Find article from categories if not in detailed articles
  const categoryArticle = !article
    ? (() => {
        for (const cat of helpCategories) {
          const found = cat.articles.find(a => a.id === articleId);
          if (found) return { title: found.title, category: cat.title, categorySlug: cat.slug };
        }
        return null;
      })()
    : null;

  if (!article && !categoryArticle) {
    return (
      <div className="p-6">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-primary hover:underline mb-6 transition-colors duration-200">
          <ArrowLeft className="h-4 w-4" /> Back to Help Center
        </button>
        <div className="text-center py-12">
          <p className="text-foreground dark:text-white">Article not found</p>
          <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">The article you're looking for doesn't exist or has been moved.</p>
        </div>
      </div>
    );
  }

  // Generic article view for category articles without detailed content
  if (!article && categoryArticle) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-8">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-primary hover:underline mb-6 transition-colors duration-200">
          <ArrowLeft className="h-4 w-4" /> Back to Help Center
        </button>

        <div className="mb-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
            {categoryArticle.category}
          </span>
        </div>

        <h1 className="text-3xl font-semibold text-foreground dark:text-white mt-4 mb-2">
          {categoryArticle.title}
        </h1>
        <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
          A comprehensive guide to {categoryArticle.title.toLowerCase()} in Brandshift.
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground dark:text-gray-500 mb-8">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Updated recently</span>
          <span>·</span>
          <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> 3 min read</span>
        </div>

        <div className="border-t border-border dark:border-gray-800 pt-8">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <h2 className="text-xl font-semibold text-foreground dark:text-white mb-4">Overview</h2>
            <p className="text-muted-foreground dark:text-gray-400 leading-relaxed mb-6">
              This article covers everything you need to know about {categoryArticle.title.toLowerCase()}.
              Follow the steps below to get started and make the most of this feature.
            </p>

            <h2 className="text-xl font-semibold text-foreground dark:text-white mb-4">Getting Started</h2>
            <p className="text-muted-foreground dark:text-gray-400 leading-relaxed mb-4">
              Navigate to the relevant section in the sidebar to access {categoryArticle.title.toLowerCase()}.
              You'll find all the tools and settings you need to configure and manage this feature.
            </p>

            <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-xl p-4 mb-6">
              <p className="text-sm text-foreground dark:text-gray-300">
                <strong>Tip:</strong> Make sure your Brand Foundation is completed before using this feature for the best results.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-foreground dark:text-white mb-4">Need More Help?</h2>
            <p className="text-muted-foreground dark:text-gray-400 leading-relaxed">
              If you have questions about {categoryArticle.title.toLowerCase()}, our support team is ready to help.
              Use the live chat or submit a support ticket for assistance.
            </p>
          </div>
        </div>

        <div className="border-t border-border dark:border-gray-800 mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground dark:text-gray-400 mb-3">Was this article helpful?</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => onFeedback('up')}
              className={`flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border transition-all duration-200 ${
                feedback === 'up'
                  ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400'
                  : 'border-border dark:border-gray-700 text-muted-foreground dark:text-gray-400 hover:bg-muted/50 dark:hover:bg-gray-800'
              }`}
            >
              <ThumbsUp className="h-4 w-4" /> Yes
            </button>
            <button
              onClick={() => onFeedback('down')}
              className={`flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border transition-all duration-200 ${
                feedback === 'down'
                  ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
                  : 'border-border dark:border-gray-700 text-muted-foreground dark:text-gray-400 hover:bg-muted/50 dark:hover:bg-gray-800'
              }`}
            >
              <ThumbsDown className="h-4 w-4" /> No
            </button>
          </div>
        </div>

        <div className="border-t border-border dark:border-gray-800 mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground dark:text-gray-400">Still need help?</p>
          <button className="mt-2 text-sm text-primary hover:underline flex items-center gap-1 mx-auto transition-colors duration-200">
            <Mail className="h-4 w-4" /> Contact Support
          </button>
        </div>
      </div>
    );
  }

  // Full article view
  const relatedArticleData = (article!.relatedArticles || []).map(id => {
    const detailed = helpArticles.find(a => a.id === id);
    if (detailed) return { id, title: detailed.title };
    for (const cat of helpCategories) {
      const found = cat.articles.find(a => a.id === id);
      if (found) return { id, title: found.title };
    }
    return null;
  }).filter(Boolean) as { id: string; title: string }[];

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-primary hover:underline mb-6 transition-colors duration-200">
        <ArrowLeft className="h-4 w-4" /> Back to Help Center
      </button>

      <div className="mb-2">
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
          {article!.category}
        </span>
      </div>

      <h1 className="text-3xl font-semibold text-foreground dark:text-white mt-4 mb-2">
        {article!.title}
      </h1>
      <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
        {article!.description}
      </p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground dark:text-gray-500 mb-8">
        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Updated {article!.updatedAt}</span>
        <span>·</span>
        <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> {article!.readTime}</span>
      </div>

      <div className="border-t border-border dark:border-gray-800 pt-6 mb-8">
        {/* Table of Contents */}
        <div className="bg-muted/30 dark:bg-gray-900 rounded-xl p-4 mb-8">
          <p className="text-sm font-semibold text-foreground dark:text-white mb-3">In this article:</p>
          <ul className="space-y-1.5">
            {article!.tableOfContents.map((item, i) => (
              <li key={i}>
                <button className="text-sm text-primary hover:underline flex items-center gap-2 transition-colors duration-200">
                  <span className="h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Content */}
        <div className="space-y-8">
          {article!.content.map((section, i) => {
            const lines = section.split('\n');
            return (
              <div key={i}>
                {lines.map((line, j) => {
                  if (line.startsWith('## ')) {
                    return (
                      <h2 key={j} className="text-xl font-semibold text-foreground dark:text-white mb-4">
                        {line.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (line.startsWith('- **')) {
                    const match = line.match(/^- \*\*(.+?)\*\*: (.+)$/);
                    if (match) {
                      return (
                        <div key={j} className="flex items-start gap-2 mb-2 ml-4">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground dark:text-gray-400">
                            <strong className="text-foreground dark:text-white">{match[1]}</strong>: {match[2]}
                          </p>
                        </div>
                      );
                    }
                  }
                  if (line.startsWith('- ')) {
                    return (
                      <div key={j} className="flex items-start gap-2 mb-2 ml-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground dark:text-gray-400">{line.replace('- ', '')}</p>
                      </div>
                    );
                  }
                  if (line.trim() === '') return <div key={j} className="h-2" />;
                  return (
                    <p key={j} className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed mb-3">
                      {line}
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      <div className="border-t border-border dark:border-gray-800 pt-6 text-center">
        <p className="text-sm text-muted-foreground dark:text-gray-400 mb-3">Was this article helpful?</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => onFeedback('up')}
            className={`flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border transition-all duration-200 ${
              feedback === 'up'
                ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400'
                : 'border-border dark:border-gray-700 text-muted-foreground dark:text-gray-400 hover:bg-muted/50 dark:hover:bg-gray-800'
            }`}
          >
            <ThumbsUp className="h-4 w-4" /> Yes
          </button>
          <button
            onClick={() => onFeedback('down')}
            className={`flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border transition-all duration-200 ${
              feedback === 'down'
                ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
                : 'border-border dark:border-gray-700 text-muted-foreground dark:text-gray-400 hover:bg-muted/50 dark:hover:bg-gray-800'
            }`}
          >
            <ThumbsDown className="h-4 w-4" /> No
          </button>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticleData.length > 0 && (
        <div className="border-t border-border dark:border-gray-800 mt-8 pt-6">
          <h3 className="font-semibold text-foreground dark:text-white mb-4">Related Articles</h3>
          <div className="space-y-2">
            {relatedArticleData.map(ra => (
              <button
                key={ra.id}
                onClick={() => onArticleClick(ra.id)}
                className="w-full text-left flex items-center gap-2 p-3 rounded-lg hover:bg-muted/50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground dark:text-white">{ra.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Contact Support CTA */}
      <div className="border-t border-border dark:border-gray-800 mt-8 pt-6 text-center">
        <p className="text-sm text-muted-foreground dark:text-gray-400">Still need help?</p>
        <button
          onClick={onBack}
          className="mt-2 text-sm text-primary hover:underline flex items-center gap-1 mx-auto transition-colors duration-200"
        >
          <Mail className="h-4 w-4" /> Contact Support
        </button>
      </div>
    </div>
  );
}
