export const getImageUrl = (path) =>
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${path}`;