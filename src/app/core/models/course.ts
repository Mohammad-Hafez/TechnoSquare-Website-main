export interface Course {
  id?: number | null;
  name?: string | null;
  commercial_name?: string | null;
  track?: string | null;
  price?: string | null;
  start_age?: number | null;
  end_age?: number | null;
  duration_hours?: number | null;
  levels_number?: number | null;
  sessions_number?: number | null;
  months_number?: number | null;
  prerequests_courses: [] ;
  short_desc?: string | null;
  long_desc?: string | null;
  exp_level?: 'beginner' | 'intermediate' | 'advanced';
  availability?: 0 | 1;
  priority?: number | null;
  image?: string | null;
}
