CREATE TABLE public.partnership_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  interest text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  locale text NOT NULL DEFAULT 'pl'
);

COMMENT ON TABLE public.partnership_enquiries IS
  'Partnership enquiries submitted from the public website form. RLS: anonymous visitors may INSERT only. There is deliberately no SELECT/UPDATE/DELETE policy for anon or authenticated roles, so enquiry contents (names, emails, phone numbers) can never be read through the public Data API. Only service_role (trusted server-side code) can read or manage rows.';

GRANT INSERT ON public.partnership_enquiries TO anon;
GRANT INSERT ON public.partnership_enquiries TO authenticated;
GRANT ALL ON public.partnership_enquiries TO service_role;

ALTER TABLE public.partnership_enquiries ENABLE ROW LEVEL SECURITY;

-- Public visitors may only create an enquiry; reads are intentionally not granted.
CREATE POLICY "Anyone can submit a partnership enquiry"
  ON public.partnership_enquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);