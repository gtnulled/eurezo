/*
  # Create prayers table and security policies

  1. New Tables
    - `prayers`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `content` (text, not null)
      - `position` (integer, not null)
      - `created_at` (timestamptz, default: now())

  2. Security
    - Enable RLS on prayers table
    - Add policies for:
      - Public read access
      - Authenticated users can manage prayers
*/

-- Create prayers table
CREATE TABLE IF NOT EXISTS prayers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  position integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE prayers ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access"
  ON prayers
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users full access"
  ON prayers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);