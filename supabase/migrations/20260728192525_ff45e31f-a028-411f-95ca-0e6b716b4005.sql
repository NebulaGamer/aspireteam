-- Immutable history of admin access changes. Written only by trusted server
-- functions using the service role; there are deliberately no INSERT/UPDATE/
-- DELETE policies so no client can forge or erase history.
CREATE TABLE public.admin_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id uuid NOT NULL,
  action text NOT NULL CHECK (action IN ('invite_sent', 'role_granted', 'role_revoked')),
  target_email text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX admin_audit_log_created_at_idx ON public.admin_audit_log (created_at DESC);

GRANT SELECT ON public.admin_audit_log TO authenticated;
GRANT ALL ON public.admin_audit_log TO service_role;

ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read the audit log"
  ON public.admin_audit_log
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Backstop against permanent lockout: if the last admin row were ever deleted,
-- nobody could grant the role again without direct database access. The
-- self-revoke guard lives in the server function instead, because the service
-- role client has no auth.uid() for a trigger to compare against.
CREATE OR REPLACE FUNCTION public.prevent_last_admin_removal()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF OLD.role = 'admin' THEN
    IF (SELECT count(*) FROM public.user_roles WHERE role = 'admin') <= 1 THEN
      RAISE EXCEPTION 'last_admin_protected';
    END IF;
  END IF;
  RETURN OLD;
END;
$$;

CREATE TRIGGER user_roles_prevent_last_admin_removal
  BEFORE DELETE ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_last_admin_removal();