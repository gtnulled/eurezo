/*
  # Add site settings table

  1. New Tables
    - `site_settings`
      - `id` (uuid, primary key)
      - `site_name` (text)
      - `site_description` (text)
      - `logo_url` (text)
      - `og_image_url` (text)
      - `meta_title` (text)
      - `meta_description` (text)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `site_settings` table
    - Add policy for authenticated users to manage settings
    - Add policy for public to read settings
*/

CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name text NOT NULL DEFAULT 'EuRezo',
  site_description text NOT NULL DEFAULT 'Orações Católicas',
  logo_url text,
  og_image_url text,
  meta_title text,
  meta_description text,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage settings
CREATE POLICY "Allow authenticated users to manage settings"
  ON site_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow public to read settings
CREATE POLICY "Allow public to read settings"
  ON site_settings
  FOR SELECT
  TO public
  USING (true);

-- Insert default settings
INSERT INTO site_settings (site_name, site_description)
VALUES ('EuRezo', 'Orações Católicas')
ON CONFLICT (id) DO NOTHING;