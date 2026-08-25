export interface Product {
  id: string;
  name: string;
  category: 'interior' | 'exterior' | 'electronics' | 'lighting' | 'protection' | 'care';
  categoryLabel: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  tag?: string;
  image: string;
  secondaryImages: string[];
  compatibility: string;
  specs: string[];
  description: string;
  warranty: string;
  installationTime: string;
  inStock: boolean;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: '7d-luxury-floor-mats',
    name: '3A Signature 7D Diamond Stitched Leather Mats',
    category: 'interior',
    categoryLabel: 'Interior Luxury',
    price: 3499,
    originalPrice: 4999,
    rating: 4.9,
    reviewCount: 142,
    tag: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=900&q=80'
    ],
    compatibility: 'Custom molded for 150+ SUV & Sedan models (Creta, Thar, Fortuner, Seltos, City, Scorpio-N, etc.)',
    specs: [
      'Multi-layer waterproof EVA & premium PU leather',
      'Anti-skid heel pad & removable coil grass mat on top',
      'Edge-to-edge laser scanned precision fitment',
      'Easy wash & wipe clean in seconds'
    ],
    description: 'Elevate your cabin with our top-tier 7D custom molded floor mats. Built with aerospace-grade eco leather and heavy-duty double diamond stitching, they trap dirt, water, mud, and dust while giving your car an ultra-luxury cockpit aesthetic.',
    warranty: '2 Years Replacement Guarantee',
    installationTime: '15 - 20 Mins DIY / Free Store Fitting',
    inStock: true,
    featured: true
  },
  {
    id: 'android-qled-infotainment-4k',
    name: '3A Apex 9"/10.1" QLED Android 13 Touchscreen (8GB/128GB)',
    category: 'electronics',
    categoryLabel: 'Electronics & Audio',
    price: 14999,
    originalPrice: 19999,
    rating: 5.0,
    reviewCount: 98,
    tag: 'Pro Grade',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80'
    ],
    compatibility: 'Available with OEM frame couplers for all major vehicle brands (No wire cutting)',
    specs: [
      'Wireless Apple CarPlay & Wireless Android Auto',
      '4K Ultra HD IPS/QLED anti-glare display with split screen',
      'Built-in 48-Band DSP equalizer with Subwoofer output',
      'Supports 360° Bird-Eye HD camera integration & AHD reverse cam'
    ],
    description: 'Transform your vehicle dashboard with lightning-fast Octa-Core processing, crystal clear QLED visuals, and seamless wireless phone projection. Plug-and-play installation retains steering wheel controls and OEM reverse camera.',
    warranty: '2 Years Comprehensive Warranty',
    installationTime: '45 - 60 Mins Professional Fitting',
    inStock: true,
    featured: true
  },
  {
    id: 'matrix-ambient-led-lighting-64',
    name: 'AcroPulse 64-Color Symphony Flow Ambient LED Kit',
    category: 'lighting',
    categoryLabel: 'Lighting Upgrades',
    price: 4799,
    originalPrice: 6999,
    rating: 4.9,
    reviewCount: 215,
    tag: 'Trending',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=900&q=80'
    ],
    compatibility: 'Universal fitment for all cars (Dashboard, 4 Doors, Footwells, Handle recesses)',
    specs: [
      '18-Piece concealed optical acrylic fiber strips',
      'Smartphone Bluetooth App + physical wireless remote',
      'Dynamic rainbow chase mode & music rhythm sync',
      'OEM concealed groove fitment without messy wires'
    ],
    description: 'Breathe futuristic supercar ambience into your cabin. Features ultra-slim acrylic light guides that blend seamlessly into door trim during daylight and ignite with flowing symphony colors at night.',
    warranty: '1 Year Full Replacement',
    installationTime: '60 - 90 Mins Professional Fitting',
    inStock: true,
    featured: true
  },
  {
    id: 'laser-led-headlight-projectors',
    name: 'HyperBeam Bi-LED & Laser Projector Headlight Bulbs (240W / 28000LM)',
    category: 'lighting',
    categoryLabel: 'Lighting Upgrades',
    price: 5499,
    originalPrice: 7999,
    rating: 4.9,
    reviewCount: 167,
    tag: 'High Output',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=900&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80'
    ],
    compatibility: 'H4, H7, H11, HB3, HB4, 9005, 9006 socket fitments available',
    specs: [
      '28,000 Lumens blazing 6000K pure diamond white beam',
      'Copper vacuum heat pipes + 12,000 RPM high-speed silent cooling fan',
      'Razor sharp cutoff line - Zero glare to oncoming traffic',
      'IP68 100% waterproof, dustproof, and vibration resistant'
    ],
    description: 'Conquer midnight highways and pitch-black foggy roads with 300% more illumination than standard halogen lamps. Laser-focused optics project over 500 meters down the asphalt with crisp cutoff margins.',
    warranty: '2 Years Instant Replacement',
    installationTime: '20 - 30 Mins Direct Plug & Play',
    inStock: true,
    featured: true
  },
  {
    id: 'nappa-leather-seat-covers',
    name: 'Royal Comfort Custom Tailored Nappa Leather Seat Covers',
    category: 'interior',
    categoryLabel: 'Interior Luxury',
    price: 8999,
    originalPrice: 12999,
    rating: 4.8,
    reviewCount: 89,
    tag: 'Handcrafted',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=900&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80'
    ],
    compatibility: 'Bucket fit custom stitched for all 5-Seater & 7-Seater vehicles',
    specs: [
      'Ultra-breathable Italian Nappa grain with memory foam cushioning',
      'Airbag deployment certified safety seams',
      'Resistant to scratches, spills, sweat, and UV fading',
      'Available in Tan, Mocha Brown, Jet Black, Ivory, and Dual-Tone'
    ],
    description: 'Experience true first-class comfort. Hand-stitched to OEM contours with high-density memory foam padding, ergonomic lumbar support, and special side seams engineered for factory airbag safety.',
    warranty: '3 Years Warranty on Leather & Stitching',
    installationTime: '2 - 3 Hours Master Tailor Installation',
    inStock: true,
    featured: true
  },
  {
    id: 'dashcam-4k-dual-channel',
    name: '3A Falcon Dual 4K Front + 1080P Rear Dashcam with GPS & WiFi',
    category: 'electronics',
    categoryLabel: 'Electronics & Audio',
    price: 6999,
    originalPrice: 9499,
    rating: 4.9,
    reviewCount: 134,
    tag: 'Essential Safety',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80'
    ],
    compatibility: 'Universal vehicle mount with stealth hardwire kit & 12V adapter',
    specs: [
      'Sony Starvis 2 Sensor with Super Night Vision HDR',
      '24-Hour Parking Surveillance G-Sensor & Time-lapse mode',
      'Instant smartphone WiFi app download & live viewing',
      'Built-in GPS log for speed, route tracking, and collision stamps'
    ],
    description: 'Protect your vehicle against false insurance claims, parking hit-and-runs, and highway disputes. Records continuous crystal-clear 4K footage with license plate readability even in pitch darkness.',
    warranty: '1 Year Direct Replacement',
    installationTime: '30 - 45 Mins Concealed Cable Setup',
    inStock: true,
    featured: true
  },
  {
    id: 'carbon-fiber-spoiler-lip',
    name: 'AeroMax Gloss Carbon Fiber Trunk Spoiler & Aero Splitter Wing',
    category: 'exterior',
    categoryLabel: 'Exterior Styling',
    price: 2899,
    originalPrice: 4299,
    rating: 4.7,
    reviewCount: 76,
    tag: 'Sport Look',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=900&q=80'
    ],
    compatibility: 'Universal flexible curve fit + model-specific ducktail options (City, Verna, Virtus, Slavia, Civic, Swift)',
    specs: [
      'High-gloss 3D twill weave carbon fiber texture',
      'Heavy-duty automotive grade 3M VHB bonding (No drilling needed)',
      'UV resistant clear coat - Will not fade, crack or warp in hot sun',
      'Enhances aerodynamics and high-speed rear axle stability'
    ],
    description: 'Give your car an aggressive sports silhouette. Precision manufactured from flexible ABS polyurethane with high-gloss hydro-dipped carbon finish that installs securely in minutes without damaging factory paint.',
    warranty: '1 Year Warranty',
    installationTime: '15 Mins No-Drill Installation',
    inStock: true
  },
  {
    id: 'underbody-ceramic-ppf-guard',
    name: '3A Armor Shield Self-Healing TPU Paint Protection Film (PPF)',
    category: 'protection',
    categoryLabel: 'Performance & Protection',
    price: 18999,
    originalPrice: 24999,
    rating: 5.0,
    reviewCount: 52,
    tag: 'Premium Armor',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=900&q=80'
    ],
    compatibility: 'Packages available for Bumper/Bonnet kits or Full Vehicle Wrapping',
    specs: [
      '190 Micron optical grade TPU with instant heat self-healing',
      'Ultra-hydrophobic ceramic top coat repels water, mud, and bird droppings',
      'Non-yellowing optical clarity with 10-year UV stabilizers',
      'Protects against highway stone chips, minor key scratches, and swirl marks'
    ],
    description: 'Keep your car looking straight off the showroom floor forever. Minor swirl marks and scratches disappear automatically under sunlight or warm water thanks to thermal memory self-healing technology.',
    warranty: '5 Years Manufacturer Guarantee',
    installationTime: 'Professional Dust-Free Studio Application',
    inStock: true
  },
  {
    id: 'dsp-subwoofer-underseat',
    name: 'ThunderBass 10" Active Slim Under-Seat Subwoofer (800W Peak)',
    category: 'electronics',
    categoryLabel: 'Electronics & Audio',
    price: 7499,
    originalPrice: 10999,
    rating: 4.9,
    reviewCount: 110,
    tag: 'Deep Bass',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80'
    ],
    compatibility: 'Fits perfectly under driver or co-driver seat in all Hatchbacks, Sedans & SUVs',
    specs: [
      'Solid die-cast heavy aluminum chassis with built-in Class D amplifier',
      'Remote wired bass control knob for driver seat fingertip adjustments',
      'Variable low-pass filter (50Hz - 150Hz) and bass boost tuning',
      'Saves 100% of your trunk boot space while delivering punchy bass'
    ],
    description: 'Get concert-like chest-thumping bass without sacrificing precious trunk boot space. Slips discreetly beneath front seats with zero rattling and crisp, tight low-frequency response.',
    warranty: '1 Year Replacement Warranty',
    installationTime: '45 Mins Concealed Under-Seat Fitting',
    inStock: true
  },
  {
    id: 'chrome-garnish-body-kit',
    name: '3A Elegance Triple Chrome Exterior Styling Kit (Complete 8-Pc Set)',
    category: 'exterior',
    categoryLabel: 'Exterior Styling',
    price: 3299,
    originalPrice: 4799,
    rating: 4.8,
    reviewCount: 84,
    tag: 'OEM Styling',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80'
    ],
    compatibility: 'Model specific molding (Fortuner, Creta, Brezza, Grand Vitara, Scorpio, Seltos, Nexon)',
    specs: [
      'High-purity ABS with 3-layer mirror electroplated chrome',
      'Includes Headlight, Taillight, Door Handles, and Mirror garnishes',
      'Pre-applied 3M heavy duty acrylic foam tape for durable hold',
      'Weather-sealed against monsoon rust, bubbling, or peeling'
    ],
    description: 'Add an executive touch of luxury to your vehicle exterior with triple-plated mirror chrome trims precisely shaped to match factory panel grooves and curves.',
    warranty: '1 Year Anti-Rust Warranty',
    installationTime: '20 Mins Stick-on Installation',
    inStock: true
  },
  {
    id: 'smart-tire-inflator-pump',
    name: '3A TurboFlow Cordless Digital Tire Inflator & 12V Power Bank',
    category: 'care',
    categoryLabel: 'Car Care & Tools',
    price: 2499,
    originalPrice: 3799,
    rating: 4.9,
    reviewCount: 190,
    tag: 'Highway Must-Have',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=80'
    ],
    compatibility: 'Universal for all Car tires, SUV wheels, Bikes, and Sports gear',
    specs: [
      '150 PSI maximum pressure with auto-shutoff when target reached',
      '6000mAh rechargeable lithium battery + 12V car socket backup cable',
      'Built-in emergency LED flashlight with SOS strobe mode',
      'Digital backlit LCD display with real-time pressure gauge'
    ],
    description: 'Never get stranded on a deserted highway with a low-pressure tire. Fills a flat SUV tire in under 4 minutes with automatic shutoff at preset pressure, emergency SOS lighting, and phone charging.',
    warranty: '1 Year Warranty',
    installationTime: 'Instant Portable Tool',
    inStock: true
  },
  {
    id: 'sun-control-ceramic-window-film',
    name: 'SolarShield Nano-Ceramic Heat Rejection Window Tint Film (70% VLT)',
    category: 'protection',
    categoryLabel: 'Performance & Protection',
    price: 4999,
    originalPrice: 7499,
    rating: 4.8,
    reviewCount: 95,
    tag: 'Heat Defense',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=900&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80'
    ],
    compatibility: 'Pre-cut rolls for all Sedan, Hatchback and SUV window sizes',
    specs: [
      '99% UV radiation blockage & 85% Infrared heat rejection',
      'Maintains 70% visible light transmission for legal clarity and night safety',
      'Reduces cabin AC load by 40% on scorching summer days',
      'Non-metallic construction does not interfere with GPS, FASTag, or cellular signals'
    ],
    description: 'Stay refreshingly cool even under direct blazing sun. Nano-ceramic infrared filtering cools cabin temperatures rapidly while preserving crisp nighttime visibility and full GPS/FASTag signals.',
    warranty: '5 Years No-Bubble Guarantee',
    installationTime: '1.5 Hours Studio Application',
    inStock: true
  },
  {
    id: 'matrix-fog-lamps-projector',
    name: '3A Dual-Tone White/Yellow High-Beam Bi-LED Fog Projectors (120W)',
    category: 'lighting',
    categoryLabel: 'Lighting Upgrades',
    price: 3999,
    originalPrice: 5999,
    rating: 4.9,
    reviewCount: 118,
    tag: 'Fog & Rain Beast',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=900&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80'
    ],
    compatibility: 'Direct 3-inch round fog housing replacement for Swift, Baleno, Creta, Fortuner, Brezza, etc.',
    specs: [
      'Switch between 6000K crisp white (dry roads) and 3000K golden yellow (fog/rain)',
      'Integrated solenoid high-beam assist with 400m throwing distance',
      'Die-cast aluminum heat sinks with IP68 waterproof breather valve',
      'Plug-and-play harness with direct fog light coupler'
    ],
    description: 'Pioneered for extreme monsoons and winter fog. Toggle instantly between piercing golden yellow beam that cuts through heavy fog and ice-white illumination for highway cruising.',
    warranty: '2 Years Replacement',
    installationTime: '30 Mins Direct Bolt-On',
    inStock: true
  },
  {
    id: 'leather-steering-wheel-wrap',
    name: '3A Hand-Stitched Perforated Carbon & Leather Steering Wheel Wrap',
    category: 'interior',
    categoryLabel: 'Interior Luxury',
    price: 1299,
    originalPrice: 1999,
    rating: 4.9,
    reviewCount: 153,
    tag: 'Driver Feel',
    image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=900&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=900&q=80'
    ],
    compatibility: 'Universal 37-38cm diameter (Fits 99% of cars on road)',
    specs: [
      'Anti-sweat breathable micro-perforated leather with carbon fiber accents',
      'Provides superior tactile grip and eliminates steering slip',
      'Includes high-strength waxed thread and blunt stitching needles',
      'Protects original factory steering wheel from peeling, sweat, and sun damage'
    ],
    description: 'Give your daily driving wheel the grip and prestige of a luxury sports car. Features breathable perforated texture with distinctive contrast stitching and firm palm contours.',
    warranty: '1 Year Warranty',
    installationTime: '30 Mins Master Hand-Stitch',
    inStock: true
  },
  {
    id: 'ceramic-coating-9h-kit',
    name: '3A Ultra-Gloss 9H Diamond Matrix Ceramic Coating Kit (50ml Pro)',
    category: 'care',
    categoryLabel: 'Car Care & Tools',
    price: 1899,
    originalPrice: 2999,
    rating: 4.8,
    reviewCount: 88,
    tag: 'Mirror Shine',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80'
    ],
    compatibility: 'Suitable for all painted car bodies, alloy wheels, windshields, and headlight covers',
    specs: [
      '9H pencil hardness scratch resistance with deep wet gloss reflection',
      'Super-hydrophobic lotus leaf effect keeps paint clean longer',
      'Complete kit: 50ml ceramic bottle, applicator block, 3 suede cloths, microfiber',
      'Shields paint from acid rain, industrial fallout, oxidation, and bird droppings'
    ],
    description: 'Achieve an intense mirror-like candy gloss that repels water beads, dust, and road grime for up to 2 years. Easy DIY application with professional studio grade durability.',
    warranty: '2 Years Hydrophobic Protection',
    installationTime: '1 Hour Application',
    inStock: true
  },
  {
    id: 'door-visor-sun-deflector',
    name: '3A Injection Molded Smoke Black Window Sun Deflectors (Chrome Line)',
    category: 'exterior',
    categoryLabel: 'Exterior Styling',
    price: 1499,
    originalPrice: 2299,
    rating: 4.7,
    reviewCount: 104,
    tag: 'All-Weather',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=80'
    ],
    compatibility: 'Custom molded 4-Pc set for all car models with stainless steel chrome accent',
    specs: [
      'Virgin unbreakable polycarbonate in sleek smoked tint',
      'Allows window crack-open during heavy rain for defogging without water entry',
      'Aerodynamic shape reduces highway wind buffeting noise',
      'Original 3M double-sided automotive adhesive pre-installed'
    ],
    description: 'Keep your windows slightly cracked during heavy downpours or hot parking without rain leaking in. Smoked aerodynamic finish with embedded stainless chrome strip.',
    warranty: '1 Year Warranty',
    installationTime: '10 Mins Stick-on Fit',
    inStock: true
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Accessories', icon: 'Sparkles', count: 16 },
  { id: 'interior', name: 'Interior Luxury', icon: 'Armchair', count: 4, desc: '7D Mats, Nappa Seat Covers, Steering Wraps, Organizers' },
  { id: 'lighting', name: 'Lighting & LEDs', icon: 'SunMedium', count: 3, desc: 'Laser Projectors, Ambient 64-Color LEDs, Dual Fog Lamps' },
  { id: 'electronics', name: 'Electronics & Audio', icon: 'Radio', count: 3, desc: '4K Android Infotainment, Slim Subwoofers, Dual Dashcams' },
  { id: 'exterior', name: 'Exterior Styling', icon: 'CarFront', count: 3, desc: 'Carbon Spoilers, Chrome Kits, Door Visors, Aero Trims' },
  { id: 'protection', name: 'Protection & PPF', icon: 'ShieldCheck', count: 2, desc: 'Self-Healing TPU PPF, Nano-Ceramic Window Tint' },
  { id: 'care', name: 'Car Care & Tools', icon: 'Wrench', count: 2, desc: 'Tire Inflators, 9H Ceramic Kits, Cleaning Gear' }
];

