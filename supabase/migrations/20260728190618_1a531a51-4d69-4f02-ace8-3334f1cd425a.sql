-- Replace the fully permissive anon INSERT policy (WITH CHECK true) on
-- partnership_enquiries with a constrained one. Public submission is still
-- allowed by design (it is a contact form), but the row must be well-formed:
-- required fields present, sane lengths, plausible email, and status/locale
-- values that the visitor cannot forge. Reads/updates/deletes remain denied.
DROP POLICY IF EXISTS "Anyone can submit a partnership enquiry" ON public.partnership_enquiries;

CREATE POLICY "Anyone can submit a valid partnership enquiry"
ON public.partnership_enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'new'
  AND locale IN ('pl', 'en')
  AND length(btrim(company_name)) BETWEEN 1 AND 100
  AND length(btrim(contact_name)) BETWEEN 1 AND 100
  AND length(btrim(interest)) BETWEEN 1 AND 60
  AND length(btrim(message)) BETWEEN 1 AND 1000
  AND length(email) BETWEEN 3 AND 255
  AND email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
  AND (phone IS NULL OR length(phone) <= 30)
);