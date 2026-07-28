-- Admin-only read/triage access. Anonymous visitors keep INSERT-only.
CREATE POLICY "Admins can read enquiries"
  ON public.partnership_enquiries FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update enquiry status"
  ON public.partnership_enquiries FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete enquiries"
  ON public.partnership_enquiries FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

GRANT SELECT, UPDATE, DELETE ON public.partnership_enquiries TO authenticated;
GRANT ALL ON public.partnership_enquiries TO service_role;

COMMENT ON TABLE public.partnership_enquiries IS
  'Partnership enquiries submitted from the public website. anon/authenticated may INSERT only (validated by the RLS WITH CHECK). Reading, status changes and deletion are restricted to users holding the admin role via public.has_role(), because rows contain personal data (names, emails, phone numbers). DELETE exists solely to satisfy data-erasure requests. A trigger keeps the submitted content immutable: admins may triage (status) but never rewrite what a person actually sent.';

-- Enquiries are a record of what someone actually sent us. Admin triage must
-- not be able to alter that record; only `status` may move.
CREATE OR REPLACE FUNCTION public.partnership_enquiries_immutable_content()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.company_name IS DISTINCT FROM OLD.company_name
     OR NEW.contact_name IS DISTINCT FROM OLD.contact_name
     OR NEW.email IS DISTINCT FROM OLD.email
     OR NEW.phone IS DISTINCT FROM OLD.phone
     OR NEW.interest IS DISTINCT FROM OLD.interest
     OR NEW.message IS DISTINCT FROM OLD.message
     OR NEW.locale IS DISTINCT FROM OLD.locale
     OR NEW.created_at IS DISTINCT FROM OLD.created_at
     OR NEW.id IS DISTINCT FROM OLD.id THEN
    RAISE EXCEPTION 'enquiry_content_immutable: only the status column may be modified on partnership_enquiries';
  END IF;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.partnership_enquiries_immutable_content() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER partnership_enquiries_immutable_content
  BEFORE UPDATE ON public.partnership_enquiries
  FOR EACH ROW EXECUTE FUNCTION public.partnership_enquiries_immutable_content();

-- Keep status to the triage vocabulary the admin screen uses.
ALTER TABLE public.partnership_enquiries
  ADD CONSTRAINT partnership_enquiries_status_check
  CHECK (status IN ('new', 'contacted', 'archived'));