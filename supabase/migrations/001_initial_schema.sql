-- selling inquiries (parent table)
CREATE TABLE selling_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed')),
  location TEXT NOT NULL DEFAULT 'GTA' CHECK (location IN ('GTA', 'Across Canada', 'United States')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- shoe inquiries (child table)
CREATE TABLE shoe_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID NOT NULL REFERENCES selling_inquiries(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  size TEXT NOT NULL,
  condition TEXT NOT NULL CHECK (condition IN ('new', 'preowned')),
  asking_price DECIMAL NOT NULL CHECK (asking_price > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- collectible inquiries (child table)
CREATE TABLE collectible_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID NOT NULL REFERENCES selling_inquiries(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  units INTEGER NOT NULL DEFAULT 1 CHECK (units > 0),
  asking_price DECIMAL NOT NULL CHECK (asking_price > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- indexes
CREATE INDEX idx_selling_inquiries_created_at ON selling_inquiries(created_at DESC);
CREATE INDEX idx_selling_inquiries_status ON selling_inquiries(status);
CREATE INDEX idx_shoe_inquiries_inquiry_id ON shoe_inquiries(inquiry_id);
CREATE INDEX idx_collectible_inquiries_inquiry_id ON collectible_inquiries(inquiry_id);

-- RLS
ALTER TABLE selling_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE shoe_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE collectible_inquiries ENABLE ROW LEVEL SECURITY;

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

