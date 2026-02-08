import { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  replies?: Comment[];
}

interface AssetCommentsProps {
  comments: Comment[];
  onAddComment: (content: string, parentId?: string) => void;
}

export function AssetComments({ comments, onAddComment }: AssetCommentsProps) {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  const handleReply = (parentId: string) => {
    if (replyContent.trim()) {
      onAddComment(replyContent.trim(), parentId);
      setReplyContent('');
      setReplyingTo(null);
    }
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`space-y-2 ${isReply ? 'ml-10' : ''}`}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-muted dark:bg-muted/50 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-medium">{comment.author.substring(0, 2).toUpperCase()}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium">{comment.author}</span>
            <span className="text-xs text-muted-foreground">{comment.time}</span>
          </div>
          <p className="text-sm">{comment.content}</p>
          {!isReply && (
            <button
              onClick={() => setReplyingTo(comment.id)}
              className="text-xs text-primary hover:underline mt-1"
            >
              Reply
            </button>
          )}
        </div>
      </div>

      {/* Reply form */}
      {replyingTo === comment.id && (
        <div className="ml-10 flex gap-2">
          <input
            type="text"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            className="flex-1 rounded-lg border dark:border-border bg-background dark:bg-card p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
          <button
            onClick={() => handleReply(comment.id)}
            disabled={!replyContent.trim()}
            className="px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors duration-200"
          >
            <Send className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              setReplyingTo(null);
              setReplyContent('');
            }}
            className="px-3 py-2 rounded-lg hover:bg-muted dark:hover:bg-muted/50 transition-colors duration-200 text-sm"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Render replies */}
      {comment.replies?.map((reply) => renderComment(reply, true))}
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Comments list */}
      <div className="flex-1 overflow-y-auto p-4">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <MessageSquare className="h-8 w-8 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">No comments yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => renderComment(comment))}
          </div>
        )}
      </div>

      {/* Add comment form */}
      <form onSubmit={handleSubmit} className="p-4 border-t dark:border-border flex gap-2">
        <div className="w-8 h-8 rounded-full bg-muted dark:bg-muted/50 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-medium">YO</span>
        </div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 rounded-lg border dark:border-border bg-background dark:bg-card p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