export const POPULAR_VEHICLES = [
  {
    brand: 'Toyota',
    models: ['Fortuner', 'Innova Crysta', 'Innova Hycross', 'Urban Cruiser Hyryder', 'Glanza', 'Hilux', 'Land Cruiser']
  },
  {
    brand: 'Mahindra',
    models: ['Thar 4x4 / Roxx', 'Scorpio-N', 'Scorpio Classic', 'XUV700', 'XUV300 / 3XO', 'Bolero Neo']
  },
  {
    brand: 'Hyundai',
    models: ['Creta 2024', 'Venue', 'Verna', 'Tucson', 'i20 N-Line', 'Exter', 'Alcazar']
  },
  {
    brand: 'Tata Motors',
    models: ['Harrier EV/Facelift', 'Safari', 'Nexon / Nexon EV', 'Punch', 'Altroz', 'Curvv']
  },
  {
    brand: 'Kia',
    models: ['Seltos Facelift', 'Sonet', 'Carens', 'EV6', 'Carnival']
  },
  {
    brand: 'Maruti Suzuki',
    models: ['Grand Vitara', 'Brezza', 'Fronx', 'Swift 2024', 'Baleno', 'Jimny 5-Door', 'Ertiga / XL6']
  },
  {
    brand: 'Honda',
    models: ['City ZX (5th Gen)', 'Elevate', 'Amaze', 'Civic', 'CR-V']
  },
  {
    brand: 'BMW / Mercedes / Audi',
    models: ['BMW 3 Series / M340i', 'BMW X1 / X3 / X5', 'Mercedes C-Class / E-Class', 'Mercedes GLC / GLE', 'Audi A4 / A6 / Q3 / Q5']
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: 'Vikramaditya Rathore',
    car: 'Toyota Fortuner Legender',
    rating: 5,
    date: '2 days ago',
    verified: true,
    text: 'Upgraded my Fortuner with 3A’s 7D Diamond Mats and the Bi-LED Laser Headlight Projectors. The night throw is unbelievable—feels like driving in daylight! Professional fitment and super fast delivery. 10/10 recommend!',
    itemsPurchased: ['7D Diamond Mats', 'Laser LED Headlights']
  },
  {
    id: 2,
    name: 'Rajeev Malhotra',
    car: 'Mahindra Thar 4x4',
    rating: 5,
    date: '1 week ago',
    verified: true,
    text: 'Installed the 9-inch QLED Android Infotainment with Wireless CarPlay and the Slim Under-Seat Subwoofer. Audio output is crisp with deep bass, and zero wire splicing means my vehicle warranty is 100% intact.',
    itemsPurchased: ['QLED Android Infotainment', 'Underseat Subwoofer']
  },
  {
    id: 3,
    name: 'Sneha Venkatesh',
    car: 'Hyundai Creta SX(O)',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    text: 'The 64-color Symphony ambient LED kit completely elevated the interior cabin! The smartphone app lets me customize colors easily, and the team at 3A Auto Accessories guided me patiently on WhatsApp.',
    itemsPurchased: ['64-Color Ambient LED Kit']
  },
  {
    id: 4,
    name: 'Arjun Sen',
    car: 'Tata Harrier Dark Edition',
    rating: 5,
    date: '3 weeks ago',
    verified: true,
    text: 'Got the 4K Dual Dashcam and Custom Nappa Leather Seat Covers. The stitching quality matches genuine German luxury cars. Seamless WhatsApp booking experience!',
    itemsPurchased: ['Nappa Leather Seat Covers', '4K Dual Dashcam']
  }
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Mahindra Thar Custom Cabin & 7D Mats',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
    description: 'Precision molded 7D floor mats and handcrafted tan leather seat upholstery.'
  },
  {
    id: 2,
    title: 'Laser Bi-LED 28000LM Headlight Projector Upgrade',
    category: 'Lighting',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=900&q=80',
    description: '500m night range illumination with laser-sharp cutoff line for night highway safety.'
  },
  {
    id: 3,
    title: 'Symphony Flow 64-Color Acrylic Ambient Cabin',
    category: 'Lighting',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80',
    description: 'Concealed fiber optic lighting with dynamic rainbow chase mode.'
  },
  {
    id: 4,
    title: 'QLED 4K Android System + 360 Bird-Eye Camera',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80',
    description: 'High-speed 8-core infotainment with seamless wireless Apple CarPlay & Android Auto.'
  },
  {
    id: 5,
    title: 'High-Gloss Carbon Fiber Spoiler & Aero Splitter',
    category: 'Exterior',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=80',
    description: 'Aggressive aero ducktail spoiler upgrade with zero body drilling.'
  },
  {
    id: 6,
    title: 'Self-Healing TPU Armor PPF & 9H Ceramic Shield',
    category: 'Protection',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=80',
    description: 'Deep mirror candy gloss and stone-chip scratch protection.'
  }
];

