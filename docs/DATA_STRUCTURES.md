# BVM - Data Structures Reference

> **Location**: UAE Launch  
> **Currency**: AED (UAE Dirham)

---

## Image Folder Structure

```
public/
├── logo/
│   ├── bvm-logo.png           # Main logo
│   ├── bvm-logo-white.png     # White version for dark backgrounds
│   └── bvm-favicon.ico        # Favicon
│
└── details/
    ├── excavator-320.jpg       # Excavator detail image
    ├── excavator-320-2.jpg     # Additional images
    ├── dozer-d6.jpg
    ├── crane-50t.jpg
    ├── generator-500kva.jpg
    ├── boom-lift-60ft.jpg
    └── wheel-loader-966.jpg
```

**Note**: 
- Slider images should have **white background** (for clean homepage slider)
- Details images are full equipment photos for details page

---

## Machinery Object

```javascript
{
  "id": "exc-001",                    // Unique ID (category prefix + number)
  "name": "Caterpillar Excavator 320",
  "slug": "caterpillar-excavator-320", // URL-friendly name
  "category": "Excavators",            // Must match categories array
  "brand": "Caterpillar",
  "sliderImage": "/details/excavator-320-white.jpg",  // White bg for slider
  "detailImage": "/details/excavator-320.jpg",        // Full image for details
  "gallery": [                         // Additional detail images
    "/details/excavator-320-2.jpg",
    "/details/excavator-320-3.jpg"
  ],
  "description": "Heavy-duty excavator perfect for large construction projects. Ideal for excavation, trenching, and material handling.",
  "specifications": {                  // Key-value pairs for specs
    "Operating Weight": "20,000 kg",
    "Engine Power": "162 HP",
    "Bucket Capacity": "1.2 m³",
    "Max Digging Depth": "6.7 m"
  },
  "rates": {                           // Rental rates in AED
    "daily": 500,
    "weekly": 3000,
    "monthly": 10000
  },
  "available": true,                   // Current availability status
  "featured": true,                    // Show on homepage slider
  "createdAt": "2024-01-01"
}
```

## Review Object

```javascript
{
  "id": "rev-001",                     // Unique ID
  "userName": "Ahmed Al Maktoum",      // Reviewer name
  "category": "excellent",             // Rating: bad | good | very_good | excellent
  "description": "Outstanding service and quality equipment.",
  "createdAt": "2024-01-15T10:30:00Z", // ISO timestamp
  "approved": true                     // Admin approval status
}
```

## Categories Array

```javascript
[
  "Excavators",
  "Dozers",
  "Articulated Trucks",
  "Motor Graders",
  "Diesel Generators",
  "Boom Lifts",
  "Wheel Loaders",
  "Cranes",
  "Compactors",
  "Backhoe Loaders",
  "Skid Steers",
  "Road Pavers",
  "Mining Trucks",
  "Air Compressors"
]
```

## Review Categories

| Value | Label | Badge Color |
|-------|-------|-------------|
| `bad` | Bad | Red |
| `good` | Good | Yellow |
| `very_good` | Very Good | Blue |
| `excellent` | Excellent | Green |

## Brand/Client Object

```javascript
{
  "id": "brand-001",
  "name": "Caterpillar",
  "logo": "/images/brands/caterpillar.png",
  "type": "brand"  // brand | client
}
```

## Quote Request Object

```javascript
{
  "id": "quote-001",
  "machineryIds": ["exc-001", "doz-002"],
  "startDate": "2024-02-01",
  "endDate": "2024-02-15",
  "contact": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+971501234567",
    "company": "ABC Construction"
  },
  "message": "Need excavator for site work",
  "createdAt": "2024-01-20T14:30:00Z",
  "status": "pending"  // pending | contacted | converted
}
```

## Booking Object

```javascript
{
  "id": "booking-001",
  "machineryId": "exc-001",
  "machineryName": "Caterpillar Excavator 320",  // For display
  "startDate": "2024-02-01",    // Rental start date
  "endDate": "2024-02-15",      // Rental end date (must be > startDate)
  "totalDays": 14,
  "totalAmount": 7000,          // In AED
  "contact": {
    "name": "Ahmed Al Maktoum",
    "email": "ahmed@company.ae",
    "phone": "+971501234567",
    "company": "ABC Construction LLC"
  },
  "deliveryAddress": "Dubai Industrial City, Plot 123",
  "notes": "Special requirements or instructions",
  "createdAt": "2024-01-20T14:30:00Z",
  "status": "pending"  // pending | confirmed | active | completed | cancelled
}
```

### Booking Status Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    BOOKING STATUS FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   User submits booking request                                  │
│            ↓                                                    │
│   ┌───────────────┐                                             │
│   │    PENDING    │  → Waiting for admin confirmation           │
│   └───────┬───────┘                                             │
│           ↓                                                     │
│   ┌───────────────┐                                             │
│   │   CONFIRMED   │  → Admin approved, machinery reserved       │
│   └───────┬───────┘    (machinery.available = false)            │
│           ↓                                                     │
│   ┌───────────────┐                                             │
│   │    ACTIVE     │  → Rental period started                    │
│   └───────┬───────┘    (startDate <= today <= endDate)          │
│           ↓                                                     │
│   ┌───────────────┐                                             │
│   │   COMPLETED   │  → Rental period ended                      │
│   └───────────────┘    (endDate < today)                        │
│                        (machinery.available = true) ← AUTO      │
│                                                                 │
│   ┌───────────────┐                                             │
│   │   CANCELLED   │  → Booking cancelled                        │
│   └───────────────┘    (machinery.available = true)             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Availability Logic

```javascript
// When checking machinery availability:
// 1. Check if machinery.available === true
// 2. Check if no active/confirmed bookings overlap with requested dates

// Auto-update availability (run daily or on page load):
function updateExpiredBookings(bookings, machinery) {
  const today = new Date();
  
  bookings.forEach(booking => {
    if (booking.status === 'active' || booking.status === 'confirmed') {
      const endDate = new Date(booking.endDate);
      
      if (endDate < today) {
        // Booking period has ended
        booking.status = 'completed';
        
        // Set machinery back to available
        const machine = machinery.find(m => m.id === booking.machineryId);
        if (machine) {
          machine.available = true;
        }
      }
    }
  });
}
```

### Date Validation Rules

```javascript
// Frontend validation for booking form:
const dateValidation = {
  // Start date must be today or future
  minStartDate: new Date().toISOString().split('T')[0],
  
  // End date must be after start date
  minEndDate: (startDate) => {
    const next = new Date(startDate);
    next.setDate(next.getDate() + 1);
    return next.toISOString().split('T')[0];
  },
  
  // Validate date range
  isValidRange: (startDate, endDate) => {
    return new Date(endDate) > new Date(startDate);
  }
};
```

## Contact Form Object

```javascript
{
  "id": "contact-001",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+971501234567",
  "subject": "General Inquiry",
  "message": "I would like to know more about...",
  "createdAt": "2024-01-20T14:30:00Z",
  "status": "new"  // new | read | responded
}
```

---

## API Response Formats

### Success Response
```javascript
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional success message"
}
```

### Error Response
```javascript
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Paginated Response
```javascript
{
  "success": true,
  "data": [ /* array of items */ ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

