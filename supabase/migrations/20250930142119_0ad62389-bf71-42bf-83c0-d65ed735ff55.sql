-- Enable realtime for leads table so pipeline updates in real-time
ALTER PUBLICATION supabase_realtime ADD TABLE public.leads;