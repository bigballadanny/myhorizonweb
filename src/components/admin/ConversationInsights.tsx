import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, MessageSquare, TrendingUp, AlertCircle, CheckCircle, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Conversation {
  id: string;
  lead_id: string | null;
  transcript: string;
  duration_seconds: number;
  metadata: any;
  created_at: string;
  leads?: {
    name: string;
    company: string;
  };
}

export function ConversationInsights() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          leads (
            name,
            company
          )
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load conversations',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const analyzeConversation = async (conversationId: string) => {
    setAnalyzingId(conversationId);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-conversation', {
        body: { conversationId },
      });

      if (error) throw error;

      toast({
        title: 'Analysis Complete',
        description: 'Conversation has been analyzed with AI insights',
      });

      fetchConversations();
    } catch (error) {
      console.error('Error analyzing conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to analyze conversation',
        variant: 'destructive',
      });
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI Conversation Insights</h2>
          <p className="text-muted-foreground">
            Analyze customer conversations with AI-powered insights
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {conversations.map((conv) => {
          const aiAnalysis = conv.metadata?.ai_analysis;
          const hasAnalysis = !!aiAnalysis;

          return (
            <Card key={conv.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {conv.leads?.name || 'Unknown Lead'}
                      {hasAnalysis && <Brain className="h-4 w-4 text-primary" />}
                    </CardTitle>
                    <CardDescription>
                      {conv.leads?.company} • {conv.duration_seconds}s •{' '}
                      {new Date(conv.created_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasAnalysis ? (
                      <>
                        {getSentimentBadge(aiAnalysis.sentiment)}
                        <div className="flex items-center gap-1">
                          {getIntentIcon(aiAnalysis.intent)}
                          <span className="text-sm capitalize">
                            {aiAnalysis.intent?.replace('_', ' ')}
                          </span>
                        </div>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => analyzeConversation(conv.id)}
                        disabled={analyzingId === conv.id}
                      >
                        {analyzingId === conv.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Brain className="h-4 w-4 mr-2" />
                            Analyze with AI
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
                              style={{ width: `${aiAnalysis.conversion_probability}%` }}
                            />
                          </div>
                          <span className="font-bold">{aiAnalysis.conversion_probability}%</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Recommended Action:</span>
                        <p className="text-muted-foreground mt-1">
                          {aiAnalysis.follow_up_action}
                        </p>
                      </div>
                    </div>

                    {aiAnalysis.summary && (
                      <div>
                        <span className="font-medium text-sm">Summary:</span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {aiAnalysis.summary}
                        </p>
                      </div>
                    )}

                    {aiAnalysis.pain_points?.length > 0 && (
                      <div>
                        <span className="font-medium text-sm">Pain Points:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {aiAnalysis.pain_points.map((point: string, i: number) => (
                            <Badge key={i} variant="outline">
                              {point}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {(aiAnalysis.budget_mentioned || aiAnalysis.timeline) && (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {aiAnalysis.budget_mentioned && (
                          <div>
                            <span className="font-medium">Budget:</span>
                            <p className="text-muted-foreground">{aiAnalysis.budget_mentioned}</p>
                          </div>
                        )}
                        {aiAnalysis.timeline && (
                          <div>
                            <span className="font-medium">Timeline:</span>
                            <p className="text-muted-foreground">{aiAnalysis.timeline}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-sm text-muted-foreground max-h-20 overflow-hidden">
                    {conv.transcript?.substring(0, 200)}...
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {conversations.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No conversations yet</p>
            <p className="text-sm text-muted-foreground">
              Generate sample data to see conversation insights
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
