import { useParams, useNavigate } from 'react-router-dom';
import { usePost, useUser, usePostComments } from '@/hooks/usePosts';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/atoms/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/atoms/Card';
import { ArrowLeft, User as UserIcon, Calendar, MessageCircle, Mail, Phone, Globe, Building, Loader2, AlertCircle } from 'lucide-react';
import { type Comment } from '@/services/api';

function CommentCard({ comment }: { comment: Comment }) {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">{comment.name}</CardTitle>
        <CardDescription className="flex items-center gap-2 text-sm">
          <Mail className="w-4 h-4" />
          {comment.email}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {comment.body}
        </p>
      </CardContent>
    </Card>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Post</h3>
        <p className="text-gray-600">Fetching post details...</p>
      </div>
    </div>
  );
}

function ErrorState() {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-600" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Post Not Found</h3>
        <p className="text-gray-600 mb-4">The post you're looking for doesn't exist or couldn't be loaded.</p>
        <Button onClick={() => navigate('/movies')} variant="outline">
          Back to Posts
        </Button>
      </div>
    </div>
  );
}

export function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  
  const postId = id ? parseInt(id, 10) : 0;
  
  const { data: post, isLoading: postLoading, error: postError } = usePost(postId);
  const { data: author, isLoading: authorLoading } = useUser(post?.userId || 0);
  const { data: comments, isLoading: commentsLoading } = usePostComments(postId);

  const isLoading = postLoading || authorLoading;
  const hasError = postError || (!postLoading && !post);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Button variant="ghost" onClick={() => navigate('/movies')} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Posts
              </Button>
              <Button variant="outline" onClick={logout}>
                Sign Out
              </Button>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingState />
        </main>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Button variant="ghost" onClick={() => navigate('/movies')} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Posts
              </Button>
              <Button variant="outline" onClick={logout}>
                Sign Out
              </Button>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorState />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button variant="ghost" onClick={() => navigate('/movies')} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Posts
            </Button>
            <div className="text-sm text-gray-600">
              Welcome back, {user?.name}!
            </div>
            <Button variant="outline" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Post Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold leading-tight">
              {post?.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                <span className="font-medium">{author?.name || `User ${post?.userId}`}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Post #{post?.id}</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-gray max-w-none">
              <p className="text-base leading-relaxed text-gray-700">
                {post?.body}
              </p>
            </div>

            {/* Author Information */}
            {author && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <UserIcon className="w-5 h-5" />
                  About the Author
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{author.name}</h4>
                      <p className="text-sm text-gray-600">@{author.username}</p>
                    </div>
                    <div className="space-y-2">
                      {author.email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <a href={`mailto:${author.email}`} className="text-blue-600 hover:underline">
                            {author.email}
                          </a>
                        </div>
                      )}
                      {author.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">{author.phone}</span>
                        </div>
                      )}
                      {author.website && (
                        <div className="flex items-center gap-2 text-sm">
                          <Globe className="w-4 h-4 text-gray-500" />
                          <a 
                            href={`http://${author.website}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {author.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {author.company && (
                    <div className="border-t pt-3 mt-3">
                      <div className="flex items-start gap-2">
                        <Building className="w-4 h-4 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">{author.company.name}</p>
                          <p className="text-sm text-gray-600 italic">"{author.company.catchPhrase}"</p>
                          <p className="text-xs text-gray-500">{author.company.bs}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {author.address && (
                    <div className="border-t pt-3 mt-3">
                      <p className="text-sm text-gray-600">
                        📍 {author.address.street}, {author.address.suite}, {author.address.city} {author.address.zipcode}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Comments Section */}
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Comments {comments && `(${comments.length})`}
          </h3>
          
          {commentsLoading && (
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading comments...
            </div>
          )}
          
          {!commentsLoading && comments && comments.length > 0 && (
            <div className="space-y-4">
              {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
          )}
          
          {!commentsLoading && comments && comments.length === 0 && (
            <Card>
              <CardContent className="py-8 text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">No comments yet. Be the first to comment!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}