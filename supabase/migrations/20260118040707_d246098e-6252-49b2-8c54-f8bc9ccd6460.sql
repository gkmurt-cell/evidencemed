-- Drop the overly permissive policy
DROP POLICY "Anyone can submit trial signup" ON public.trial_signups;

-- Create a more specific policy - allows insert but validates email format through application
CREATE POLICY "Public trial signup submission"
  ON public.trial_signups FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL AND 
    name IS NOT NULL AND 
    length(email) > 5 AND 
    length(name) > 1
  );