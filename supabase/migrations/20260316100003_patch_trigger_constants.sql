-- Company OS: notify_state_change関数を更新（定数埋め込み版）
CREATE OR REPLACE FUNCTION public.notify_state_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $func$
DECLARE
  _entity_type text;
  _old_status text;
  _new_status text;
  _transition_id uuid;
  _payload jsonb;
BEGIN
  _entity_type := TG_TABLE_NAME;

  IF TG_OP = 'INSERT' THEN
    _old_status := NULL;
    _new_status := NEW.status;
  ELSIF TG_OP = 'UPDATE' THEN
    _old_status := OLD.status;
    _new_status := NEW.status;
    IF _old_status = _new_status THEN
      RETURN NEW;
    END IF;
  ELSE
    RETURN NEW;
  END IF;

  INSERT INTO public.state_transitions (entity_type, entity_id, from_status, to_status, triggered_by)
  VALUES (_entity_type, NEW.id, _old_status, _new_status, 'system')
  RETURNING id INTO _transition_id;

  _payload := jsonb_build_object(
    'transition_id', _transition_id,
    'entity_type', _entity_type,
    'entity_id', NEW.id,
    'from_status', _old_status,
    'to_status', _new_status,
    'timestamp', now()
  );

  PERFORM net.http_post(
    url := 'https://ymwbolivoumrvubjxpoy.supabase.co/functions/v1/company-os-router',
    body := _payload,
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltd2JvbGl2b3VtcnZ1Ymp4cG95Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzIyODM0MiwiZXhwIjoyMDg4ODA0MzQyfQ.VlHkDWQ33Rexdm919CnYfLvRm2-YKY6scdnimLyR0ig"}'::jsonb
  );

  RETURN NEW;
END;
$func$;
