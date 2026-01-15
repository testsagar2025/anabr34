import { useState, useEffect } from 'react';

export interface GuestData {
  id: string;
  name: string;
  type: 'family' | 'single' | string;
  events: string[];
  address: string;
  notes: string;
  include_address: boolean;
}

// Event name mappings to Hindi
export const eventNameHindi: Record<string, string> = {
  shadi: 'शादी',
  rasum: 'रस्म',
  tilak: 'तिलक',
  haldi: 'हल्दी',
  mehndi: 'मेहंदी',
};

// Event icons
export const eventIcons: Record<string, string> = {
  shadi: '💒',
  rasum: '🪷',
  tilak: '🔴',
  haldi: '🌻',
  mehndi: '🌿',
};

// Event dates
export const eventDates: Record<string, { date: string; day: string }> = {
  rasum: { date: '20 अप्रैल 2026', day: 'सोमवार' },
  tilak: { date: '22 अप्रैल 2026', day: 'बुधवार' },
  haldi: { date: '26 अप्रैल 2026', day: 'रविवार' },
  mehndi: { date: '27 अप्रैल 2026', day: 'सोमवार' },
  shadi: { date: '28 अप्रैल 2026', day: 'मंगलवार' },
};

// Event descriptions in Hindi (detailed)
export const eventDescriptions: Record<string, string> = {
  shadi: 'पवित्र अग्नि के साक्षी रहते दो आत्माओं का मिलन होगा। विवाह मंडप में आपकी उपस्थिति हमारे इस पवित्र बंधन को सार्थक करेगी।',
  rasum: 'पवित्र रस्म समारोह में आपकी उपस्थिति से हमें अपार प्रसन्नता की अनुभूति होगी। इस शुभ अवसर पर दोनों परिवारों का मिलन होगा।',
  tilak: 'तिलक की शुभ परंपरा का निर्वहन किया जाएगा। इस मंगलमय अवसर पर आपकी कृपा और आशीर्वाद की कामना है।',
  haldi: 'हल्दी का पवित्र समारोह दुल्हन को सौंदर्य और कोमलता से सजाने के लिए किया जाता है। कृपया इस आनंद में शामिल हों।',
  mehndi: 'मेहंदी की खुशियों में डूबी महिलाओं के गीत और हंसी से भरा एक मंगलमय पल। आप इस परंपरागत उत्सव का हिस्सा बनें।',
};

const API_URL = 'https://app.base44.com/api/apps/69663f1704636ad61e212b37/entities/Guest';
const API_KEY = '61780018ee5947afabb67ae71c27ba88';

export const useGuestData = (guestId: string | null) => {
  const [guestData, setGuestData] = useState<GuestData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!guestId) {
      setGuestData(null);
      return;
    }

    const fetchGuestData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/${guestId}`, {
          headers: {
            'api_key': API_KEY,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('मेहमान की जानकारी नहीं मिली');
        }

        const data = await response.json();
        setGuestData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'कुछ गड़बड़ हो गई');
        setGuestData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGuestData();
  }, [guestId]);

  return { guestData, loading, error };
};
