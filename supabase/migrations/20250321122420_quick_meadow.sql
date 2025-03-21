/*
  # Add move down functionality for prayers

  1. Changes
    - Add function to move prayer down
    - Add function to move prayer up
    - Update position column to be unique

  2. Security
    - Functions are accessible only to authenticated users
*/

-- Make position column unique
ALTER TABLE prayers
ADD CONSTRAINT unique_position UNIQUE (position);

-- Function to move prayer up
CREATE OR REPLACE FUNCTION move_prayer_up(prayer_id UUID)
RETURNS VOID AS $$
DECLARE
  current_position INTEGER;
  previous_id UUID;
  previous_position INTEGER;
BEGIN
  -- Get current prayer position
  SELECT position INTO current_position
  FROM prayers
  WHERE id = prayer_id;

  -- Get previous prayer
  SELECT id, position INTO previous_id, previous_position
  FROM prayers
  WHERE position < current_position
  ORDER BY position DESC
  LIMIT 1;

  -- If there's a previous prayer, swap positions
  IF previous_id IS NOT NULL THEN
    UPDATE prayers
    SET position = previous_position
    WHERE id = prayer_id;

    UPDATE prayers
    SET position = current_position
    WHERE id = previous_id;
  END IF;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER;

-- Function to move prayer down
CREATE OR REPLACE FUNCTION move_prayer_down(prayer_id UUID)
RETURNS VOID AS $$
DECLARE
  current_position INTEGER;
  next_id UUID;
  next_position INTEGER;
BEGIN
  -- Get current prayer position
  SELECT position INTO current_position
  FROM prayers
  WHERE id = prayer_id;

  -- Get next prayer
  SELECT id, position INTO next_id, next_position
  FROM prayers
  WHERE position > current_position
  ORDER BY position ASC
  LIMIT 1;

  -- If there's a next prayer, swap positions
  IF next_id IS NOT NULL THEN
    UPDATE prayers
    SET position = next_position
    WHERE id = prayer_id;

    UPDATE prayers
    SET position = current_position
    WHERE id = next_id;
  END IF;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION move_prayer_up(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION move_prayer_down(UUID) TO authenticated;