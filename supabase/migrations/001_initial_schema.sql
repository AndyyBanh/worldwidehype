-- selling inquiries (parent table)
CREATE TABLE selling_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- shoe inquiries (child table)
CREATE TABLE shoe_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID NOT NULL REFERENCES selling_inquiries(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  size TEXT NOT NULL,
  condition TEXT NOT NULL CHECK (condition IN ('new', 'preowned')),
  asking_price DECIMAL NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- collectible inquiries (child table)
CREATE TABLE collectible_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID NOT NULL REFERENCES selling_inquiries(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  condition TEXT NOT NULL CHECK (condition IN ('sealed', 'damaged')),
  asking_price DECIMAL NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- photos table (supports multiple photos per shoe or collectible)
CREATE TABLE inquiry_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shoe_inquiry_id UUID REFERENCES shoe_inquiries(id) ON DELETE CASCADE,
  collectible_inquiry_id UUID REFERENCES collectible_inquiries(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- ensure photo belongs to exactly one type, not both or neither
  CONSTRAINT photo_belongs_to_one CHECK (
    (shoe_inquiry_id IS NOT NULL AND collectible_inquiry_id IS NULL) OR
    (shoe_inquiry_id IS NULL AND collectible_inquiry_id IS NOT NULL)
  )
);

-- indexes
CREATE INDEX idx_selling_inquiries_created_at ON selling_inquiries(created_at DESC);
CREATE INDEX idx_selling_inquiries_status ON selling_inquiries(status);
CREATE INDEX idx_shoe_inquiries_inquiry_id ON shoe_inquiries(inquiry_id);
CREATE INDEX idx_collectible_inquiries_inquiry_id ON collectible_inquiries(inquiry_id);
CREATE INDEX idx_inquiry_photos_shoe_id ON inquiry_photos(shoe_inquiry_id);
CREATE INDEX idx_inquiry_photos_collectible_id ON inquiry_photos(collectible_inquiry_id);

-- RLS
ALTER TABLE selling_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE shoe_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE collectible_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiry_photos ENABLE ROW LEVEL SECURITY;

-- selling_inquiries policies
CREATE POLICY "public can insert inquiries" ON selling_inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "admin can read inquiries" ON selling_inquiries
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "admin can update inquiries" ON selling_inquiries
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "admin can delete inquiries" ON selling_inquiries
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- shoe_inquiries policies
CREATE POLICY "public can insert shoe inquiries" ON shoe_inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "admin can read shoe inquiries" ON shoe_inquiries
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "admin can update shoe inquiries" ON shoe_inquiries
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "admin can delete shoe inquiries" ON shoe_inquiries
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- collectible_inquiries policies
CREATE POLICY "public can insert collectible inquiries" ON collectible_inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "admin can read collectible inquiries" ON collectible_inquiries
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "admin can update collectible inquiries" ON collectible_inquiries
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "admin can delete collectible inquiries" ON collectible_inquiries
  FOR DELETE USING (auth.uid() IS NOT NULL);
  
-- inquiry_photos policies
CREATE POLICY "public can insert photos" ON inquiry_photos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "admin can read photos" ON inquiry_photos
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "admin can update photos" ON inquiry_photos
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "admin can delete photos" ON inquiry_photos
  FOR DELETE USING (auth.uid() IS NOT NULL);
