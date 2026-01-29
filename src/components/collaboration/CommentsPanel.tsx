import React, { useState } from 'react';
import { useCollaboration } from '../../contexts';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { MessageSquare, Send, Smile, MoreVertical, Edit, Trash2, Reply } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface CommentsPanelProps {
  resourceId: string;
  resourceType: 'strategy' | 'research' | 'campaign';
}

export function CommentsPanel({ resourceId, resourceType }: CommentsPanelProps) {
  const { comments, addComment, updateComment, deleteComment, addReaction, currentUser } = useCollaboration();
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const resourceComments = comments[resourceId] || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addComment(resourceId, newComment);
    setNewComment('');
  };

  const handleEdit = (commentId: string, content: string) => {
    setEditingId(commentId);
    setEditContent(content);
  };

  const handleSaveEdit = (commentId: string) => {
    updateComment(commentId, editContent);
    setEditingId(null);
    setEditContent('');
  };

  const handleDelete = (commentId: string) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      deleteComment(commentId);
    }
  };

  const reactions = ['👍', '❤️', '🎉', '💡', '👀'];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          <h3 className="font-semibold">Comments</h3>
          <Badge variant="secondary">{resourceComments.length}</Badge>
        </div>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {resourceComments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>No comments yet</p>
            <p className="text-sm">Be the first to share your thoughts</p>
          </div>
        ) : (
          resourceComments.map((comment) => (
            <div key={comment.id} className="space-y-2">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.userAvatar} />
                  <AvatarFallback>{comment.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.userName}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </span>
                      {comment.updatedAt && (
                        <span className="text-xs text-muted-foreground">(edited)</span>
                      )}
                    </div>

                    {comment.userId === currentUser?.id && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(comment.id, comment.content)}>
                            <Edit className="h-3 w-3 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(comment.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-3 w-3 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>

                  {editingId === comment.id ? (
                    <div className="space-y-2">
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="min-h-[60px]"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleSaveEdit(comment.id)}>
                          Save
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => {
                            setEditingId(null);
                            setEditContent('');
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm whitespace-pre-wrap">{comment.content}</p>

                      {/* Reactions */}
                      <div className="flex items-center gap-2 pt-1">
                        {comment.reactions && comment.reactions.length > 0 && (
                          <div className="flex gap-1">
                            {Object.entries(
                              comment.reactions.reduce((acc, r) => {
                                acc[r.emoji] = (acc[r.emoji] || 0) + 1;
                                return acc;
                              }, {} as Record<string, number>)
                            ).map(([emoji, count]) => (
                              <Button
                                key={emoji}
                                variant="outline"
                                size="sm"
                                className="h-6 px-2 text-xs gap-1"
                                onClick={() => addReaction(comment.id, emoji)}
                              >
                                <span>{emoji}</span>
                                <span>{count}</span>
                              </Button>
                            ))}
                          </div>
                        )}

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <Smile className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <div className="flex gap-1 p-1">
                              {reactions.map((emoji) => (
                                <Button
                                  key={emoji}
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => addReaction(comment.id, emoji)}
                                >
                                  {emoji}
                                </Button>
                              ))}
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Comment */}
      <div className="border-t border-border p-4">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="relative">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="min-h-[80px] pr-10"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleSubmit(e);
                }
              }}
            />
            <div className="absolute bottom-2 right-2">
              <Button
                type="submit"
                size="sm"
                disabled={!newComment.trim()}
                className="h-8 w-8 p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Press <kbd className="px-1 py-0.5 bg-muted rounded">Cmd/Ctrl + Enter</kbd> to send
          </p>
        </form>
      </div>
    </div>
  );
}