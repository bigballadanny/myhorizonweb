import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Brain, TrendingUp, MessageSquare, Clock, DollarSign, Calendar, AlertCircle, Search, Download, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { exportConversationsToCSV } from '@/lib/exportUtils';

interface Conversation {
  id: string;
  lead_id: string | null;
  transcript: string;
  duration_seconds: number;
  call_type: string | null;
  metadata: any;
  created_at: string;
  leads?: {
    name: string;
    email: string;
    company: string;
  };
}

export function ConversationInsights() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState<string>('all');

  useEffect(() => {
    fetchConversations();

    const channel = supabase
      .channel('conversation-insights-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'conversations' }, fetchConversations)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchConversations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          leads (
            name,
            email,
            company
          )
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast.error('Failed to load conversations');
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeConversation = async (conversationId: string) => {
    setAnalyzingId(conversationId);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-conversation', {
        body: { conversationId },
      });

      if (error) throw error;

      toast.success('Conversation analyzed successfully');
      fetchConversations();
    } catch (error) {
      console.error('Error analyzing conversation:', error);
      toast.error('Failed to analyze conversation');
    } finally {
      setAnalyzingId(null);
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    const variants: any = {
      positive: 'default',
      neutral: 'secondary',
      negative: 'destructive',
      very_positive: 'default',
    };
    return <Badge variant={variants[sentiment] || 'secondary'}>{sentiment}</Badge>;
  };

  const getIntentIcon = (intent: string) => {
    switch (intent) {
      case 'ready_to_buy':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'information_gathering':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'price_shopping':
        return <TrendingUp className="h-4 w-4 text-yellow-500" />;
      case 'not_interested':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = !searchQuery || 
      conv.transcript?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.leads?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.leads?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSentiment = sentimentFilter === 'all' || 
      conv.metadata?.analysis?.sentiment?.toLowerCase() === sentimentFilter;

    return matchesSearch && matchesSentiment;
  });

  const handleExport = () => {
    exportConversationsToCSV(filteredConversations);
    toast.success('Conversations exported successfully');
  };

  const totalDuration = filteredConversations.reduce((sum, conv) => sum + (conv.duration_seconds || 0), 0);
  const avgDuration = filteredConversations.length > 0 ? Math.round(totalDuration / filteredConversations.length) : 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats and Filters */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredConversations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.floor(avgDuration / 60)}m {avgDuration % 60}s</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Positive Sentiment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {filteredConversations.filter(c => c.metadata?.analysis?.sentiment === 'positive').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {filteredConversations.filter(c => (c.metadata?.analysis?.conversion_probability || 0) >= 70).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations by transcript or lead..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sentiment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sentiments</SelectItem>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport} variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4 pr-4">
          {filteredConversations.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No conversations found</p>
              </CardContent>
            </Card>
          ) : (
            filteredConversations.map((conversation) => {
              const analysis = conversation.metadata?.analysis || conversation.metadata?.ai_analysis;
              const hasAnalysis = !!analysis;

              return (
                <Card key={conversation.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          {conversation.leads?.name || 'Unknown Lead'}
                          {hasAnalysis && <Brain className="h-4 w-4 text-primary" />}
                        </CardTitle>
                        <CardDescription>
                          {conversation.leads?.company} • {conversation.duration_seconds}s •{' '}
                          {new Date(conversation.created_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {hasAnalysis ? (
                          <>
                            {getSentimentBadge(analysis.sentiment)}
                            <div className="flex items-center gap-1">
                              {getIntentIcon(analysis.intent)}
                              <span className="text-sm capitalize">
                                {analysis.intent?.replace('_', ' ')}
                              </span>
                            </div>
                          </>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => analyzeConversation(conversation.id)}
                            disabled={analyzingId === conversation.id}
                          >
                            {analyzingId === conversation.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Brain className="h-4 w-4 mr-2" />
                                Analyze
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {hasAnalysis ? (
                      <>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Conversion Probability:</span>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex-1 bg-secondary rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${analysis.conversion_probability}%` }}
                                />
                              </div>
                              <span className="font-bold">{analysis.conversion_probability}%</span>
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Recommended Action:</span>
                            <p className="text-muted-foreground mt-1">
                              {analysis.follow_up_action}
                            </p>
                          </div>
                        </div>

                        {analysis.summary && (
                          <div>
                            <span className="font-medium text-sm">Summary:</span>
                            <p className="text-sm text-muted-foreground mt-1">
                              {analysis.summary}
                            </p>
                          </div>
                        )}

                        {analysis.pain_points?.length > 0 && (
                          <div>
                            <span className="font-medium text-sm">Pain Points:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {analysis.pain_points.map((point: string, i: number) => (
                                <Badge key={i} variant="outline">
                                  {point}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {(analysis.budget_mentioned || analysis.timeline) && (
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            {analysis.budget_mentioned && (
                              <div>
                                <span className="font-medium">Budget:</span>
                                <p className="text-muted-foreground">{analysis.budget_mentioned}</p>
                              </div>
                            )}
                            {analysis.timeline && (
                              <div>
                                <span className="font-medium">Timeline:</span>
                                <p className="text-muted-foreground">{analysis.timeline}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-sm text-muted-foreground max-h-20 overflow-hidden">
                        {conversation.transcript?.substring(0, 200)}...
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}