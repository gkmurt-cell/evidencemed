-- Fix quote_requests INSERT policy with correct column name
DROP POLICY IF EXISTS "Anyone can submit a quote request" ON public.quote_requests;

CREATE POLICY "Validated quote request submission"
ON public.quote_requests FOR INSERT
WITH CHECK (
  contact_email IS NOT NULL
  AND contact_name IS NOT NULL
  AND institution_name IS NOT NULL
  AND number_of_users IS NOT NULL
  AND length(contact_email) >= 5
  AND length(contact_name) >= 2
  AND length(institution_name) >= 2
  AND contact_email ~ '^[^@]+@[^@]+\.[^@]+$'
);