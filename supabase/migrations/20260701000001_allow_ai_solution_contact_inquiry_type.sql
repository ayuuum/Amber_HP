-- Allow the current HP contact form inquiry type.

alter table public.contact_submissions
  drop constraint if exists contact_submissions_inquiry_type_check;

alter table public.contact_submissions
  add constraint contact_submissions_inquiry_type_check
  check (
    inquiry_type in (
      'ai-solution',
      'development',
      'training',
      'pine',
      'demo',
      'partnership',
      'recruiting',
      'general'
    )
  );