export const FAQS = [
  {
    question: 'How do I place an order or check fitment for my specific car model?',
    answer: 'Simply browse any product and tap the "WhatsApp Enquiry" button or use our interactive Vehicle Fitment Finder. Our expert automotive consultant will verify your vehicle make, year, and variant in under 2 minutes and send you photos/videos of exact fitment!'
  },
  {
    question: 'Does installing electrical accessories (Headlights/Android screens) void my car warranty?',
    answer: 'Not at 3A Auto Accessories! All our electronics, LED headlights, and infotainment systems use OEM-grade plug-and-play couplers and harness sockets. We do NOT cut, splice, or alter any factory wiring, ensuring your new car warranty stays 100% intact.'
  },
  {
    question: 'Do you offer doorstep installation or workshop fitting?',
    answer: 'Yes! We provide master technician installation at our flagship workshop. For outstation customers, we ship all items with easy plug-and-play guides and provide real-time video call assistance for local mechanics.'
  },
  {
    question: 'What is your shipping and warranty replacement policy?',
    answer: 'We provide express pan-India tracked delivery (2-4 business days). All accessories come with a minimum 1 to 3 years direct replacement guarantee against defects. If any issue arises, we replace it hassle-free.'
  },
  {
    question: 'Can I get a package discount if I buy multiple accessories?',
    answer: 'Yes! You can use our interactive "Custom Quote Builder" on this website to bundle multiple accessories (e.g. 7D Mats + Ambient Lights + Infotainment). Bundles receive up to 25% off regular retail pricing plus complimentary fitting accessories.'
  }
];

export const BUSINESS_INFO = {
  name: '3A Auto Accessories',
  tagline: 'Premium Automotive Styling, High-Tech Electronics & Luxury Upgrades',
  phone: '+91 99584 73159',
  whatsappNumber: '919958473159', // For wa.me links
  email: 'support@3aautoaccessories.com',
  address: '3A Auto Accessories Flagship Studio, Auto Hub Boulevard, Main Ring Road, Sector 18, Commercial Zone',
  hours: 'Mon - Sun: 9:30 AM - 9:00 PM (All 7 Days Open)',
  rating: 4.9,
  totalReviews: '1,850+ Verified Ratings',
  yearsInBusiness: '15+ Years of Automotive Craftsmanship'
};
