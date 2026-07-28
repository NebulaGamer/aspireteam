-- Trigger-only function: nothing should be able to call it over the API.
REVOKE ALL ON FUNCTION public.prevent_last_admin_removal() FROM PUBLIC, anon, authenticated;