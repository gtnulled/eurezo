/*
  # Add PWA settings to site_settings table

  1. Changes
    - Add pwa_settings JSONB column to site_settings table
    - Default values for PWA settings

  2. Security
    - No changes to existing policies needed
*/

ALTER TABLE site_settings
ADD COLUMN IF NOT EXISTS pwa_settings JSONB DEFAULT jsonb_build_object(
  'theme_color', '#E5D5B7',
  'background_color', '#E5D5B7',
  'app_name', 'EuRezo - Orações Católicas',
  'app_short_name', 'EuRezo',
  'app_description', 'Orações Católicas para seu dia a dia'
);