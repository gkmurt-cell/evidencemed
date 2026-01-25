-- Create table to cache PubMed search results
CREATE TABLE public.pubmed_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cache_key TEXT NOT NULL UNIQUE,
  query TEXT NOT NULL,
  condition TEXT,
  articles JSONB NOT NULL,
  total_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '24 hours')
);

-- Create index for faster lookups
CREATE INDEX idx_pubmed_cache_key ON public.pubmed_cache(cache_key);
CREATE INDEX idx_pubmed_cache_expires ON public.pubmed_cache(expires_at);

-- Enable RLS
ALTER TABLE public.pubmed_cache ENABLE ROW LEVEL SECURITY;

-- Allow public read access to cache (it's public research data)
CREATE POLICY "Anyone can view cached results"
ON public.pubmed_cache
FOR SELECT
USING (true);

-- Allow edge functions to insert/update cache via service role
CREATE POLICY "Service role can manage cache"
ON public.pubmed_cache
FOR ALL
USING (true)
WITH CHECK (true);