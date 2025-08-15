import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/atoms/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/atoms/Card';
import { usePosts, useUsers } from '@/hooks/usePosts';
import { type Post, type User } from '@/services/api';
import { FileText, User as UserIcon, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function PostCard({ post, author, onClick }: { post: Post; author?: User; onClick: () => void }) {
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow h-full cursor-pointer hover:shadow-xl"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2 leading-tight">{post.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <UserIcon className="w-4 h-4" />
          <span className="font-medium">{author?.name || `User ${post.userId}`}</span>
          {author?.company && (
            <span className="text-xs text-muted-foreground">• {author.company.name}</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="w-4 h-4" />
          <span>Post #{post.id}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed">
          {post.body}
        </p>
        {author?.email && (
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              Contact: {author.email}
            </p>
            {author.website && (
              <p className="text-xs text-blue-600">
                Website: {author.website}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Posts</h3>
        <p className="text-gray-600">Fetching the latest posts for you...</p>
      </div>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-600" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to Load Posts</h3>
        <p className="text-gray-600 mb-4">Something went wrong while fetching the posts.</p>
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}

export function Movies() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { data: posts, isLoading: postsLoading, error: postsError, refetch: refetchPosts } = usePosts();
  const { data: users, isLoading: usersLoading } = useUsers();

  const isLoading = postsLoading || usersLoading;
  const hasError = postsError;

  const getUserById = (userId: number) => {
    return users?.find(user => user.id === userId);
  };

  const handlePostClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            <Button variant="outline" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Latest Blog Posts
          </h2>
          <p className="text-gray-600">
            Discover interesting articles and stories from our community
          </p>
        </div>

        {isLoading && <LoadingState />}
        
        {hasError && <ErrorState onRetry={refetchPosts} />}

        {!isLoading && !hasError && posts && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                author={getUserById(post.userId)}
                onClick={() => handlePostClick(post.id)}
              />
            ))}
          </div>
        )}

        {!isLoading && !hasError && posts?.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Posts Found</h3>
            <p className="text-gray-600">There are no posts available at the moment.</p>
          </div>
        )}
      </main>
    </div>
  );
}